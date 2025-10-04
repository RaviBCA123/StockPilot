package com.example.inventory_backend.repository;

import com.example.inventory_backend.model.Category;
import com.example.inventory_backend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
