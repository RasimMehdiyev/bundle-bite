package org.bundlebite.bundlebite2.utils;
import org.bundlebite.bundlebite2.Ingredient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.bundlebite.bundlebite2.Meal;
import org.bundlebite.bundlebite2.Order;

public class ApiCallController {

    // LOGGER
    private static final Logger LOGGER = LoggerFactory.getLogger(ApiCallController.class);

    // public List<ApiCall> prepareApiCall(Order order){
    //     Firestore db = FirestoreClient.getFirestore();
    //     List<ApiCall> apiCalls = new ArrayList<>();
    //     for (Meal item: order.getItems()){
    //         ApiCall apiCall = new ApiCall();
    //         apiCall.setOrderRequestId(order.getUid());
    //         List<Ingredient> ingredients = new ArrayList<>();
    //         for (Ingredient mealIngredient : item.getIngredients()) {
    //             Query query = db.collection("Ingredients").whereEqualTo("name", mealIngredient.getName());
    //             ApiFuture<QuerySnapshot> querySnapshot = query.get();
    //             try{
    //                 QuerySnapshot queryResult = querySnapshot.get();
    //                 for (DocumentSnapshot document : queryResult.getDocuments()) {
    //                     Ingredient ingredient = document.toObject(Ingredient.class);
    //                     if (ingredient.getQuantity() < mealIngredient.getQuantity()) {
    //                         LOGGER.info("Ingredient {} is not available in the inventory", ingredient.getName());
    //                     } else {
    //                         ingredient.setQuantity(mealIngredient.getQuantity());
    //                         ingredients.add(ingredient);
    //                     }
    //                 }
    //             } catch (Exception e) {
    //                 LOGGER.error("Error while fetching the ingredients from the database");
    //             }
    //         }
    //         apiCall.setIngredients(ingredients);
    //         apiCalls.add(apiCall);
    //     }
    //     return apiCalls;
    // }

    public static void printIngredients(ApiCall apiCall){
        apiCall.printIngredients();
    }

    public static void addIngredient(ApiCall apiCall, Ingredient ingredient){
        apiCall.addIngredient(ingredient);
    }

    @PostMapping("/api/supplier/")
    public static void checkIngredientsAndQuantity(@RequestParam Order order){
        // get the ingredients and quantity from the order
        ApiCall apiCall = new ApiCall();
        
        for(Meal meal : order.getItems()){
            // get ingredients and quantity from the meal

            
        }

        // check if the ingredients are available in the inventory
        // if available, send the response to the broker
        // if not available, send the response to the broker
        
    }

    
}
