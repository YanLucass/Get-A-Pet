import { Link } from 'react-router-dom'
import api from '../../utils/api'
import { useState, useEffect } from 'react'
import styles from './Home.module.css'

function Home() {
  const [pets, setPets] = useState([]);

  //get all pets
  useEffect( () => {
      api.get('/pets/all')
      .then(response => {
        setPets(response.data.pets);
      })
  }, []);


  return (
    <section>
      {/* header */}
      <div>
        <h1>Adote um pet</h1>
        <p>Veja os detalhes de cada um e conheça o tutor deles</p>
      </div>
      {/* pets */}
      <div>
        {pets.length > 0 && (
          // show pets with map
          pets.map((pet) => (
            <div> 
              <p>Imagem do pet</p>
              <h3>{pet.name}</h3>
              <p>
                <span className="bold"></span>
              </p>
            </div>
          ))
        )}

        {pets.length === 0 && (
          <p> Não há pets cadastrados ou disponiveis para adoção no momento</p>
        )}

      </div>

    </section>
  )
}

export default Home;