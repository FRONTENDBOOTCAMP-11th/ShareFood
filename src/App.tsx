import { BrowserRouter } from 'react-router-dom'; // BrowserRouter로 변경
import './App.css';
import Footer from './components/Footer';
import SplashStart from './pages/splash/splashStart';

function App() {
  return (
    <BrowserRouter>
      <div>
        <SplashStart />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
