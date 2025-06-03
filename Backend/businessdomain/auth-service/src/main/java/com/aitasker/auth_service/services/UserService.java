package com.aitasker.auth_service.services;


import com.aitasker.auth_service.controllers.UploadPhotoResponse;
import com.aitasker.auth_service.dtos.*;
import com.aitasker.auth_service.model.User;
import com.aitasker.auth_service.respository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class UserService {

    private final UserRepository repo;

    private final String uploadDir = "uploads/profile-photos/";

    public UserService(UserRepository repo) {
        this.repo = repo;
        // Create upload directory if not exists
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }
    }

    public User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return repo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public UserProfileResponse getProfile() {
        User u = getCurrentUser();
        UserProfileResponse p = new UserProfileResponse();
        p.username = u.getUsername();
        p.email = u.getEmail();
        p.role = u.getRole();
        p.createdAt = u.getCreatedAt();
        p.description = u.getDescription();
        p.location = u.getLocation();
        p.photoUrl = u.getPhotoUrl();
        return p;
    }

    public UserProfileResponse updateProfile(UpdateUserProfileRequest req) {
        User u = getCurrentUser();
        u.setDescription(req.description);
        u.setLocation(req.location);
        if (req.photoUrl != null) {
            u.setPhotoUrl(req.photoUrl);
        }
        repo.save(u);
        return getProfile();
    }

    public UserPreferencesResponse getPreferences() {
        User u = getCurrentUser();
        UserPreferencesResponse r = new UserPreferencesResponse();
        r.defaultFormat = u.getDefaultFormat();
        r.defaultTone = u.getDefaultTone();
        r.defaultLanguage = u.getDefaultLanguage();
        return r;
    }

    public UserPreferencesResponse updatePreferences(UpdateUserPreferencesRequest prefs) {
        User u = getCurrentUser();
        u.setDefaultTone(prefs.defaultTone);
        u.setDefaultFormat(prefs.defaultFormat);
        u.setDefaultLanguage(prefs.defaultLanguage);
        repo.save(u);
        return getPreferences();
    }

    public UserStatsResponse getStats() {
        User u = getCurrentUser();
        UserStatsResponse stats = new UserStatsResponse();
        stats.totalWords = u.getTotalWords();
        stats.tonesUsed = u.getTonesUsed();
        return stats;
    }

    public UploadPhotoResponse uploadPhoto(MultipartFile photo) {
        if (photo.isEmpty()) {
            throw new RuntimeException("Empty file");
        }
        try {
            String originalFilename = photo.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String filename = "user_" + getCurrentUser().getId() + "_" + System.currentTimeMillis() + extension;
            Path filepath = Paths.get(uploadDir, filename);
            Files.write(filepath, photo.getBytes());

            // Update user photoUrl with relative path
            User user = getCurrentUser();
            user.setPhotoUrl("/" + uploadDir + filename);
            repo.save(user);

            return new UploadPhotoResponse(user.getPhotoUrl());
        } catch (IOException e) {
            throw new RuntimeException("Failed to save file", e);
        }
    }
}
