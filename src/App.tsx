import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';

function App() {
  return (
    <div className="max-w-md m-auto relative font-sans">
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
