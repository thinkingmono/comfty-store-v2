import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ProductsProvider } from './context/products_context';
import { FilterProvider } from './context/filter_context';
import { CartProvider } from './context/cart_context';
import { UserProvider } from './context/user_context';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    //Wrap entire application into Auth0 Provider to enable user authentication in all app.
    //Provide domain and client id environment variables. store authentication into browser's local storage
    <Auth0Provider
        domain={process.env.REACT_APP_AUTH_DOMAIN}
        clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
        authorizationParams={{
            redirect_uri: window.location.origin
        }}
        cacheLocation='localstorage'
    >
        {/* User context */}
        <UserProvider>
            {/* Products context */}
            <ProductsProvider>
                {/* Filter context */}
                <FilterProvider>
                    {/* Cart context */}
                    <CartProvider>
                        <App />
                    </CartProvider>
                </FilterProvider>
            </ProductsProvider>
        </UserProvider>
    </Auth0Provider>
);
