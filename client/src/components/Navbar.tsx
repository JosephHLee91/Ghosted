import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const currUser = useContext(AuthContext);

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
              {currUser?.user ? (
                <div className='flex items-center gap-4'>
                  <li>
                    <Link
                      className='text-gray-600 transition hover:text-gray-500/80'
                      to={'/dashboard'}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      className='text-gray-600 transition hover:text-gray-500/80'
                      to='/testimonials'
                    >
                      Testimonials
                    </Link>
                  </li>
                </div>
              ) : (
                <div className='flex items-center gap-4'>
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
                </div>
              )}

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
            {currUser?.user ? (
              <div className='flex gap-2'>
                <Link
                  className='block uppercase m-auto tracking-wide text-gray-600 transition text-xs font-bold mb-2 hover:text-gray-500/80'
                  to={'/user'}
                >
                  {currUser?.user.sub}
                </Link>

                <button
                  className='rounded-md bg-gray-300/75 m-auto px-3 py-2 text-sm font-medium text-indigo-500 transition hover:text-indigo-700 hover:bg-gray-300'
                  onClick={() => {
                    currUser.logout();
                    navigate('/');
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
