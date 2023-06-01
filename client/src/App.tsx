import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Login.tsx';
import Signup from './components/Signup.tsx';
import Navbar from './components/Navbar.tsx';
import Home from './components/Home.tsx';
import Resources from './components/Resources.tsx';
import AuthContext from './contexts/AuthContext.ts';
import { refreshToken } from './services/auth.ts';

function App() {
  const [user, setUser] = useState(null);
  const [loginRestore, setLoginRestore] = useState<boolean>(false);
  const login = setUser;

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jtw');
  };

  useEffect(() => {
    refreshToken()
      .then(setUser)
      .catch(() => {
        logout();
      })
      .finally(() => {
        setLoginRestore(true);
      });
  }, []);

  if (!loginRestore) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <div className='App'>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/resources' element={<Resources />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
