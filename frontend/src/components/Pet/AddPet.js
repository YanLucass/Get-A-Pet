import api from '../../utils/api'
import { useState, useNavigate } from 'react'
import { Link } from 'react-router-dom'
import styles from './AddPet.module.css'

// Nossos hooks
import useFlashMessage from '../../hooks/useFlashMessage' 

function AddPet() {
  return (
    <section className={styles.addpet_header}>
     <div>
        <h1>Cadastre um pet</h1>
        <p>Depois ele ficará disponível para adoção</p>
     </div>

     <p>Formulário</p>
    </section>
  )
}

export default AddPet