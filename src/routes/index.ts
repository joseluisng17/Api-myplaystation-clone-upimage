import { Router } from 'express';
import { createPhoto, getPhotos, getPhoto, deletePhoto, updatePhoto, onlyPhoto } from '../controllers/photo.controller';
import multer from '../libs/multer';

const router = Router();

router.route('/photo')
    .post(multer.single('image'), onlyPhoto)

router.route('/photos')
    .get(getPhotos)
    .post(multer.single('image'), createPhoto)

router.route('/photos/:id')
    .get(getPhoto)
    .delete(deletePhoto)
    .put(multer.single('image'), updatePhoto)
    

export default router;