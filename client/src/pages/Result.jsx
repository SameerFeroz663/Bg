import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const originalImage = state?.original;
  const processedImage = state?.result;

  if (!originalImage || !processedImage) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500">No image data found. Please upload again.</p>
        <button onClick={() => navigate('/')} className="underline text-blue-600">
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className='mx-4 my-3 lg:mx-44 mt-14 min-h-[75vh]'>
      <div className='bg-white rounded-lg px-8 py-6 drop-shadow-sm'>
        <div className='flex flex-col sm:grid grid-cols-2 gap-8'>
          <div>
            <p className='font-semibold text-gray-600 mb-2'>Original</p>
            <img className='rounded-md border' src={originalImage} alt="Original Image" />
          </div>
          <div>
            <p className='font-semibold text-gray-600 mb-2'>Background Removed</p>
            <img className='rounded-md border' src={processedImage} alt="Processed Image" />
          </div>
        </div>

        <div className='flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-6'>
          <button
            className='px-8 py-2.5 text-violet-600 text-sm border border-violet-600 rounded-full hover:scale-105 transition-all duration-700'
            onClick={() => navigate('/')}
          >
            Try Another Image
          </button>
          <a
            href={processedImage}
            download="no-bg.png"
            className='px-8 py-2.5 text-white text-sm bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full hover:scale-105 transition-all duration-700'
          >
            Download Image
          </a>
        </div>
      </div>
    </div>
  );
};

export default Result;
