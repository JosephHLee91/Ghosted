import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { authenticate } from '../services/auth.ts';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState(false);
  const login = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const formChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const formSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    authenticate(user)
      .then((userLogin) => {
        // Set possible timeout to keep success message on signup page
        login(userLogin);
        navigate('/');
      })
      .catch(() => {
        setErrors(true);
      });
  };

  useEffect(() => {
    document.title = 'Ghosted - Login';
    if (location.state?.user) {
      setUser(location.state.user);
    } else {
      setUser({ email: '', password: '' });
    }
  }, [location.state]);

  return (
    <div className='w-full max-w-lg flex flex-col m-auto items-center justify-center items-center h-5/6'>
      <h3 className='text-2xl text-gray-800 font-bold text-center mb-2'>
        Login
      </h3>
      <div style={{ display: 'none' }}>Placeholder success/error</div>
      <form
        onSubmit={formSubmit}
        className='w-full bg-slate-50 max-w-lg border-2 border-indigo-500 rounded-md p-6'
      >
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='emailInput'
            >
              Email
            </label>
            <input
              type='email'
              id='emailInput'
              name='email'
              onChange={formChange}
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-100 focus:border-indigo-400'
            />
          </div>

          <div className='w-full px-3'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='passwordInput'
            >
              Password
            </label>
            <input
              type='password'
              id='passwordInput'
              name='password'
              onChange={formChange}
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-100 focus:border-indigo-400'
            />
          </div>
        </div>
        <div className='w-full text-center'>
          <button
            type='submit'
            className='bg-indigo-500 transition hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded'
          >
            Login
          </button>
        </div>
      </form>
      <div className='mt-2 pl-4 text-sm font-medium'>
        <span className='text-gray-700'>
          New to Ghosted?{' '}
          <Link
            to={'/signup'}
            className='text-indigo-600 transition hover:text-indigo-900'
          >
            Sign Up
          </Link>
        </span>
      </div>
      {errors && <div>Errors Location</div>}
    </div>
  );
};

export default Login;
