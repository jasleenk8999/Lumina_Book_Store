const API_BASE = 'http://localhost:8080/api';

// Rich fallback catalogue if backend is temporarily starting up
const FALLBACK_BOOKS = [
  {
    id: 1,
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    category: "Technology & AI",
    price: 38.99,
    rating: 4.9,
    reviewsCount: 2450,
    description: "The definitive guide to the principles and architectures behind reliable, scalable, and maintainable modern software systems. Covers storage engines, replication, partitioning, transactions, and stream processing.",
    isbn: "978-1449373320",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    stock: 25,
    featured: true,
    publicationYear: 2017,
    publisher: "O'Reilly Media"
  },
  {
    id: 2,
    title: "Clean Architecture: A Craftsman's Guide",
    author: "Robert C. Martin",
    category: "Technology & AI",
    price: 34.50,
    rating: 4.7,
    reviewsCount: 1890,
    description: "Practical software architecture rules from Uncle Bob. Learn universal software architecture rules to dramatically improve developer productivity throughout the life of any software system.",
    isbn: "978-0134494166",
    coverImage: "https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=800&q=80",
    stock: 18,
    featured: true,
    publicationYear: 2018,
    publisher: "Prentice Hall"
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-Improvement",
    price: 21.99,
    rating: 4.9,
    reviewsCount: 6200,
    description: "An easy and proven way to build good habits and break bad ones. James Clear reveals practical strategies that teach you exactly how to form good habits, break bad ones, and master tiny behaviors.",
    isbn: "978-0735211292",
    coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80",
    stock: 40,
    featured: true,
    publicationYear: 2018,
    publisher: "Avery"
  },
  {
    id: 4,
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    category: "Technology & AI",
    price: 42.00,
    rating: 4.8,
    reviewsCount: 3100,
    description: "Your journey to mastery. One of the most significant books in computer programming, exploring the core process of software development from requirements gathering to robust software craftsmanship.",
    isbn: "978-0135957059",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    stock: 15,
    featured: true,
    publicationYear: 2019,
    publisher: "Addison-Wesley"
  },
  {
    id: 5,
    title: "The Midnight Library",
    author: "Matt Haig",
    category: "Fiction",
    price: 17.50,
    rating: 4.5,
    reviewsCount: 3800,
    description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    isbn: "978-0525559474",
    coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80",
    stock: 30,
    featured: true,
    publicationYear: 2020,
    publisher: "Viking"
  },
  {
    id: 6,
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "Psychology & Science",
    price: 24.99,
    rating: 4.7,
    reviewsCount: 4500,
    description: "Nobel Memorial Prize winner Daniel Kahneman takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think.",
    isbn: "978-0374533557",
    coverImage: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    stock: 16,
    featured: false,
    publicationYear: 2011,
    publisher: "Farrar, Straus and Giroux"
  },
  {
    id: 7,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Business & Finance",
    price: 20.50,
    rating: 4.8,
    reviewsCount: 5100,
    description: "Doing well with money isn't necessarily about what you know. It's about how you behave. Morgan Housel shares 19 short stories exploring the strange ways people think about money.",
    isbn: "978-0857197689",
    coverImage: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=80",
    stock: 35,
    featured: true,
    publicationYear: 2020,
    publisher: "Harriman House"
  },
  {
    id: 8,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    category: "History & Philosophy",
    price: 22.80,
    rating: 4.7,
    reviewsCount: 7800,
    description: "From a renowned historian comes a groundbreaking narrative of humanity's creation and evolution, exploring how biology and history have defined us.",
    isbn: "978-0062316097",
    coverImage: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=800&q=80",
    stock: 28,
    featured: true,
    publicationYear: 2015,
    publisher: "Harper"
  },
  {
    id: 9,
    title: "Dune",
    author: "Frank Herbert",
    category: "Sci-Fi & Fantasy",
    price: 16.99,
    rating: 4.8,
    reviewsCount: 8400,
    description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the spice melange.",
    isbn: "978-0441172719",
    coverImage: "https://images.unsplash.com/photo-1507842229451-79b1be8d5bf6?auto=format&fit=crop&w=800&q=80",
    stock: 45,
    featured: true,
    publicationYear: 1965,
    publisher: "Chilton Books"
  }
];

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`, { method: 'GET' });
    if (res.ok) {
      const data = await res.json();
      return { connected: true, data };
    }
    return { connected: false };
  } catch (err) {
    return { connected: false, error: err.message };
  }
}

export async function getBooks(category = '', search = '', sort = '') {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (search) params.append('search', search);
    if (sort) params.append('sort', sort);

    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE}/books${query}`);
    
    if (res.ok) {
      const json = await res.json();
      return { data: json.data || [], isLive: true };
    }
    throw new Error('Failed to fetch from backend');
  } catch (err) {
    console.warn('Backend unavailable, using local catalogue fallback:', err.message);
    let filtered = [...FALLBACK_BOOKS];
    if (category && category !== 'All') {
      filtered = filtered.filter(b => b.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.isbn.toLowerCase().includes(q)
      );
    }
    if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
    else if (sort === 'newest') filtered.sort((a, b) => b.publicationYear - a.publicationYear);

    return { data: filtered, isLive: false };
  }
}

export async function getBookById(id) {
  try {
    const res = await fetch(`${API_BASE}/books/${id}`);
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
    throw new Error('Book not found');
  } catch (err) {
    return FALLBACK_BOOKS.find(b => b.id === Number(id)) || null;
  }
}

export async function getFeaturedBooks() {
  try {
    const res = await fetch(`${API_BASE}/books/featured`);
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
    throw new Error('Failed to fetch featured');
  } catch (err) {
    return FALLBACK_BOOKS.filter(b => b.featured);
  }
}

export async function getCategories() {
  try {
    const res = await fetch(`${API_BASE}/books/categories`);
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
    throw new Error('Categories fetch failed');
  } catch (err) {
    return Array.from(new Set(FALLBACK_BOOKS.map(b => b.category)));
  }
}

export async function loginUser(identifier, password) {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password })
    });
    const data = await res.json();
    return data;
  } catch (err) {
    // Local fallback login for demo evaluation
    if ((identifier === 'demo@bookstore.com' || identifier === 'demouser') && password === 'secret123') {
      return {
        success: true,
        message: 'Logged in as Demo Reader (Offline Demo Mode)',
        fullName: 'Demo Reader',
        username: 'demouser',
        email: 'demo@bookstore.com',
        role: 'ROLE_USER',
        token: 'demo-local-token'
      };
    }
    return { success: false, message: 'Could not connect to authentication server. ' + err.message };
  }
}

export async function registerUser(userData) {
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return { success: false, message: 'Could not reach server to register. ' + err.message };
  }
}
