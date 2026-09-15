package com.bookstore.controller;

import com.bookstore.dto.ApiResponse;
import com.bookstore.entity.Book;
import com.bookstore.service.BookService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    /**
     * Get all books with optional filtering by category, search term, and sorting.
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<Book>>> getAllBooks(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String sort) {
        List<Book> books = bookService.getAllBooks(category, search, sort);
        return ResponseEntity.ok(ApiResponse.success("Books retrieved successfully", books));
    }

    /**
     * Get single book by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Book>> getBookById(@PathVariable Long id) {
        Optional<Book> bookOpt = bookService.getBookById(id);
        return bookOpt
                .map(book -> ResponseEntity.ok(ApiResponse.success("Book found", book)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("Book not found with ID: " + id)));
    }

    /**
     * Get featured books for home page spotlight.
     */
    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<Book>>> getFeaturedBooks() {
        List<Book> featured = bookService.getFeaturedBooks();
        return ResponseEntity.ok(ApiResponse.success("Featured books retrieved", featured));
    }

    /**
     * Get all available categories.
     */
    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<String>>> getCategories() {
        List<String> categories = bookService.getDistinctCategories();
        return ResponseEntity.ok(ApiResponse.success("Categories retrieved", categories));
    }

    /**
     * Add a new book to the catalogue.
     */
    @PostMapping
    public ResponseEntity<ApiResponse<Book>> createBook(@Valid @RequestBody Book book) {
        Book savedBook = bookService.saveBook(book);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Book added to catalogue successfully", savedBook));
    }

    /**
     * Delete a book by ID.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteBook(@PathVariable Long id) {
        if (bookService.getBookById(id).isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error("Book not found with ID: " + id));
        }
        bookService.deleteBook(id);
        return ResponseEntity.ok(ApiResponse.success("Book deleted successfully", null));
    }
}
