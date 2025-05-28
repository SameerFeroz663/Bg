import { IncomingForm } from 'formidable';
import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(500).send('Error parsing form data');
    }

    console.log('fields:', fields);
    console.log('files:', files);

    const file = files.image;
    if (!file) {
      return res.status(400).send('No image file uploaded');
    }

    const uploadedFile = Array.isArray(file) ? file[0] : file;
    const filePath = uploadedFile.filepath;

    if (!filePath) {
      return res.status(400).send('File path missing');
    }

    try {
      const fileBuffer = await fs.promises.readFile(filePath);

      const formData = new FormData();
      formData.append('image_file', fileBuffer, {
        filename: uploadedFile.originalFilename || 'image.png',
        contentType: uploadedFile.mimetype || 'image/png',
      });
      formData.append('size', 'auto');

      const response = await axios.post(
        'https://api.remove.bg/v1.0/removebg',
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            'X-Api-Key': 'xnNv2eASdr4w2E4Dh141i194',
          },
          responseType: 'arraybuffer',
        }
      );

      res.setHeader('Content-Type', 'image/png');
      res.status(200).send(response.data);
    } catch (error) {
      console.error('Remove.bg API error:', error.response?.data || error.message);
      res.status(500).send('Error processing image');
    }
  });
}
