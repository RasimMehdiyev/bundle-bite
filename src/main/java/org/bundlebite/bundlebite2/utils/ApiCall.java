package org.bundlebite.bundlebite2.utils;

import org.bundlebite.bundlebite2.Ingredient;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ApiCall {
    private String orderRequestId;
    private List<Ingredient> ingredients;
    // logger
    private static final Logger LOGGER = LoggerFactory.getLogger(ApiCall.class);

    public ApiCall() {
    }

    public ApiCall(String orderRequestId, List<Ingredient> ingredients) {
        this.orderRequestId = orderRequestId;
        this.ingredients = ingredients;
    }

    public String getOrderRequestId() {
        return orderRequestId;
    }

    public void setOrderRequestId(String orderRequestId) {
        this.orderRequestId = orderRequestId;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public Ingredient getIngredient(int index){
        return ingredients.get(index);
    }

    public void addIngredient(Ingredient ingredient){
        ingredients.add(ingredient);
    }

    public void printIngredients(){
        for (Ingredient ingredient : ingredients){
            LOGGER.info(ingredient.getName());
        }
    }

    public void printIngredientsWithQuantity(){
        for (Ingredient ingredient : ingredients){
            LOGGER.info("{} {}", ingredient.getName(), ingredient.getQuantity());
        }
    }

    public void setQuantity(int index, int quantity){
        ingredients.get(index).setQuantity(quantity);
    }   

    public void setQuantity(String idLink, int quantity){
        for (Ingredient ingredient : ingredients){
            if (ingredient.getIdLink().equals(idLink)){
                ingredient.setQuantity(quantity);
            }
        }
    }

}
