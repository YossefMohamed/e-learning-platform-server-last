import { Router } from "express";
import { getCurrentUser } from "../../controllers/userControllers";

const router = Router();

/**
 * @openapi
 * '/api/users':
 *  get:
 *     tags:
 *     - User
 *     summary: Get Current User Data
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      404:
 *        description: User Have To Login
 */

router.get("/", getCurrentUser);

export { router as getCurrentUserRouter };
