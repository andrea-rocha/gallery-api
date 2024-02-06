import { Router } from "express";
import { createImagen, getImages, getImageByName } from '../controllers/gallery.controller';

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Image:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: name of an image
 *        data: 
 *          type: string
 *          description: 20-character text string with valid extension .gif, .png, .jpg that represents an image
 *        createdAt:
 *          type: string
 *          format: date
 *          description: creation date of image
 *        updateAt:
 *          type: string
 *          format: date
 *          description: update date of image
 */

/**
 * @swagger
 * tags:
 *   name: images
 *   description: images Endpoints
 */

/**
 * @swagger
 * /api/images:
 *   get:
 *     summary: Get all images from DB
 *     tags: [images]
 *     responses:
 *       200:
 *         description: Get all images
 *       500:
 *         description: Server side error
 *   post:
 *     summary: Create a new image
 *     tags: [images]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               data:
 *                 type: string
 *     responses:
 *       201:
 *         description: Image created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Image"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Invalid data. The length must be exactly 20 characters and have a valid file extension.'
 *       500:
 *         description: Server side error
 */
router.route('/images')
    .post(createImagen)
    .get(getImages);

/**
 * @swagger
 * /api/images/{name}:
 *   get:
 *     summary: Get an image by name
 *     tags: [images]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the image
 *     responses:
 *       200:
 *         description: Image found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Image"
 *       404:
 *         description: Image not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Not Found
 *                 error:
 *                   type: string
 *                   example: "Image not found"
 *       500:
 *         description: Server side error
 */
router.route('/images/:name')
    .get(getImageByName);

export default router;
