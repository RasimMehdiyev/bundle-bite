package org.bundlebite.bundlebite2;

import java.util.ArrayList;
import java.util.List;
//import src/main/java/org/bundlebite/bundlebite2/Order.java;

//import Order from ;

public class Delivery {
    private List<Order> orders;
    private List<Supplier> suppliers;

    public Delivery() {
        this.orders = new ArrayList<>();
        this.suppliers = new ArrayList<>();
    }

    public void addOrder(Order order) {
        orders.add(order);
        System.out.println("Order added: " + order);
    }

    public void addSupplier(Supplier supplier) {
        suppliers.add(supplier);
        System.out.println("Supplier added: " + supplier);
    }

    public void assignOrderToSupplier(String orderId, String supplierId) {
        Order order = findOrderById(orderId);
        Supplier supplier = findSupplierById(supplierId);
        if (order != null && supplier != null) {
            supplier.acceptOrder(order);
        }
    }

    public void updateOrderStatus(String orderId, String supplierId, String status) {
        Order order = findOrderById(orderId);
        Supplier supplier = findSupplierById(supplierId);
        if (order != null && supplier != null) {
            supplier.updateOrderProgress(order, status);
        }
    }

    public void deliverOrder(String orderId, String supplierId) {
        Order order = findOrderById(orderId);
        Supplier supplier = findSupplierById(supplierId);
        if (order != null && supplier != null) {
            supplier.deliverOrder(order);
        }
    }

    private Order findOrderById(String orderId) {
        for (Order order : orders) {
            if (order.getUid().equals(orderId)) {
                return order;
            }
        }
        System.out.println("Order not found: " + orderId);
        return null;
    }

    private Supplier findSupplierById(String supplierId) {
        for (Supplier supplier : suppliers) {
            if (supplier.getSupplierId().equals(supplierId)) {
                return supplier;
            }
        }
        System.out.println("Supplier not found: " + supplierId);
        return null;
    }
}