package com.bookstore;

import com.bookstore.dto.AuthResponse;
import com.bookstore.dto.LoginRequest;
import com.bookstore.dto.RegisterRequest;
import com.bookstore.entity.Book;
import com.bookstore.service.BookService;
import com.bookstore.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class BookstoreApplicationTests {

    @Autowired
    private BookService bookService;

    @Autowired
    private UserService userService;

    @Test
    void contextLoads() {
        assertNotNull(bookService);
        assertNotNull(userService);
    }

    @Test
    void testBookServiceOperations() {
        List<Book> allBooks = bookService.getAllBooks(null, null, null);
        assertFalse(allBooks.isEmpty(), "Books should be seeded");
        assertTrue(allBooks.size() >= 10, "Expected at least 10 seeded books");

        // Test category filter
        List<Book> techBooks = bookService.getAllBooks("Technology & AI", null, null);
        assertFalse(techBooks.isEmpty());
        for (Book b : techBooks) {
            assertEquals("Technology & AI", b.getCategory());
        }

        // Test search
        List<Book> searchResults = bookService.getAllBooks(null, "Architecture", null);
        assertFalse(searchResults.isEmpty());
        assertTrue(searchResults.get(0).getTitle().contains("Architecture"));
    }

    @Test
    void testUserAuthFlow() {
        // Register a new test user
        RegisterRequest registerReq = new RegisterRequest(
                "Test Student",
                "teststudent_" + System.currentTimeMillis(),
                "test_" + System.currentTimeMillis() + "@university.edu",
                "securePass123!"
        );

        AuthResponse regResponse = userService.registerUser(registerReq);
        assertTrue(regResponse.isSuccess(), "User registration should succeed");

        // Login with newly created user
        LoginRequest loginReq = new LoginRequest(registerReq.getEmail(), "securePass123!");
        AuthResponse loginResponse = userService.authenticate(loginReq);
        assertTrue(loginResponse.isSuccess(), "Login should succeed");
        assertEquals(registerReq.getFullName(), loginResponse.getFullName());

        // Login with bad password
        LoginRequest badLogin = new LoginRequest(registerReq.getEmail(), "wrongpassword");
        AuthResponse badResponse = userService.authenticate(badLogin);
        assertFalse(badResponse.isSuccess(), "Login with wrong password should fail");
    }
}
