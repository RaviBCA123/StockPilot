package com.example.inventory_backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "categories")
@Data                       // from Lombok (getters, setters, toString)
@NoArgsConstructor
@AllArgsConstructor
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String description;
}
