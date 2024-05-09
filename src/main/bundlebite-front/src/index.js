import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import './css/auth.css'
import './css/header.css'
import './css/homepage.css'
import './css/suppliers.css'
import './css/sidebar.css'
import './css/orders.css'
import './css/all_orders.css'
import './css/all_users.css'
import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);
