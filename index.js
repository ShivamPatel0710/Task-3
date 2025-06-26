console.log("Starting server...");

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON

// In-memory book list
let books = [
  { id:1, title: "Atomic Habits", author: "James Clear" },
  { id:2, title: "The Alchemist", author: "Paulo Coelho" }
];

// Root test route
app.get('/', (req, res) => {
  res.send('Book API is running...');
});

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required" });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// put : update a book by id
app.put('/books/:id', (req, res) => {
  const bookId = Number(req.params.id);  // safely convert to number
  const { title, author } = req.body;

  const bookIndex = books.findIndex(book => book.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (title) books[bookIndex].title = title;
  if (author) books[bookIndex].author = author;

  res.json({ message: "Book updated", book: books[bookIndex] });
});

//delete a book by id
app.delete('/books/:id', (req, res) => {
  const bookId = Number(req.params.id);
  const bookIndex = books.findIndex(book => book.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const deletedBook = books.splice(bookIndex, 1); // remove from array

  res.json({ message: "Book deleted", book: deletedBook[0] });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
