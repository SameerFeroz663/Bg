import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Upload = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      alert('Please upload a valid image file.');
      return;
    }

    const originalImage = URL.createObjectURL(file);
    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);

    try {
      const response = await fetch('https://bg-tawny.vercel.app/api/remove-bg
', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process image');
      }

      const blob = await response.blob();
      const resultUrl = URL.createObjectURL(blob);

      navigate('/result', {
        state: {
          original: originalImage,
          result: resultUrl,
        },
      });
    } catch (error) {
      console.error("Error:", error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='pb-16'>
      <h1 className='text-center text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent py-6 md:py16'>
        See the magic. Try now
      </h1>

      <div className='text-center mb-24'>
        <input type="file" id="upload2" hidden onChange={handleImageChange} />
        <label
          className='inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700'
          htmlFor="upload2"
        >
          <img width={20} src={assets.upload_btn_icon} alt="Upload Icon" />
          <p className='text-white text-sm'>Upload your image</p>
        </label>
      </div>
      {loading && (
  <div className="flex justify-center items-center flex-col w-full mt-10">
    <div className="border-t-4 border-violet-600 border-dashed rounded-full h-16 w-16 animate-spin"></div>
    <p className="text-gray-600 mt-4">Processing your image...</p>
  </div>
)}


    </div>
  );
};

export default Upload;
