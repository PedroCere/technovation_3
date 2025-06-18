package com.aitasker.auth_service.integration;

import com.aitasker.auth_service.dtos.*;
import com.aitasker.auth_service.model.User;
import com.aitasker.auth_service.respository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class UserServiceIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserRepository userRepository;

    private User testUser;

    @BeforeEach
    public void setup() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setEmail("testuser@example.com");
        testUser.setUsername("testuser");
        testUser.setRole("USER");
        testUser.setCreatedAt(LocalDateTime.now());
        testUser.setDescription("Test description");
        testUser.setLocation("Test location");
        testUser.setPhotoUrl("/uploads/profile-photos/testphoto.png");
        testUser.setDefaultLanguage("english");
        testUser.setDefaultFormat("windowed");
        testUser.setDefaultTone("dark");
        testUser.setTotalWords(100);
        testUser.setTonesUsed("dark,light");
    }

    @Test
    @WithMockUser(username = "testuser@example.com")
    public void testGetProfile() throws Exception {
        when(userRepository.findByEmail("testuser@example.com")).thenReturn(Optional.of(testUser));

        mockMvc.perform(get("/api/user/profile"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("testuser@example.com"))
                .andExpect(jsonPath("$.username").value("testuser"))
                .andExpect(jsonPath("$.description").value("Test description"));
    }

    @Test
    @WithMockUser(username = "testuser@example.com")
    public void testUpdateProfile() throws Exception {
        when(userRepository.findByEmail("testuser@example.com")).thenReturn(Optional.of(testUser));
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArgument(0));

        String updateJson = "{\"description\":\"Updated description\",\"location\":\"Updated location\",\"photoUrl\":\"/uploads/profile-photos/updatedphoto.png\"}";

        mockMvc.perform(put("/api/user/profile")
                .contentType(MediaType.APPLICATION_JSON)
                .content(updateJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.description").value("Updated description"))
                .andExpect(jsonPath("$.location").value("Updated location"))
                .andExpect(jsonPath("$.photoUrl").value("/uploads/profile-photos/updatedphoto.png"));
    }

    @Test
    @WithMockUser(username = "testuser@example.com")
    public void testGetPreferences() throws Exception {
        when(userRepository.findByEmail("testuser@example.com")).thenReturn(Optional.of(testUser));

        mockMvc.perform(get("/api/user/preferences"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.defaultLanguage").value("english"))
                .andExpect(jsonPath("$.defaultFormat").value("windowed"))
                .andExpect(jsonPath("$.defaultTone").value("dark"));
    }

    @Test
    @WithMockUser(username = "testuser@example.com")
    public void testUpdatePreferences() throws Exception {
        when(userRepository.findByEmail("testuser@example.com")).thenReturn(Optional.of(testUser));
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArgument(0));

        String updateJson = "{\"defaultLanguage\":\"spanish\",\"defaultFormat\":\"full\",\"defaultTone\":\"light\"}";

        mockMvc.perform(put("/api/user/preferences")
                .contentType(MediaType.APPLICATION_JSON)
                .content(updateJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.defaultLanguage").value("spanish"))
                .andExpect(jsonPath("$.defaultFormat").value("full"))
                .andExpect(jsonPath("$.defaultTone").value("light"));
    }

    @Test
    @WithMockUser(username = "testuser@example.com")
    public void testGetStats() throws Exception {
        when(userRepository.findByEmail("testuser@example.com")).thenReturn(Optional.of(testUser));

        mockMvc.perform(get("/api/user/stats"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalWords").value(100))
                .andExpect(jsonPath("$.tonesUsed").value("dark,light"));
    }

    @Test
    @WithMockUser(username = "testuser@example.com")
    public void testUploadPhoto() throws Exception {
        when(userRepository.findByEmail("testuser@example.com")).thenReturn(Optional.of(testUser));
        when(userRepository.save(any(User.class))).thenAnswer(i -> i.getArgument(0));

        MockMultipartFile photo = new MockMultipartFile("photo", "photo.png", "image/png", "fake-image-content".getBytes());

        mockMvc.perform(multipart("/api/user/upload-photo")
                .file(photo))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.photoUrl").exists());
    }
}
