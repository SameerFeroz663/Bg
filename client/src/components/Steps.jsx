import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Steps = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
      console.log("handleImageChange triggered");

    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      alert('Please upload a valid image file.');
      return;
    }

    const originalImageURL = URL.createObjectURL(file);
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
      const processedImageURL = URL.createObjectURL(blob);

      navigate('/result', {
        state: {
          originalImageURL,
          processedImageURL,
        },
      });
    } catch (error) {
      console.error('Upload error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
 return (
    <div className='mx-4 lg:mx-44 py-20 xl:py-40'>
        <h1 className='text-center text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent'>Steps to remove background <br /> image in seconds</h1>
        <div className='flex items-start flex-wrap gap-4 mt-16 xl:mt-24 justify-center'>

            <div className='flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500'>
                <img className='max-w-9' src={assets.upload_icon} alt="" />
                <div>
                    <p className='text-xl font-medium'>Upload image</p>
                    <p className='text-sm text-neutral-500 mt-1'>This is a demo text, will replace it later. <br />This is a demo...</p>
                </div>
            </div>

            <div className='flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500'>
                <img className='max-w-9' src={assets.remove_bg_icon} alt="" />
                <div>
                    <p className='text-xl font-medium'>Remove background</p>
                    <p className='text-sm text-neutral-500 mt-1'>This is a demo text, will replace it later. <br />This is a demo...</p>
                </div>
            </div>

            <div className='flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500'>
                <img className='max-w-9' src={assets.download_icon} alt="" />
                <div>
                    <p className='text-xl font-medium'>Download image</p>
                    <p className='text-sm text-neutral-500 mt-1'>This is a demo text, will replace it later. <br />This is a demo...</p>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Steps
