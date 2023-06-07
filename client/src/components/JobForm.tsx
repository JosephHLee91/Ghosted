import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { add } from '../services/jobs.ts';

const JobForm = () => {
  const [errorsBoolean, setErrorsBoolean] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [successErrorHeader, setSuccessErrorHeader] = useState<string>('');
  const currUser = useContext(AuthContext);
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: '',
    company: '',
    dateApplied: '',
    link: '',
    status: 'APPLIED',
    location: 'REMOTE',
    appUserId: currUser?.user?.user_id,
  });

  const [alertStyle, setAlertStyle] = useState({
    opacity: '',
    transition: '',
  });
  const [popupStyle, setPopupStyle] = useState({
    background: '',
    header: '',
    body: '',
  });

  const formSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const formSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(job);
    e.preventDefault();
    add(job)
      .then(() => navigate('/dashboard'))
      .catch((errors: any) => {
        if (errors) {
          setErrors(errors);
        } else {
          navigate('/error');
        }
      });
  };

  const formChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    document.title = 'Ghosted - Add Job';
    // if (!currUser.user) {
    //   navigate("/login");
    // }
  }, []);

  return (
    <div className='w-full max-w-lg flex flex-col m-auto items-center justify-center items-center h-5/6'>
      <h3 className='text-2xl text-gray-800 font-bold text-center mb-2'>
        Add Application
      </h3>
      <form
        onSubmit={formSubmit}
        className='w-full bg-slate-50 max-w-lg border-2 border-indigo-500 rounded-md p-6'
      >
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              htmlFor='titleInput'
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            >
              Title
            </label>
            <input
              type='text'
              id='titleInput'
              name='title'
              onChange={formChange}
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-100 focus:border-indigo-400'
            />
          </div>
          <div className='w-full md:w-1/2 px-3'>
            <label
              htmlFor='companyInput'
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            >
              Company
            </label>
            <input
              type='text'
              id='companyInput'
              name='company'
              onChange={formChange}
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-100 focus:border-indigo-400'
            />
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              htmlFor='dateAppliedInput'
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            >
              Date Applied
            </label>
            <input
              type='date'
              id='dateAppliedInput'
              name='dateApplied'
              onChange={formChange}
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-100 focus:border-indigo-400'
            />
          </div>
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              htmlFor='linkConfirm'
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            >
              Link
            </label>
            <input
              type='text'
              id='linkConfirm'
              name='link'
              onChange={formChange}
              className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-100 focus:border-indigo-400'
            />
          </div>
        </div>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='testimonialMessage'
            >
              Location
            </label>

            <select
              name='location'
              id='location'
              className='block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-6 leading-tight focus:outline-none focus:bg-gray-100 focus:border-indigo-400'
              onChange={formSelectChange}
              required
            >
              <option value='REMOTE'>REMOTE</option>
              <option value='HYBRID'>HYBRID</option>
              <option value='ONSITE'>ONSITE</option>
            </select>
          </div>
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <label
              className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
              htmlFor='testimonialMessage'
            >
              Status
            </label>

            <select
              name='status'
              id='status'
              className='block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-6 leading-tight focus:outline-none focus:bg-gray-100 focus:border-indigo-400'
              onChange={formSelectChange}
              required
            >
              <option value='APPLIED'>APPLIED</option>
              <option value='ACCEPTED'>ACCEPTED</option>
              <option value='DECLINED'>DECLINED</option>
              <option value='GHOSTED'>GHOSTED</option>
              <option value='REJECTED'>REJECTED</option>
            </select>
          </div>
        </div>
        <div className='w-full text-center'>
          <button
            type='submit'
            className='bg-indigo-500 transition hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded'
          >
            Submit
          </button>
        </div>
      </form>
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

export default JobForm;
