// import React, { SyntheticEvent, useContext, useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import AuthContext from "../contexts/AuthContext";
// import { deleteById, findById } from "../services/jobs.ts";
// import { job } from "../interfaces/interfaces.ts";

// const JobDelete = () => { 
//     const [job, setJob] = useState<job[]> ([]);
//     const [errorsBoolean, setErrorsBoolean] = useState<boolean>(false);
//     const [errors, setErrors] = useState<string[]>([]);
//     const [successErrorHeader, setSuccessErrorHeader] = useState<string>("");
//     const currUser = useContext(AuthContext);
//     const navigate = useNavigate();
//     const { jobId } = useParams();

//     const [alertStyle, setAlertStyle] = useState({
//       opacity: "",
//       transition: "",
//     });
//     const [popupStyle, setPopupStyle] = useState({
//       background: "",
//       header: "",
//       body: "",
//     });

//     const handleDelete = async () => {
//     const init = {
//       method: 'DELETE',
//       headers: {
//         'content-type': 'application/json',
//       },
//     };

//     try {
//       const res = await fetch(
//         `http://localhost:8080/api/job/${jobId}`,
//         init
//       );
//       if (res.ok) {
//         const data = await res.json();
//         setJob(data());
//       }
//     } catch (err: any) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//       const getJob = async (jobId: job) => {
//         const init = {
//           method: "GET",
//           headers: {
//             "content-type": "application/json",
//           },
//         };

//         try {
//           const res = await fetch(
//             `http://localhost:8080/api/job/${jobId}`,
//             init
//           );
//           if (res.ok) {
//             const data = await res.json();
//             setJob(data());
//           }
//         } catch (err: any) {
//           console.error(err);
//         }
//       };
//   }, []);

//     return (
//       <div className="w-full max-w-lg flex flex-col m-auto items-center justify-center items-center h-5/6">
//         <h3 className="text-2xl text-gray-800 font-bold text-center mb-2">
//           Add Application
//         </h3>
//         <div>
//           Are you sure you want to delete the following job?{" "}
          
//             <ul>
//               <li>Title: {job.title}</li>
//               <li>Company: {job.company}</li>
//               <li>Date: {job.dateApplied}</li>
//               <li>Link: {job.link}</li>
//               <li>Location: {job.location}</li>
//               <li>Status: {job.status} </li>
//             </ul>
          
//         </div>
//         <div>
//           <button
//             type="button"
//             className="btn btn-danger"
//             onClick={(event) => handleDelete(jobId)}
//           >
//             Delete
//           </button>
//           <Link to="/dashboard" className="btn btn-secondary mx-2">
//             Cancel
//           </Link>
//         </div>
//         {errorsBoolean && (
//           <div
//             className={`${popupStyle.background} rounded p-4 w-4/6`}
//             style={alertStyle}
//           >
//             <h3 className={`block ${popupStyle.header} font-medium`}>
//               {successErrorHeader}
//             </h3>
//             <ul>
//               {errors?.map((err, i) => (
//                 <li key={i} className="m-auto">
//                   <p className={`mt-2 ${popupStyle.body} text-sm`}>
//                     {err.charAt(0).toUpperCase() + err.slice(1)}
//                   </p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     );
              
// }
              
// export default JobDelete;
            