import getToken from '../helpers/get-token';
import getUserByToken from '../helpers/get-user-by-token';
import Pet from '../models/Pet';
import mongoose from '../db/conn';
import checkIfPetIsMy from '../helpers/check-is-my-pet';
const ObjectId = mongoose.Types.ObjectId;

class PetController {
    static async createPet(req, res) {

        //CREATE A PET
        const { name, age, weight, color } = req.body;
        const images = req.files;
        const available = true; //available for adoption.

        //validations
        if(!name) {
            res.status(422).json({message: "O nome é obrigatório!"});
            return;
        }

        if(!age) {
            res.status(422).json({message: "A idade é obrigatória!"});
            return;
        }

        if(!weight) {
            res.status(422).json({message: "O peso é obrigatório!"});
            return;
        }

        if(!color) {
            res.status(422).json({message: "A cor é obrigatória!"});
            return;
        }   

        if(images.length === 0){
            res.status(422).json({message: "A imagem é obrigatória!"});
            return;
        }
        console.log(images);

        //get pet owner
        const token = getToken(req);
        const user = await getUserByToken(token);

        //create a pet
        
        const pet = new Pet({
            name, age, weight, color, available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone,
            },
        });
       
        //Vamos receber um array de objetos com dados da imagem, limpamos e jogamos no array images[] so o name img.
        images.map(image => { pet.images.push( image.filename )});

        try {
            const newPet = await pet.save();
            res.status(201).json({message: 'Pet cadastrado com sucesso!', newPet});
        } catch (err) {
            res.status(500).json({message: 'Deu erro' + err});
        }

    }

    //GET ALL PETS

    static async getAllPets(req, res) {
        try {
            const pets = await Pet.find().sort('-createdAt');
            res.status(200).json({pets: pets});
        } catch (error) {
            res.status(500).json({message: "Deu erro ao buscar os pets", err});
        }  
    }

    //GET PETS FROM USER

    static async getAllUserPets(req, res) {

        //get user from token
        const token = getToken(req);
        const user = await getUserByToken(token);
        try {
            const pets = await Pet.find({'user._id': user._id}).sort('-createdAt');
            res.status(200).json({pets});
        } catch (error) {
            res.status(500).json({message: "Deu erro ao buscar os pets", err});
        }
    }

    // CATCH ALL USER ADOPTIONS

    static async getAllUserAdoptions(req, res) {
        //get user from token
        const token = getToken(req);
        const user = await getUserByToken(token);

        const pets = await Pet.find({'adopter._id': user._id}).sort('-createdAt');
        res.status(200).json({pets,
        });
    }

    // GET PET BY ID

    static async getPetById(req, res) {
        const id = req.params.id;

        //check if id is valid
        if(!ObjectId.isValid(id)) {
            res.status(422).json({message: 'Esse ID não é válido'});
            return;
        }

        //check if pet exists
        const pet = await Pet.findOne({_id: id});

        if(!pet) {
            res.status(404).json({message: 'Pet não encontrado!'});
        }

        res.status(200).json({pet: pet})
    }

    //DELETE PET FROM USER 

    static async deletePetById(req, res) {
        const id = req.params.id;

        //check if id is valid
        if(!ObjectId.isValid(id)) {
            res.status(422).json({message: 'Esse id não é válido!'});
            return;
        }

        //check if pets exists

        const pet = await Pet.findOne({_id: id});
        
        if(!pet) {
            res.status(404).json({message: 'Pet não encontrado!'});
            return;
        }

        //verificar se o usuario que tem o token agr, se foi ele que cadastrou o pet. Outros n pode deletar
        //check if logged in user registered the pet
        const token = getToken(req);
        const user = await getUserByToken(token);
        
        checkIfPetIsMy(res, pet.user._id, user._id);

        await Pet.findByIdAndRemove(id);
        res.status(200).json({message: 'Pet removido com sucesso!'});
        
    }

    //UPDATE PET

    static async updatePet(req, res) {
        const id = req.params.id;
        const { name, age, weight, color } = req.body;

        const images = req.files;

        const updatedData = {}

        //check if id is valid
        if(!ObjectId.isValid(id)) {
            res.status(422).json({message: "Esse id não é válido!"});
            return;
        } 
        //check if pets exists
        const pet = await Pet.findOne({_id: id});

        if(!pet) {
            res.status(404).json({message: 'Pet não encontrado!'});
            return;
        }

        //check if logged in user registered the pet
        const token = getToken(req);
        const user = await getUserByToken(token);

        checkIfPetIsMy(res, pet.user._id, user._id);

        //validations of fields

        if(!name) {
            res.status(422).json({message: "O nome é obrigatório!"});
            return;
        }

        updatedData.name = name;

        if(!age) {
            res.status(422).json({message: "A idade é obrigatória!"});
            return;
        }
        updatedData.age = age

        if(!weight) {
            res.status(422).json({message: "O peso é obrigatório!"});
            return;
        }
    
        updatedData.weight = weight;

        if(!color) {
            res.status(422).json({message: "A cor é obrigatória!"});
            return;
        }   

        updatedData.color = color;

        //came an imagem? update!   
        if(images.length > 0) {
          
        // catch filenames to the array images
        updatedData.images = [];
        images.map(image => { updatedData.images.push(image.filename)});
        }
        //save edit
        await Pet.findByIdAndUpdate(id, updatedData);
        res.status(200).json({message: "Pet atualizado com sucesso!"});
        return;
    }
    
    //ADD ADOPTER FOR THE EPT 

    static async schedule(req, res) {
        const id = req.params.id;

        //check if pets exists
        const pet = await Pet.findOne({_id: id});
        if(!pet) {
            res.status(404).json({message: "Pet não encontrado"});
            return;
        }

        //check if user registered the pet (não posso marcar visita pro meu proprio pet);
        const token = getToken(req);
        const user = await getUserByToken(token);

        if(pet.user._id.equals(user._id)) {
            res.status(422).json({message: "Você não pode agendar uma visita com seu próprio pet"});
            return;
        }

        //check if user has already schedule a visit (se o usuario agr ja agendou uma visita)
        if(pet.adopter) {
            //se tive rum adotante
            if(pet.adopter._id.equals(user._id)) {
                res.status(422).json({message: "Você já agendou uma visita para esse pet"});
                return;
            }
        }

        //add user to pet (adicionar o suaurio como adotante, isso sinaliza a visita)
        pet.adopter = {
            _id: user._id,
            name: user.name,
            image: user.image // se tiver
        }

        await Pet.findByIdAndUpdate(id, pet);

        res.status(200).json({message: `A visita foi agendada com sucesso entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}`}); 
    }
    
    //CONCLUDE ADOPTION 
    
    static async concludeAdoption(req, res) {
        const id = req.params.id;

        //check if id is valid
        if(!ObjectId.isValid(id)) {
            res.status(422).json({message: 'Esse id não é válido!'});
            return;

        }

        //check if pets exists
        const pet = await Pet.findOne({_id: id});
        if(!pet) {
            res.status(404).json({message: "pet não encontrado!"});
            return;
        }

        //check if the user owns the pet
        const token = getToken(req);
        const user = await getUserByToken(token);

        checkIfPetIsMy(res, pet.user._id, user._id);
        
        pet.available = false;
        
        await Pet.findByIdAndUpdate(id, pet);
        res.status(200).json({message: `O pet ${pet.name} foi adotado! Parabéns!`});
    }

}

export default PetController