import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import AuthContext from "../contexts/AuthContext";
import { job } from "../interfaces/interfaces";

const Dashboard = () => {
  const [jobs, setJobs] = useState<job[]>([]);
  const currUser = useContext(AuthContext);
  const navigate = useNavigate();
  const { appUserId } = useParams();
  const [jobId, setJobId] = useState<number>(0);

  const getJobs = async () => {
    const init = {
      method: "GET",
      headers: {
        "content-type": "application/json",
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
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
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
    //window.confirm("Are you sure you want to delete this application?")
    deleteById(jobId)
      .then(() => window.location.reload())
      .catch(() => navigate("/error"));
  }

  useEffect(() => {
    getJobs();
  }, []);

  if (!jobs.length) {
    navigate("/jobs");
  }

  return (
    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
      <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
        <div className="flex justify-between">
          <div className="w-full text-center">
            <button
              className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-indigo-700 hover:text-white focus:outline-none mt-2"
              onClick={(event) => {
                navigate("/jobs");
              }}
            >
              ADD
            </button>
          </div>
        </div>
      </div>
      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Link
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {jobs.map((job) => (
              <tr>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm leading-5 text-gray-800">
                        {job.title}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <div className="text-sm leading-5 text-blue-900">
                    {job.company}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {job.link}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  {job.location}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                  <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-green-500 opacity-50 rounded-full"
                    ></span>
                    <span className="relative text-xs">{job.status}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                  {job.dateApplied}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                  <button
                    className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-red-700 hover:text-white focus:outline-none"
                    onClick={(event) => {
                      handleDelete(job.jobId);
                    }}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans"></div>
      </div>
    </div>
  );
};

export default Dashboard;
