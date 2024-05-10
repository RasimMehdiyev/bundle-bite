package org.bundlebite.bundlebite2;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.stereotype.Component;
// firebase admin sdk
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import com.google.firebase.auth.FirebaseAuthException;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Component
public class FirebaseInit {
    private static final Logger logger = LoggerFactory.getLogger(FirebaseInit.class);
    @PostConstruct
    public void initialize() {
        try {
            logger.info("Initializing Firebase...");
            InputStream serviceAccount = this.getClass().getClassLoader().getResourceAsStream("./bundle-bite-firebase-adminsdk-sz26n-016d7718b6.json");

            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl("https://bundle-bite.europe-west1.firebaseio.com")
                    .build();

            FirebaseApp.initializeApp(options);
            // Attempt to perform Firebase Auth operations
            try {
                FirebaseAuth auth = FirebaseAuth.getInstance();
                UserRecord user = auth.getUserByEmail("rasim_manager@gmail.com");
                System.out.println("Successfully fetched user data: " + user.getEmail());

                Map<String, Object> claims = new HashMap<>();
                claims.put("role", "manager");
                auth.setCustomUserClaims(user.getUid(), claims);
                logger.info("Successfully set custom claims for: {}", user.getEmail());

                // Refresh user details to print updated custom claims
                user = auth.getUserByEmail("rasim_manager@gmail.com");
                System.out.println("Custom claims after update: " + user.getCustomClaims());
            } catch (FirebaseAuthException fae) {
            logger.error("Firebase Auth Exception: {}", fae.getMessage());
        }

        } catch (IOException e) {
            logger.error("IO Exception during Firebase initialization: {}", e.getMessage());        
        }
    }
}
