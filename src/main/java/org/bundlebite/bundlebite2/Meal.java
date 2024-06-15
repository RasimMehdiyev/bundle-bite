package org.bundlebite.bundlebite2;
import java.util.List;

import com.google.firebase.database.PropertyName;

public class Meal{
    private String name;
    private String id;
    private double price;
    private int quantity;
    private List<Ingredient> ingredients;
    private boolean availability;
    private String imagePath;

    public Meal() {
    }

    public Meal(String name, String id, double price, int quantity, String imagePath, List<Ingredient> ingredients, boolean availability) {
        this.name = name;
        this.id = id;
        this.price = price;
        this.quantity = quantity;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
        this.availability = availability;
    }



    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setAvailability(boolean availability) {
        this.availability = availability;
    }

    public boolean getAvailability(){
        return availability;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public void addIngredient(Ingredient ing){
        ingredients.add(ing);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
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