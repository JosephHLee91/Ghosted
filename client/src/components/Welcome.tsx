import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <section>
      <div className='mx-auto text-center px-4 py-16 max-w-screen-xl flex flex-col'>
        <h2 className='text-center text-6xl text-gray-700 font-bold tracking-tight'>
          Track your future with{' '}
          <span className='text-indigo-500 font-bold drop-shadow-md'>
            Ghosted
          </span>
        </h2>

        <p className='text-gray-500 mt-4 mx-auto max-w-2xl'>
          Take advantage of our centralized platform to track all your job
          applications. Effortlessly keep tabs on all the positions you've
          applied for, and monitor their progress in one place to make sure
          you'll never be <span className='italic'>Ghosted</span>.
        </p>

        <Link
          className='rounded-md bg-indigo-500 m-auto px-4 py-3 text-md mt-4 font-medium text-white transition hover:bg-indigo-600'
          to={'/signup'}
        >
          Start Tracking
        </Link>
      </div>
    </section>
  );
};

export default Welcome;
