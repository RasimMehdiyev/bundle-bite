package org.bundlebite.bundlebite2;

import java.util.Date;
import java.util.List;


public class Cart {
    private String uid;
    private String user;
    private double totalPrice;
    private String status;
    private Date orderDate;
    private List <String> items;


    public Cart() {
    }

    public Cart(String uid, String user, double totalPrice, String status, Date orderDate, List<String> items) {
        this.uid = uid;
        this.user = user;
        this.totalPrice = totalPrice;
        this.status = status;
        this.orderDate = orderDate;
        this.items = items;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
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

    public List<String> getItems() {
        return items;
    }

    public void setItems(List<String> items) {
        this.items = items;
    }

    
}
