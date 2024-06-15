package org.bundlebite.bundlebite2;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.WriteResult;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.bundlebite.bundlebite2.Order;
import java.util.concurrent.ExecutionException;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.bundlebite.bundlebite2.Meal;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.bundlebite.bundlebite2.utils.*;
import org.bundlebite.bundlebite2.utils.ApiCall;
import org.bundlebite.bundlebite2.Supplier;
import org.bundlebite.bundlebite2.utils.ordersToSuppliers.SupplierOrderRequest;


@RestController
public class OrdersController {
    private static final Logger logger = LoggerFactory.getLogger(OrdersController.class);
    private Map<String, String> supplierCache = new HashMap<>();

    @GetMapping("/api/orders")
    public List<Order> getAllOrders() {
        List<Order> orders = new ArrayList<>();
        try {
            Firestore firestore = FirestoreClient.getFirestore();
            ApiFuture<QuerySnapshot> future = firestore.collection("orders").get();            
            List<QueryDocumentSnapshot> documents = future.get().getDocuments(); // Correct type here

            for (QueryDocumentSnapshot document : documents) {
                try {
                    Order order = new Order();
                    List <DocumentReference> itemRefs = (List<DocumentReference>) document.get("items");
                    List <Meal> items = new ArrayList<>();
                    if (itemRefs != null)
                    {
                        for (DocumentReference itemRef : itemRefs) {
                            ApiFuture<DocumentSnapshot> mealFuture = itemRef.get();
                            DocumentSnapshot mealSnapshot = mealFuture.get();
                            Meal item = mealSnapshot.toObject(Meal.class);
                            items.add(item);
                        }
                    }
                    order.setUid(document.getId());
                    logger.info("Order ID: {}", document.getId());

                    DocumentReference userRef = (DocumentReference) document.get("user");
                    String userID = userRef.getId();
                    order.setUser(userID);
                    logger.info("User: {}", order.getUser());
                    
                    order.setTotalPrice(document.getDouble("totalPrice"));
                    logger.info("Total Price: {}", document.getDouble("totalPrice"));
                    
                    order.setStatus(document.getString("status"));
                    logger.info("Status: {}", document.getString("status"));
                    
                    order.setOrderDate(document.getDate("orderDate"));
                    logger.info("Order Date: {}", document.getDate("orderDate"));
                    
                    order.setItems(items);
                    logger.info("Items: {}", items);
                    
                    orders.add(order);
            
                } catch (Exception e) {
                    logger.error("Error mapping document to Order: Document ID = {}", document.getId(), e);
                }
            }
            logger.info("Successfully fetched and mapped {} orders.", orders.size());
        } catch (InterruptedException | ExecutionException e) {
            logger.error("Failed to fetch orders: ", e);
            throw new RuntimeException("Failed to fetch orders", e);
        }
        return orders;
    }

    @GetMapping("/api/orders/by-user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable String userId) {
        List<Order> orders = new ArrayList<>();
        try {
            Firestore firestore = FirestoreClient.getFirestore();
            CollectionReference ordersRef = firestore.collection("orders");

            // Assuming `user` is stored as a reference, like /users/userId
            DocumentReference userRef = firestore.document("users/" + userId);
            Query query = ordersRef.whereEqualTo("user", userRef);
            ApiFuture<QuerySnapshot> future = query.get();
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();

            for (QueryDocumentSnapshot document : documents) {
                try {
                    Order order = new Order();
                    List<DocumentReference> itemRefs = (List<DocumentReference>) document.get("items");
                    List<Meal> items = new ArrayList<>();
                    for (DocumentReference itemRef : itemRefs) {
                        ApiFuture<DocumentSnapshot> mealFuture = itemRef.get();
                        DocumentSnapshot mealSnapshot = mealFuture.get();
                        Meal item = mealSnapshot.toObject(Meal.class);
                        items.add(item);
                    }
                    order.setUid(document.getId());
                    String userID = userRef.getId();
                    order.setUser(userID);
                    order.setTotalPrice(document.getDouble("totalPrice"));
                    order.setStatus(document.getString("status"));
                    order.setOrderDate(document.getDate("orderDate"));
                    order.setItems(items);
                    orders.add(order);

                } catch (Exception e) {
                    logger.error("Error mapping document to Order: Document ID = {}", document.getId(), e);
                }
            }
            logger.info("Successfully fetched and mapped orders for user {}.", userId);
        } catch (InterruptedException | ExecutionException e) {
            logger.error("Failed to fetch orders by user: ", e);
            throw new RuntimeException("Failed to fetch orders by user", e);
        }
        return orders;
    }

    @GetMapping("/api/orders/{orderId}")
    public Order getOrderById(@PathVariable String orderId) {
        Order order = new Order();
        try {
            Firestore firestore = FirestoreClient.getFirestore();
            DocumentReference orderRef = firestore.collection("orders").document(orderId);
            ApiFuture<DocumentSnapshot> future = orderRef.get();
            DocumentSnapshot document = future.get();

            List<DocumentReference> itemRefs = (List<DocumentReference>) document.get("items");
            List<Meal> items = new ArrayList<>();
            for (DocumentReference itemRef : itemRefs) {
                ApiFuture<DocumentSnapshot> mealFuture = itemRef.get();
                DocumentSnapshot mealSnapshot = mealFuture.get();
                Meal item = mealSnapshot.toObject(Meal.class);
                items.add(item);
            }
            order.setUid(document.getId());
            DocumentReference userRef = (DocumentReference) document.get("user");
            String userID = userRef.getId();
            order.setUser(userID);
            order.setTotalPrice(document.getDouble("totalPrice"));
            order.setStatus(document.getString("status"));
            order.setOrderDate(document.getDate("orderDate"));
            order.setItems(items);
            logger.info("Successfully fetched and mapped order: {}", orderId);
        } catch (InterruptedException | ExecutionException e) {
            logger.error("Failed to fetch order: ", e);
            throw new RuntimeException("Failed to fetch order", e);
        }
        return order;
    }

    @GetMapping("/users/orders/")
    // get userId from the Bearer token and fetch orders for that user
    public List<Order> getYourOrders() {
        List<Order> orders = new ArrayList<>();
        try {
            // get current authenticated user from the token
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userId = (String) authentication.getDetails();
            logger.info("Authenticated user: {}", userId);
            Firestore firestore = FirestoreClient.getFirestore();
            DocumentReference userRef = firestore.collection("users").document(userId);
            CollectionReference ordersRef = firestore.collection("orders");
            Query query = ordersRef.whereEqualTo("user", userRef)
            .orderBy("orderDate", Query.Direction.DESCENDING);
            ApiFuture<QuerySnapshot> future = query.get();
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            logger.info("Successfully fetched orders for user {}.", userRef.getId());
            for (QueryDocumentSnapshot document : documents) {
                try {
                    Order order = new Order();
                    List<DocumentReference> itemRefs = (List<DocumentReference>) document.get("items");
                    List<Meal> items = new ArrayList<>();
                    for (DocumentReference itemRef : itemRefs) {
                        ApiFuture<DocumentSnapshot> mealFuture = itemRef.get();
                        DocumentSnapshot mealSnapshot = mealFuture.get();
                        Meal item = mealSnapshot.toObject(Meal.class);
                        items.add(item);
                    }
                    order.setUid(document.getId());
                    String userID = userRef.getId();
                    order.setUser(userID);
                    order.setTotalPrice(document.getDouble("totalPrice"));
                    order.setStatus(document.getString("status"));
                    order.setOrderDate(document.getDate("orderDate"));
                    order.setItems(items);
                    orders.add(order);
                } catch (Exception e) {
                    logger.error("Error mapping document to Order: Document ID = {}", document.getId(), e);
                }
            }
            logger.info("Successfully fetched and mapped orders for user {}.", userRef.getId());
        } catch (InterruptedException | ExecutionException e) {
            logger.error("Failed to fetch orders by user: ", e);
            throw new RuntimeException("Failed to fetch orders by user", e);
        }
        return orders;
    }
    // parameter is json object
    @PostMapping("/users/add/order")
    public String addOrder(@RequestParam Order order) {
        try {
            Firestore firestore = FirestoreClient.getFirestore();
            DocumentReference orderRef = firestore.collection("orders").document();
            order.setUid(orderRef.getId());
            ApiFuture<WriteResult> future = orderRef.set(order);
            logger.info("Order added with ID: {}", orderRef.getId());
            return "Order added with ID: " + orderRef.getId();
        } catch (Exception e) {
            logger.error("Failed to add order: ", e);
            throw new RuntimeException("Failed to add order", e);
        }
    }

    public List<Supplier> organizeIngredientsSuppliers(List<ApiCall> apiCalls, Firestore db){
        Map<String, Supplier> supplierMap = new HashMap<>();
    
        for (ApiCall apiCall : apiCalls) {
            logger.info("Processing ingredients for order: {}", apiCall);
            for (Ingredient ingredient : apiCall.getIngredients()) {
                String supplierName = extractSupplierName(ingredient.getIdLink());
                String supplierId = fetchSupplierIdByName(supplierName, db);
    
                if (supplierId != null) {
                    Supplier supplier = supplierMap.computeIfAbsent(supplierId, k -> new Supplier(supplierId, supplierName));
                    supplier.addIngredient(ingredient);
                }
            }
        }
    
        return new ArrayList<>(supplierMap.values());
    }
    
    private String extractSupplierName(String idLink) {
        String[] parts = idLink.split("/");
        if (parts.length == 2) return parts[0];
        else if (parts.length == 3) return parts[1];
        else return null;
    }
    
    private String fetchSupplierIdByName(String name, Firestore db){

        if (supplierCache.containsKey(name)) {
            return supplierCache.get(name);
        }

        Query query = db.collection("suppliers").whereEqualTo("name", name);
        logger.info("Fetching supplier with name: {}", name);
        ApiFuture<QuerySnapshot> querySnapshot = query.get();

        try {
            QuerySnapshot queryResult = querySnapshot.get();
            for (DocumentSnapshot document : queryResult.getDocuments()) {
                String supplierId = document.getId();
                supplierCache.put(name, supplierId); // Cache it
                return supplierId;
            }
        } catch (Exception e) {
            logger.error("Error while fetching the supplier from the database");
        }

        return null; // Handle cases where no supplier is found
    }

    @PostMapping("/users/order/checkout")
    public boolean receiveOrder(@RequestBody Order order)
    {

        
        Firestore db = FirestoreClient.getFirestore();
        List<ApiCall> apiCalls = processOrder(order,db);
        List<Supplier> suppliers = organizeIngredientsSuppliers(apiCalls, db);
        FinaApiCall finalApiCall = new FinaApiCall();
        finalApiCall.setOrderRequestId(order.getUid());
        finalApiCall.setApiKey("rasimrasim14");
        finalApiCall.setSuppliers(suppliers);
        Map<String, SupplierOrderRequest> supplierOrderRequests = new HashMap<>();
        boolean result = false;
        try{
           supplierOrderRequests = finalApiCall.convertToSupplierOrderRequests();
           result = finalApiCall.sendOrdersWithRollback(true, supplierOrderRequests, "BundleBite");
        } catch (Exception e){
            logger.error("Error while converting FinaApiCall to SupplierOrderRequest: {}", e.getMessage());
        }
        
        return result;
    }

    public List<ApiCall> prepareApiCall(Order order,Firestore db){
        List<ApiCall> apiCalls = new ArrayList<>();

        for (Meal item: order.getItems()){
            logger.info("Processing item: {}", item.getName());
            ApiCall apiCall = new ApiCall();
            apiCall.setOrderRequestId(order.getUid());
            List<Ingredient> ingredients = new ArrayList<>();

            // find ingredients for the meal from firestore by meal name
            Query query = db.collection("BundleBite").whereEqualTo("name", item.getName());
            ApiFuture<QuerySnapshot> querySnapshot = query.get();
            try{
                QuerySnapshot queryResult = querySnapshot.get();
                for (DocumentSnapshot document : queryResult.getDocuments()) {
                    Meal meal = document.toObject(Meal.class);
                    ingredients = meal.getIngredients();
                }
            } catch (Exception e) {
                logger.error("Error while fetching the meal from the database");
            }
            logger.info("Ingredients for item: {}", ingredients);
            
            for (Ingredient ingredient : ingredients){
                ingredient.setQuantity(ingredient.getQuantity() * item.getQuantity());
            }

            apiCall.setIngredients(ingredients);
            apiCalls.add(apiCall);
        }
        return apiCalls;
    }

    private List<ApiCall> processOrder(Order order,Firestore db){
        List<ApiCall> apiCalls = prepareApiCall(order,db);
        for (ApiCall apiCall : apiCalls){
            logger.info("Order ID: {}", apiCall.getOrderRequestId());
            apiCall.printIngredientsWithQuantity();
        }
        return apiCalls;
    }
    
}