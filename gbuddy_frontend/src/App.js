
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import Loginpage from './pages/login';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Loginpage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
