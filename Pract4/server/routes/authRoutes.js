const express = require('express');
const { login } = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * definitions:
 *   Login:
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *   LoginResponse:
 *      properties:
 *       user:
 *         type: string
 *       token:
 *         type: string
 *   LoginError:
 *      properties:
 *       error:
 *         type: string
 */

/**
 * @openapi
 * /auth/login:
 *   post:
 *     description: Запрос на этот endpoint предназначен для логина пользователя. Возвращает токен, который затем нужно использовать для обращения к API. Передавать в заголовке Authorization Bearer XXX.
 *     produces:
 *       - application/json
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/definitions/Login'
 *     security:
 *       - {}
 *     responses:
 *       200:
 *         description: Данные логина
 *         content: 
 *            application/json:
 *               schema:
 *                 type: object
 *                 $ref: '#/definitions/LoginResponse'
 *       401:
 *         description: Ошибка
 *         content: 
 *            application/json:
 *               schema:
 *                 type: object
 *                 $ref: '#/definitions/LoginError'
 */
router.post('/login', login);

module.exports = router;