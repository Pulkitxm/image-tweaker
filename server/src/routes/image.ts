// routes/imageRouter.ts
import { Router } from 'express';
import upload from '../lib/multerConfig';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const imageRouter = Router();

const store: {
    public_id: string;
    secure_url: string;
}[] = [];

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const folder = process.env.CLOUDINARY_FOLDER_NAME;

imageRouter.post('/', upload.single('test'), async (request, response) => {
    try {
        if (!request.file) {
            return response.status(400).json({ message: 'No file uploaded' });
        }

        const uploadStream = cloudinary.uploader.upload_stream({
            folder,
            name: request.file.originalname,
        }, (error, result: UploadApiResponse | undefined) => {
            if (error) {
                response.status(500).json({ message: error.message });
            } else {
                if (result) {
                    const public_id = result.public_id.split('/')[1];
                    store.push({ public_id, secure_url: result.secure_url });
                    response.status(200).json({ message: 'Upload successful', public_id });
                } else {
                    response.status(500).json({ message: 'Upload result is undefined' });
                }
            }
        });
        uploadStream.end(request.file.buffer);
    } catch (error) {
        response.status(500).json({ message: (error as Error).message });
    }
});

imageRouter.get('/:public_id', async (request, response) => {
    try {
        const { public_id } = request.params;
        const selectedImg = store.find((image) => image.public_id === public_id);
        if (!selectedImg) {
            return response.status(404).json({ message: 'Image not found' });
        }
        const imageUrl = selectedImg.secure_url;
        const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        response.setHeader('Content-Type', imageResponse.headers['content-type']);
        response.status(200).send(imageResponse.data);
    } catch (error) {
        response.status(500).json({ error });
    }
});

export default imageRouter;
