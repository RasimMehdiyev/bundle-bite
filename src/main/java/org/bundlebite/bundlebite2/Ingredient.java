package org.bundlebite.bundlebite2;

import java.util.HashMap;
import java.util.Map;

import com.google.cloud.firestore.annotation.PropertyName;

public class Ingredient {
    private String name;
    private String idLink;
    private double price;
    private int quantity;
    private int id;
    private String ref;


    public Ingredient()
    {

    }
    public Ingredient(String idLink, String name, int quantity){
        this.idLink = idLink;
        this.name = name;
        this.quantity = quantity;
    }

    public int getId(){
        return id;
    }

    public void setId(int id){
        this.id = id;
    }

    public String getRef(){
        return ref;
    }

    public void setRef(String ref){
        this.ref = ref;
    }

    @PropertyName("link")
    public String getIdLink() {
        return idLink;
    }

    @PropertyName("link")
    public void setIdLink(String idLink) {
        this.idLink = idLink;
    }

    public Map<String, Integer> turnToMap(){
        Map<String, Integer> map = new HashMap<>();
        map.put(idLink, quantity);
        return map;
    }


    // Getter for name
    public String getName() {
        return name;
    }

    // Setter for name
    public void setName(String name) {
        this.name = name;
    }


    // Getter for price
    public double getPrice() {
        return price;
    }

    // Setter for price
    public void setPrice(double price) {
        this.price = price;
    }

    // Getter for quantity
    public int getQuantity() {
        return quantity;
    }

    // Setter for quantity
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    // Override equals method
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Ingredient that = (Ingredient) obj;
        return idLink.equals(that.idLink);
    }

    // Override hashCode method
    @Override
    public int hashCode() {
        int result = name.hashCode();
        result = 31 * result;
        return result;
    }
}
