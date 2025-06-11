package com.aitasker.auth_service.services;

import com.aitasker.auth_service.controllers.UploadPhotoResponse;
import com.aitasker.auth_service.dtos.*;
import com.aitasker.auth_service.model.User;
import com.aitasker.auth_service.respository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTests {

    @Mock
    UserRepository userRepo;

    @InjectMocks
    UserService userService;


    private void mockAuthContext(String email) {
        Authentication auth = mock(Authentication.class);
        when(auth.getName()).thenReturn(email);

        SecurityContext context = mock(SecurityContext.class);
        when(context.getAuthentication()).thenReturn(auth);

        SecurityContextHolder.setContext(context);
    }


    @Test
    void getCurrentUserShouldReturnCorrectUser(){

        //Arrange
        var auth = mock(Authentication.class);
        when(auth.getName()).thenReturn("pepitocapo@gmail.com");

        var context = mock(SecurityContext.class);
        when(context.getAuthentication()).thenReturn(auth);
        SecurityContextHolder.setContext(context);

        User user = new User();
        user.setEmail("pepitocapo@gmail.com");
        when(userRepo.findByEmail("pepitocapo@gmail.com")).thenReturn(Optional.of(user));

        //Action
        User result = userService.getCurrentUser();

        //Assert
        assertEquals("pepitocapo@gmail.com",result.getEmail());

    }

    @Test
    void getProfileReturnsMappedUserProfile(){

        //Arrange
        mockAuthContext("pepito@gmail.com");

        User user = new User();
        user.setEmail("pepito@gmail.com");
        user.setPassword("_Pepas1234");
        user.setUsername("pedrazo");
        user.setRole("USER");
        user.setCreatedAt(LocalDateTime.now());
        user.setDescription("hi this is a test description");
        user.setLocation("Argentina");
        user.setPhotoUrl("example");

        when(userRepo.findByEmail("pepito@gmail.com")).thenReturn(Optional.of(user));

        //Action
        UserProfileResponse result = userService.getProfile();

        //Assert
        assertEquals("pepito@gmail.com",result.email);
        assertEquals("pedrazo",result.username);

    }

    @Test
    void changeUserAttributesShouldReturnUserUpdated(){

        //Arrange
        mockAuthContext("pepito@gmail.com");

        User user = new User();
        user.setEmail("pepito@gmail.com");
        when(userRepo.findByEmail("pepito@gmail.com")).thenReturn(Optional.of(user));
        when(userRepo.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));


        UpdateUserProfileRequest req = new UpdateUserProfileRequest();
        req.description = "hi this is a test description";
        req.location = "Argentina";
        req.photoUrl = "example";

        //Action
        UserProfileResponse result = userService.updateProfile(req);

        //Assert
        assertEquals("Argentina",result.location);
        assertEquals("hi this is a test description",result.description);
        assertEquals("example",result.photoUrl);

    }

    @Test
    void getPreferencesShouldReturnCorrectAttributes() {
        //Arrange
        mockAuthContext("pepito@gmail.com");

        User user = new User();
        user.setEmail("pepito@gmail.com");
        user.setDefaultLanguage("spanish");
        user.setDefaultFormat("Windowed");
        user.setDefaultTone("Dark");

        when(userRepo.findByEmail("pepito@gmail.com")).thenReturn(Optional.of(user));

        //Action
        UserPreferencesResponse result = userService.getPreferences();

        assertEquals("spanish", result.defaultLanguage);
        assertEquals("Windowed", result.defaultFormat);
        assertEquals("Dark", result.defaultTone);

    }

    @Test
    void updatePreferencesShouldReturnAttributesChanged(){
        //Arrange
        mockAuthContext("pepito@gmail.com");

        User user = new User();
        user.setEmail("pepito@gmail.com");
        when(userRepo.findByEmail("pepito@gmail.com")).thenReturn(Optional.of(user));
        when(userRepo.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        UpdateUserPreferencesRequest req = new UpdateUserPreferencesRequest();

        req.defaultLanguage = "spanish";
        req.defaultFormat = "windowed";
        req.defaultTone = "dark";

        //Action
        UserPreferencesResponse result = userService.updatePreferences(req);


        //Assert
        assertEquals("spanish", result.defaultLanguage);
        assertEquals("windowed",result.defaultFormat);
        assertEquals("dark",result.defaultTone);

    }

    @Test
    void getStatsShouldReturnCorrectStatsAttributes(){

        //Arrange
        mockAuthContext("pepito@gmail.com");

        User user = new User();
        user.setTonesUsed("dark,light,cyan");
        user.setTotalWords(100);

        when(userRepo.findByEmail("pepito@gmail.com")).thenReturn(Optional.of(user));

        //Action
        UserStatsResponse result = userService.getStats();

        //Assert
        assertEquals("dark,light,cyan",result.tonesUsed);
        assertEquals(100,result.totalWords);
    }

    @Test
    void uploadPhoto_shouldSaveFileAndUpdateUser() throws Exception {
        // Arrange
        mockAuthContext("pepito@gmail.com");

        User user = new User();
        user.setId(1L);
        user.setEmail("pepito@gmail.com");
        when(userRepo.findByEmail("pepito@gmail.com")).thenReturn(Optional.of(user));
        when(userRepo.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        MultipartFile photo = mock(MultipartFile.class);
        when(photo.isEmpty()).thenReturn(false);
        when(photo.getOriginalFilename()).thenReturn("foto.png");
        when(photo.getBytes()).thenReturn("fake-bytes".getBytes());

        // Act
        UploadPhotoResponse response = userService.uploadPhoto(photo);

        // Assert
        assertNotNull(response);
        assertTrue(response.photoUrl.contains("uploads/profile-photos/user_1_"));
        verify(userRepo).save(argThat(savedUser ->
                savedUser.getPhotoUrl() != null && savedUser.getPhotoUrl().contains("uploads/profile-photos/user_1_")
        ));
    }


}
