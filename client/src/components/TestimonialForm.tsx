import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const TestimonialForm = () => {
  // private String testimonial_review;
  // private int testimonial_rating;
  // private int user_id;

  const [reviewLength, setReviewLength] = useState<number>(0);
  const [errorsBoolean, setErrorsBoolean] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [successErrorHeader, setSuccessErrorHeader] = useState<string>('');
  const currUser = useContext(AuthContext);
  const navigate = useNavigate();
  const [testimonial, setTestimonial] = useState({
    testimonial_review: '',
    testimonial_rating: '5',
    user_id: currUser?.user?.user_id,
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
    setTestimonial({ ...testimonial, [e.target.name]: e.target.value });
  };

  const formMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTestimonial({ ...testimonial, [e.target.name]: e.target.value });
    setReviewLength(e.target.value.length);
  };

  const formSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    // /api/testimonial
    console.log(testimonial);
    // authenticate(user)
    //   .then((userLogin) => {
    //     setErrors(['Login successful!']);
    //     setSuccessErrorHeader('Success');
    //     setPopupStyle({
    //       background: 'bg-green-100',
    //       header: 'text-green-900',
    //       body: 'text-green-800',
    //     });
    //     setErrorsBoolean(true);
    //     fadeOutAlert();
    //     setTimeout(() => {
    //       login(userLogin);
    //       navigate('/');
    //     }, 1000);
    //   })
    //   .catch((err) => {
    //     setErrors(err);
    //     setSuccessErrorHeader('Error');
    //     setPopupStyle({
    //       background: 'bg-red-100',
    //       header: 'text-red-900',
    //       body: 'text-red-800',
    //     });
    //     fadeOutAlert();
    //     setErrorsBoolean(true);
    //   });
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
    }, 750);

    setTimeout(() => {
      setAlertStyle({
        opacity: '',
        transition: '',
      });
      setErrorsBoolean(false);
    }, 1500);
  };

  useEffect(() => {
    document.title = 'Ghosted - Add Testimonial';
    if (!currUser.user) {
      navigate('/login');
    }
  }, []);

  return (
    <div className='w-full max-w-lg flex flex-col m-auto items-center justify-center items-center h-5/6'>
      <h3 className='text-2xl text-gray-800 font-bold text-center mb-2'>
        Add Testimonial
      </h3>
      <div style={{ display: 'none' }}>Placeholder success/error</div>
      <form
        onSubmit={formSubmit}
        className='w-full bg-slate-50 max-w-lg border-2 border-indigo-500 rounded-md p-6'
      >
        <div className='w-full px-3'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='testimonialMessage'
          >
            Message
          </label>

          <textarea
            className='appearance-none resize-none block w-full h-48 bg-gray-200 text-gray-700 border border-gray-200 rounded text-sm py-3 px-4 leading-tight focus:outline-none focus:bg-gray-100 focus:border-indigo-400'
            id='testimonialMessage'
            name='testimonial_review'
            minLength={10}
            maxLength={800}
            onChange={formMessageChange}
            placeholder='Enter review...'
            required
          />
          <div className='w-full text-xs text-right text-gray-500'>
            <small className=''>{reviewLength}/800</small>
          </div>
        </div>

        <div className='w-full px-3  mt-3'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='testimonialMessage'
          >
            Rating
          </label>

          <select
            name='testimonial_rating'
            id='HeadlineAct'
            className='block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-6 leading-tight focus:outline-none focus:bg-gray-100 focus:border-indigo-400'
            onChange={formSelectChange}
            required
          >
            <option value='5'>5 - (Most Satified)</option>
            <option value='4'>4</option>
            <option value='3'>3</option>
            <option value='2'>2</option>
            <option value='1'>1 - (Least Satisfied)</option>
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

export default TestimonialForm;
