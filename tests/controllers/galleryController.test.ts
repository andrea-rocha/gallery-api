// controlador.test.ts
import { createImagen } from '../../src/controllers/gallery.controller';
import { Request, Response } from 'express';
import { Gallery } from '../../src/models/gallery';
import { validate } from 'class-validator';

jest.mock('class-validator');
const responseExpress = {
    status: jest.fn().mockImplementation((statusCode: number) => {
        return {
            json: jest.fn().mockImplementation((response) => response)
        };
    }),
} as unknown as Response;


describe('galleryController test', () => {
    describe('createImagen', () => {
        it('Should create a new image', async () => {
            const request = { body: { name: 'Test image name', data: 'Test data' } } as Request;
            (validate as jest.Mock).mockResolvedValue([]);
            jest.spyOn(Gallery as any, 'create').mockImplementation(() => {
                return {
                    id: 1,
                    name: 'Test image name',
                    data: 'Test data'
                };
            });
            await createImagen(request, responseExpress);
            expect(Gallery.create).toHaveBeenCalledTimes(1);
            expect(responseExpress.status).toHaveBeenCalledWith(201);
        });


        it('Should handle internal server error', async () => {
            const request = { body: { name: 'Test Image', data: 'Test Data' } } as Request;
            (validate as jest.Mock).mockResolvedValue([]);
            (Gallery.create as jest.Mock).mockRejectedValue(new Error('Internal Server Error'));
            await createImagen(request, responseExpress);
            expect(responseExpress.status).toHaveBeenCalledWith(500);
        });
    });

});
