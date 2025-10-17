import { Router } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

const r = Router();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer to use Cloudinary for storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'workeasy-avatars', // Optional: folder name in your Cloudinary account
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage: storage });

// Define the upload route
// 'avatar' is the field name the frontend will use for the file
r.post('/upload', upload.single('avatar'), (req, res) => {
  try {

    console.log('Uploaded file info:');
    if (!req.file) {
      return res.status(400).json({ ok: false, message: 'No file uploaded.' });
    }

    // On successful upload, Cloudinary provides file details in req.file
    // The public URL is available at req.file.path
    res.status(200).json({
      ok: true,
      message: 'Image uploaded successfully!',
      url: req.file.path, // This is the URL your frontend needs
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ ok: false, message: 'An error occurred during upload.' });
  }
});

export default r;