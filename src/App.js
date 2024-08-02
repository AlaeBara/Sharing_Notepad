import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
function App() {
  return (
    <>
    <Header/>
    <main className='min-h-[calc(100vh-120px)]'>
      <Outlet/>
    </main>
    </>
    
  );
}

export default App;
