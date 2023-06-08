import { useEffect, SyntheticEvent, useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { resource } from '../interfaces/interfaces';
import AuthContext from '../contexts/AuthContext';

const Resources = () => {
  const [resources, setResources] = useState<resource[]>([]);
  const currUser = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState<number>(0);

  const getResources = async () => {
    const init = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };
    try {
      const res = await fetch(
        `http://localhost:8080/api/resources/resourceUsers`,
        init
      );
      if (res.ok) {
        const data = await res.json();
        setResources(data);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const deleteById = async (id: number) => {
    const init = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    };
    const res = await fetch(`http://localhost:8080/api/resources/${id}`, init);
    if (res.ok) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  };

  async function handleDelete(id: number) {
    deleteById(id);
    window.location.reload();
  }

  useEffect(() => {
    document.title = 'Ghosted - Resources';
    getResources();
    if (currUser?.user?.authorities === 'ADMIN') {
      setIsAdmin(1);
    }
  }, []);

  return (
    <section id='resources'>
      <div className='mx-auto max-w-screen-xl px-4'>
        <div className='w-full flex flex-row'>
          <p className='w-1/3'>{}</p>
          <h3 className='text-2xl w-1/3 text-gray-800 font-bold text-center mb-2'>
            Resources
          </h3>
          <div className='w-1/3 flex flex-row justify-end items-start'>
            <Link
              className='rounded-md bg-indigo-500 px-3 py-2 text-md text-sm text-white transition hover:bg-indigo-600'
              to={'/resources/add'}
            >
              Add Resource
            </Link>
          </div>
        </div>
        <div className='flex flex-row justify-around space-x-40'>
          <div className='w-3/6'>
            <h2 className='text-center text-xl text-gray-700 font-bold tracking-tight'>
              Articles/Blogs
            </h2>
            <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10'>
              {resources.map((resource) =>
                resource.resourceType === 'TEXT' ? (
                  <blockquote className='bg-slate-50 rounded-md drop-shadow-md border-2 border-l-4 border-indigo-500 px-4 py-3'>
                    <div className='flex items-center flex-col gap-4'>
                      <div>
                        <div className='flex flex-row w-full justify-between'>
                          <svg
                            className='h-5 w-5'
                            xmlns='http://www.w3.org/2000/svg'
                            height='1em'
                            viewBox='0 0 448 512'
                          >
                            <path d='M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z' />
                          </svg>

                          {isAdmin > 0 ? (
                            <div
                              onClick={() => {
                                handleDelete(resource.resourceId);
                              }}
                            >
                              <Link
                                onClick={() => {
                                  handleDelete(resource.resourceId);
                                }}
                                to='/resources'
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  height='1.2em'
                                  viewBox='0 0 448 512'
                                  className='transition hover:opacity-50 w-full'
                                >
                                  <path
                                    d='M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z'
                                    onClick={() => {
                                      handleDelete(resource.resourceId);
                                    }}
                                  />
                                </svg>
                              </Link>
                            </div>
                          ) : null}
                        </div>
                        <div className='flex justify-start font-bold text-indigo-500 gap-0.5 my-2 pb-2 border-b-2 border-gray-300'>
                          <div>
                            <a
                              href={resource.link}
                              target='_blank'
                              className='mt-1 block tracking-wide text-sm font-bold hover:text-indigo-700 transition'
                            >
                              {resource.title}
                            </a>
                          </div>
                        </div>
                        <p className='mt-1 block tracking-wide text-gray-700 text-sm font-bold'>
                          Submitted By: {resource.first_name}{' '}
                          {resource.last_name}
                        </p>
                      </div>
                    </div>
                  </blockquote>
                ) : null
              )}
            </div>
          </div>

          <div className='w-3/6'>
            <h2 className='text-center text-xl text-gray-700 font-bold tracking-tight'>
              Videos
            </h2>
            <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-10'>
              {resources.map((resource) =>
                resource.resourceType === 'MEDIA' ? (
                  <blockquote className='bg-slate-50 rounded-md drop-shadow-md border-2 border-l-4 border-indigo-500 px-4 py-3'>
                    <div className='flex items-center flex-col gap-4'>
                      <div>
                        <div className='flex flex-row w-full justify-between'>
                          <svg
                            className='h-5 w-5'
                            xmlns='http://www.w3.org/2000/svg'
                            height='1em'
                            viewBox='0 0 448 512'
                          >
                            <path d='M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z' />
                          </svg>

                          {isAdmin > 0 ? (
                            <div className=''>
                              <Link
                                onClick={() => {
                                  handleDelete(resource.resourceId);
                                }}
                                to='/resources'
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  height='1.2em'
                                  viewBox='0 0 448 512'
                                  className='transition hover:opacity-50'
                                >
                                  <path d='M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z' />
                                </svg>
                              </Link>
                            </div>
                          ) : null}
                        </div>
                        <div className='flex justify-start font-bold text-indigo-500 gap-0.5 my-2 pb-2 border-b-2 border-gray-300'>
                          <div>
                            <a
                              href={resource.link}
                              target='_blank'
                              className='mt-1 block tracking-wide text-sm font-bold hover:text-indigo-700 transition'
                            >
                              {resource.title}
                            </a>
                          </div>
                        </div>
                        <p className='mt-1 block tracking-wide text-gray-700 text-sm font-bold'>
                          Submitted By: {resource.first_name}{' '}
                          {resource.last_name}
                        </p>
                      </div>
                    </div>
                  </blockquote>
                ) : null
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
