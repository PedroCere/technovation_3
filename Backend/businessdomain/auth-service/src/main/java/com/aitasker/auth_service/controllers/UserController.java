package com.aitasker.auth_service.controllers;


import com.aitasker.auth_service.dtos.*;
import com.aitasker.auth_service.services.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public UserProfileResponse profile() {
        return userService.getProfile();
    }

    @PutMapping("/profile")
    public UserProfileResponse updateProfile(@RequestBody UpdateUserProfileRequest req) {
        return userService.updateProfile(req);
    }

    @PostMapping("/upload-photo")
    public UploadPhotoResponse uploadPhoto(@RequestParam("photo") MultipartFile photo) {
        return userService.uploadPhoto(photo);
    }

    @GetMapping("/preferences")
    public UserPreferencesResponse preferences() {
        return userService.getPreferences();
    }

    @PutMapping("/preferences")
    public UserPreferencesResponse updatePreferences(@RequestBody UpdateUserPreferencesRequest req) {
        return userService.updatePreferences(req);
    }

    @GetMapping("/stats")
    public UserStatsResponse stats() {
        return userService.getStats();
    }

    @GetMapping("/by-email")
    public com.aitasker.auth_service.dtos.UserDTO getUserByEmail(@RequestParam(name = "email") String email) {
        System.out.println("UserController: getUserByEmail called with email: " + email);
        com.aitasker.auth_service.model.User user = userService.getUserByEmail(email);
        com.aitasker.auth_service.dtos.UserDTO dto = new com.aitasker.auth_service.dtos.UserDTO();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setUsername(user.getUsername());
        return dto;
    }
}

