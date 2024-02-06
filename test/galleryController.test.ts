// // controlador.test.ts
// import { Request, Response } from 'express';
// import { validate } from 'class-validator';
// import { Gallery } from '../src/models/gallery';
// import { getImageByName } from '../src/controllers/gallery.controller';

// jest.mock('./models/Gallery'); // Mockear el modelo de base de datos

// describe('getImageByName', () => {
//     const mockRequest = (params: any) => ({ params }) as Request;
//     const mockResponse = () => {
//         const res: any = {};
//         res.json = jest.fn().mockReturnValue(res);
//         res.status = jest.fn().mockReturnValue(res);
//         return res as Response;
//     };

//     beforeEach(() => {
//         jest.clearAllMocks();
//     });

//     it('should return 404 if image does not exist', async () => {
//         // Mockear la validación para simular un error de validación
//         jest.spyOn(validate, 'validate').mockResolvedValue([]);

//         // Mockear la función findOne para simular que no se encuentra la imagen
//         (Gallery.findOne as jest.Mock).mockResolvedValueOnce(null);

//         const req = mockRequest({ name: 'nonexistent' });
//         const res = mockResponse();

//         await getImageByName(req, res);

//         expect(res.status).toHaveBeenCalledWith(404);
//         expect(res.json).toHaveBeenCalledWith({ message: 'Image does not exist' });
//     });

//     it('should return 500 on internal server error', async () => {
//         // Mockear la validación para simular un error de validación
//         jest.spyOn(validate, 'validate').mockResolvedValue([]);

//         // Mockear la función findOne para simular un error interno
//         (Gallery.findOne as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

//         const req = mockRequest({ name: 'existing' });
//         const res = mockResponse();

//         await getImageByName(req, res);

//         expect(res.status).toHaveBeenCalledWith(500);
//         expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
//     });

//     it('should return image if it exists and validation passes', async () => {
//         // Mockear la validación para simular que la validación es exitosa
//         jest.spyOn(validate, 'validate').mockResolvedValue([]);

//         // Mockear la función findOne para simular que se encuentra la imagen
//         (Gallery.findOne as jest.Mock).mockResolvedValueOnce({ name: 'existingImage' });

//         const req = mockRequest({ name: 'existingImage' });
//         const res = mockResponse();

//         await getImageByName(req, res);

//         expect(res.status).not.toHaveBeenCalled(); // No debería haber llamado a res.status
//         expect(res.json).toHaveBeenCalledWith({ name: 'existingImage' });
//     });
// });
