package com.example.inventory_backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    // NOTE: storing plaintext password here for demo only. Do not do this in production.
    @Column(nullable = false)
    private String password;

    private String role; // e.g. "ADMIN"
}
