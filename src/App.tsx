import { BrowserRouter } from 'react-router-dom'; // BrowserRouter로 변경
import './App.css';
import Main from './pages/main/main';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Main />
      </div>
    </BrowserRouter>
  );
}

export default App;
