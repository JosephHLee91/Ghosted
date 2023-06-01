import { SyntheticEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createAccount } from '../services/auth';
const Signup = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [errors, setErrors] = useState(false);
  const navigate = useNavigate();

  const formChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const formSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    createAccount(user)
      .then((userLogin) => {
        // Set possible timeout to keep success message on signup page
        navigate('/', {
          state: { message: 'Account successfully created!', user },
        });
      })
      .catch((err) => {
        setErrors(true);
      });
  };

  useEffect(() => {
    document.title = 'Ghosted - Sign Up';
  }, []);

  return (
    <div className='w-full max-w-lg flex flex-col m-auto items-center justify-center items-center h-5/6'>
      <h3 className='text-2xl text-gray-800 font-bold text-center mb-2'>
        Sign Up
      </h3>
      <div style={{ display: 'none' }}>Placeholder success/error</div>
      <form
        onSubmit={formSubmit}
        className='w-full bg-slate-50 max-w-lg border-2 border-indigo-500 rounded-md p-6'
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
      {errors && <div>Errors Location</div>}
    </div>
  );
};

export default Signup;
