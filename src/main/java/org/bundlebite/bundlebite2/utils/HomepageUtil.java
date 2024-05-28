package org.bundlebite.bundlebite2.utils;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonReader;

import org.bundlebite.bundlebite2.FirebaseInit;
import org.bundlebite.bundlebite2.Ingredient;
import org.bundlebite.bundlebite2.Meal;
import org.bundlebite.bundlebite2.Order;
import org.bundlebite.bundlebite2.FirebaseInit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.io.StringReader;

public class HomepageUtil {
    private static final Logger logger = LoggerFactory.getLogger(HomepageUtil.class);
    private final static String[] suppliers = {"animalprods", "vegetables", "generalstore"};
    private final static boolean areSuppliersLocal = true;
    // public static void main(String[] args) {
    //     System.out.println("Hello from homepage util!");

    //     Map<String,Integer> map = HomepageUtil.getAllQuantitiesFromSuppliers(suppliers);
    //     FirebaseInitDummy firebaseInit = new FirebaseInitDummy();
    //     firebaseInit.initialize();
    //     List<Meal> meals = getMealsFirebase();

    //     for (Meal m: meals){
    //         System.out.println("Meal id is " + m.getId() + " and the name is " + m.getName());
    //         List<Ingredient> ings = m.getIngredients();
    //         System.out.println("Ingredient of meal: \n ");
    //         for (Ingredient ing: ings){
    //             System.out.printf("idLink %s, quantity %d%n", ing.getIdLink(), ing.getQuantity());
    //         }
    //     }
    //     System.out.println("Actual ingredients");
    //     printMap(map);
    //     List<Meal> finalMeals = checkAvailability(map, meals);
    //     for (Meal m: finalMeals){
    //         System.out.printf("meal %s's availability is %s%n", m.getName(), m.getAvailability());
    //     }
        
    // }

    public static List<Meal> getMealsForHomepage(){
        Map<String,Integer> map = HomepageUtil.getAllQuantitiesFromSuppliers(suppliers);
        List<Meal> meals = getMealsFirebase();

        System.out.println("Actual ingredients");
        printMap(map);
        List<Meal> finalMeals = checkAvailability(map, meals);
        return finalMeals;
    }

    public static List<Meal> checkAvailability(Map<String, Integer> actualIngredients, List<Meal> meals){
        for (Meal meal : meals) {
            boolean isAvailable = true;
            
            for (Ingredient ingredient : meal.getIngredients()) {
                String idLink = ingredient.getIdLink();
                int requiredQuantity = ingredient.getQuantity();

                // Check if the ingredient is available in the required quantity
                if (!actualIngredients.containsKey(idLink) || actualIngredients.get(idLink) < requiredQuantity) {
                    isAvailable = false;
                    break;
                }
            }
            
            // Set the availability of the meal
            meal.setAvailability(isAvailable);
        }
        return meals;
    }

    public static Map<String,Integer> getAllQuantitiesFromSuppliers(String[] suppliers){
        List<Map<String,Integer>> productQuantityMapList = new ArrayList<>();
        Map<String,Integer> combinedMap = new HashMap<>();

        for (String supplier: suppliers){
            productQuantityMapList.add(getQuantitiesFromSupplier(supplier, "rasimrasim14"));
        }

        for (Map<String,Integer> map: productQuantityMapList){
            combinedMap.putAll(map);
        }
        return combinedMap;
    }

    public static Map<String,Integer> getQuantitiesFromSupplier(String supplier, String apiKey){
        try {
            String urlString;
            if (areSuppliersLocal){
                switch (supplier) {
                    case "animalprods":
                        urlString = "http://localhost:8081/animalprods";
                        break;
                    case "vegetables":
                        urlString = "http://localhost:8082/vegetables";
                        break;
                    case "generalstore":
                        urlString = "http://localhost:8083/generalstore";
                        break;
                    default:
                        throw new Exception("Supplier unknown");
                        
                }
            } else {
                throw new Exception("Not local suppliers is not supported yet");
            }
                
            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            connection.setRequestMethod("GET");
            connection.setRequestProperty("Api-key", apiKey);
            
            StringBuilder response = responseToStringBuilder(connection);

            JsonObject jsonResponse = StringBuilderToJsonObject(response);
            JsonObject embedded = jsonResponse.getJsonObject("_embedded");
            JsonArray vegetableList = embedded.getJsonArray("vegetableList");

            Map<String, Integer> productQuantityMap = new HashMap<>();

            for (int i = 0; i < vegetableList.size(); i++) {
                JsonObject vegetable = vegetableList.getJsonObject(i);
                int id = vegetable.getInt("id");
                int quantity = vegetable.getInt("quantity");
                
                productQuantityMap.put(supplier+"/" + id, quantity);
            }

            connection.disconnect();

            return productQuantityMap;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private static JsonObject StringBuilderToJsonObject(StringBuilder response) {
        JsonReader jsonReader = Json.createReader(new StringReader(response.toString()));
        JsonObject jsonResponse = jsonReader.readObject();
        jsonReader.close();
        return jsonResponse;
    }

    private static StringBuilder responseToStringBuilder(HttpURLConnection connection) throws IOException {
        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();
        return response;
    }

    private static void printMap(Map<String, Integer> map) {
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            System.out.println("Key: " + entry.getKey() + ", Value: " + entry.getValue());
        }
    }

    private static List<Meal> getMealsFirebase(){
        List<Meal> meals = new ArrayList<>();
        try {
            Firestore firestore = FirestoreClient.getFirestore();
            ApiFuture<QuerySnapshot> future = firestore.collection("BundleBite").get();            
            List<QueryDocumentSnapshot> documents = future.get().getDocuments(); // Correct type here

            for (QueryDocumentSnapshot document : documents) {
                try {
                    Meal meal = new Meal();
                    
                    meal.setId(document.getId());
                    logger.info("Meal id {}", document.getId());
                    meal.setName(document.getString("name"));
                    meal.setPrice(document.getDouble("price"));
                    meal.setImagePath(document.getString("iamgePath"));

                    List<Map<String, Object>> ingredientsList = (List<Map<String, Object>>) document.get("ingredients");
                    List<Ingredient> ingredients = new ArrayList<>();

                    if (ingredientsList != null) {
                        for (Map<String, Object> ingredientMap : ingredientsList) {
                            String ingredientName = (String) ingredientMap.get("name");
                            int quantity = ((Long) ingredientMap.get("quantity")).intValue(); // Firebase stores numbers as Long
                            String link = (String) ingredientMap.get("link");

                            if (link != null && link.startsWith("/")) {
                                link = link.substring(1);
                            }    

                            Ingredient ingredient = new Ingredient(link, ingredientName, quantity); // Assuming 0 for id and price as placeholders

                            ingredients.add(ingredient);
                        }
                    }

                    meal.setIngredients(ingredients);
                    meals.add(meal);
                } catch (Exception e) {
                    System.out.println(e);
                    //logger.error("Error mapping document to Order: Document ID = {}", document.getId(), e);
                }
            }
            //logger.info("Successfully fetched and mapped {} orders.", meals.size());
        } catch (InterruptedException | ExecutionException e) {
            //logger.error("Failed to fetch orders: ", e);
            throw new RuntimeException("Failed to fetch orders", e);
        }
        return meals;
    }
}

