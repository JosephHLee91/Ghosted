import { Link } from 'react-router-dom';

const GetStarted = () => {
  return (
    <section>
      <div className='mx-auto text-center px-4 py-16 max-w-screen-xl flex flex-col'>
        <p className='text-center text-4xl text-gray-700 font-extrabold tracking-tight'>
          Want to try out{' '}
          <span className='text-indigo-500 drop-shadow-md'>Ghosted</span> for
          yourself?
        </p>

        <p className='text-gray-500 mt-4 mx-auto max-w-sm'>
          Keep track of all your job applications in one place to make sure
          you'll never be <span className='italic'>Ghosted</span>.
        </p>

        <Link
          className='rounded-md bg-indigo-500 m-auto px-4 py-3 text-md mt-4 font-medium text-white transition hover:bg-indigo-600'
          to={'/signup'}
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default GetStarted;
