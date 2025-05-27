import express from 'express';
import cors from 'cors';
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';

const app = express();
const upload = multer();

app.use(cors());

const API_KEY = 'QgD5AEjBnYLSzhRTtWWVYFc8'; // your API key

app.post('/remove-bg', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No image file uploaded');
  }

  try {
    const formData = new FormData();
    formData.append('image_file', req.file.buffer, {
      filename: req.file.originalname,
    });
    formData.append('size', 'auto');

    const response = await axios.post(
      'https://api.remove.bg/v1.0/removebg',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'X-Api-Key': API_KEY,
        },
        responseType: 'arraybuffer',
      }
    );

    res.set('Content-Type', 'image/png');
    res.send(response.data);

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send('Error processing image');
  }
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
