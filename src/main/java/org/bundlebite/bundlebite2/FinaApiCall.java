package org.bundlebite.bundlebite2;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.bundlebite.bundlebite2.Supplier;
import org.bundlebite.bundlebite2.utils.SupplierApiStringBuilder;
import org.bundlebite.bundlebite2.utils.SupplierHttpClientUtil;
import org.bundlebite.bundlebite2.utils.ordersToSuppliers.SupplierOrderItem;
import org.bundlebite.bundlebite2.utils.ordersToSuppliers.SupplierOrderRequest;


public class FinaApiCall {
    private String orderRequestId;
    private List<Supplier> suppliers;
    private static final Logger LOGGER = LoggerFactory.getLogger(FinaApiCall.class);
    private String apiKey;

    public FinaApiCall() {
    }

    public FinaApiCall(String orderRequestId, List<Supplier> suppliers, String apiKey) {
        this.orderRequestId = orderRequestId;
        this.apiKey = apiKey;
        this.suppliers = suppliers;
    }

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }

    public String getOrderRequestId() {
        return orderRequestId;
    }
    

    public void setOrderRequestId(String orderRequestId) {
        this.orderRequestId = orderRequestId;
    }

    public List<Supplier> getSuppliers() {
        return suppliers;
    }

    public void setSuppliers(List<Supplier> suppliers) {
        this.suppliers = suppliers;
    }

    public Map<String, SupplierOrderRequest> convertToSupplierOrderRequests() throws Exception{
        Map<String, SupplierOrderRequest> orderRequestMap = new HashMap<>();

        for (Supplier supplier : suppliers) {
            List<SupplierOrderItem> orderItems = new ArrayList<>();

            for (Ingredient ingredient : supplier.getIngredients()) {
                SupplierOrderItem orderItem = new SupplierOrderItem();
                orderItem.setQuantity(ingredient.getQuantity());

                // Extract the integer id from the idLink string
                String idLink = ingredient.getIdLink();
                Matcher matcher = Pattern.compile("\\d+$").matcher(idLink);
                if (matcher.find()) {
                    int id = Integer.parseInt(matcher.group());
                    orderItem.setId(id);
                } else {
                    LOGGER.error("Invalid idLink format: " + idLink);
                    throw new Exception("Invalid idLink format when converting FinaApiCall to SupplierOrderRequest");                    
                }

                orderItems.add(orderItem);
            }

            SupplierOrderRequest orderRequest = new SupplierOrderRequest();
            orderRequest.setOrderRequestId(this.orderRequestId);
            orderRequest.setOrders(orderItems);

            orderRequestMap.put(supplier.getLinkroot(), orderRequest);
        }

        return orderRequestMap;
    }

    public static boolean sendOrdersWithRollback(boolean isLocal, Map<String, SupplierOrderRequest> orderRequestMap, String brokerHeader) {        
        
        List<String> successfulOrders = new ArrayList<>();

        try {
            for (Map.Entry<String, SupplierOrderRequest> entry : orderRequestMap.entrySet()) {
                String linkroot = entry.getKey();
                SupplierOrderRequest orderRequest = entry.getValue();
                SupplierApiStringBuilder sasb = new SupplierApiStringBuilder(isLocal, SupplierApiStringBuilder.LinkRoot.fromValue(linkroot));
                String orderApiUrl = sasb.buildOrderApiUrl();

                try {
                    String response = SupplierHttpClientUtil.postRequest(orderApiUrl, orderRequest, brokerHeader);
                    LOGGER.info("Order successful for linkroot: " + linkroot + " Response: " + response);
                    System.out.println("Order successful for linkroot: " + linkroot + " Response: " + response);
                    successfulOrders.add(linkroot);
                } catch (Exception e) {
                    LOGGER.error("Order failed for linkroot: " + linkroot + " Error: " + e.getMessage());
                    rollbackOrders(isLocal, successfulOrders, brokerHeader, orderRequestMap);
                    throw new RuntimeException("Order process failed, rolled back successful orders.");                    
                }
            }
            return true;
        } catch (Exception e) {
            LOGGER.error("Failed to send orders with rollback: " + e.getMessage());
            System.out.println(e);
            return false;
        }
    }

    private static void rollbackOrders(boolean isLocal, List<String> successfulOrders, String brokerHeader, Map<String, SupplierOrderRequest> orderRequestMap) {
        for (String linkroot : successfulOrders) {
            try {
                String orderRequestId = orderRequestMap.get(linkroot).getOrderRequestId();
                SupplierApiStringBuilder sasb = new SupplierApiStringBuilder(isLocal, SupplierApiStringBuilder.LinkRoot.fromValue(linkroot));
                String removeOrderApiUrl = sasb.buildRemoveOrderApiUrl(orderRequestId);
                SupplierHttpClientUtil.getRequest(removeOrderApiUrl, brokerHeader);

                LOGGER.info("Rollback successful for linkroot: " + linkroot);
                System.out.println("Rollback successful for linkroot: " + linkroot);
            } catch (Exception e) {
                LOGGER.error("Rollback failed for linkroot: " + linkroot + " Error: " + e.getMessage());
                System.out.println("Rollback successful for linkroot: " + linkroot);
            }
        }
    }

    public static void main(String[] args) {
        testConversion();
    }

    private static void testConversion(){
        Ingredient rice = new Ingredient("/generalstore/0", "rice", 2);
        Ingredient pasta = new Ingredient("generalstore/3", "pasta", 2);
        Ingredient vodka = new Ingredient("generalstore/2", "vodka", 4);

        // Ingredients for vegetables
        Ingredient chestnut = new Ingredient("/vegetables/8", "chestnut", 2);

        // Ingredients for animalprods
        Ingredient beef = new Ingredient("/animalprods/0", "beef", 4);

        // Suppliers
        Supplier generalstore = new Supplier("ukLe59IS0IIs0eA2cWQJ", "generalstore");
        generalstore.addIngredient(rice);
        generalstore.addIngredient(pasta);
        generalstore.addIngredient(vodka);

        Supplier vegetables = new Supplier("FGKVJudtYK1j2y6Gndt3", "vegetables");
        vegetables.addIngredient(chestnut);

        Supplier animalprods = new Supplier("uwJ20p5WEOQPHlKmrFd1", "animalprods");
        animalprods.addIngredient(beef);

        // List of suppliers
        List<Supplier> suppliers = new ArrayList<>();
        suppliers.add(generalstore);
        suppliers.add(vegetables);
        suppliers.add(animalprods);

        // FinaApiCall object
        FinaApiCall apiCall = new FinaApiCall("025781975", suppliers, "rasimrasim14");

        // Output the details
        System.out.println("Order Request ID: " + apiCall.getOrderRequestId());
        for (Supplier supplier : apiCall.getSuppliers()) {
            System.out.println("Supplier ID: " + supplier.getId());
            System.out.println("Linkroot: " + supplier.getLinkroot());
            for (Ingredient ingredient : supplier.getIngredients()) {
                System.out.println("  Ingredient: " + ingredient.getName());
                System.out.println("  ID Link: " + ingredient.getIdLink());
                System.out.println("  Quantity: " + ingredient.getQuantity());
            }
        }
        try {
            Map<String, SupplierOrderRequest> map = apiCall.convertToSupplierOrderRequests();
            System.out.println("Put debug red button in this line then look at check variable map");
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println(e);
        }
        
    }

    private static void getAcidOrders() {
        // Initialize parameters
        String brokerHeader = "exampleBroker";

        // Create some example SupplierOrderRequest instances
        List<SupplierOrderItem> orderItemsAnimal = new ArrayList<>();
        orderItemsAnimal.add(new SupplierOrderItem(3, 5)); // Example order item
        orderItemsAnimal.add(new SupplierOrderItem(4, 2)); 

        List<SupplierOrderItem> orderItemsVeg = new ArrayList<>();
        orderItemsVeg.add(new SupplierOrderItem(2, 5)); // Example order item
        orderItemsVeg.add(new SupplierOrderItem(4, 2)); 

        List<SupplierOrderItem> orderItemsGeneral = new ArrayList<>();
        orderItemsGeneral.add(new SupplierOrderItem(3, 5)); // Example order item
        orderItemsGeneral.add(new SupplierOrderItem(4, 2)); 


        SupplierOrderRequest animalprodsOrderRequest = new SupplierOrderRequest("bbb", orderItemsAnimal);
        SupplierOrderRequest vegetablesOrderRequest = new SupplierOrderRequest("bbb", orderItemsVeg);
        SupplierOrderRequest generalstoreOrderRequest = new SupplierOrderRequest("bbb", orderItemsGeneral);

        // Populate the orderRequestMap
        Map<String, SupplierOrderRequest> orderRequestMap = new HashMap<>();
        orderRequestMap.put("animalprods", animalprodsOrderRequest);
        orderRequestMap.put("vegetables", vegetablesOrderRequest);
        orderRequestMap.put("generalstore", generalstoreOrderRequest);

        // Invoke the sendOrdersWithRollback method
        boolean acidOrders = sendOrdersWithRollback(true, orderRequestMap, brokerHeader);
        System.out.println(acidOrders);
    }

}
