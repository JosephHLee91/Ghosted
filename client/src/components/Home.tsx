import { useContext, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const currUser = useContext(AuthContext);

  useEffect(() => {
    document.title = 'Ghosted';
    if (currUser.user) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <div>
      <h1>Home Route Placeholder</h1>
    </div>
  );
};

export default Home;
