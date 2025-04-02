import { Book } from '../types/Book';

interface FetchBooksResponse {
  books: Book[];
  totalNumBooks: number;
}

const API_URL = 'https://bookstoreproject-backend.azurewebsites.net/book';

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[],
  sortByTitle: boolean
): Promise<FetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
      .join('&');
    const response = await fetch(
      `${API_URL}/allbooks/?pageSize=${pageSize}&pageNum=${pageNum}&sortByTitle=${sortByTitle}${selectedCategories.length ? `&${categoryParams}` : ''}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching books', error);
    throw error;
  }
};

export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/AddBook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error('Failed to add book');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding book', error);
    throw error;
  }
};

export const updateBook = async (
  bookID: number,
  updatedBook: Book
): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/UpdateBook/${bookID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    });

    if (!response.ok) {
      // Optional: log or handle different status codes
      throw new Error(`Failed to update book. Status: ${response.status}`);
    }

    return await response.json(); // ✅ only called if response was OK
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

export const deleteBook = async (bookID: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteBook/${bookID}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete book');
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};
