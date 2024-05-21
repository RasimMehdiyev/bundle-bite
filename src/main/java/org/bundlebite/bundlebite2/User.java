package org.bundlebite.bundlebite2;

public class User {

    private String email;
    private String role;
    private String uid;
    private String name;

    public User() {
    }

    public User(String email, String role) {
        this.email = email;
        this.role = role;
        this.name = "";
        this.uid = "";
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isManager() {
        return this.role != null && this.role.equals("manager");
    }

    public boolean isCustomer() {
        return this.role != null && this.role.equals("customer");
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String toString() {
        return "User: " + this.email + " Role: " + this.role;
    }

    public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }
        if (!(obj instanceof User)) {
            return false;
        }
        User user = (User) obj;
        return user.getEmail().equals(this.email) && user.getRole().equals(this.role);
    }

    public int hashCode() {
        return this.email.hashCode() + this.role.hashCode();
    }


}
