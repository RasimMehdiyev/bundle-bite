package org.bundlebite.bundlebite2;
import java.util.Date;
import java.util.List;
import org.bundlebite.bundlebite2.Meal;


public class Order {
    private String uid;
    private Object user;
    private double totalPrice;
    private String status;
    private Date orderDate;
    private List <Meal> items;


    public Order() {

    }

    // Constructor
    public Order(String uid, double totalPrice, String status, Date orderDate, List <Meal> items, Object user) {
        this.uid = uid;
        this.user = user;
        this.totalPrice = totalPrice;
        this.status = status;
        this.orderDate = orderDate;
        this.items = items;
    }

    // Getters and Setters
    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public Object getUser() {
        return user;
    }

    public void setUser(Object userID) {
        this.user = user;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public List <Meal> getItems() {
        return items;
    }

    public void setItems(List <Meal> items) {
        this.items = items;
    }


}