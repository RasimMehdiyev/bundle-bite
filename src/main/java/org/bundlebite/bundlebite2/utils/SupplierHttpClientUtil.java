package org.bundlebite.bundlebite2.utils;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.bundlebite.bundlebite2.utils.ordersToSuppliers.*;

public class SupplierHttpClientUtil {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static String postRequest(String requestUrl, Object requestBody, String brokerHeader) throws IOException {
        URL url = new URL(requestUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setDoOutput(true);
        connection.setRequestMethod("POST");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestProperty("broker", brokerHeader);
        connection.setRequestProperty("Api-key", "rasimrasim14");

        try (OutputStream os = connection.getOutputStream()) {
            byte[] input = objectMapper.writeValueAsBytes(requestBody);
            os.write(input, 0, input.length);
        }

        int responseCode = connection.getResponseCode();
        if (responseCode == HttpURLConnection.HTTP_OK) {
            try (BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
                StringBuilder response = new StringBuilder();
                String responseLine;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
                return response.toString();
            }
        } else {
            throw new RuntimeException("Failed : HTTP error code : " + responseCode);
        }
    }

    public static String getRequest(String requestUrl, String brokerHeader) throws IOException {
        URL url = new URL(requestUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("broker", brokerHeader);
        connection.setRequestProperty("Api-key", "rasimrasim14");

        int responseCode = connection.getResponseCode();
        if (responseCode == HttpURLConnection.HTTP_OK) {
            try (BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
                StringBuilder response = new StringBuilder();
                String responseLine;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
                return response.toString();
            }
        } else {
            throw new RuntimeException("Failed : HTTP error code : " + responseCode);
        }
    }

    public static void testOrder(){
        try {
            // Create order items
            SupplierOrderItem item1 = new SupplierOrderItem();
            item1.setId(3);
            item1.setQuantity(5);

            SupplierOrderItem item2 = new SupplierOrderItem();
            item2.setId(4);
            item2.setQuantity(2);

            List<SupplierOrderItem> orderItems = new ArrayList<>();
            orderItems.add(item1);
            orderItems.add(item2);

            // Create order request
            SupplierOrderRequest orderRequest = new SupplierOrderRequest();
            orderRequest.setOrderRequestId("abcde");
            orderRequest.setOrders(orderItems);

            // Define the URL and broker header
            String requestUrl = "http://localhost:8081/animalprods/order";
            String brokerHeader = "bundle-bite";

            // Call the postRequest method
            String response = postRequest(requestUrl, orderRequest, brokerHeader);
            System.out.println("Response: " + response);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void testRemoveOrder(){
        try {
            // Define the URL and broker header
            String requestUrl = "http://localhost:8081/animalprods/removeOrder/abcde";
            String brokerHeader = "bundle-bite";

            // Call the postRequest method
            String response = getRequest(requestUrl, brokerHeader);
            System.out.println("Response: " + response);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // public static void main(String[] args) {
    //     //JUST TO TEST THE FUCNTIONALITIES
    //     //testOrder();
    //     testRemoveOrder();
    // }
}

