import { Gallery } from "../models/gallery";

export class GalleryRepository{

    static async createImage(name:string,data:string){
        return await Gallery.create({name,data})
    }

    static async getImages(){
        return await Gallery.findAll();
    }

    static async getImageByName(param:string){
        return  await Gallery.findOne({
            where: {
                name: param,
            },
        });
    }
}