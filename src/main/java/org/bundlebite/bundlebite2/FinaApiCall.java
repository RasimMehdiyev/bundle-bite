package org.bundlebite.bundlebite2;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.bundlebite.bundlebite2.Supplier;


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

}
