import { Request, Response } from 'express';
import { Gallery } from '../models/gallery'
import { ImageDto, QueryDto } from '../Dtos/galleryDto.model';
import { validate } from 'class-validator';
import { GalleryService } from '../services/galleryServices';


export async function createImagen(req: Request, res: Response){
    await GalleryService.createImage(req,res);
}

export async function getImages(req: Request, res: Response) {
    await GalleryService.getImages(req,res);
}

export async function getImageByName(req: Request, res: Response) {
    await GalleryService.getImageByName(req,res);
}