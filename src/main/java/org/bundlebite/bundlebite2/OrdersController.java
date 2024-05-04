import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentSnapshot;
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

@RestController
@RequestMapping("/api/orders")
public class OrdersController {

    @GetMapping
    public List<Order> getAllOrders() throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();
        CollectionReference ordersCollection = firestore.collection("orders");

        Query query = ordersCollection.orderBy("timestamp"); // Change "timestamp" to your actual field name

        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        List<QueryDocumentSnapshot> documents = querySnapshot.get().getDocuments();

        List<Order> orders = new ArrayList<>();
        for (DocumentSnapshot document : documents) {
            Order order = document.toObject(Order.class);
            orders.add(order);
        }

        return orders;
    }
}