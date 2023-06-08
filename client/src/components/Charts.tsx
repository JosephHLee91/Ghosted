import { useContext, useEffect, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import Chart from './Chart';

const reduceData = (jobs: any, fieldName: string) => {
  let output = [];

  let reducer = jobs.reduce(
    (job: any, o: any) => (
      (job[o[fieldName]] = (job[o[fieldName]] || 0) + 1), job
    ),
    {}
  );

  for (const key in reducer) {
    output.push({ title: key, amount: reducer[key] });
  }

  return output;
};

const Charts = () => {
  const [jobs, setJobs] = useState(null);
  const [checkBtn, setCheckBtn] = useState(false);
  const currUser = useContext(AuthContext);
  const [swapChartDisplay, setSwapChartDisplay] = useState({
    titleCompany: 'flex',
    statusLocation: 'hidden',
    buttonName: 'Status & Location',
  });

  const chartDisplay = () => {
    if (swapChartDisplay.titleCompany === 'flex') {
      setSwapChartDisplay({
        titleCompany: 'hidden',
        statusLocation: 'flex',
        buttonName: 'Role & Company',
      });
    } else {
      setSwapChartDisplay({
        titleCompany: 'flex',
        statusLocation: 'hidden',
        buttonName: 'Status & Location',
      });
    }
  };

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

  useEffect(() => {
    getJobs();
  }, []);
  return (
    <div>
      {!jobs ? (
        <div className='w-full flex'>
          <div
            className='m-auto inline-block h-8 text-indigo-600 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
            role='status'
          ></div>
        </div>
      ) : (
        <div className='flex flex-col w-full my-4'>
          <div className='flex flex-col m-auto'>
            <span className='block tracking-wide text-gray-700 text-xs font-bold mb-1 m-auto'>
              {swapChartDisplay.buttonName}
            </span>
            <label className='inline-flex relative items-center m-auto cursor-pointer'>
              <input
                type='checkbox'
                className='sr-only peer'
                checked={checkBtn}
                readOnly
              />
              <div
                onClick={() => {
                  setCheckBtn(!checkBtn);
                  chartDisplay();
                }}
                className="w-11 h-6 bg-indigo-400 rounded-full peer peer-focus:ring-indigo-700  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"
              ></div>
            </label>
          </div>
          <div className={`${swapChartDisplay.titleCompany} flex-row w-full`}>
            <div className='w-1/3 m-auto'>
              <Chart
                jobs={jobs}
                reduceData={reduceData}
                dataField={'title'}
                title={'Role'}
              />
            </div>
            <div className='w-1/3 m-auto'>
              <Chart
                jobs={jobs}
                reduceData={reduceData}
                dataField={'company'}
                title={'Company'}
              />
            </div>
          </div>
          <div className={`${swapChartDisplay.statusLocation} flex-row w-full`}>
            <div className='w-1/3 m-auto'>
              <Chart
                jobs={jobs}
                reduceData={reduceData}
                dataField={'status'}
                title={'Status'}
              />
            </div>
            <div className='w-1/3 m-auto'>
              <Chart
                jobs={jobs}
                reduceData={reduceData}
                dataField={'location'}
                title={'Location'}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Charts;
