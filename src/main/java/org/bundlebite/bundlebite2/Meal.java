package org.bundlebite.bundlebite2;
import com.google.firebase.database.PropertyName;

public class Meal{
    private String name;
    private int id;
    private double price;
    private int quantity;

    public Meal() {
    }

    public Meal(String name, int id, double price, int quantity) {
        this.name = name;
        this.id = id;
        this.price = price;
        this.quantity = quantity;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @PropertyName("price")
    public double getPrice() {
        return price;
    }
    @PropertyName("price")
    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }


}