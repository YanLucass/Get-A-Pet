import api from '../../utils/api';
import styles from './PetDetails.module.css'
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// hooks
import useFlashMessage from '../../hooks/useFlashMessage';

function PetDetails() {
    const [pet, setPet] = useState({});
    const {id} = useParams();
    const {setFlashMessage} = useFlashMessage();
    const [token] = useState(localStorage.getItem('token') || '');

    //get pet
    useEffect(() => {
        api.get(`/pets/${id}`)
        .then((response) => {
            setPet(response.data.pet)
        })
    }, [id]);


    //function adopter
    async function schedule() {
        let msgType = 'sucess'
        // adding adopts is a pet update.
        const data = await api.patch(`/pets/schedule/${pet._id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            console.log(response);
            return response.data;
        })
        .catch(err => {
            msgType = 'error'
            return err.response.data;
        }) 

        setFlashMessage(data.message, msgType)
    }

    return (
        <>
            {pet.name && (
                <section className={styles.pet_details_container}>
                    <div className={styles.pet_details_header}>
                        <h1>Conhecendo o Pet: {pet.name} </h1>
                        <p><strong>Descrição do pet: </strong> {pet.description}</p>
                        <p>Se tiver interesse, marque uma visita para conhecê-lo.</p>

                    </div>
                    {/* images div */}
                    <div className={styles.pet_images}>
                        {pet.images.map((image, index) => (
                            <img src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                            alt={pet.name} 
                            key={index} />
                        ))}
                    </div>
                    <p>
                        <span className='bold'>Peso:</span> {pet.weight}kg
                    </p>

                    <p>
                        <span className='bold'>Peso:</span> {pet.age}anos
                    </p>

                    {/* Verificar se o usuario tá logado  */}
                    {token ? (
                        <button onClick={schedule}>Solictar visita</button>
                    )
                     : (
                        <p> Você precisa <Link to='/register'>criar uma conta</Link> para solictar a visita</p>
                    )}

                </section>
            )}
        </>
      
    )
}

export default PetDetails; 