import { useState } from "react";
import formStyles from './Form.module.css'
import Input from './Input'
import Select from "./Select";
import api from "../../utils/api";
import useFlashMessage from "../../hooks/useFlashMessage";
import { useNavigate } from 'react-router-dom';

// Esse formulário será modelo para adição e edição dos pets!

function PetForm({handleSubmit, petData, btnText}) {
    const [pet, setPet] = useState(petData || {});
    const [preview, setPreview] = useState([]) //array vazio para upload de multiplas imagens.
    const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclado", "Marrom"]
    const [token] = useState(localStorage.getItem('token') || '');
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate();
    console.log(petData);
   

    function onFileChange(e) {
        console.log(e.target);
        console.log(e.target.files);
        setPreview(Array.from(e.target.files)) //transformando em array o fileList
        setPet({...pet, images: [...e.target.files]});
    }

    function handleChange(e) {
        setPet({...pet, [e.target.name]: e.target.value});
    }

    function handleColor(e) {
        setPet({...pet, color: e.target.options[e.target.selectedIndex].text})
    }

    async function registerPet(pet) {
        let msgType = 'success'

        const formData = new FormData()
    
        const petFormData = await Object.keys(pet).forEach((key) => {
          if (key === 'images') {
            for (let i = 0; i < pet[key].length; i++) {
              formData.append(`images`, pet[key][i])
            }
          } else {
            formData.append(key, pet[key])
          }
        })
        
        formData.append('pet', petFormData)
        console.log(token);
       
      const data = await api.post('/pets/createPet', formData, {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data'
        })

         .then(response => {
            return response.data;
     })
        .catch(err => {
        msgType = 'error'
        return err.response.data; //mandando messaage de erro para data
 })
    setFlashMessage(data.message, msgType)
    navigate('/pets/mypets');

    }

      //update pet
    async function updatePet(pet) {
        
        let msgType = 'sucess'
        const formData = new FormData();

        await Object.keys(pet).forEach((key) => {

            //array images
            if(key === 'images') {
                for(let i = 0; i <  pet[key].length; i++) { //key here is images
                    console.log(pet[key]);
                    formData.append('images', pet[key][i]) //ex fut.jpg futrindo.jpeg etc
                }
             } else {
                formData.append(key, pet[key]);
            }
        });

        const data = await api.patch(`/pets/${pet._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            msgType = 'error'
            return err.response.data;
        })

        setFlashMessage(data.message, msgType)
    }

    function submit(e) {
        e.preventDefault();
        if(handleSubmit === 'edit') {
            updatePet(pet);
            return;
        }  else {
            registerPet(pet)
            return;
        }
       
    }

    return ( 
       
       <form onSubmit={submit} className={formStyles.form_container}>
            <div className={formStyles.preview_pet_images}>
                {preview.length > 0                     
                    // Exibir todas imagemns
                    ? preview.map((image, index) => (
                         <img src={URL.createObjectURL(image)} alt={pet.name} key={`${pet.name} + ${index}`} />
                        ))
                    :  pet.images &&  pet.images.map((image, index) => ( 
                        <img src={`${process.env.REACT_APP_API}/images/pets/${image}`} 
                        alt={pet.name}
                        key={`${pet.name} + ${index}`}                        
                        />
                    ))
                }
            </div>
            
            <Input 
                text="Imagens"
                type="file"
                name="images"
                handleOnChange={onFileChange}
                multiple={true}
            />

            <Input 
                text="Nome do Pet"
                type="text"
                name="name"
                placeholder="Digite o nome do pet"
                handleOnChange={handleChange}
                value={pet.name || ''}
            />

            <Input 
                text="Idade do pet"
                type="number"
                name="age"
                placeholder="Digite a idade do pet"
                handleOnChange={handleChange}
                value={pet.age || ''}
            />

            <Input 
                text="Peso"
                type="number"
                name="weight"
                placeholder="Digite o peso do pet"
                handleOnChange={handleChange}
                value={pet.weight || ''}
            />

            <Select
                name="color"
                text="Selecione a cor"
                options={colors}
                handleOnChange={handleColor}
                value={pet.color || ''}
            />

            <input type="submit" value={btnText}></input>
       </form>
    )
}

export default PetForm