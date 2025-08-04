const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dobqqf70d',
  api_key: '965122429267783',
  api_secret: '_-7Md9nSzQvK-Q2qcpYIgS1lKws',
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'movies',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });

const fields = upload.fields([
  { name: 'cover', maxCount: 1 },
  { name: 'photos', maxCount: 10 }
]);

module.exports = { upload, fields };
