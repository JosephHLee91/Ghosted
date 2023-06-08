import { job } from '../interfaces/interfaces';

const JOB_API_URL = 'http://localhost:8080/api/job';

export async function findAll() {
  const init = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  };
  const response = await fetch(JOB_API_URL, init);
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject();
  }
}

export async function findById(jobId: job) {
  const response = await fetch(`${JOB_API_URL}/${jobId}`);
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject();
  }
}

export const add = async (job: any) => {
  const init = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify(job),
  };

  const response = await fetch(JOB_API_URL, init);
  if (response.ok) {
    const data = await response.json();
    return Promise.resolve(data);
  } else if (response.status === 400) {
    const errs = await response.json();
    return Promise.reject(errs);
  } else {
    return Promise.reject();
  }
};
