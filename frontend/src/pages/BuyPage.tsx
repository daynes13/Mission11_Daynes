import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function BuyPage () {
    const navigate = useNavigate();
    const { title, bookID, price } = useParams();
    const {addToCart} = useCart();
    const [showAlert, setShowAlert] = useState(false);

    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookID: Number(bookID),
            title: title || "No book found",
            price: Number(price) || 0
        };
        addToCart(newItem);
        setShowAlert(true);
    
        // Wait 1.5 seconds before navigating to the cart
        setTimeout(() => {
            navigate("/cart");
        }, 1500);
    };
    
    

    return (
        <>
        <WelcomeBand/>
        <div className="d-flex justify-content-center">
            <Card style={{ width: "18rem" }}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        <strong>Price: ${price}</strong>
                    </Card.Text>
                    {showAlert && <Alert variant="success">Book successfully added to cart!</Alert>}
                    <Button variant="primary" onClick={handleAddToCart}>
                        Add to Cart
                    </Button>
                    <Button variant="primary" onClick={() => navigate(-1)}>
                        Go back
                    </Button>
                </Card.Body>
            </Card>
        </div>

        </>
    );
}

export default BuyPage;