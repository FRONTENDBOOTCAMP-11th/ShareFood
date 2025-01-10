import { Outlet } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ko';
import './App.css';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <div className="max-w-md m-auto relative font-sans text-font1">
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </LocalizationProvider>
  );
}

export default App;
