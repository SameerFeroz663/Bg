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

      const response = await axios.post(
        'https://clipdrop-api.co/remove-background/v1',
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            'x-api-key': 'c70211c97119c3d94d7139ef6405ac684801191bf2316b604771ef9bd393e925ea8c0d39cc8b383db82ee0f613d2b41c',
          },
          responseType: 'arraybuffer',
        }
      );

      res.setHeader('Content-Type', 'image/png');
      res.status(200).send(response.data);
    } catch (error) {
      if (error.response) {
        console.error('ClipDrop API Response Error:', {
          status: error.response.status,
          data: error.response.data.toString(),
        });
      } else {
        console.error('ClipDrop Unexpected Error:', error.message);
      }
      res.status(500).send('Error processing image');
    }
  });
}
