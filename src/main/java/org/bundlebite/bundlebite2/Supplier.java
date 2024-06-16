package org.bundlebite.bundlebite2;

public class Supplier {
    private String supplierId;
    private String supplierName;

    public Supplier(String supplierId, String supplierName) {
        this.supplierId = supplierId;
        this.supplierName = supplierName;
    }

    public String getSupplierId() {
        return supplierId;
    }

    public String getSupplierName() {
        return supplierName;
    }

    public void acceptOrder(Order order) {
        order.setStatus("Accepted by " + supplierName);
        System.out.println("Order " + order.getUid() + " accepted by " + supplierName);
    }

    public void updateOrderProgress(Order order, String status) {
        order.setStatus(status);
        System.out.println("Order " + order.getUid() + " status updated to: " + status);
    }

    public void deliverOrder(Order order) {
        order.setStatus("Delivered");
        System.out.println("Order " + order.getUid() + " has been delivered.");
    }

    @Override
    public String toString() {
        return "Supplier{" +
                "supplierId='" + supplierId + '\'' +
                ", supplierName='" + supplierName + '\'' +
                '}';
    }
}
