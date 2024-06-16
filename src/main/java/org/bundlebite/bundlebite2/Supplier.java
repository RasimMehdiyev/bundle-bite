package org.bundlebite.bundlebite2;

import java.util.ArrayList;
import java.util.List;

public class Supplier {
    private String id;
    private String linkroot;
    private List<Ingredient> ingredients;

    public Supplier(String id, String linkroot) {
        this.id = id;
        this.linkroot = linkroot;
        this.ingredients = new ArrayList<>();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLinkroot() {
        return linkroot;
    }

    public void setLinkroot(String linkroot) {
        this.linkroot = linkroot;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public void addIngredient(Ingredient newIngredient) {
        // Check if the ingredient already exists in the list
        boolean found = false;
        for (Ingredient ingredient : ingredients) {
            if (ingredient.getIdLink().equals(newIngredient.getIdLink())) {
                // If found, add the quantity of the new ingredient to the existing one
                ingredient.setQuantity(ingredient.getQuantity() + newIngredient.getQuantity());
                found = true;
                break;
            }
        }
        // If not found, add the new ingredient to the list
        if (!found) {
            this.ingredients.add(newIngredient);
        }
    }
}
