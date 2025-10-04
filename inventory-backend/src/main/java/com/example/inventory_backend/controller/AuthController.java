package com.example.inventory_backend.controller;

import com.example.inventory_backend.dto.AuthRequest;
import com.example.inventory_backend.dto.AuthResponse;
import com.example.inventory_backend.model.User;
import com.example.inventory_backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        return userRepository.findByUsername(request.getUsername())
                .map(user -> {
                    // Demo: plain-text check — for production use BCrypt
                    if (user.getPassword().equals(request.getPassword())) {
                        AuthResponse resp = new AuthResponse(user.getId(), user.getUsername(), user.getRole());
                        return ResponseEntity.ok(resp);
                    } else {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
                    }
                })
                .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials"));
    }
}
