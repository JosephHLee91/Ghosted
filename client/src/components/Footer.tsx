const Footer = () => {
  return (
    <footer className='bg-slate-50'>
      <div className='flex justify-between items-center px-4 py-4'>
        <div className='flex justify-start h-5 transition-opacity hover:opacity-0'>
          <img src='/images/logo.png' alt='Ghosted small ghost' />
        </div>

        <div>
          <p className='text-gray-500 text-center text-sm mt-0 text-right'>
            &copy; 2023.{' '}
            <span className='text-indigo-500 drop-shadow-md'>Ghosted</span> -
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
