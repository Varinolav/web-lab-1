package ru.varino;

import com.fastcgi.*;


public class Main {
    public static void main(String args[]) {
        FCGIInterface fcgi = new FCGIInterface();

        while (fcgi.FCGIaccept() >= 0) {
            int count = 0;
            ++count;
            System.out.println("Content-type: text/html\n\n");
            System.out.println("<html>");
            System.out.println(
                    "<head><TITLE>CGI Hello</TITLE></head>");
            System.out.println("<body>");
            System.out.println("<H3>CGI-Hello</H3>");
            System.out.println("request number " + count +
                    " running on host 8080");
            System.out.println("</body>");
            System.out.println("</html>");
        }
    }
}