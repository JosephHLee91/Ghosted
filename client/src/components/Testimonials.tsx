import { useEffect, useState } from 'react';
import { testimonial } from '../interfaces/interfaces';
const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<testimonial[]>([]);

  const getTestimonials = async () => {
    const init = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };

    try {
      const res = await fetch(
        `http://localhost:8080/api/testimonial/allUserTestimonial`,
        init
      );
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data.reverse().slice(0, 6));
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTestimonials();
  }, []);

  return (
    <section id='testimonials'>
      <div className='mx-auto max-w-screen-xl px-4 py-16'>
        <h2 className='text-center text-4xl text-gray-700 font-bold tracking-tight'>
          Testimonials
        </h2>

        <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8'>
          {testimonials.map((review, i) => (
            <blockquote
              key={i}
              className='bg-slate-50 rounded-md drop-shadow-md border-2 border-l-4 border-indigo-500 p-6'
            >
              <div className='flex items-center gap-4'>
                <div>
                  <div className='flex justify-start font-bold text-indigo-500 gap-0.5'>
                    <svg
                      className='h-5 w-5'
                      fill='#6366f1'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 576 512'
                    >
                      <path d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z' />
                    </svg>
                    {review?.testimonial_rating}
                  </div>

                  <p className='mt-1 block tracking-wide text-gray-700 text-sm font-bold'>
                    {review?.first_name} {review?.last_name}
                  </p>
                </div>
              </div>

              <p className='line-clamp-none mt-2 text-gray-500'>
                {review?.testimonial_review}
              </p>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
