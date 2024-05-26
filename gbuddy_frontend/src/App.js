import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Product from './pages/products/Product';
import Products from './pages/products/Products';
import { CartProvider } from './context/cartContext';
import SignInSide from './pages/Signup';
import ResourceOptions from './pages/Resources/resourcesOptions';
import Library from './pages/Resources/Library';
import AddProduct from './pages/products/AddProduct';
import Chatbot from './pages/components/chatbot';
import HomePage from './pages/homePage';
import ProfilePage from './pages/profilePage';
import ResourceContribute from './pages/Resources/ResourceContribute';

function App() {
  return (
    <div>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/signup" element={<SignInSide/>} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/resourceOptions" element={<ResourceOptions/>} />
          <Route path="/library" element={<Library/>}/>
          <Route path="/addProduct" element={<AddProduct/>}/>
          <Route path="/resourceContribute" element={<ResourceContribute/>}/>
        </Routes>
        <Chatbot/> 
      </BrowserRouter>
      </CartProvider>
      </div>
  );
}

export default App;
