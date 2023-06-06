import { useEffect, SyntheticEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resource } from '../interfaces/interfaces';

const Resources = () => {
  const [resources, setResources] = useState<resource[]>([]);

  const getResources = async () => {
    const init = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };

    try {
      const res = await fetch(`http://localhost:8080/api/resources/resourceUsers`, init);
      if (res.ok) {
        const data = await res.json();
        setResources(data)
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    getResources();
  }, []);

  return (
    <section id='resources'>
      <div className='mx-auto max-w-screen-xl px-4 py-16'>
        <h2 className='text-center text-4xl text-gray-700 font-bold tracking-tight'>
          Resources
        </h2>

        <h2 className='text-center text-2xl text-gray-700 font-bold tracking-tight'>
          Articles/Blogs
        </h2>
        <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8'>
          {resources.map((resource) => (
            resource.resourceType === 'TEXT'
            ?  <blockquote className='bg-slate-50 rounded-md drop-shadow-md border-2 border-l-4 border-indigo-500 p-6'>
              <div className='flex items-center gap-4'>
                <div>
                  <div className='flex justify-start font-bold text-indigo-500 gap-0.5'>
                  <svg 
                    className='h-5 w-10'
                    xmlns="http://www.w3.org/2000/svg" 
                    height="1em" 
                    viewBox="0 0 448 512">
                    <path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
                    </svg>
                    <a href={resource.link} target="_blank">
                      {resource.title}
                    </a> 
                  </div>
                  <p className='mt-1 block tracking-wide text-gray-700 text-sm font-bold'>
                    Submitted By: {resource.first_name} {resource.last_name}
                  </p>

                </div>
              </div>
            </blockquote>
            : null
          ))}
        </div>

        <h2 className='text-center text-2xl text-gray-700 font-bold tracking-tight'>
          Videos
        </h2>
        <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8'>
          {resources.map((resource) => (
            resource.resourceType === 'MEDIA'
            ?  <blockquote className='bg-slate-50 rounded-md drop-shadow-md border-2 border-l-4 border-indigo-500 p-6'>
              <div className='flex items-center gap-4'>
                <div>
                  <div className='flex justify-start font-bold text-indigo-500 gap-0.5'>
                  <svg 
                    className='h-5 w-10'
                    xmlns="http://www.w3.org/2000/svg" 
                    height="1em" 
                    viewBox="0 0 576 512">
                    <path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"/>
                  </svg>
                    <a href={resource.link} target="_blank">
                      {resource.title}
                    </a> 
                  </div>

                  <p className='mt-1 block tracking-wide text-gray-700 text-sm font-bold'>
                    Submitted By: {resource.first_name} {resource.last_name}
                  </p>
                </div>
              </div>
            </blockquote>
            : null
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;
