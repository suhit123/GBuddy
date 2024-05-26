import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Product from './pages/products/Product';
import Products from './pages/products/Products';
import { CartProvider } from './context/cartContext';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </BrowserRouter>
      </CartProvider>
  );
}

export default App;
