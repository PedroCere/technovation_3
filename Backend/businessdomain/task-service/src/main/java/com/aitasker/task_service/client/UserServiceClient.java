package com.aitasker.task_service.client;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class UserServiceClient {

    private final RestTemplate restTemplate;
    private final String baseUrl = "http://localhost:8081/api/user";

    public UserServiceClient() {
        this.restTemplate = new RestTemplate();
    }

    public Long getUserIdByEmail(String email) {
        UserResponse userResponse = restTemplate.getForObject(
                baseUrl + "/by-email?email={email}",
                UserResponse.class,
                email
        );
        if (userResponse != null) {
            return userResponse.getId();
        } else {
            throw new RuntimeException("User not found for email: " + email);
        }
    }

    public static class UserResponse {
        private Long id;
        private String email;
        private String username;

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }
    }
}
