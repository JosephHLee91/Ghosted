import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NotFound404 = () => {
  const [alertStyle, setAlertStyle] = useState({
    opacity: '',
    transition: '',
  });
  const fadeOutAlert = () => {
    setAlertStyle({
      opacity: '0',
      transition: '',
    });

    setTimeout(() => {
      setAlertStyle({
        opacity: '1',
        transition: 'opacity .75s linear',
      });
    }, 1000);

    setTimeout(() => {
      setAlertStyle({
        opacity: '',
        transition: '',
      });
    }, 2000);
  };

  useEffect(() => {
    document.title = 'Ghosted - Not Found';
    fadeOutAlert();
  }, []);

  return (
    <div className='grid place-content-center h-[calc(100vh-150px)] my-auto px-4'>
      <div className='text-center'>
        <p className='text-indigo-500 font-bold drop-shadow-md text-6xl tracking-tight'>
          Ghosted?
        </p>

        <div style={alertStyle}>
          <p className='text-gray-500 mt-4'>
            Just kidding! We can't find that page you were looking for.
          </p>

          <Link
            className='inline-block rounded-md bg-indigo-500 m-auto px-4 py-3 text-md mt-4 font-medium text-white transition hover:bg-indigo-600'
            to={'/'}
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound404;
