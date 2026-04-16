
package com.example.demo.controller;

import com.example.demo.dto.UserSettingsDto;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public User getMe(@AuthenticationPrincipal UserDetails userDetails) {
        return userService.getUserByUsername(userDetails.getUsername());
    }

    @PutMapping("/settings")
    public User updateSettings(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody UserSettingsDto settingsDto) {
        return userService.updateUserSettings(userDetails.getUsername(), settingsDto);
    }
}
