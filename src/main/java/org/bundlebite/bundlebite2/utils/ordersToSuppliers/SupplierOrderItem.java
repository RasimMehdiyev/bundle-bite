package org.bundlebite.bundlebite2.utils.ordersToSuppliers;

public class SupplierOrderItem {
    private int id;
    private int quantity;

    public SupplierOrderItem(){
        
    }

    public SupplierOrderItem(int id, int quantity){
        this.id = id;
        this.quantity = quantity;
    }
    // Getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
