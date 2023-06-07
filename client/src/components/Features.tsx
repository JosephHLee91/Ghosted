const Features = () => {
  return (
    <section id='features'>
      <div className='mx-auto max-w-screen-xl px-4 py-16'>
        <h2 className='text-center text-4xl text-gray-700 font-bold tracking-tight'>
          Features
        </h2>

        <div className='mx-auto max-w-screen-xl px-4 py-16 flex flex-row'>
          <div className='w-3/6'>
            <p className='text-left text-gray-700 text-2xl font-bold tracking-tight'>
              Data driven
            </p>
            <p className='text-left text-gray-500 mt-4'>
              Track more than <span className='italic'>just</span> quantity of
              applications.{' '}
              <span className='text-indigo-500 font-bold'>Ghosted</span> serves
              job application data in easy to understand, powerful data charts
              to put you in control of your job search.
            </p>
          </div>
          <div className='w-3/6 flex'>
            <div className='w-1/3 flex items-center shrink-0 grow justify-center lg:grow-0'>
              <video autoPlay muted loop id='video'>
                <source src={'/videos/chart_feature.mp4'} type='video/mp4'/>
              </video>
            </div>
          </div>
        </div>

        <div className='mx-auto max-w-screen-xl px-4 py-16 flex flex-row'>
          <div className='w-3/6 flex'>
            <div className='w-1/3 flex items-center shrink-0 grow justify-center lg:grow-0'>
              <video autoPlay muted loop id='video'>
                <source src={'/videos/table_feature.mp4'} type='video/mp4'/>
              </video>
            </div>
          </div>
          <div className='w-3/6'>
            <p className='text-left text-gray-700 text-2xl font-bold tracking-tight'>
              Convenient organization
            </p>
            <p className='text-left text-gray-500 mt-4'>
              Juggling hundreds of emails? Getting swamped by spreadsheet
              information? Get rid of all the unecessary steps and track the
              necessary information you need with our comprehensive user
              dashboard. Ensure no application goes unnoticed or forgotten,
              empowering you to stay organized and informed throughout your
              search.
            </p>
          </div>
        </div>

        <div className='mx-auto max-w-screen-xl px-4 py-16 flex flex-row'>
          <div className='w-3/6'>
            <p className='text-left text-gray-700 text-2xl font-bold tracking-tight'>
              Community Inspired
            </p>
            <p className='text-left text-gray-500 mt-4'>
              You're not alone, access our community driven resources page to view
              articles and videos to better aid your job search. With hundreds of other
              users
            </p>
          </div>
          <div className='w-3/6 flex'>
            <div className='w-1/3 flex items-center shrink-0 grow justify-center lg:grow-0'>
              <video autoPlay muted loop id='video'>
                <source src={'/videos/resources_feature.mp4'} type='video/mp4'/>
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
