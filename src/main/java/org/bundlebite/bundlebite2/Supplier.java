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

    public void addIngredient(Ingredient ingredient) {
        this.ingredients.add(ingredient);
    }
}
