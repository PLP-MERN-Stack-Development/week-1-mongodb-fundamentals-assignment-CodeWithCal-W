//  * Finding all books in a specific genre
db.books.find({ genre: "Fiction" });

//  * Finding books published after a certain year
db.books.find({ published_year: { $gt: 1900 } });

//  * Finding books by a specific author
db.books.find({ author: "George Orwell" });

//  * Updating the price of a book
db.books.updateOne(
  { title: "To Kill a Mockingbird" },
  { $set: { price: 14.99 } }
);

// * Deleting a book by title
db.books.deleteOne({ title: "To Kill a Mockingbird" });

// * ADVANCED QUERIES
// * Finding books in stock and published after 1910
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// * Sorting books by price in ascending and descending order
db.books.find().sort({ price: 1 }); // Ascending  
db.books.find().sort({ price: -1 }); // Descending

// * Projection to only show author, title, and price
db.books.find({}, { author: 1, title: 1, price: 1 });

// * Pagination
db.books.find().skip(0).limit(5); // page 1  
db.books.find().skip(5).limit(5); // page 2

// * AGGREGATION
// * Average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avg_price: { $avg: "$price" } } }
]);

// * Author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

// * Grouping books by publication decade and counting them
db.books.aggregate([
  {
    $group: {
      _id: { $floor: { $divide: ["$published_year", 10] } },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } } // Sort by decade
]);

// * INDEXING
// * Create an index on title 
db.books.createIndex({ title: 1 });

// * Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });

// * Use (explain) to analyze query performance
db.books.find({ author: "George Orwell" }).explain("executionStats");