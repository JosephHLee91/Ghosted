import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import Features from './Features';
import Footer from './Footer';
import GetStarted from './GetStarted';
import HomeResources from './HomeResources';
import Testimonials from './Testimonials';
import Welcome from './Welcome';

const Home = () => {
  const navigate = useNavigate();
  const currUser = useContext(AuthContext);

  useEffect(() => {
    document.title = 'Ghosted - Track your job apps';
    if (currUser.user) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <div>
      <Welcome />
      <Features />
      <Testimonials />
      <HomeResources />
      <GetStarted />
      <Footer />
    </div>
  );
};

export default Home;
