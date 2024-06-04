import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//LINK APPROPRIATE PAGES
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import OrdersPage from './components/OrdersPage';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const uid = 'user123'; // GET USER ID TO USE LATER
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || {});

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  //CART PAGE
  const addToCart = (id, name, image, url, price) => {
    const newCart = { ...cart };
    if (newCart[id]) {
      newCart[id].quantity += 1;
      newCart[id].totalprice += price;
    } else {
      newCart[id] = { name, image, url, quantity: 1, totalprice: price };
    }
    setCart(newCart);
    alert(`${name} added to cart!`);
  };

  const handleCheckout = async () => {
    const date = new Date();
    const formattedCart = Object.keys(cart).map(id => ({
      orderId: uuidv4(),
      userId: uid,
      name: cart[id].name,
      date: date.toJSON(),
      url: cart[id].url,
      status: "Submitted",
      items: cart[id],
      total: cart[id].totalprice,
    }));

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedCart),
      });

      if (response.ok) {
        alert('Checkout successful!');
        setCart({});
      } else {
        alert('Checkout failed!');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Checkout failed!');
    }
  };

  return (
    <Router>
      <Switch>
        <Route path="/product/1">
          <ProductPage id="1" name="Product 1" imageUrl="/path/to/product1.jpg" addToCart={addToCart} price={100} />
        </Route>
        <Route path="/product/2">
          <ProductPage id="2" name="Product 2" imageUrl="/path/to/product2.jpg" addToCart={addToCart} price={200} />
        </Route>
        <Route path="/cart">
          <CartPage cart={cart} updateCart={setCart} handleCheckout={handleCheckout} />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/">
          <h1>Welcome to the Shopping Cart</h1>
          <p>Select a product:</p>
          <ul>
            <li><a href="/product/1">Product 1</a></li>
            <li><a href="/product/2">Product 2</a></li>
          </ul>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
