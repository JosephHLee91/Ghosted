// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import { findAll } from "../services/jobs";
// //import Dashboard from "./Dashboard";
// import Login from "./Login";
// import { job } from "../interfaces/interfaces";
// import Dashboard from "./Dashboard";


// const Jobs = () => {
//   const [jobs, setJobs] = useState<job[]>([]);
//     const navigate = useNavigate();
    
    

//   useEffect(() => {
//     findAll()
//       .then(setJobs)
//       .catch(() => navigate("/error"));
//   }, []);

//   if (!jobs.length) {
//     return <Login />;
//   }

//   return (
//     <div>
      
//         <div className='row row-cols-1 row-cols-md-3 g-4'>
// 			{jobs.map((job) => (
//                 <Dashboard key={job.jobId} job={job} />
// 			))}
// 		</div>
      
//     </div>
//   );
// };
// export default Jobs;