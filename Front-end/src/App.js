import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';

function App() {
  const location = useLocation();
  const hideHeaderPaths = ['/login', '/sign-up'];

  return (
    <>
      {!hideHeaderPaths.includes(location.pathname)}
      <main className='min-h-[calc(100vh-120px)]'>
        <Outlet />
      </main>
    </>
  );
}

export default App;
