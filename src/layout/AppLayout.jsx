import { IoIosSearch } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import './AppLayout.style.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AppLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [keyword, setKeyword] = useState('');

  const navigate = useNavigate()

  const searchByKeyword = (e) => { 
    e.preventDefault();
    //url을 바꿔주기
    navigate(`/movies?q=${keyword}`);
    setKeyword('');
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
        <div className='header-right'>
          <form className='form' onSubmit={searchByKeyword}>
            <input type="text" className='input' placeholder='Search' value={keyword} onChange={(e) => setKeyword(e.target.value)} />
            <button className='btn' type="submit"><IoIosSearch /></button>
          </form>
          <button className='hamburger-btn' onClick={() => setMenuOpen(prev => !prev)}>
            {menuOpen ? <IoClose /> : <RxHamburgerMenu />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className='mobile-menu'>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/movies" onClick={() => setMenuOpen(false)}>Movies</Link>
          <Link to="/tv" onClick={() => setMenuOpen(false)}>TV</Link>
        </div>
      )}

      <Outlet />
    </main>
  )
}

export default AppLayout
