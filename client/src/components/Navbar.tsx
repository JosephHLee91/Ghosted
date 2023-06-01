import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className='bg-slate-50 border-b border-indigo-500 mb-6'>
      <div className='mx-auto flex h-14 max-w-screen-xl items-center gap-6 px-1'>
        <Link
          className='text-xl text-gray-800 transition font-bold hover:animate-pulse hover:text-indigo-700'
          to={'/'}
        >
          Ghosted
        </Link>

        <div className='flex flex-1 items-center justify-between'>
          <nav className=''>
            <ul className='flex items-center gap-4 text-sm font-medium'>
              <li>
                <a
                  className='text-gray-600 transition hover:text-gray-500/80'
                  href='/#features'
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  className='text-gray-600 transition hover:text-gray-500/80'
                  href='/#testimonials'
                >
                  Testimonials
                </a>
              </li>

              <li>
                <Link
                  className='text-gray-600 transition hover:text-gray-500/80'
                  to={'/resources'}
                >
                  Resources
                </Link>
              </li>
            </ul>
          </nav>

          <div className='flex items-center gap-2'>
            <div className='flex gap-2'>
              <Link
                className='rounded-md bg-indigo-500 m-auto px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-600'
                to={'/login'}
              >
                Login
              </Link>

              <Link
                className='rounded-md bg-gray-300/75 m-auto px-3 py-2 text-sm font-medium text-indigo-500 transition hover:text-indigo-700 hover:bg-gray-300'
                to={'/signup'}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
