import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { useState, useEffect } from 'react';
import styles from './Home.module.css';

function Home() {
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPets, setFilteredPets] = useState([]);

  // get all pets from api
  useEffect(() => {
    api.get('/pets/all')
      .then(response => {
        setPets(response.data.pets);
      })
  }, []);

  // filtering pets based on color or age.

  useEffect(() => {
    if(searchTerm === '') {
       setFilteredPets([...pets]);
    } else {
        const term = searchTerm.toLowerCase();
        const results = pets.filter((pet) => {
          const petColor = pet.color;
          const petAge = pet.age;

          return (
            petColor.toLowerCase().includes(term) || pet.age.toString().includes(searchTerm)
          )
        })
        setFilteredPets(results)
    }

  
  }
  , [pets, searchTerm]);

  
  return (
    <section>
         {/* header */}
         <div className={styles.pet_home_header}>
        <h1>Adote um pet</h1>
        <p>Veja os detalhes de cada um e conheça o tutor deles</p>
      </div>

      {/* search filter*/}
      <div className={styles.searchContainer}>
        <input
          type='text'
          placeholder='Buscar por cor ou idade...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
         <span role="img" aria-label="Buscar" className={styles.searchIcon}>🔍</span>
      </div>

      {/* show pets filtering pets*/}
      <div className={styles.pet_container}>
        {filteredPets.length > 0 ?
          filteredPets.map((pet) => (
            <div className={styles.pet_card} key={pet._id}>
              {/* Div from photo */}
              <div style={{ backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})` }} className={styles.pet_card_image}></div>
              <h3>{pet.name}</h3>

              <p>
                <span className='bold'>Peso:</span> {pet.weight}kg   
              </p>

              {pet.available ? 
              (<Link to= {`/pet/${pet._id}`}>Mais detalhes</Link>) 
              : 
              (<p className={styles.adopted_text}>Adotado</p>)}

            </div>
          ))
          :
          <p>Sem pet filtrado</p>
        }
      </div>
    </section>
  );
}

export default Home;
