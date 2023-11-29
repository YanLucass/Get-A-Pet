import api from "../../utils/api";
import { useState, useEffect } from "react";

import styles from './AddPet.module.css'
import PetForm from "../form/PetForm";

// hooks
import useFlashMessage from "../../hooks/useFlashMessage";
import {useParams } from 'react-router-dom'

//destructure url id
function EditPet() {
    const [pet, setPet] = useState({});
    const [token] = useState(localStorage.getItem('token') || '');
    const {id} = useParams();
    const {setFlashMessage} = useFlashMessage()

    //get pet to view

    useEffect(() => {

        api.get(`/pets/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then(response => {
            console.log(response);
            setPet(response.data.pet);
        })
        .catch(err => {
            console.log(err);
        })

    }, [token, id]);

    function updatePet() {

    }
    return (
        <section>
            <div className={styles.addPet_header}>
                <h1>Editando o pet: {pet.name} </h1>
                <p>Depois da edição os dados serão atualizados no sistema.</p>
            </div>

            {/* check if pet arrived(complete data) before printing on the form */}
            {pet.name && (
                <PetForm  handleSubmit='edit' btnText="Atualizar" petData={pet}/>
            )}
        </section>
    )
}

export default EditPet;