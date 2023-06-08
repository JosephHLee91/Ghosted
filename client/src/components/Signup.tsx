import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { createAccount } from '../services/auth';
const Signup = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [errorsBoolean, setErrorsBoolean] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [successErrorHeader, setSuccessErrorHeader] = useState<string>('');
  const currUser = useContext(AuthContext);
  const navigate = useNavigate();

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

    if (user.password !== user.passwordConfirm) {
      setErrors(['Passwords must match']);
      setSuccessErrorHeader('Error');
      setPopupStyle({
        background: 'bg-red-100',
        header: 'text-red-900',
        body: 'text-red-800',
      });

      fadeOutAlert();
      setErrorsBoolean(true);
    } else {
      createAccount(user)
        .then((userLogin) => {
          setErrors(['Account successfully created!']);
          setSuccessErrorHeader('Success');
          setPopupStyle({
            background: 'bg-green-100',
            header: 'text-green-900',
            body: 'text-green-800',
          });
          setErrorsBoolean(true);
          fadeOutAlert();

          setTimeout(() => {
            navigate('/login', {
              state: { message: 'Account successfully created!', user },
            });
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
    }
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
    document.title = 'Ghosted - Sign Up';
    if (currUser.user) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <div className='w-full max-w-lg flex flex-col m-auto items-center justify-center items-center h-5/6'>
      <h3 className='text-2xl text-gray-800 font-bold text-center mb-2'>
        Sign Up
      </h3>
      <div style={{ display: 'none' }}>Placeholder success/error</div>
      <form
        onSubmit={formSubmit}
        className='w-full bg-slate-50 drop-shadow-md max-w-lg border-2 border-indigo-500 rounded-md p-6'
      >
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              htmlFor='firstNameInput'
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            >
              First Name
            </label>
            <input
              type='text'
              id='firstNameInput'
              name='firstName'
              onChange={formChange}
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-100 focus:border-indigo-400'
              required
            />
          </div>
          <div className='w-full md:w-1/2 px-3'>
            <label
              htmlFor='lastNameInput'
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            >
              Last Name
            </label>
            <input
              type='text'
              id='lastNameInput'
              name='lastName'
              onChange={formChange}
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-100 focus:border-indigo-400'
              required
            />
          </div>
        </div>
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
              required
            />
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              htmlFor='passwordInput'
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            >
              Password
            </label>
            <input
              type='password'
              id='passwordInput'
              name='password'
              onChange={formChange}
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-100 focus:border-indigo-400'
              required
            />
          </div>
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              htmlFor='passwordConfirm'
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            >
              Confirm Password
            </label>
            <input
              type='password'
              id='passwordConfirm'
              name='passwordConfirm'
              onChange={formChange}
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-100 focus:border-indigo-400'
              required
            />
          </div>
        </div>
        <div className='w-full text-center'>
          <button
            type='submit'
            className='bg-indigo-500 transition hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded'
          >
            Create Account
          </button>
        </div>
      </form>
      <div className='mt-2 pl-4 text-sm font-medium'>
        <span className='text-gray-700'>
          Already have an account?{' '}
          <Link
            to={'/login'}
            className='text-indigo-600 transition hover:text-indigo-900'
          >
            Log In
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

export default Signup;
