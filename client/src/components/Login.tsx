import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { authenticate } from '../services/auth.ts';

const Login = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const [errorsBoolean, setErrorsBoolean] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const { login } = useContext(AuthContext);
  const [successErrorHeader, setSuccessErrorHeader] = useState<string>('');
  const currUser = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [alertStyle, setAlertStyle] = useState({
    opacity: '',
    transition: '',
  });
  const [popupStyle, setPopupStyle] = useState({
    background: '',
    header: '',
    body: '',
  });

  const formChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const formSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    authenticate(user)
      .then((userLogin) => {
        setErrors(['Login successful!']);
        setSuccessErrorHeader('Success');
        setPopupStyle({
          background: 'bg-green-100',
          header: 'text-green-900',
          body: 'text-green-800',
        });
        setErrorsBoolean(true);
        fadeOutAlert();

        setTimeout(() => {
          login(userLogin);
          navigate('/');
        }, 1000);
      })
      .catch((err) => {
        setErrors(err);
        setSuccessErrorHeader('Error');
        setPopupStyle({
          background: 'bg-red-100',
          header: 'text-red-900',
          body: 'text-red-800',
        });

        fadeOutAlert();
        setErrorsBoolean(true);
      });
  };

  const fadeOutAlert = () => {
    setAlertStyle({
      opacity: '1',
      transition: '',
    });

    setTimeout(() => {
      setAlertStyle({
        opacity: '0',
        transition: 'opacity .75s linear',
      });
    }, 2000);

    setTimeout(() => {
      setAlertStyle({
        opacity: '',
        transition: '',
      });
      setErrorsBoolean(false);
    }, 3000);
  };

  useEffect(() => {
    document.title = 'Ghosted - Login';
    if (currUser.user) {
      navigate('/dashboard');
    }

    if (location.state?.user) {
      setUser(location.state.user);
    } else {
      setUser({ username: '', password: '' });
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
              htmlFor='usernameInput'
            >
              Email
            </label>
            <input
              type='email'
              id='usernameInput'
              name='username'
              onChange={formChange}
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-100 focus:border-indigo-400'
              required
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
              required
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
      {errorsBoolean && (
        <div
          className={`${popupStyle.background} rounded p-4 w-4/6`}
          style={alertStyle}
        >
          <h3 className={`block ${popupStyle.header} font-medium`}>
            {successErrorHeader}
          </h3>
          <ul>
            {errors?.map((err, i) => (
              <li key={i} className='m-auto'>
                <p className={`mt-2 ${popupStyle.body} text-sm`}>
                  {err.charAt(0).toUpperCase() + err.slice(1)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Login;
