package com.example.demo.service;

import com.example.demo.dto.UserSettingsDto;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.auth.EmailService;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    public UserService(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .or(() -> userRepository.findByEmail(username))
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    public User updateUserSettings(String username, UserSettingsDto settingsDto) {
        User user = getUserByUsername(username);
        
        if (settingsDto.getPersonality() != null) {
            user.setPersonality(settingsDto.getPersonality());
        }
        if (settingsDto.getCustomInstructions() != null) {
            user.setCustomInstructions(settingsDto.getCustomInstructions());
        }
        user.setCustomizationEnabled(settingsDto.isCustomizationEnabled());
        if (settingsDto.getTheme() != null) {
            user.setTheme(settingsDto.getTheme());
        }
        if (settingsDto.getLanguage() != null) {
            user.setLanguage(settingsDto.getLanguage());
        }
        
        return userRepository.save(user);
    }
}