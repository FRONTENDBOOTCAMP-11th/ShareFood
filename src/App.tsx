import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  );
}

export default App;
