import { validate } from "class-validator";
import { ImageDto, QueryDto } from "../Dtos/galleryDto.model";
import { GalleryRepository } from "../repository/galleryRepository";
import { Request,Response } from "express";

export class GalleryService{

    static async createImage(req:Request,res:Response){
        try {       
            const imageDto = new ImageDto();
            imageDto.name = req.body.name;
            imageDto.data = req.body.data;
    
            const errors = await validate(imageDto);
    
            if (errors.length > 0) {
                return res.status(400).json({ errors: errors.map((error) => ({ field: error.property, message: error.constraints } )) });
            }
    
            const newImage = await GalleryRepository.createImage(imageDto.name,imageDto.data);
    
            res.status(201).json(newImage);
        } catch (error) {
            console.error('Error creating image:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getImages(req: Request, res: Response) {
        try {
           const gallery = await GalleryRepository.getImages();
           res.json(gallery)
        } catch (error) {
            console.error('Error getting images:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getImageByName(req: Request, res: Response){
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
    
            const image = await GalleryRepository.getImageByName(queryDto.name)
    
            if (!image) return res.status(404).json({ message: 'Image does not exist' });
    
            res.json(image);
        } catch (error) {
            console.error('Error getting images:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    
    }
   
} 