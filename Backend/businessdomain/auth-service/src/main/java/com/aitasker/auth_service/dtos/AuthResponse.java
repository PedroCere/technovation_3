package com.aitasker.auth_service.dtos;


import com.aitasker.auth_service.model.User;

public class AuthResponse {
    public String token;
    public User user;

    public AuthResponse(String token, User user) {
        this.token = token;
        this.user = user;
    }
}
