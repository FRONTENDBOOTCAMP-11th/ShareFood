import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <div className="max-w-md m-auto relative font-sans text-font1">
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
