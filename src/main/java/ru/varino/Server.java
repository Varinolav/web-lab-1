package ru.varino;

import com.fastcgi.FCGIInterface;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;

public class Server {
    private static final String BASE_RESPONSE = """
            Status: %d %s
            Access-Control-Allow-Origin: *
            Connection: keep-alive
            Content-Type: application/json
            
            
            %s
            """;


    public void run() {
        connect();
    }

    private void connect() {
        FCGIInterface fcgi = new FCGIInterface();
        while (fcgi.FCGIaccept() >= 0) {
            processRequest();
        }
    }

    private void processRequest() {
        long startTime = System.nanoTime();

        HashMap<String, String> params = parse(FCGIInterface.request.params.getProperty("QUERY_STRING"));
        PointValidator validator = new PointValidator(params);

        String method = FCGIInterface.request.params.getProperty("REQUEST_METHOD");
        if (!method.equals("POST")) {
            String errorResponse = createJson("{\"error\": \"unsupported method\"}", 405, "Method Not Allowed");
            System.out.println(errorResponse);
            return;
        }

        String response;
        if (validator.validate()) {
            long endTime = System.nanoTime();
            long elapsedTime = (endTime - startTime) / 1000;
            String formattedTimeNow = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss").format(LocalDateTime.now().atZone(ZoneId.of("Europe/Moscow")));
            response = createJson(String.format("{\"result\": %b, \"time\": %d, \"now\": \"%s\"}", validator.isHit(), elapsedTime, formattedTimeNow), 200, "OK");
        } else {
            response = createJson("{\"error\": \" incorrect data\"}", 400, "Bad Request");
        }

        System.out.println(response);
    }

    private static String createJson(String response, int statusCode, String statusMessage) {
        return String.format(BASE_RESPONSE, statusCode, statusMessage, response);
    }


    private HashMap<String, String> parse(String request) {
        HashMap<String, String> params = new HashMap<>();

        String[] queryParams = request.split("&");
        for (String queryParam : queryParams) {
            String[] keyValue = queryParam.split("=");
            if (keyValue.length == 2) {
                params.put(keyValue[0], keyValue[1]);
            } else {
                params.put(keyValue[0], "");
            }
        }
        return params;
    }
}
