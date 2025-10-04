package com.example.inventory_backend.config;

import com.example.inventory_backend.model.User;
import com.example.inventory_backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataInitializer(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        String defaultAdmin = "admin";
        String defaultPass = "admin123";
        if (userRepository.findByUsername(defaultAdmin).isEmpty()) {
            User admin = new User();
            admin.setUsername(defaultAdmin);
            admin.setPassword(defaultPass); // demo only
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println("Default admin created: username=admin password=admin123");
        }
    }
}
