import { Router } from "express";
import { DataController } from "../controller/dataController";

const router = Router();
const dataController = new DataController();

/**
 * @swagger
 * tags:
 *   name: Data
 *   description: Data management
 */

/**
 * @swagger
 * /covid19/addCovidData:
 *   post:
 *     summary: Add COVID data
 *     tags: [Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               covid19:
 *                 type: object
 *                 properties:
 *                   country:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date
 *                   population:
 *                     type: integer
 *                   cases:
 *                     type: integer
 *                   active:
 *                     type: integer
 *                   recovered:
 *                     type: integer
 *                   deaths:
 *                     type: integer
 *     responses:
 *       201:
 *         description: COVID data added successfully
 *       400:
 *         description: Bad request (missing fields)
 *       500:
 *         description: Error adding data
 */
router.post('/addCovidData', dataController.addCovidData);

/**
 * @swagger
 * /covid19/editCovidData:
 *   put:
 *     summary: Update COVID data entry
 *     tags: [Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               covid19:
 *                 type: object
 *                 required:
 *                   - id
 *                   - country
 *                   - date
 *                   - population
 *                   - cases
 *                   - active
 *                   - recovered
 *                   - deaths
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique identifier of the record to update
 *                   country:
 *                     type: string
 *                     description: Name of the country
 *                   date:
 *                     type: string
 *                     format: date
 *                     description: Date of the record
 *                   population:
 *                     type: integer
 *                     description: Total population of the country
 *                   cases:
 *                     type: integer
 *                     description: Total number of confirmed cases
 *                   active:
 *                     type: integer
 *                     description: Number of active cases
 *                   recovered:
 *                     type: integer
 *                     description: Number of recovered cases
 *                   deaths:
 *                     type: integer
 *                     description: Number of deaths
 *     responses:
 *       200:
 *         description: COVID data updated successfully
 *       400:
 *         description: Bad request (missing fields or invalid data)
 *       404:
 *         description: Entry not found
 *       500:
 *         description: Internal server error
 */
router.put('/editCovidData', dataController.editCovidData);

/**
 * @swagger
 * /covid19/deleteCovidData:
 *   delete:
 *     summary: Delete COVID data entry
 *     tags: [Data]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID of the record to delete
 *     responses:
 *       200:
 *         description: COVID data deleted successfully
 *       400:
 *         description: Bad request (invalid ID)
 *       404:
 *         description: Entry not found
 *       500:
 *         description: Internal server error
 */
router.delete('/deleteCovidData', dataController.deleteCovidData);

export default router;
