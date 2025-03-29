import './App.css';
import BooksPage from './pages/BooksPage'; // Fixing the name to match the import
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import BuyPage from './pages/BuyPage';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
    <CartProvider>
      <Router>
        <Routes> 
          <Route path='/' element={<BooksPage />} />
          <Route path='books' element={<BooksPage/>} />
          <Route path='/buy/:title/:bookID/:price' element={<BuyPage />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
    </>
    
  );
}

export default App;
