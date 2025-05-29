import { useState } from "react";
import CustomerForm from "./components/CustomerForm";
import HotelList from "./components/HotelList";
import Cart from "./components/Cart";
import React from "react";
import "./styles.css";

function App() {
  const [customer, setCustomer] = useState<{
    name: string;
    budget: number;
  } | null>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [view, setView] = useState<"form" | "list" | "cart">("form");

  const handleAddToCart = (hotel: any) => {
    const total = cart.reduce((sum, p) => sum + p.price, 0) + hotel.price;
    if (customer && total > customer.budget) {
      alert("Has superado tu presupuesto!");
      return;
    }
    setCart([...cart, hotel]);
  };

  const handleRemove = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleClear = () => {
    setCart([]);
  };

  const handleViewCart = () => {
    setView("cart");
  };

  const handleGoBackToList = () => {
    setView("list");
  };

  if (!customer) {
    return (
      <CustomerForm
        onSubmit={(name, budget) => {
          setCustomer({ name, budget });
          setView("list"); 
        }}
      />
    );
  }

  return (
    <div className="app-container">
      <h1>Bienvenido, {customer.name}</h1>
      <p>Presupuesto: ${customer.budget}</p>

     
      <div className="cart-button" onClick={handleViewCart}>
        .({cart.length})
      </div>

      {view === "list" && (
        <div>
        
          <HotelList onAdd={handleAddToCart} />
        </div>
      )}

      {view === "cart" && (
        <div>
         
          <Cart
            items={cart}
            budget={customer.budget}
            onRemove={handleRemove}
            onClear={handleClear}
            onClose={() => setView("list")}
          />
        </div>
      )}
    </div>
  );
}

export default App;
