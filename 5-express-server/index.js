const express = require("express");

const app = express();
app.use(express.json());

let books = [
  { id: 1, title: "Book 1", author: "Author 1" },
  { id: 2, title: "Book 2", author: "Author 2" },
];

app.get("/books", (req, res) => {
  res.json(books);
});

app.post("/books", (req, res) => {
  console.log(req.body);

  let newBook = req.body;
  newBook.id = books.length + 1;
  books.push(newBook);

  res.status(201).json(newBook);
});

app.put("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    const updatedBook = req.body;
    const index = books.findIndex(book => book.id == bookId);
    
    if (index == -1) {
        res.status(404).send('Book not found');
    }
    else {
        books[index] = { ...books[index], ...updatedBook }
        res.json(books[index]);
    }
});
  
app.delete("/books/:id", (req, res) => { 
    const bookId = parseInt(req.params.id);
    const index = books.findIndex(book => book.id == bookId);

    if (index == -1) {
        res.status(404).json({ error: 'Book not found' });
    }
    else {
        const deletedBook = books[index];
        books.splice(index, 1);

        res.status(200).json(deletedBook);
    }
})

app.listen(3000, (req, res) => {
  console.log("Server is running");
});
