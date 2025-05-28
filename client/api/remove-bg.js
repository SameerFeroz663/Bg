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
    console.log('Fields:', fields);
    console.log('Files:', files);

    if (err) {
      console.error(err);
      return res.status(500).send('Error parsing form data');
    }

    const file = files.image;
    if (!file) {
      return res.status(400).send('No image file uploaded');
    }

    let fileBuffer;

    try {
      if (file.file) {
        fileBuffer = file.file;
      } else if (file.toBuffer) {
        fileBuffer = await file.toBuffer();
      } else if (file.filepath || file.path) {
        const filePath = file.filepath || file.path;
        fileBuffer = await fs.promises.readFile(filePath);
      } else {
        return res.status(400).send('File buffer/path missing');
      }
    } catch (readErr) {
      console.error('Error reading file buffer:', readErr);
      return res.status(500).send('Error reading uploaded file');
    }

    const formData = new FormData();
    formData.append('image_file', fileBuffer, {
      filename: file.originalFilename || 'image.png',
      contentType: file.mimetype || 'image/png',
    });
    formData.append('size', 'auto');

    try {
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
      console.error('Remove.bg API error:', error?.response?.data || error.message);
      res.status(500).send('Error processing image');
    }
  });
}
