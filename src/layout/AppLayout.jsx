import { IoIosSearch } from "react-icons/io";
import './AppLayout.style.css';
import { Link, Outlet } from 'react-router-dom';

const AppLayout = () => {
  const handleSubmit = (e) => { 
    e.preventDefault();
  }
  
  return (
    <main className='main'>
      <header>
        <div className='logo-nav'>
          <h1>
            <Link to="/">
              <img width={200} src="/logo.png" alt="넷플릭스 로고" />
            </Link>  
          </h1>
          <nav className='nav'>
          <ul className='nav-list'>
            <Link to="/">
              <li className='nav-item'>Home</li>
            </Link>
            <Link to="/movies">
              <li className='nav-item'>Movies</li>
            </Link>
            <Link to="/tv">
              <li className='nav-item'>TV</li>
            </Link>  
          </ul>
          </nav>
        </div>
        <form className='form' onSubmit={handleSubmit}>
          <input type="text" className='input' placeholder='Search' />
          <button
            className='btn'
            type="submit"><IoIosSearch /></button>
        </form>
      </header>
      <Outlet />
    </main>  
  )
}

export default AppLayout
