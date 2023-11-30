import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RoundImage from '../layouts/RoundImage';
import api from '../../utils/api';
import styles from './Dashboard.module.css';

// hooks
import useFlashMessage from '../../hooks/useFlashMessage';

function MyPets() {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem('token') || '');
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api.get('/pets/mypets', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
    .then(response => {
      console.log(response);
      setPets(response.data.pets);
    })
    .catch(err => {
      console.log(err);
    });
  }, [token]);


  async function removePet(id) {
    let msgType = 'sucess'
    const data = await api.delete(`/pets/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then(response => {
      // remover pet do front
      const updatedPets = pets.filter((pet) => pet._id !== id) //retorna todos menos o excluido
      setPets(updatedPets);  
      return response.data
    })
    .catch(err => {
      msgType = 'error'
      return err.response.data;
    })

    setFlashMessage(data.message, msgType);
  }

   return (
    <section>
      {/* Cabeçalhos mypets */}
      <div className={styles.petlist_header}>
      
        <h1> Meus pets </h1>
        <Link to='/pet/add'>Cadastrar pet</Link>
      </div>
      
      {/* Mostrar pets */}
      <div className={styles.petlist_container}>
        {pets.length > 0 &&  
          pets.map((pet) => (
            <div className={styles.petlist_row} key={pet._id}>
              <RoundImage 
                src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                alt={pet.name}
                width="px75"
              />
              <span className="bold"> {pet.name} </span>
              <div className={styles.actions}>
                {pet.available ? 
                  ( 
                    <>
                      {/* Verificar se já tem um adotante */}
                      {pet.adopter && (
                        <button className={styles.conclude_btn}>Concluir adoção</button>
                      )}
                      <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                      <button onClick={() => {
                        removePet(pet._id);
                      }}>Excluir</button>
                    </>
                  )
                  : (
                    <p>Pet já adotado</p>
                  )
                }    
              </div>
            </div>
          ))
        }
        {pets.length === 0 && <p>Não há pets cadastrados</p>}
      </div>
    </section>
  );
}

export default MyPets;
