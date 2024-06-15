package org.bundlebite.bundlebite2;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
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

public class CartController {
    
    private static final Logger logger = LoggerFactory.getLogger(CartController.class);

    public CartController() {
    }

    @GetMapping("/users/cart")
    public Cart getYourCart() {
        Cart cart = new Cart();
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userId = (String) authentication.getDetails();
            logger.info("Authenticated user: {}", userId);
            Firestore db = FirestoreClient.getFirestore();
            DocumentReference userRef = db.collection("users").document(userId);
            CollectionReference ordersRef = db.collection("carts");
            Query query = ordersRef.whereEqualTo("user", userRef);

            ApiFuture<QuerySnapshot> querySnapshot = query.get();
            for (DocumentSnapshot document : querySnapshot.get().getDocuments()) {
                cart = document.toObject(Cart.class);
                cart.setUid(document.getId());
            }
            

            return cart;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new Cart();
    }
}
