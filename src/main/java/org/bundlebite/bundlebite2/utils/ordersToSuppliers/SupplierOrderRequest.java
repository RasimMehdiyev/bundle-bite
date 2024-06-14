package org.bundlebite.bundlebite2.utils.ordersToSuppliers;

import java.util.List;

public class SupplierOrderRequest {
    private String orderRequestId;
    private List<SupplierOrderItem> orders;

    // Getters and setters
    public SupplierOrderRequest(){

    }

    public SupplierOrderRequest(String orderRequestId, List<SupplierOrderItem> orders){
        this.orderRequestId = orderRequestId;
        this.orders = orders;
    }

    public String getOrderRequestId() {
        return orderRequestId;
    }

    public void setOrderRequestId(String orderRequestId) {
        this.orderRequestId = orderRequestId;
    }

    public List<SupplierOrderItem> getOrders() {
        return orders;
    }

    public void setOrders(List<SupplierOrderItem> orders) {
        this.orders = orders;
    }
}

