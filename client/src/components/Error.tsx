import { Link } from 'react-router-dom';

function Error() {
	return (
        <div className='h-screen w-full flex flex-row justify-center'>
            <div className=''>
                <h2>Oops, did you believe you were <span className=''>Ghosted?</span> Feel free to navigate back by clicking the link below</h2>
                <div className='flex justify-center items-center'>
                    <Link className='rounded-md bg-indigo-500 m-auto px-4 py-3 text-md mt-4 font-medium text-white transition hover:bg-indigo-600' to={'/'}>
                        Go To The Front Page
                    </Link>
                </div>
            </div>
        </div>
	);
}

export default Error;
