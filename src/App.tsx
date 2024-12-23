import { BrowserRouter } from 'react-router-dom'; // BrowserRouter로 변경
import './App.css';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
