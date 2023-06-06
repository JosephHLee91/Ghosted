import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import AuthContext from "../contexts/AuthContext";
import { job } from "../interfaces/interfaces";



const Dashboard = () => {
  const [jobs, setJobs] = useState<job[]> ([]);
  const currUser = useContext(AuthContext);
  const navigate = useNavigate();
  const { appUserId } = useParams();
  const [jobId, setJobId] = useState<number>(0);

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
        console.log(data);
      }
    } catch (err: any) {
      console.error(err);
    }
    
  };

  const deleteById = async () => {
     const init = {
       method: "DELETE",
       headers: {
         "content-type": "application/json",
         Authorization: `Bearer ${localStorage.getItem("jwt")}`,
       },
     };

     try {
       const res = await fetch(
         `http://localhost:8080/api/job/${jobId}`,
         init
       );
       if (res.ok) {
         const data = await res.json();
         console.log(data)
       }
     } catch (err: any) {
       console.error(err);
     }
  };

  async function handleDelete(jobId: number) {
    setJobId(jobId);
    deleteById();
  }

  useEffect(() => {
    if (!currUser.user) {
      navigate("/login");
    }
    getJobs();
  }, []);
  
  
  return (
    <div className="w-full max-w-lg flex flex-col m-auto items-center justify-center items-center h-5/6">
      <h3 className="text-2xl text-gray-800 font-bold text-center mb-2">
        Welcome to your Dashboard
      </h3>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        {/* {jobs?.map((j) => (
          <div>Hello world</div>   
        )) } */}
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-heavy">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Link
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                    {/* <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {job.jobId}
                    </td> */}
                    <td className="whitespace-nowrap px-6 py-4">{job.title}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {job.company}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {job.dateApplied}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4"> <a href={job.link}>{ job.link }</a>  </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {job.location}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {job.status}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Link
                        type='button'
                        className="bg-red-500 transition hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => { handleDelete(job.jobId) }}
                        to='/dashboard'
                      >
                        DELETE
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    
    
    
  );
};

export default Dashboard;
