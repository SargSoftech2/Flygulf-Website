package com.flygulf.api.service;

import com.flygulf.api.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String mailUsername;

    @Value("${admin.email}")
    private String adminEmail;

    @Async
    public void sendCustomerRegistrationEmail(User user) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(mailUsername);
            helper.setTo(user.getEmail());
            helper.setSubject("Welcome to Flygulf Academy!");
            helper.setText(buildCustomerEmailTemplate(user), true);
            
            mailSender.send(message);
            System.out.println("✓ Customer email sent to: " + user.getEmail());
        } catch (Exception e) {
            System.err.println("✗ Failed to send customer email: " + e.getMessage());
            System.err.println("Note: Check Gmail settings - may need App Password or 'Less secure app access'");
        }
    }

    @Async
    public void sendAdminNotificationEmail(User user) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(mailUsername);
            helper.setTo(adminEmail);
            helper.setSubject("New Registration - Flygulf Academy");
            helper.setText(buildAdminEmailTemplate(user), true);
            
            mailSender.send(message);
            System.out.println("✓ Admin notification sent to: " + adminEmail);
        } catch (Exception e) {
            System.err.println("✗ Failed to send admin email: " + e.getMessage());
            System.err.println("Note: Check Gmail settings - may need App Password or 'Less secure app access'");
        }
    }

    public void sendRegistrationEmails(User user) {
        sendCustomerRegistrationEmail(user);
        sendAdminNotificationEmail(user);
    }

    // Customer email template
    private String buildCustomerEmailTemplate(User user) {
        return "<!DOCTYPE html>" +
                "<html>" +
                "<head><style>" +
                "body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }" +
                ".container { max-width: 600px; margin: 0 auto; padding: 20px; }" +
                ".header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }" +
                ".content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }" +
                ".button { background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; }" +
                ".footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }" +
                "</style></head>" +
                "<body>" +
                "<div class='container'>" +
                "<div class='header'>" +
                "<h1>Welcome to Flygulf Academy!</h1>" +
                "</div>" +
                "<div class='content'>" +
                "<p>Dear " + user.getFullName() + ",</p>" +
                "<p>Thank you for registering with Flygulf Academy. We're excited to have you on board!</p>" +
                "<p><strong>Your Registration Details:</strong></p>" +
                "<ul>" +
                "<li><strong>Name:</strong> " + user.getFullName() + "</li>" +
                "<li><strong>Email:</strong> " + user.getEmail() + "</li>" +
                "<li><strong>Phone:</strong> " + (user.getPhone() != null ? user.getPhone() : "N/A") + "</li>" +
                "<li><strong>Course:</strong> " + (user.getCourse() != null ? user.getCourse() : "N/A") + "</li>" +
                "</ul>" +
                "<p>Our team will contact you shortly with more information about your selected course.</p>" +
                "<a href='https://flygulfacademy.com' class='button'>Visit Our Website</a>" +
                "</div>" +
                "<div class='footer'>" +
                "<p>© 2024 Flygulf Academy. All rights reserved.</p>" +
                "<p>Contact us: info@flygulfacademy.com</p>" +
                "</div>" +
                "</div>" +
                "</body>" +
                "</html>";
    }

    // Admin email template
    private String buildAdminEmailTemplate(User user) {
        return "<!DOCTYPE html>" +
                "<html>" +
                "<head><style>" +
                "body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }" +
                ".container { max-width: 600px; margin: 0 auto; padding: 20px; }" +
                ".header { background: #2c3e50; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }" +
                ".content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }" +
                ".info-box { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #667eea; }" +
                "</style></head>" +
                "<body>" +
                "<div class='container'>" +
                "<div class='header'>" +
                "<h2>🎓 New Student Registration</h2>" +
                "</div>" +
                "<div class='content'>" +
                "<p>A new student has registered on Flygulf Academy.</p>" +
                "<div class='info-box'>" +
                "<p><strong>📝 Registration Details:</strong></p>" +
                "<ul>" +
                "<li><strong>Name:</strong> " + user.getFullName() + "</li>" +
                "<li><strong>Email:</strong> " + user.getEmail() + "</li>" +
                "<li><strong>Phone:</strong> " + (user.getPhone() != null ? user.getPhone() : "N/A") + "</li>" +
                "<li><strong>Course:</strong> " + (user.getCourse() != null ? user.getCourse() : "N/A") + "</li>" +
                "<li><strong>Registration Time:</strong> " + java.time.LocalDateTime.now() + "</li>" +
                "</ul>" +
                "</div>" +
                "<p><strong>Action Required:</strong> Please follow up with this student within 24 hours.</p>" +
                "</div>" +
                "</div>" +
                "</body>" +
                "</html>";
    }
}
