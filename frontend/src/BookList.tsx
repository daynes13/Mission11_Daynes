import { useEffect, useState } from "react";
import { Book } from "./types/Book";

function BookList() {

    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch("https://localhost:5000/book");
            const data = await response.json();
            setBooks(data);
        };

        fetchBooks();
    }, []);

    return (
        <>
            <h1>Book List</h1>
            <br />
            {books.map((b) => 
                <div id="bookCard">
                    <h3>{b.title}</h3>
                    <ul>
                        <li>{b.author}</li>
                        <li>{b.publisher}</li>
                        <li>ISBN: {b.isbn}</li>
                        <li>Category: {b.classification}</li>
                        <li>{b.pageCount} pages</li>
                        <li>Price: ${b.price}</li>
                    </ul>
                </div>
                )}
        </>

    );
}

export default BookList;