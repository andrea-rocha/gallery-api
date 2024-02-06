import { Request, Response } from 'express';
import { Gallery } from '../models/gallery'
import { ImageDto, QueryDto } from '../Dtos/galleryDto.model';
import { validate } from 'class-validator';


export async function createImagen(req: Request, res: Response) {
    try {       
        const imageDto = new ImageDto();
        imageDto.name = req.body.name;
        imageDto.data = req.body.data;

        const errors = await validate(imageDto);

        if (errors.length > 0) {
            return res.status(400).json({ errors: errors.map((error) => ({ field: error.property, message: error.constraints } )) });
        }

        const newImage = await Gallery.create({
            name: imageDto.name,
            data: imageDto.data
        });

        res.status(201).json(newImage);
    } catch (error) {
        console.error('Error creating image:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function getImages(req: Request, res: Response) {
    try {
       const gallery = await Gallery.findAll()
       res.json(gallery)
    } catch (error) {
        console.error('Error getting images:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export async function getImageByName2( req: Request, res: Response){
    try {
        const { name } = req.params
        const image = await Gallery.findOne({
            where: {
                name: name
            }
        });
        if(!image) return res.status(404).json({ message: 'Image does not exist'});
        res.json(image);
   } catch (error) {
        console.error('Error getting images:', error);
        res.status(500).json({ error: 'Internal Server Error' });
   } 
}

export async function getImageByName(req: Request, res: Response) {
    try {
        const { name } = req.params;

        const queryDto = new QueryDto();
        queryDto.name = name;

        const errors = await validate(queryDto);

        if (errors.length > 0) {
            return res.status(400).json({
                errors: errors.map((error: any) => ({
                    field: error.property,
                    message: Object.values(error.constraints),
                })),
            });
        }

        const image = await Gallery.findOne({
            where: {
                name: queryDto.name,
            },
        });

        if (!image) return res.status(404).json({ message: 'Image does not exist' });

        res.json(image);
    } catch (error) {
        console.error('Error getting images:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}