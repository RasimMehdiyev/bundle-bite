package org.bundlebite.bundlebite2.utils;

public class SupplierApiStringBuilder {

    private static final String LOCAL_HOST = "localhost";
    private static final String ORDER_EXTENSION = "/order";
    private static final String REMOVE_ORDER_EXTENSION = "/removeOrder";

    private String host;
    private LinkRoot linkroot;
    private int port;

    public enum LinkRoot {
        ANIMALPRODS("animalprods"),
        VEGETABLES("vegetables"),
        GENERALSTORE("generalstore");

        private final String value;

        LinkRoot(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }

        public static LinkRoot fromValue(String value) {
            for (LinkRoot linkRoot : LinkRoot.values()) {
                if (linkRoot.getValue().equalsIgnoreCase(value)) {
                    return linkRoot;
                }
            }
            throw new IllegalArgumentException("Invalid linkroot: " + value);
        }
    }

    public SupplierApiStringBuilder(boolean isLocal, LinkRoot linkroot) {
        this.linkroot = linkroot;
        if (isLocal) {
            this.host = LOCAL_HOST;
            this.port = getLocalPort(linkroot);
        } else {
            this.host = getDeployedHost(linkroot);
        }
    }

    private int getLocalPort(LinkRoot linkroot) {
        switch (linkroot) {
            case ANIMALPRODS:
                return 8081;
            case VEGETABLES:
                return 8082;
            case GENERALSTORE:
                return 8083;
            default:
                throw new IllegalArgumentException("Invalid linkroot");
        }
    }
    private String getDeployedHost(LinkRoot linkroot) {
        switch (linkroot) {
            case ANIMALPRODS:
                return "20.250.163.126:8081"; // Replace with actual deployed host
            case VEGETABLES:
                return "191.235.235.155:8082"; // Replace with actual deployed host
            case GENERALSTORE:
                return "20.250.163.126:8083"; // Replace with actual deployed host
            default:
                throw new IllegalArgumentException("Invalid linkroot");
        }
    }

    public String buildOrderApiUrl() {
        if (port > 0) {
            return String.format("http://%s:%d/%s%s", host, port, linkroot.getValue(), ORDER_EXTENSION);
        } else {
            return String.format("http://%s/%s%s", host, linkroot.getValue(), ORDER_EXTENSION);
        }
    }

    public String buildRemoveOrderApiUrl(String orderRequestId) {
        if (port > 0) {
            return String.format("http://%s:%d/%s%s/%s", host, port, linkroot.getValue(), REMOVE_ORDER_EXTENSION, orderRequestId);
        } else {
            return String.format("http://%s/%s%s/%s", host, linkroot.getValue(), REMOVE_ORDER_EXTENSION, orderRequestId);
        }
    }

    // public static void main(String[] args) {
    //     SupplierApiStringBuilder.LinkRoot linkroot = SupplierApiStringBuilder.LinkRoot.VEGETABLES; // Example linkroot
    //     String orderRequestId = "12345";

    //     // Example for a local host
    //     SupplierApiStringBuilder localBuilder = new SupplierApiStringBuilder(true, linkroot);
    //     String orderApiUrlLocal = localBuilder.buildOrderApiUrl();
    //     String removeOrderApiUrlLocal = localBuilder.buildRemoveOrderApiUrl(orderRequestId);

    //     System.out.println("Local Order API URL: " + orderApiUrlLocal);
    //     System.out.println("Local Remove Order API URL: " + removeOrderApiUrlLocal);

    //     // Example for a deployed host
    //     SupplierApiStringBuilder deployedBuilder = new SupplierApiStringBuilder(false, linkroot);
    //     String orderApiUrlDeployed = deployedBuilder.buildOrderApiUrl();
    //     String removeOrderApiUrlDeployed = deployedBuilder.buildRemoveOrderApiUrl(orderRequestId);

    //     System.out.println("Deployed Order API URL: " + orderApiUrlDeployed);
    //     System.out.println("Deployed Remove Order API URL: " + removeOrderApiUrlDeployed);
    // }
}

