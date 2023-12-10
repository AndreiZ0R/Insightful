package com.error418.springservice.controller;


import com.error418.springservice.model.User;
import com.error418.springservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/userProfile")
    public ResponseEntity<?> createUserProfile(@RequestBody UserProfileDto userProfileDto) {
        User user = userService.createUserProfile(userProfileDto);
        return ResponseEntity.ok(user); // Return the created user object
    }
}
