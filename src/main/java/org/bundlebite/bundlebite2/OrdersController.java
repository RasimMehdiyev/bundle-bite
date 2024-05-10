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
// logger
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.bundlebite.bundlebite2.Meal;

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
                    order.setUser(document.get("user"));
                    logger.info("User: {}", document.get("user"));
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
}