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
  return res.status(405).end('Method Not Allowed');
}


  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
  if (err) {
    console.error(err);
    return res.status(500).send('Error parsing form data');
  }

  if (!files.image) {
    return res.status(400).send('No image file uploaded');
  }

  try {
    const file = files.image;
    console.log('Uploaded file:', file);

    const filePath = file.filepath || file.path;
    if (!filePath) {
      return res.status(400).send('File path is missing');
    }

    const fileBuffer = await fs.promises.readFile(filePath);

    const formData = new FormData();
    formData.append('image_file', fileBuffer, {
      filename: file.originalFilename || 'image.png',
      contentType: file.mimetype || 'image/png',
    });
    formData.append('size', 'auto');

    const response = await axios.post(
      'https://api.remove.bg/v1.0/removebg',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'X-Api-Key': process.env.REMOVE_BG_API_KEY,
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
