package org.bundlebite.bundlebite2;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.stereotype.Component;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;
import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.HashMap;
import com.google.firebase.auth.FirebaseAuthException;
import java.util.Map;
import java.io.ByteArrayInputStream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import io.github.cdimascio.dotenv.Dotenv;
import java.util.List;

@Component
public class FirebaseInit {
    private static final Logger logger = LoggerFactory.getLogger(FirebaseInit.class);
    @PostConstruct
    public void initialize() {
        Dotenv dotenv = Dotenv.load();
        String json = dotenv.get("FIREBASE_CREDENTIALS_BASE64");
        byte[] decodedJson = java.util.Base64.getDecoder().decode(json);
        String databaseURL = dotenv.get("DATABASE_URL");
        ByteArrayInputStream serviceAccountStream = new ByteArrayInputStream(decodedJson);


        try {
            logger.info("Initializing Firebase...");

            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccountStream))
                    .setDatabaseUrl("https://bundle-bite.europe-west1.firebaseio.com")
                    .build();

            FirebaseApp.initializeApp(options);
            // Attempt to perform Firebase Auth operations
            try {
                FirebaseAuth auth = FirebaseAuth.getInstance();
                UserRecord user = auth.getUserByEmail("rasim_manager@gmail.com");
                String successMessage = "Successfully set custom claims for: {}";
                logger.info(successMessage, user.getEmail());

                Map<String, Object> claims = new HashMap<>();
                claims.put("role", "manager");
                auth.setCustomUserClaims(user.getUid(), claims);
                logger.info(successMessage, user.getEmail());
                


                // Refresh user details to print updated custom claims
                user = auth.getUserByEmail("rasim_manager@gmail.com");
                logger.info("Custom claims after update: {}", user.getCustomClaims());
            } catch (FirebaseAuthException fae) {
            logger.error("Firebase Auth Exception: {}", fae.getMessage());
        }

        } catch (IOException e) {
            logger.error("IO Exception during Firebase initialization: {}", e.getMessage());        
        }
    }

    public static void setCustomerClaimsToUndefined(List<User> users){
        try {
            FirebaseAuth auth = FirebaseAuth.getInstance();
            for (User user : users) {
                UserRecord userRecord = auth.getUserByEmail(user.getEmail());
                Map<String, Object> claims = new HashMap<>();
                claims.put("role", "customer");
                auth.setCustomUserClaims(userRecord.getUid(), claims);
                logger.info("Successfully set custom claims for: {}", user.getEmail());
            }
        } catch (FirebaseAuthException fae) {
            logger.error("Firebase Auth Exception: {}", fae.getMessage());
        }
    }  

    public static void setCustomerRole(String userId){
        try {
            FirebaseAuth auth = FirebaseAuth.getInstance();
            UserRecord userRecord = auth.getUser(userId);
            Map<String, Object> claims = new HashMap<>();
            claims.put("role", "customer");
            auth.setCustomUserClaims(userRecord.getUid(), claims);
            logger.info("Successfully set custom claims for: {}", userRecord.getEmail());
        } catch (FirebaseAuthException fae) {
            logger.error("Firebase Auth Exception: {}", fae.getMessage());
        }
    } 
    public static void setUserName(String userId, String name){
        try {
            FirebaseAuth auth = FirebaseAuth.getInstance();
            UserRecord userRecord = auth.getUser(userId);
            Map<String, Object> claims = new HashMap<>();
            claims.put("displayName", name);
            auth.setCustomUserClaims(userRecord.getUid(), claims);
            logger.info("Successfully set custom claims for: {}", userRecord.getEmail());
        } catch (FirebaseAuthException fae) {
            logger.error("Firebase Auth Exception: {}", fae.getMessage());
        }
    }
}
