import { Router } from "express";
import { editUser } from "../../controllers/userControllers";
import { validateRequest } from "../../middlewares/validate-request";
import { editUserValidators } from "../../services/userValidators/editUserValidators";

const router = Router();

/**
 * @openapi
 * '/api/users/':
 *  patch:
 *     tags:
 *     - User
 *     summary: Edit Current user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      400:
 *        description: Bad request
 */

router.patch("/:id", editUserValidators, validateRequest, editUser);

export { router as editUserRouter };
