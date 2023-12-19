import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import Loading from '../component/loading/Loading';
const UserContext = createContext();
const ProductsContext = createContext();
const CartContext = createContext();
const ProfileContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function useProducts() {
  return useContext(ProductsContext);
}

// 2. Custom Hook Banayein
export function useCart() {
  return useContext(CartContext);
}

export function useProfile() {
  return useContext(ProfileContext);
}
// 3. Provider Component Banayein

export function UserProvider({ children }) {

  const [user, setUser] = useState(null);

  const [initializing, setInitializing] = useState(true);
  const login = (userData) => {
    // Implement login logic and set user state here
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    // Implement logout logic here
    localStorage.removeItem('user');
    setUser(null);
  };
  const initializeUser = async () => {
    // Simulate an async task such as fetching user data from a server
    // You should replace this with actual async logic
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // After initialization, set initializing to false
    setInitializing(false);
  };

  // Call the initialization function only once
  if (initializing) {
    initializeUser();
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {initializing ? (
        <div><Loading/></div>
      ) : (
        children
      )}

    </UserContext.Provider>
  );
}

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const secrets = 'youraregood';// Product data stat
  const product_views = () => {
    const payloads = {
      iss: "ecommerce",
      aud: "yourname"
    };
    const headers = {
      "alg": 'HS256',
    }
    const encodeHeader = btoa(JSON.stringify(headers));
    const payloadString = btoa(JSON.stringify(payloads));
    const signature = CryptoJS.HmacSHA256(encodeHeader + "." + payloadString, secrets).toString(CryptoJS.enc.Base64);
    const jwt = `${encodeHeader}.${payloadString}.${signature}`;
    console.log(jwt)
    axios.get('https://api.shreeaadyapicture.com/wayout.php', {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error posting data:', error);
      });
  };

  useEffect(() => {
    product_views();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Aur baki product management functions yahan add karein

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}


export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { user } = useUser();
  const secret = 'youraregood';
  // Update cart state
  const payload = {
    iss: "ecommerce",
    aud: "yourname"
  };
  const header = {
    "alg": 'HS256',
  }
  const encodeHeader = btoa(JSON.stringify(header));
  const payloadString = btoa(JSON.stringify(payload));
  const signature = CryptoJS.HmacSHA256(encodeHeader + "." + payloadString, secret).toString(CryptoJS.enc.Base64);
  const jwt = `${encodeHeader}.${payloadString}.${signature}`;
  const cart_views = () => {
    if (user) {
      axios.get(`https://api.shreeaadyapicture.com/Addtocart.php?user_id=${user.user_id}`, {
        headers: {
          'Content-Type': 'multipart/dataToPost',
          Authorization: `Bearer ${jwt}`
        },
      })
        .then((response) => {
          setCart([...cart, response.data]);
        })
        .catch((error) => {
          console.error('Error adding to cart:', error);
        });
    }
  };
  useEffect(() => {
    cart_views();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <CartContext.Provider value={{ cart }}>
      {children}
    </CartContext.Provider>
  );
}
export function ProfileProvider({ children }) {

  const [profile, setProfile] = useState([]);

  const { user } = useUser();

  const secret = 'youraregood';
  console.log(profile);
  const payload = {
    iss: "ecommerce",
    aud: "yourname"
  };
  const header = {
    "alg": 'HS256',
  }

  const encodeHeader = btoa(JSON.stringify(header));
  const payloadString = btoa(JSON.stringify(payload));
  const signature = CryptoJS.HmacSHA256(encodeHeader + "." + payloadString, secret).toString(CryptoJS.enc.Base64);
  const jwt = `${encodeHeader}.${payloadString}.${signature}`;

  const profile_views = () => {
    if (user) {
      axios.get(`https://api.shreeaadyapicture.com/profile.php?user_id=${user.user_id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`
        },
        })
        .then((response) => {
          setProfile(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error adding to cart:', error);
        });
    }
  };

  useEffect(() => {
    profile_views();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProfileContext.Provider value={{ profile }}>
      {children}
    </ProfileContext.Provider>
  );
}
