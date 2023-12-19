import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from 'react';
import Navbar from './component/navbar/Navbar';
import Footer from './component/footer/Footer';
import Loading from './component/loading/Loading';
import NotFound from './pages/notfound/NotFound';
import Hover from './pages/home/structure/Hover.jsx';
import Signin from './pages/auth/Signin';
import Login from './pages/auth/Login';
import { MyContextProvider } from './statemanagement/UserContextProvider';
import { ProductsProvider, UserProvider } from './statemanagement/UserContext.js';
import AddtoRoute from './component/route/AddtoRoute';
import Myaccount from './pages/profile/Myaccount';
import Product from './pages/product/Product';
import PrivateRoute from './component/route/PrivateRoute';
import Checkout from './pages/checkout/Checkout';
import Search from './pages/search/Search';
// import Addtocart from './pages/addtocart/Addtocart';
const Home = lazy(() => import('./pages/home/Home'));
const Productsingle = lazy(() => import('./component/singlepro/Productsingle'));
const Addtocart = lazy(() => import('./pages/addtocart/Addtocart'));
const About = lazy(() => import('./pages/about/About'));
const Prebook = lazy(() => import('./pages/prebook/Prebook'));
const Contact = lazy(() => import('./pages/contact/Contact'));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <MyContextProvider>
            <UserProvider>
              <ProductsProvider>
                <Navbar />
                <Routes>
                  <Route exact path='/' element={<Home />} />
                  <Route exact path='/Hover' element={<Hover />} />
                  <Route path="/product/:productId" element={<Productsingle />} />
                  <Route path="/buy/:productId" element={<Checkout/>} />
                  {/* <Route path=":productId" element={<Productsingle />} /> */}
                  <Route exact path='/notfound' element={<NotFound />} />
                  <Route exact path='/Signin' element={<Signin />} />
                  <Route exact path='/login' element={<Login />} />
                  <Route path="/account" element={<PrivateRoute />}>
                    <Route exact path='profile' element={<Myaccount />} />
                  </Route>
                  <Route path="/addtocart" element={<AddtoRoute />}>
                    <Route exact path='/addtocart' element={<Addtocart />} />
                  </Route>
                  <Route exact path='/about' element={<About />} />
                  <Route exact path='/prebook' element={<Prebook />} />
                  <Route exact path='/contact' element={<Contact />} />
                  <Route exact path='/myaccount' element={<Myaccount />} />
                  <Route exact path='/product' element={<Product />} />
                  <Route exact path='/search' element={<Search />} />
                </Routes>
                <Footer />
              </ProductsProvider>
            </UserProvider>
          </MyContextProvider>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;