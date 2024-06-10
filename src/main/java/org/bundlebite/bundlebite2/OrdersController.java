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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import org.bundlebite.bundlebite2.Order;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.bundlebite.bundlebite2.Meal;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


@RestController
public class OrdersController {
    private static final Logger logger = LoggerFactory.getLogger(OrdersController.class);

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
                    // DocumentReference userRef = (DocumentReference) document.get("user");
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
}