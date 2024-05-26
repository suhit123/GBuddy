import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Product from './pages/products/Product';
import Products from './pages/products/Products';
import { CartProvider } from './context/cartContext';
import SignInSide from './pages/Signup';
import ResourceOptions from './pages/Resources/resourcesOptions';
import Library from './pages/Resources/Library';
import AddProduct from './pages/products/AddProduct';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/signup" element={<SignInSide/>} />
          <Route path="/resourceOptions" element={<ResourceOptions/>} />
          <Route path="/library" element={<Library/>}/>
          <Route path="/addProduct" element={<AddProduct/>}/>
        </Routes>
      </BrowserRouter>
      </CartProvider>
  );
}

export default App;
