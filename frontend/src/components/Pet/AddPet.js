import api from '../../utils/api'
  import { useState} from 'react'
  import { Link } from 'react-router-dom'
  import { useNavigate } from 'react-router-dom';
  import styles from './AddPet.module.css'

  // Nossos hooks
  import useFlashMessage from '../../hooks/useFlashMessage' 
  import PetForm from '../form/PetForm'

  function AddPet() {

 
    const navigate = useNavigate();



    return (
      <section className={styles.addpet_header}>
      <div>
          <h1>Cadastre um pet</h1>
          <p>Depois ele ficará disponível para adoção</p>
      </div>
      <PetForm  btnText="Cadastar Pet" />


      </section>
    )
  }

  export default AddPet