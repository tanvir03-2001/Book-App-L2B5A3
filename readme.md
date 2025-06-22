# 📚 Library Management API

A robust **Library Management System** built using **Express.js**, **TypeScript**, and **MongoDB (Mongoose)**. This API enables creation, retrieval, updating, deletion, and borrowing of books, while enforcing business logic like availability checks and borrow limits.

---

## 🚀 Project Overview

This project simulates a real-world **library system** with the following key features:

- **Book Management**: Add, update, delete, and retrieve books with validation.
- **Borrowing Logic**: Borrow books with availability check and automatic updates to stock.
- **Filtering & Sorting**: Get books filtered by genre, sorted by date, with pagination.
- **Data Aggregation**: Summarized reporting of borrowed books using MongoDB Aggregation Pipeline.
- **Advanced Mongoose Usage**:
  - Schema validation
  - Custom static/instance methods
  - Mongoose middleware (pre/post hooks)

---

## 🧹 Tech Stack

- **Backend Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB (with Mongoose ODM)

---

## 🔗 API Endpoints

### 📘 Book Routes

| Method | Endpoint             | Description                              |
| ------ | -------------------- | ---------------------------------------- |
| POST   | `/api/books`         | Create a new book                        |
| GET    | `/api/books`         | Get all books (filter, sort, pagination) |
| GET    | `/api/books/:bookId` | Get a single book by ID                  |
| PUT    | `/api/books/:bookId` | Update book details                      |
| DELETE | `/api/books/:bookId` | Delete a book                            |

### 🔄 Borrow Routes

| Method | Endpoint      | Description                             |
| ------ | ------------- | --------------------------------------- |
| POST   | `/api/borrow` | Borrow books with quantity and due date |
| GET    | `/api/borrow` | Aggregated summary of borrowed books    |

---

## 🧠 Business Logic Highlights

- Borrowing is restricted based on available copies.
- Book availability automatically updates if copies drop to 0.
- Mongoose middleware manages data integrity and timestamps.
- Aggregation pipeline returns per-book borrow summaries.

---

## ✅ Validation

- **Genre**: Must be one of `FICTION`, `NON_FICTION`, `SCIENCE`, `HISTORY`, `BIOGRAPHY`, `FANTASY`.
- **ISBN**: Must be unique.
- **Copies**: Non-negative integer.
- **Borrow quantity**: Positive integer.

---

## ❌ Error Handling

Standard error response format:

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number"
      }
    }
  }
}
```

Includes validation errors, 404s, and logical constraints.

---

## 📂 Folder Structure

```
src/
│
├── models/        // Mongoose schemas
├── routes/        // Express routers
├── controllers/   // Business logic
├── lib/           // Helpers and middleware
├── app.ts         // Express app setup
└── server.ts      // Entry point
```

---

## 📟 Bonus Section

✅ Clean and well-commented code\
✅ Accurate API structure and validation\
✅ Mongoose statics/middleware used\
✅ Video walkthrough provided\
✅ Professional documentation (this README)

---

## 🛠️ Getting Started

```bash
git clone https://github.com/tanvir03-2001/Book-App-L2B5A3.git
cd Book-App-L2B5A3
npm install
cp .env.example .env # Add your MongoDB URI
npm run dev
```

---

## 📌 Links

🔗 [Live App](https://assignment-3-vert-one.vercel.app)  
📂 [GitHub Repo](https://github.com/tanvir03-2001/Book-App-L2B5A3.git)  
📉 [Video Explanation](https://drive.google.com/drive/folders/1UkHJjIkNWXMq8PNBo7XVECZxeEmCw5cg?usp=drive_link)

---

## 🧠 Author

**Tanvir Ahmed**\
📧 [tanvir03.2001@gmail.com](mailto:your.email@example.com)\
🌐 https://code-with-tanvir.vercel.app/
