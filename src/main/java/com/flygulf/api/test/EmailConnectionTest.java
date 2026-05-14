package com.flygulf.api.test;

import jakarta.mail.*;
import jakarta.mail.internet.*;
import java.util.Properties;

public class EmailConnectionTest {
    public static void main(String[] args) {
        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        Session session = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("info@flygulfacademy.com", "Swami@19jul24");
            }
        });

        try {
            Transport transport = session.getTransport("smtp");
            transport.connect("smtp.gmail.com", "info@flygulfacademy.com", "Swami@19jul24");
            System.out.println("✓ Connection successful!");
            transport.close();
        } catch (Exception e) {
            System.err.println("✗ Connection failed: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
