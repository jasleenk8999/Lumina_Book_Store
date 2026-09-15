# 📚 Full-Stack Online Bookstore

A modern, high-performance, full-stack Online Bookstore application featuring a **React 19 + Vite** frontend and a **Spring Boot 3 + Java 17** RESTful backend. 

Designed with a sleek dark-mode aesthetic, vibrant glassmorphism visual design, dynamic catalog filtering, persistent shopping cart, user authentication, and dual database support (embedded **H2** file DB out-of-the-box and **MySQL** production profile).

---

## 📸 Overview & Features

### 🎨 Frontend Capabilities
- **Modern Glassmorphism UI**: Built with custom design tokens, dark background gradients, sleek card hover effects, and responsive grid layouts.
- **Book Discovery & Catalog**: Filter books by category, perform real-time searches across titles/authors/descriptions, and sort by price, rating, or release year.
- **Featured Book Spotlight**: Dedicated hero carousel and spotlight section showcasing top-rated and trending reads.
- **Interactive Book Detail Modal**: Quick preview modal with full book summary, stock status, ratings, publication details, and instant "Add to Cart" action.
- **Persistent Shopping Cart**: Interactive slide-out cart drawer supporting quantity adjustments, item removal, price calculations, and checkout simulation.
- **User Authentication**: User registration and login interfaces with field validation, password matching checks, and local storage token management.
- **Offline Fallback / Demo Mode**: Automatic, seamless fallback to client-side mock API when the Java backend is offline, guaranteeing zero downtime during standalone visual testing.

### ⚙️ Backend Capabilities
- **RESTful Spring Boot 3 API**: Clean controller-service-repository layered architecture providing endpoints for books, categories, auth, and health monitoring.
- **Security & Hashing**: BCrypt password hashing via Spring Security Crypto and validation via Jakarta Bean Validation (JSR-380).
- **Embedded Database Readiness**: Pre-configured with H2 Database engine storing persistent file data in `./data/bookstoredb` with built-in web console (`/h2-console`).
- **Flexible Database Switching**: Multi-profile support enabling effortless migration between H2 and MySQL using Spring active profiles (`spring.profiles.active=mysql` or `spring.profiles.active=h2`).
- **Automatic Data Seeding**: Automatically populates sample book records and demo user accounts upon launch if database tables are empty.

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Frontend UI** | **React 19** | Modern functional components & custom hooks (`AuthContext`, `CartContext`) |
| **Build System** | **Vite 8** | Lightning-fast HMR dev server and optimized production bundler |
| **Icons & Styling**| **Lucide React & Vanilla CSS** | Custom CSS design system, responsive flex/grid layouts, no heavy CSS utility dependencies |
| **Backend API** | **Java 17 + Spring Boot 3.2.5** | REST API framework with Maven dependency management |
| **Persistence** | **Spring Data JPA / Hibernate** | Object-Relational Mapping (ORM) and automated schema migration |
| **Database** | **H2 Database / MySQL** | File-based persistent H2 database with Web Console + optional MySQL support |
| **Security** | **Spring Security Crypto** | BCrypt password hashing algorithm |

---

## 📁 Repository Structure

```
bookstore-fullstack/
├── backend/                         # Spring Boot 3 Java REST API
│   ├── data/                        # Persistent H2 file storage directory
│   ├── pom.xml                      # Maven project configuration & dependencies
│   └── src/
│       ├── main/
│       │   ├── java/com/bookstore/
│       │   │   ├── BookstoreApplication.java # Spring Boot entry point
│       │   │   ├── config/          # CorsConfig, DataInitializer, SecurityConfig
│       │   │   ├── controller/      # AuthController, BookController, HealthController
│       │   │   ├── dto/             # ApiResponse, AuthResponse, LoginRequest, RegisterRequest
│       │   │   ├── entity/          # Book.java, User.java (JPA Entities)
│       │   │   ├── repository/      # BookRepository, UserRepository
│       │   │   └── service/         # BookService, UserService
│       │   └── resources/
│       │       ├── application.properties        # Main configuration & active profile selection
│       │       ├── application-h2.properties     # Embedded H2 database settings & console
│       │       └── application-mysql.properties  # MySQL database connectivity settings
├── frontend/                        # React 19 + Vite Application
│   ├── index.html                   # HTML entry point with Google Fonts
│   ├── package.json                 # Node dependencies and scripts
│   ├── vite.config.js               # Vite bundler configuration
│   └── src/
│       ├── main.jsx                 # React root renderer
│       ├── App.jsx                  # Main application router/layout
│       ├── App.css / index.css      # Core CSS design tokens & styles
│       ├── components/              # BookCard, BookDetailModal, CartDrawer, Navbar, Footer, Toast
│       ├── context/                 # AuthContext.jsx, CartContext.jsx
│       ├── pages/                   # HomePage, CataloguePage, LoginPage, RegistrationPage
│       └── services/                # api.js (REST API integration & fallback logic)
├── README.md                        # Master repository documentation
└── SOFTWARE_REQUIREMENTS.md         # Detailed Software Requirements Specification (SRS)
```

---

## 🚀 Quick Start Guide

### Prerequisites
Ensure you have the following installed on your local system:
- **Java JDK 17+** (`java -version`)
- **Apache Maven 3.8+** (`mvn -version`)
- **Node.js 18+** (`node -version`) & **npm** (`npm -version`)

---

### Step 1: Start the Backend Service

Navigate to the `backend` directory and compile/run the application:

```bash
cd backend

# Clean and run using Maven
mvn spring-boot:run
```

The Spring Boot backend will start on **`http://localhost:8080`**.
- **API Health Check**: [`http://localhost:8080/api/health`](http://localhost:8080/api/health)
- **H2 Web Console** (when H2 profile is active): [`http://localhost:8080/h2-console`](http://localhost:8080/h2-console)

---

### Step 2: Start the Frontend Application

Open a new terminal window, navigate to the `frontend` directory, install dependencies, and launch the Vite dev server:

```bash
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

The frontend application will be live at **`http://localhost:5173`**.

---

## 🗄️ Database Profiles & Configuration

### Option A: Running with MySQL Database (MySQL Workbench)

1. Open **MySQL Workbench** or MySQL Shell and create the target database:
   ```sql
   CREATE DATABASE IF NOT EXISTS bookstore_db;
   ```
2. Open `backend/src/main/resources/application-mysql.properties` and set your local MySQL credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/bookstore_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
   spring.datasource.username=root
   spring.datasource.password=your_mysql_password
   ```
3. Set the active profile to `mysql` in `backend/src/main/resources/application.properties`:
   ```properties
   spring.profiles.active=mysql
   ```
4. Start the backend: `mvn spring-boot:run`
5. In **MySQL Workbench**, view tables `books` and `users` under the `bookstore_db` schema!

### Option B: Running with Embedded H2 Database (Default)

1. Set the active profile to `h2` in `backend/src/main/resources/application.properties`:
   ```properties
   spring.profiles.active=h2
   ```
2. Start the backend: `mvn spring-boot:run`
3. Access the H2 Web Console in your browser at [`http://localhost:8080/h2-console`](http://localhost:8080/h2-console) with:
   - **JDBC URL**: `jdbc:h2:file:./data/bookstoredb`
   - **Username**: `sa`
   - **Password**: *(leave blank)*

---

## 📡 REST API Specifications

### Base URL: `http://localhost:8080/api`

| Endpoint | Method | Description | Request Body / Parameters |
| :--- | :--- | :--- | :--- |
| `/health` | `GET` | System health check & status | None |
| `/books` | `GET` | Fetch all books with optional filters | Query params: `category`, `search`, `sort` |
| `/books/{id}` | `GET` | Fetch single book by ID | Path variable: `id` |
| `/books/featured` | `GET` | Fetch top spotlight featured books | None |
| `/books/categories` | `GET` | Fetch distinct book categories | None |
| `/books` | `POST` | Add a new book to catalog | JSON `Book` object |
| `/books/{id}` | `DELETE` | Remove a book by ID | Path variable: `id` |
| `/auth/register` | `POST` | Register a new user | `{ username, email, password, fullName }` |
| `/auth/login` | `POST` | Authenticate existing user | `{ email, password }` |

---

## 📄 Software Requirements Document

For complete Software Requirements Specifications (SRS), including Functional Requirements (FR), Non-Functional Requirements (NFR), Use Case Scenarios, Data Models, and Security Protocols, refer to [SOFTWARE_REQUIREMENTS.md](file:///Users/jasleenkaurmultani/.gemini/antigravity-ide/scratch/bookstore-fullstack/SOFTWARE_REQUIREMENTS.md).

---

## 📜 License

This project is open-source and available under the **MIT License**.
