import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Steps = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
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
      const response = await fetch('/api/remove-bg', {
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
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-16">
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent py-6 md:py-16">
        Just 3 Simple Steps
      </h1>

      <div className="flex flex-wrap justify-center items-start gap-8 px-4 lg:px-32 mt-8">

        {/* Step Card 1 */}
        <div className="bg-white border drop-shadow-md rounded-xl p-6 w-full sm:w-[300px]">
          <div className="flex items-start gap-4">
            <img src={assets.upload_icon} alt="Upload" className="w-10 h-10" />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">1. Upload Image</h2>
              <p className="text-sm text-gray-600 mt-1">Choose your photo in PNG or JPG format.</p>
            </div>
          </div>
        </div>

        {/* Step Card 2 */}
        <div className="bg-white border drop-shadow-md rounded-xl p-6 w-full sm:w-[300px]">
          <div className="flex items-start gap-4">
            <img src={assets.remove_bg_icon} alt="Remove BG" className="w-10 h-10" />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">2. Remove Background</h2>
              <p className="text-sm text-gray-600 mt-1">Our AI processes the image automatically.</p>
            </div>
          </div>
        </div>

        {/* Step Card 3 */}
        <div className="bg-white border drop-shadow-md rounded-xl p-6 w-full sm:w-[300px]">
          <div className="flex items-start gap-4">
            <img src={assets.download_icon} alt="Download" className="w-10 h-10" />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">3. Download Image</h2>
              <p className="text-sm text-gray-600 mt-1">Get your background-free image instantly.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Button */}
      <div className="text-center mt-12">
        <input type="file" id="upload-step" hidden onChange={handleImageUpload} />
        <label
          htmlFor="upload-step"
          className="inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:scale-105 transition-all duration-700"
        >
          <img width={20} src={assets.upload_btn_icon} alt="Upload" />
          <p className="text-white text-sm">Upload your image</p>
        </label>
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center flex-col w-full mt-10">
          <div className="border-t-4 border-violet-600 border-dashed rounded-full h-16 w-16 animate-spin"></div>
          <p className="text-gray-600 mt-4">Processing your image...</p>
        </div>
      )}
    </div>
  );
};

export default Steps;
