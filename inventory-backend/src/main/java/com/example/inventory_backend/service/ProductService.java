package com.example.inventory_backend.service;

import com.example.inventory_backend.model.Category;
import com.example.inventory_backend.model.Product;
import com.example.inventory_backend.repository.CategoryRepository;
import com.example.inventory_backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Product createProduct(Product product) {
        // Ensure category exists
        Long catId = product.getCategory().getId();
        Category category = categoryRepository.findById(catId)
                .orElseThrow(() -> new RuntimeException("Category not found with id " + catId));
        product.setCategory(category);
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {
        return productRepository.findById(id).map(product -> {
            product.setName(productDetails.getName());
            product.setDescription(productDetails.getDescription());
            product.setPrice(productDetails.getPrice());
            product.setQuantity(productDetails.getQuantity());

            // Update category
            Long catId = productDetails.getCategory().getId();
            Category category = categoryRepository.findById(catId)
                    .orElseThrow(() -> new RuntimeException("Category not found with id " + catId));
            product.setCategory(category);

            return productRepository.save(product);
        }).orElseThrow(() -> new RuntimeException("Product not found with id " + id));
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}
