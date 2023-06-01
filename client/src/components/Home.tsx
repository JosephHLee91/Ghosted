import { useEffect } from 'react';
const Home = () => {
  useEffect(() => {
    document.title = 'Ghosted';
  }, []);

  return (
    <div>
      <h1>Home Route Placeholder</h1>
    </div>
  );
};

export default Home;
