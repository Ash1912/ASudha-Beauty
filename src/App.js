import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { GiftCardProvider } from './context/GiftCardContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import WishlistPage from './pages/WishlistPage';
import SearchPage from './pages/SearchPage';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import GiftCards from './pages/GiftCards';

// New Pages - Add these imports
import Testimonials from './pages/Testimonials';
import AffiliateProgram from './pages/AffiliateProgram';
import BecomePartner from './pages/BecomePartner';
import TermsConditions from './pages/TermsConditions';
import SizeGuide from './pages/SizeGuide';
import TrackOrder from './pages/TrackOrder';
import ReturnsExchanges from './pages/ReturnsExchanges';
import ShippingInfo from './pages/ShippingInfo';
import FAQs from './pages/FAQs';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <GiftCardProvider>
                  <div style={styles.app}>
                    <Navbar />
                    <main style={styles.main}>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/wishlist" element={<WishlistPage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:id" element={<BlogPost />} />
                        <Route path="/gift-cards" element={<GiftCards />} />
                        
                        {/* New Routes - Add these */}
                        <Route path="/testimonials" element={<Testimonials />} />
                        <Route path="/affiliate" element={<AffiliateProgram />} />
                        <Route path="/partners" element={<BecomePartner />} />
                        <Route path="/terms" element={<TermsConditions />} />
                        <Route path="/size-guide" element={<SizeGuide />} />
                        <Route path="/track-order" element={<TrackOrder />} />
                        <Route path="/returns" element={<ReturnsExchanges />} />
                        <Route path="/shipping" element={<ShippingInfo />} />
                        <Route path="/faqs" element={<FAQs />} />
                        
                        {/* Protected Routes */}
                        <Route path="/checkout" element={
                          <ProtectedRoute>
                            <Checkout />
                          </ProtectedRoute>
                        } />
                        <Route path="/profile" element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        } />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                      </Routes>
                    </main>
                    <Footer />
                  </div>
                </GiftCardProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </HelmetProvider>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    flex: 1
  }
};

export default App;