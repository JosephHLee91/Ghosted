import Welcome from './Welcome';
import Features from './Features';
import Testimonials from './Testimonials';
import HomeResources from './HomeResources';
import GetStarted from './GetStarted';
import Footer from './Footer';
import { useContext, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
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
