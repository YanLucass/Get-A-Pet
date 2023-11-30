import api from '../../utils/api';
import { useState, useEffect } from 'react';
import RoundImage from '../layouts/RoundImage'
import styles from './Dashboard.module.css'

function MyAdoptions() {
    const [pets, setPets] = useState[[]];
    const [token] = useState(localStorage.getItem('token') || '');

    useEffect(() => {
        api.get('/pets/myadoptions', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
      
       

    }, [token])
    return (
        <p>My adoptions</p>
    )
}

export default MyAdoptions;

