import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Charts from './Charts';

import AuthContext from '../contexts/AuthContext';
import { job } from '../interfaces/interfaces';

const Dashboard = () => {
  const [jobs, setJobs] = useState<job[]>([]);
  const currUser = useContext(AuthContext);
  const navigate = useNavigate();

  const getJobs = async () => {
    const init = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/job/user/${currUser?.user?.user_id}`,
        init
      );

      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const deleteById = async (jobId: number) => {
    const init = {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    };

    const res = await fetch(`http://localhost:8080/api/job/${jobId}`, init);
    if (res.ok) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  };

  async function handleDelete(jobId: number) {
    deleteById(jobId)
      .then(() => window.location.reload())
      .catch(() => navigate('/error'));
  }

  const formatString = (stringToFormat: string) => {
    return (
      stringToFormat.charAt(0).toUpperCase() +
      stringToFormat.slice(1).toLowerCase()
    );
  };

  const statusColorning = (status: string) => {
    if (status === 'APPLIED') {
      return 'bg-yellow-300';
    } else if (status === 'REJECTED') {
      return 'bg-red-500';
    } else if (status === 'ACCEPTED') {
      return 'bg-green-300';
    } else if (status === 'DECLINED') {
      return 'bg-orange-300';
    } else if (status === 'GHOSTED') {
      return 'bg-indigo-300';
    }
  };

  useEffect(() => {
    document.title = 'Ghosted - Dashboard';
    if (!currUser.user) {
      navigate('/login');
    }
    getJobs();
  }, []);

  if (!jobs.length) {
    navigate('/jobs');
  }

  return (
    <section id='dashboard'>
      <div className='mx-auto max-w-screen-xl px-4'>
        <div className='w-full flex flex-row'>
          <p className='w-1/3'>{}</p>
          <h3 className='text-2xl w-1/3 text-gray-800 font-bold text-center mb-2'>
            Dashboard
          </h3>
          <div className='w-1/3 flex flex-row justify-end items-start'>
            <Link
              className='rounded-md bg-indigo-500 px-3 py-2 text-md text-sm text-white transition hover:bg-indigo-600'
              to={'/jobs'}
            >
              Add Job
            </Link>
          </div>
        </div>
        <div className='align-middle mt-2 inline-block min-w-full shadow-sm overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg'>
          <table className='min-w-full'>
            <thead>
              <tr>
                <th className='px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-indigo-600 tracking-wider'>
                  Title
                </th>
                <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-indigo-600 tracking-wider'>
                  Company
                </th>
                <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-indigo-600 tracking-wider'>
                  Application Link
                </th>
                <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-indigo-600 tracking-wider'>
                  Location
                </th>
                <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-indigo-600 tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-indigo-600 tracking-wider'>
                  Date Applied
                </th>
                <th className='px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-indigo-600 tracking-wider'>
                  Action
                </th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              {jobs.map((job) => (
                <tr>
                  <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-500'>
                    <div className='flex items-center'>
                      <div>
                        <div className='text-sm leading-5 text-gray-800'>
                          {job.title}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-500'>
                    <div className='text-sm leading-5 text-gray-800'>
                      {job.company}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-500'>
                    <a
                      href={job.link}
                      target='_blank'
                      className='underline text-indigo-700 hover:text-indigo-400'
                    >
                      Link
                    </a>
                  </td>
                  <td className='px-6 py-4 whitespace-no-wrap border-b text-gray-800 border-gray-500 text-sm leading-5'>
                    {formatString(job.location)}
                  </td>
                  <td className='px-6 py-4 whitespace-no-wrap border-b text-gray-800 border-gray-500 text-sm leading-5'>
                    <span className='relative inline-block px-3 py-1 font-semibold text-gray-800 leading-tight'>
                      <span
                        className={`absolute inset-0 ${statusColorning(
                          job.status
                        )} opacity-50 rounded-full`}
                      ></span>
                      <span className='relative text-xs'>
                        {formatString(job.status)}
                      </span>
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-gray-800 text-sm leading-5'>
                    {job.dateApplied}
                  </td>
                  <td className='px-6 py-4 whitespace-no-wrap text-left border-b border-gray-500 text-sm leading-5'>
                    <button
                      className='rounded-md bg-gray-300/75 m-auto px-3 py-2 text-sm font-medium text-indigo-500 transition hover:text-indigo-700 hover:bg-gray-300'
                      onClick={(event) => {
                        handleDelete(job.jobId);
                      }}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        height='1.2em'
                        viewBox='0 0 448 512'
                        className='mx-1'
                      >
                        <path d='M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z' />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans'></div>
        </div>

        <Charts />
      </div>
    </section>
  );
};

export default Dashboard;
