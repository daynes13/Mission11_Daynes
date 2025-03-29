import { useState } from "react";
import BookFilter from "../components/BookFilter"
import BookList from "../components/BookList"
import WelcomeBand from "../components/WelcomeBand"
import CartSummary from "../components/CartSummary";


function BooksPage () {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return (
        <div className='container'>
          <CartSummary/>
          <WelcomeBand/>
        <div className='row'>
          <div className='col-md-4'>
            <BookFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
          </div>
          <div className='col-md-8'>
            <BookList selectedCategories={selectedCategories}/>
          </div>

        </div>
      </div>
    )
}

export default BooksPage;