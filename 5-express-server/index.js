const express = require("express");
const { connectToMongoDB } = require("./database");

const app = express();
app.use(express.json());

const isValidBook = (book) => {
  if (typeof book !== "object" || book === null) return false;

  const requiredFields = ["title", "author"];
  for (const field of requiredFields) {
    if (!book.hasOwnProperty(field) || typeof book[field] !== "string") {
      return false;
    }
  }
  return true;
};

app.get("/books", async (req, res) => {
  try {
    const client = await connectToMongoDB();
    const books = await client.collection("books").find({}).toArray();
    res.json(books);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Internal Server Error" });
  }
});

app.post("/books", async (req, res) => {
  try {
    const client = await connectToMongoDB();
    const books = await client.collection("books").find({}).toArray();

    const booksLength = books.length;

    if (Array.isArray(req.body)) {
      if (req.body.length === 0) {
        throw new Error("Empty array provided");
      }

      const books = req.body.map((book, index) => {
        if (!isValidBook(book)) {
          throw new Error("Invalid book object schema");
        }
        return { ...book, id: booksLength + 1 };
      });
      const insertBooks = await client.collection("books").insertMany(books);

      console.log(insertBooks);

      res.status(201).json(books);
    } else {
      let newBook = req.body;

      if (!isValidBook(newBook)) {
        throw new Error("Invalid book object schema");
      }

      newBook.id = booksLength + 1;

      const insertBook = await client.collection("books").insertOne(newBook);
      console.log(insertBook);

      res.status(201).json(newBook);
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err.message || "Internal Server Error" });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const bookId = parseInt(req.params.id, 10);
    const updatedBook = req.body;
    if (!isValidBook(updatedBook)) {
      throw new Error("Invalid book object schema");
    }

    const client = await connectToMongoDB();
    const updateBookResult = await client
      .collection("books")
      .updateOne({ id: bookId }, { $set: updatedBook }, { upsert: false });

    if (updateBookResult.matchedCount === 0) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res
        .status(200)
        .json({ message: "Book updated successfully", updatedBookResult });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message || "Bad Request" });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const client = await connectToMongoDB();
    const collection = client.collection("books");
    
    const bookId = parseInt(req.params.id, 10);

    const result = await collection.deleteOne({ id: bookId });

    if (result.deletedCount === 0) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res.status(200).json({ message: "Book deleted successfully", result });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, (req, res) => {
  console.log("Server is running");
});
