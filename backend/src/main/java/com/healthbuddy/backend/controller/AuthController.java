package com.healthbuddy.backend.controller;

import com.healthbuddy.backend.dto.LoginRequest;
import com.healthbuddy.backend.entity.User;
import com.healthbuddy.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")  // Simplified for prototype
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        User savedUser = userRepository.save(user);
        savedUser.setPassword(null); // Simple way to not return password
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail());
        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            user.setPassword(null);
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(401).body("Invalid email or password");
    }
}
