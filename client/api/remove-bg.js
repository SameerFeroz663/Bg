import { IncomingForm } from 'formidable';
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const form = new IncomingForm({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(500).send('Error parsing form data');
    }

    if (!files.image) {
      return res.status(400).send('No image file uploaded');
    }

    const file = files.image;

    let fileBuffer;
    try {
      fileBuffer = await fs.promises.readFile(file.filepath);
    } catch (fileReadError) {
      console.error('Error reading uploaded file:', fileReadError);
      return res.status(500).send('Error reading uploaded file');
    }

    try {
      const formData = new FormData();
      formData.append('image_file', fileBuffer, file.originalFilename);
      formData.append('size', 'auto');

      const response = await axios.post(
        'https://api.remove.bg/v1.0/removebg',
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            'X-Api-Key': 'xnNv2eASdr4w2E4Dh141i194', // Check your key here
          },
          responseType: 'arraybuffer',
        }
      );

      res.setHeader('Content-Type', 'image/png');
      res.status(200).send(response.data);
    } catch (error) {
  if (error.response) {
    console.error('Remove.bg API error status:', error.response.status);
    console.error('Remove.bg API error data:', error.response.data.toString('utf8'));
  } else {
    console.error('Remove.bg API error:', error.message);
  }
  res.status(500).json({
    message: 'Error processing image',
    details: error.response?.data?.toString('utf8') || error.message,
  });
}

    }
  });
}
