// api/remove-bg.js
import { IncomingForm } from 'formidable'; // or busboy, formidable for parsing form data
import axios from 'axios';

export const config = {
  api: {
    bodyParser: false, // we disable default body parsing to handle file upload manually
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  // Parse form-data (image file) manually
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
      // Read the file buffer
      const fileBuffer = await fs.promises.readFile(file.filepath);

      // Prepare form-data for remove.bg
      const formData = new FormData();
      formData.append('image_file', fileBuffer, file.originalFilename);
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
      console.error(error.response?.data || error.message);
      res.status(500).send('Error processing image');
    }
  });
}
