import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './components/Home.tsx';
import JobForm from './components/JobForm.tsx';
import Login from './components/Login.tsx';
import Navbar from './components/Navbar.tsx';
import NotFound404 from './components/NotFound404';
import Resources from './components/Resources.tsx';
import ResourcesForm from './components/ResourcesForm.tsx';
import Signup from './components/Signup.tsx';
import TestimonialForm from './components/TestimonialForm';
import AuthContext from './contexts/AuthContext.ts';
import { refreshToken } from './services/auth.ts';

function App() {
  const [user, setUser] = useState(null);
  const [loginRestore, setLoginRestore] = useState<boolean>(false);
  const login = setUser;

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jwt');
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
            <Route path='/testimonials' element={<TestimonialForm />} />
            <Route path='/jobs' element={<JobForm />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/resources/add' element={<ResourcesForm />} />
            <Route path='*' element={<NotFound404 />} />
          </Routes>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
