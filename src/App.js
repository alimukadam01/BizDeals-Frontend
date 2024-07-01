import './App.css';

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import LandingPage from './components/pages/Landing';
import NavHead from './components/pages/partials/NavHead';
import Footer from './components/pages/partials/Footer';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';

import Checkout from './components/pages/Checkout';
import { useEffect, useState } from 'react';
import BusinessList from './components/pages/BusinessList';
import BusinessDetail from './components/pages/BusinessDetail';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Preloader from './components/pages/Preloader';
import SellPage from './components/pages/SellPage';
import Account from './components/pages/Account';
import BusinessEdit from './components/pages/BusinessEdit';

import { AuthProvider, useAuth } from './components/context/Auth';
import ProtectedRoute from './components/context/ProtectedRoute';
import CheckoutSuccess from './components/pages/CheckoutSuccess';
import CheckoutFail from './components/pages/CheckoutFail';

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js/pure"

const stripe_key = 'pk_test_51NIuP9AtptvsQ5QyvN7x85kJ3JNmHGqdSLb4U6lsx0pIh8Gbz3NqpThu3yGF5z5KNh9jdpjAY4yhox45tBWY5ddH00TaWzQ0rw';
const stripePromise = loadStripe(stripe_key);


function App() {

  const [loading, setLoading] = useState(false);




  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000)

    document.title = "BizDeals";

  }, [])


  const isUserLoggedIn = localStorage.getItem('user_name');









  return (
    <div className="App">

      {loading ?

        <Preloader />
        :



        <div className="app-content">



          <Router>


            <AuthProvider>
              <NavHead />

              <Routes>


                <Route path="/" element={<LandingPage />} />


                {/* <Route path="/home" element={<Home />} /> */}

                <Route path='/' element={<ProtectedRoute />}>
                  <Route path='/home' element={<Home />} />
                  <Route path="/businesses/:category" element={<BusinessList />} />
                  <Route path="/business/:id" element={<BusinessDetail />} />

                  <Route path="/checkout/:id" element={<Elements stripe={stripePromise}><Checkout /></Elements>} />
                  <Route path="/checkout/success" element={<Elements stripe={stripePromise}><CheckoutSuccess /></Elements>} />
                  <Route path="/checkout/fail" element={<Elements stripe={stripePromise}><CheckoutFail /></Elements>} />

                  <Route path="/sell" element={<SellPage />} />
                  <Route path="/edit/:id" element={<BusinessEdit />} />
                  <Route path="/account" element={<Account />} />

                </Route>

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />



                <Route path="*" element={<NotFound />} />

              </Routes>
            </AuthProvider>
          </Router>


          <Footer />
        </div>

      }
    </div>
  );
}

export default App;
