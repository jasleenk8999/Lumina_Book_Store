package com.bookstore.config;

import com.bookstore.entity.Book;
import com.bookstore.entity.User;
import com.bookstore.repository.BookRepository;
import com.bookstore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public DataInitializer(BookRepository bookRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // Seed default demo user if not present
        if (userRepository.count() == 0) {
            User demoUser = new User(
                    "Jasleen Kaur",
                    "jasleen",
                    "jasleen@bookstore.com",
                    passwordEncoder.encode("password123"),
                    "ROLE_USER"
            );
            userRepository.save(demoUser);

            User testUser = new User(
                    "Demo Reader",
                    "demouser",
                    "demo@bookstore.com",
                    passwordEncoder.encode("secret123"),
                    "ROLE_USER"
            );
            userRepository.save(testUser);
            System.out.println("Seeded default users: jasleen@bookstore.com, demo@bookstore.com");
        }

        // Seed book catalogue if not present
        if (bookRepository.count() == 0) {
            List<Book> books = Arrays.asList(
                    new Book(
                            "Designing Data-Intensive Applications",
                            "Martin Kleppmann",
                            "Technology & AI",
                            38.99,
                            4.9,
                            2450,
                            "The definitive guide to the principles and architectures behind reliable, scalable, and maintainable modern software systems. Covers storage engines, replication, partitioning, transactions, and stream processing.",
                            "978-1449373320",
                            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
                            25,
                            true,
                            2017,
                            "O'Reilly Media"
                    ),
                    new Book(
                            "Clean Architecture: A Craftsman's Guide",
                            "Robert C. Martin",
                            "Technology & AI",
                            34.50,
                            4.7,
                            1890,
                            "Practical software architecture rules from Uncle Bob. Learn universal software architecture rules to dramatically improve developer productivity throughout the life of any software system.",
                            "978-0134494166",
                            "https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=800&q=80",
                            18,
                            true,
                            2018,
                            "Prentice Hall"
                    ),
                    new Book(
                            "Atomic Habits",
                            "James Clear",
                            "Self-Improvement",
                            21.99,
                            4.9,
                            6200,
                            "An easy and proven way to build good habits and break bad ones. James Clear reveals practical strategies that teach you exactly how to form good habits, break bad ones, and master tiny behaviors.",
                            "978-0735211292",
                            "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80",
                            40,
                            true,
                            2018,
                            "Avery"
                    ),
                    new Book(
                            "The Pragmatic Programmer",
                            "David Thomas & Andrew Hunt",
                            "Technology & AI",
                            42.00,
                            4.8,
                            3100,
                            "Your journey to mastery. One of the most significant books in computer programming, exploring the core process of software development from requirements gathering to robust software craftsmanship.",
                            "978-0135957059",
                            "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
                            15,
                            true,
                            2019,
                            "Addison-Wesley"
                    ),
                    new Book(
                            "Deep Work: Rules for Focused Success",
                            "Cal Newport",
                            "Self-Improvement",
                            19.95,
                            4.6,
                            1420,
                            "Deep work is the ability to focus without distraction on a cognitively demanding task. Learn how cultivating this skill will allow you to quickly master complicated information and produce better results.",
                            "978-1455586691",
                            "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80",
                            22,
                            false,
                            2016,
                            "Grand Central Publishing"
                    ),
                    new Book(
                            "The Midnight Library",
                            "Matt Haig",
                            "Fiction",
                            17.50,
                            4.5,
                            3800,
                            "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. An enchanting novel about life's infinite possibilities.",
                            "978-0525559474",
                            "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80",
                            30,
                            true,
                            2020,
                            "Viking"
                    ),
                    new Book(
                            "Thinking, Fast and Slow",
                            "Daniel Kahneman",
                            "Psychology & Science",
                            24.99,
                            4.7,
                            4500,
                            "Nobel Memorial Prize winner Daniel Kahneman takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think: System 1 (fast and intuitive) and System 2 (slow and deliberate).",
                            "978-0374533557",
                            "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
                            16,
                            false,
                            2011,
                            "Farrar, Straus and Giroux"
                    ),
                    new Book(
                            "Klara and the Sun",
                            "Kazuo Ishiguro",
                            "Fiction",
                            18.25,
                            4.4,
                            2100,
                            "From Nobel laureate Kazuo Ishiguro, a magnificent story of an Artificial Friend with outstanding observational qualities who watches the behavior of those who come in to browse.",
                            "978-0593318171",
                            "https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=800&q=80",
                            12,
                            false,
                            2021,
                            "Knopf"
                    ),
                    new Book(
                            "The Psychology of Money",
                            "Morgan Housel",
                            "Business & Finance",
                            20.50,
                            4.8,
                            5100,
                            "Doing well with money isn't necessarily about what you know. It's about how you behave. Morgan Housel shares 19 short stories exploring the strange ways people think about money.",
                            "978-0857197689",
                            "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=80",
                            35,
                            true,
                            2020,
                            "Harriman House"
                    ),
                    new Book(
                            "Sapiens: A Brief History of Humankind",
                            "Yuval Noah Harari",
                            "History & Philosophy",
                            22.80,
                            4.7,
                            7800,
                            "From a renowned historian comes a groundbreaking narrative of humanity's creation and evolution, exploring how biology and history have defined us and enhanced our understanding of what it means to be human.",
                            "978-0062316097",
                            "https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=800&q=80",
                            28,
                            true,
                            2015,
                            "Harper"
                    ),
                    new Book(
                            "Refactoring: Improving the Design of Existing Code",
                            "Martin Fowler",
                            "Technology & AI",
                            45.00,
                            4.8,
                            1600,
                            "Martin Fowler's classic guide to improving code readability and maintainability without altering existing external behavior. Features extensive JavaScript code examples and comprehensive catalog of refactorings.",
                            "978-0134757599",
                            "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
                            14,
                            false,
                            2018,
                            "Addison-Wesley"
                    ),
                    new Book(
                            "Dune",
                            "Frank Herbert",
                            "Sci-Fi & Fantasy",
                            16.99,
                            4.8,
                            8400,
                            "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the spice melange.",
                            "978-0441172719",
                            "https://images.unsplash.com/photo-1507842229451-79b1be8d5bf6?auto=format&fit=crop&w=800&q=80",
                            45,
                            true,
                            1965,
                            "Chilton Books"
                    )
            );

            bookRepository.saveAll(books);
            System.out.println("Seeded " + books.size() + " books into the catalogue.");
        }
    }
}
