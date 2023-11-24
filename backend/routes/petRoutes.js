import express from 'express';
const router = express.Router();
import PetController from '../controllers/PetController';
import imageUpload from '../helpers/image-upload';

//middlewares
import checkToken from '../helpers/verify-token';

router.post('/createPet', checkToken, imageUpload.array('images'), PetController.createPet);
//get all pet
router.get('/all', PetController.getAllPets);
//catch use's animals
router.get('/mypets', checkToken, PetController.getAllUserPets);
//my adptions (pets q eu adotei)
router.get('/myadoptions', checkToken, PetController.getAllUserAdoptions);
//details from pet
router.get('/:id', PetController.getPetById);

//update pet
router.patch('/:id', checkToken, imageUpload.array('images'), PetController.updatePet);
//delete pet
router.delete('/:id', checkToken, PetController.deletePetById);

//schedule visit
router.patch('/schedule/:id', checkToken, PetController.schedule);

//conclude adoption
router.patch('/conclude/:id', checkToken, PetController.concludeAdoption);

export default router;