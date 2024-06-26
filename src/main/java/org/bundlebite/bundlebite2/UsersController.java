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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import org.springframework.security.access.prepost.PreAuthorize;
import org.bundlebite.bundlebite2.FirebaseInit;
import org.bundlebite.bundlebite2.User;

@RestController
public class UsersController{
    private static final Logger logger = LoggerFactory.getLogger(UsersController.class);

    @GetMapping("/api/users")
    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        List<User> undefinedRoleUsers = new ArrayList<>();
        try {
            Firestore firestore = FirestoreClient.getFirestore();
            ApiFuture<QuerySnapshot> future = firestore.collection("users").get();            
            List<QueryDocumentSnapshot> documents = future.get().getDocuments(); // Correct type here

            for (QueryDocumentSnapshot document : documents) {
                try {
                    User user = new User();
                    user.setEmail(document.getString("email"));
                    logger.info("Email: {}", document.getString("email"));
                    user.setRole(document.getString("role"));
                    logger.info("Role: {}", document.getString("role"));
                    user.setUid(document.getId());
                    logger.info("User ID: {}", document.getId());
                    user.setName(document.getString("name"));
                    logger.info("Name: {}", document.getString("name"));

                    users.add(user);
                    if (user.getRole() == null) {
                        undefinedRoleUsers.add(user);
                    }
                } catch (Exception e) {
                    logger.error(e.getMessage());
                }
            }
            // if (undefinedRoleUsers.size() > 0)
            //     FirebaseInit.setCustomerClaimsToUndefined(undefinedRoleUsers);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return users;
    }

    @GetMapping("/api/customers")
    public List<User> getAllCustomers() {
        List<User> users = new ArrayList<>();
        List<User> undefinedRoleUsers = new ArrayList<>();
        try {
            Firestore firestore = FirestoreClient.getFirestore();
            ApiFuture<QuerySnapshot> future = firestore.collection("users").get();
            List<QueryDocumentSnapshot> documents = future.get().getDocuments(); // Correct type here

            for (QueryDocumentSnapshot document : documents) {
                try {
                    User user = new User();
                    user.setEmail(document.getString("email"));
                    logger.info("Email: {}", document.getString("email"));
                    user.setRole(document.getString("role"));
                    logger.info("Role: {}", document.getString("role"));
                    user.setUid(document.getId());
                    logger.info("User ID: {}", document.getId());
                    user.setName(document.getString("name"));
                    logger.info("Name: {}", document.getString("name"));

                    if (user.getRole()!="manager") {
                        users.add(user);
                    }


                    if (user.getRole() == null) {
                        undefinedRoleUsers.add(user);
                    }
                } catch (Exception e) {
                    logger.error(e.getMessage());
                }
            }
            // if (undefinedRoleUsers.size() > 0)
            //     FirebaseInit.setCustomerClaimsToUndefined(undefinedRoleUsers);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return users;
    }

    @GetMapping("/api/customers/{id}")
    public User getUserById(@PathVariable  String id) {
        User user = new User();
        try {
            Firestore firestore = FirestoreClient.getFirestore();
            DocumentReference docRef = firestore.collection("users").document(id);
            logger.info("User ID: {}", id);
            ApiFuture<DocumentSnapshot> future = docRef.get();
            DocumentSnapshot document = future.get();
            logger.info("Document: {}", document);
            if (document.exists()) {

                user.setEmail(document.getString("email"));
                user.setRole(document.getString("role"));
                user.setUid(id);
                user.setName(document.getString("name"));

            }
        } catch (Exception e) {
            logger.error(e.getMessage());
        }
        return user;
    }

    @PostMapping("/users/setClaims/")
    @PreAuthorize("isAuthenticated()")
    public String updateUser(@RequestBody User user) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String userId = authentication.getName();  // Assuming userId is stored as the principal's name
            logger.info("Authenticated user: {}", userId);
            logger.info("User: {}", user.getName());  // Now using getName() method

            // Assume FirebaseInit.setUserName and FirebaseInit.setCustomerRole methods exist
            FirebaseInit.setUserName(userId, user.getName());
            if (user.getRole() != null) {
                FirebaseInit.setCustomerRole(userId);
            }
        } catch(Exception e) {
            logger.error("Failed to set user claims: " + e.getMessage());
            return "Failed to update user!";
        }

        return "User updated successfully!";
    }
}