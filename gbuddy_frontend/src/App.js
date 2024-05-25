import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Product from './pages/products/Product';
import Products from './pages/products/Products';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
