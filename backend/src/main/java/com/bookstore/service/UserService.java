package com.bookstore.service;

import com.bookstore.dto.AuthResponse;
import com.bookstore.dto.LoginRequest;
import com.bookstore.dto.RegisterRequest;
import com.bookstore.entity.User;
import com.bookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse registerUser(RegisterRequest request) {
        // Validate uniqueness of email
        if (userRepository.existsByEmail(request.getEmail().trim().toLowerCase())) {
            return new AuthResponse(false, "An account with email " + request.getEmail() + " already exists.");
        }

        // Validate uniqueness of username
        if (userRepository.existsByUsername(request.getUsername().trim().toLowerCase())) {
            return new AuthResponse(false, "Username @" + request.getUsername() + " is already taken. Please choose another.");
        }

        // Hash the password
        String hashedPassword = passwordEncoder.encode(request.getPassword());

        User user = new User(
                request.getFullName().trim(),
                request.getUsername().trim().toLowerCase(),
                request.getEmail().trim().toLowerCase(),
                hashedPassword,
                "ROLE_USER"
        );

        User savedUser = userRepository.save(user);
        String sessionToken = "bk_" + UUID.randomUUID().toString().replace("-", "");

        return new AuthResponse(
                true,
                "Account registered successfully! Welcome to the Online Book Store.",
                savedUser.getId(),
                savedUser.getFullName(),
                savedUser.getUsername(),
                savedUser.getEmail(),
                savedUser.getRole(),
                sessionToken
        );
    }

    public AuthResponse authenticate(LoginRequest request) {
        String identifier = request.getIdentifier().trim().toLowerCase();

        Optional<User> userOpt = userRepository.findByEmailOrUsername(identifier, identifier);
        if (userOpt.isEmpty()) {
            return new AuthResponse(false, "No account found matching the provided email or username.");
        }

        User user = userOpt.get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new AuthResponse(false, "Invalid password. Please check your credentials and try again.");
        }

        String sessionToken = "bk_" + UUID.randomUUID().toString().replace("-", "");

        return new AuthResponse(
                true,
                "Welcome back, " + user.getFullName() + "!",
                user.getId(),
                user.getFullName(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                sessionToken
        );
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email.toLowerCase());
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username.toLowerCase());
    }

    public long getCount() {
        return userRepository.count();
    }
}
