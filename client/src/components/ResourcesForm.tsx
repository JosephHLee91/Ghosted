import { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Resources = () => {
  const [errorsBoolean, setErrorsBoolean] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [successErrorHeader, setSuccessErrorHeader] = useState<string>('');
  const currUser = useContext(AuthContext);
  const navigate = useNavigate();
  const [resource, setResource] = useState({
    title: '',
    link: '',
    resourceType: 'TEXT',
    userId: currUser?.user?.user_id,
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

  const formTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResource({ ...resource, [e.target.name]: e.target.value });
  };

  const formLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResource({ ...resource, [e.target.name]: e.target.value });
  };

  const formTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setResource({ ...resource, [e.target.name]: e.target.value });
  };

  const formSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    addResourceToServer();
  };

  const addResourceToServer = async () => {
    const init = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify(resource),
    };

    try {
      const res = await fetch(`http://localhost:8080/api/resources`, init);
      if (res.ok) {
        setErrors(['Resource added!']);
        setSuccessErrorHeader('Success');
        setPopupStyle({
          background: 'bg-green-100',
          header: 'text-green-900',
          body: 'text-green-800',
        });
        setErrorsBoolean(true);
        fadeOutAlert();

        setTimeout(() => {
          navigate('/resources');
        }, 2000);
      } else {
        const data = await res.json();

        errorHandler(data);
      }
    } catch (err: any) {
      errorHandler(['Something went wrong on our end. Try again later!']);
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

  const errorHandler = (errors: string[]) => {
    setErrors(errors);
    setSuccessErrorHeader('Error');
    setPopupStyle({
      background: 'bg-red-100',
      header: 'text-red-900',
      body: 'text-red-800',
    });

    fadeOutAlert();
    setErrorsBoolean(true);
  };

  useEffect(() => {
    document.title = 'Ghosted - Add Resources';
    if (!currUser.user) {
      navigate('/login');
    }
  }, []);

  return (
    <div className='w-full max-w-lg flex flex-col m-auto items-center justify-center items-center h-5/6'>
      <h3 className='text-2xl text-gray-800 font-bold text-center mb-2'>
        Add Resource
      </h3>
      <div style={{ display: 'none' }}>Placeholder success/error</div>
      <form
        onSubmit={formSubmit}
        className='w-full bg-slate-50 max-w-lg border-2 border-indigo-500 rounded-md p-6'
      >
        <div className='w-full px-3'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='resourceTitle'
          >
            Title
          </label>

          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='resourceTitle'
            name='title'
            type='text'
            onChange={formTitleChange}
            placeholder='Enter title'
            required
          />
        </div>
        <div className='w-full px-3'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='resourceLink'
          >
            Link
          </label>

          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='resourceLink'
            name='link'
            type='text'
            onChange={formLinkChange}
            placeholder='Enter link'
            required
          />
        </div>
        <div className='w-full px-3  mt-3'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='resourceType'
          >
            Resource Type
          </label>

          <select
            name='resourceType'
            className='block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-6 leading-tight focus:outline-none focus:bg-gray-100 focus:border-indigo-400'
            onChange={formTypeChange}
            required
          >
            <option value='TEXT'>Text</option>
            <option value='MEDIA'>Media</option>
          </select>
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

export default Resources;
