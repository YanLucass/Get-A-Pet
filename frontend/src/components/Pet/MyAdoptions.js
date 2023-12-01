import api from '../../utils/api';
import { useState, useEffect } from 'react';
import RoundImage from '../layouts/RoundImage'
import styles from './Dashboard.module.css'

function MyAdoptions() {
    const [pets, setPets] = useState([]);
    const [token] = useState(localStorage.getItem('token') || '');

    useEffect(() => {
        api.get('/pets/myadoptions', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then(response => {
            console.log(response);
            setPets(response.data.pets);
     })
       

    }, [token])
    return (
        <section>
            <div className={styles.petlist_header}>
                <h1>Minhas adoções</h1>
            </div>
            
            <div className={styles.petlist_container}>
                {pets.length > 0 && pets.map((pet) => (
                    <div key={pet._id} className={styles.petlist_row}>
                        <RoundImage
                            src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                            alt={pet.name}
                            width="px75"
                        />  
                          <span className="bold">{pet.name}</span>
                          <div className={styles.contacts}>
                            <p>
                                <span className="bold">Ligue para</span> {pet.user.phone}
                            </p>
                            <p>
                                <span className="bold">Fale com</span> {pet.user.name}
                            </p>
                         
                         </div>

                        <div className={styles.actions}>
                            {pet.available ? (<p>Adoção em processo</p>) : (<p>Parabéns por concluir adoção</p>)}    
                         </div>
                     </div>

                  
                     
                ))}

                {pets.length === 0 &&  <h3> Não há pets adotados!</h3>}

            </div>
        </section>
    )
    }

export default MyAdoptions;

