const express = require('express');
const { authenticate } = require('../middlewares/auth');
const {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  markAsCompleted,
  markAsNotCompleted,
  getCompletedTodos
} = require('../controllers/todoController');

const router = express.Router();

router.use(authenticate);


/**
 * @swagger
 * definitions:
 *   Todo:
 *     required:
 *       - title
 *     properties:
 *       title:
 *         type: string
 *         default: "xxx"
 *       description:
 *         type: string
 *         default: ""
 *       completed:
 *         type: boolean
 *         default: false 
 *       dueDate:
 *         type: string
 *         format: date-time
 *   Error:
 *     properties:
 *       error:
 *         type: string
 *   Info:
 *     properties:
 *       message:
 *         type: string
 */

/**
 * @openapi
 * /todos:
 *   get:
 *     description: Возвращает все объекты todo для текущего пользователя
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Объекты todo
 *         content: 
 *            application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/definitions/Todo'
 *       401:
 *         description: Ошибка
 *         content: 
 *            application/json:
 *               schema:
 *                   $ref: '#/definitions/Error'
 *   security:
 *      - bearerAuth: []
 */
router.get('/', getAllTodos);
/**
 * @openapi
 * /todos:
 *   security:
 *      - bearerAuth: []
 *   post:
 *     description: Создает новый объект todo
 *     produces:
 *       - application/json
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/definitions/Todo'
 *     responses:
 *       201:
 *         description: Созданный объект todo
 *         content: 
 *            application/json:
 *               schema:
 *                   $ref: '#/definitions/Todo'
 *       400:
 *         description: Ошибка
 *         content: 
 *            application/json:
 *               schema:
 *                   $ref: '#/definitions/Error'
 */
router.post('/', createTodo);
/**
 * @openapi
 * /todos/{id}:
 *   security:
 *      - bearerAuth: []
 *   put:
 *     description: Обновляет объект todo
 *     parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *              type: number
 *     produces:
 *       - application/json
 *     requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/definitions/Todo'
 *     responses:
 *       200:
 *         description: Обновленный объект todo
 *         content: 
 *            application/json:
 *               schema:
 *                   $ref: '#/definitions/Todo'
 *       400:
 *         description: Ошибка
 *         content: 
 *            application/json:
 *               schema:
 *                   $ref: '#/definitions/Error'
 *       404:
 *         description: Todo не найден
 *         content: 
 *            application/json:
 *               schema:
 *                   $ref: '#/definitions/Error'
 */
router.put('/:id', updateTodo);
/**
 * @openapi
 * /todos/{id}:
 *   security:
 *      - bearerAuth: []
 *   delete:
 *     description: Удаляет объект todo
 *     parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *              type: number
 *     responses:
 *       200:
 *         description: Успешное удаление
 *         content: 
 *            application/json:
 *               schema:
 *                   $ref: '#/definitions/Message'
 *       404:
 *         description: Todo не найден
 *         content: 
 *            application/json:
 *               schema:
 *                   $ref: '#/definitions/Error'
 */
router.delete('/:id', deleteTodo);
/**
 * @openapi
 * /todos/{id}/complete:
 *   security:
 *      - bearerAuth: []
 *   patch:
 *     description: Помечает объект todo как завершенный
 *     parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *              type: number
 *     responses:
 *       200:
 *         description: Обновленный объект todo
 *         content: 
 *            application/json:
 *               schema:
 *                   $ref: '#/definitions/Todo'
 *       404:
 *         description: Todo не найден
 *         content: 
 *            application/json:
 *               schema:
 *                   $ref: '#/definitions/Error'
 */
router.patch('/:id/complete', markAsCompleted);
/**
 * @openapi
 * /todos/{id}/not-complete:
 *   security:
 *      - bearerAuth: []
 *   patch:
 *     description: Помечает объект todo как незавершенный
 *     parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *              type: number
 *     responses:
 *       200:
 *         description: Обновленный объект todo
 *         content: 
 *            application/json:
 *               schema:
 *                   $ref: '#/definitions/Todo'
 *       404:
 *         description: Todo не найден
 *         content: 
 *            application/json:
 *               schema:
 *                   $ref: '#/definitions/Error'
 */
router.patch('/:id/not-complete', markAsNotCompleted);
/**
 * @openapi
 * /todos/completed:
 *   security:
 *      - bearerAuth: []
 *   get:
 *     description: Возвращает все объекты todo, помеченные как completed
 *     responses:
 *       200:
 *         description: Объекты todo
 *         content: 
 *            application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/definitions/Todo'
 *       401:
 *         description: Ошибка
 *         content: 
 *            application/json:
 *               schema:
 *                   $ref: '#/definitions/Error'
 */
router.get('/completed', getCompletedTodos);

module.exports = router;