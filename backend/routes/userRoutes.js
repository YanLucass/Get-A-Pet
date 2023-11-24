import express from 'express';
const router = express.Router();
import UserController from '../controllers/UserController';
//middlewares
import checkToken from '../helpers/verify-token';
import imageUpload from '../helpers/image-upload';

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/checkUser', UserController.checkUser);
//get user byId
router.get('/:id', UserController.getUserById);
//update user protected with a token. ImageUpload detecta a pagina correta 
router.patch('/edit/:id', checkToken, imageUpload.single("image"), UserController.editUser);


export default router;