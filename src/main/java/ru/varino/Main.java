package ru.varino;

import com.fastcgi.*;


public class Main {
    public static void main(String args[]) {
        Server server = new Server();
        server.run();
    }
}