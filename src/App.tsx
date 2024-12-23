import { BrowserRouter } from 'react-router-dom'; // BrowserRouter로 변경
import './App.css';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* Footer 컴포넌트 */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
