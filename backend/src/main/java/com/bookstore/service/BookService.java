package com.bookstore.service;

import com.bookstore.entity.Book;
import com.bookstore.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getAllBooks(String category, String search, String sortBy) {
        List<Book> books;

        boolean hasCategory = category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("all");
        boolean hasSearch = search != null && !search.trim().isEmpty();

        if (hasCategory && hasSearch) {
            books = bookRepository.filterAndSearch(category.trim(), search.trim());
        } else if (hasCategory) {
            books = bookRepository.findByCategoryIgnoreCase(category.trim());
        } else if (hasSearch) {
            books = bookRepository.searchBooks(search.trim());
        } else {
            books = bookRepository.findAll();
        }

        // Apply sorting
        if (sortBy != null && !sortBy.trim().isEmpty()) {
            switch (sortBy.toLowerCase()) {
                case "price-asc":
                    books.sort(Comparator.comparing(Book::getPrice));
                    break;
                case "price-desc":
                    books.sort(Comparator.comparing(Book::getPrice).reversed());
                    break;
                case "rating":
                    books.sort(Comparator.comparing(Book::getRating).reversed());
                    break;
                case "newest":
                    books.sort(Comparator.comparing(Book::getPublicationYear, Comparator.nullsLast(Comparator.reverseOrder())));
                    break;
                case "title":
                    books.sort(Comparator.comparing(Book::getTitle, String.CASE_INSENSITIVE_ORDER));
                    break;
                default:
                    // default order (by id or as-is)
                    break;
            }
        }

        return books;
    }

    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    public List<Book> getFeaturedBooks() {
        return bookRepository.findByFeaturedTrue();
    }

    public List<String> getDistinctCategories() {
        return bookRepository.findDistinctCategories();
    }

    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    public long getCount() {
        return bookRepository.count();
    }
}
