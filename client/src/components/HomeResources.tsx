const HomeResources = () => {
  return (
    <section>
      <div className='mx-auto max-w-screen-xl px-4 py-16 flex flex-row'>
        <div className='w-1/3'>
          <p className='text-center text-gray-700 text-3xl font-bold tracking-tight'>
            <span className='text-indigo-500 drop-shadow-md'>Ghosted</span>{' '}
            integrates with these sites and many more.
          </p>
        </div>
        <div className='w-2/3 flex'>
          <div className='w-1/3 flex items-center shrink-0 grow justify-center lg:grow-0'>
            <img
              className='h-2/4 opacity-75 drop-shadow-md'
              src='/images/job-site-logos/indeed.png'
              alt='Indeed Site Logo'
            />
          </div>
          <div className='w-1/3 flex items-center shrink-0 grow justify-center lg:grow-0'>
            <img
              className='h-2/4 opacity-95 drop-shadow-md'
              src='/images/job-site-logos/linkedin.png'
              alt='Linkedin Site Logo'
            />
          </div>

          <div className='w-1/3 flex items-center shrink-0 grow justify-center'>
            <img
              className='h-2/4 drop-shadow-md'
              src='/images/job-site-logos/ziprecruiter.png'
              alt='Zip Recruiter Site Logo'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeResources;
