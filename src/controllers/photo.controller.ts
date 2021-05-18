import {Request, Response} from 'express';
import path from 'path'; 
import fs from 'fs-extra';

import Photo from '../models/Photo';

export async function getPhotos(req: Request, res: Response): Promise<Response>{

    const photos = await Photo.find();
    return res.json(photos);
    
}

export async function getPhoto(req: Request, res: Response): Promise<Response>{
    const { id } = req.params;
    const photo = await Photo.findById(id);
    return res.json(photo);
}

export async function onlyPhoto(req: Request, res: Response): Promise<Response>{

    console.log(req.file);
    console.log(req.body);
    console.log(req.body.id_user);

    return res.json({
        message: 'Photo successfully saved'
    });
}

export async function createPhoto(req: Request, res: Response): Promise<Response>{

    // console.log(req);
    // console.log(req.file);
    // console.log(req.body.title);
    // console.log(req.body.description);

    const { title, description } = req.body;
    const newPhoto = {
        title: title,
        description: description,
        imagePath: req.file.path
    };

    const photo = new Photo(newPhoto);
    // console.log(photo);

    await photo.save();

    return res.json({
        message: 'Photo successfully saved',
        photo
    });
}

export async function deletePhoto(req: Request, res: Response): Promise<Response> {

    const { id } = req.params;
    const photo = await Photo.findByIdAndRemove(id);

    if(photo){
        await fs.unlink(path.resolve(photo.imagePath));
    }

    return res.json({
        message: 'Photo Deleted',
        photo
    });

}

export async function updatePhoto(req: Request, res: Response): Promise<Response> {

    const { id } = req.params;
    const { title, description, oldPath } = req.body;
    
    if(req.file){
        //console.log('existe imagen');

        await fs.unlink(path.resolve(oldPath));

        const updatedPhoto = await Photo.findByIdAndUpdate(id, {
            title,
            description,
            imagePath: req.file.path
        }, {new: true});   
        
        return res.json({
            message: 'Successsfully',
            updatedPhoto
        });

    }else{

        //console.log('no existe imagen')
        const updatedPhoto = await Photo.findByIdAndUpdate(id, {
            title,
            description
        }, {new: true});   
        
        return res.json({
            message: 'Successsfully',
            updatedPhoto
        });
    }   

}