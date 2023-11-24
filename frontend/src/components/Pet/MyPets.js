import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MyPets() {
    const [pets, setPets] = useState([]);

    return (
        <section>

            {/* Cabeçalhos mypets */}
            <div>
                <h1> MyPets</h1>
                <Link to='/pet/add'>Cadastrar pet</Link>
            </div>
            {/* Mostrar pets */}
            <div>
                {pets.length > 0 &&  <p>Meus pets cadastrados</p> }
                {pets.length === 0 && <p>Não há pets cadastrados</p>}

            </div>
        </section>

    )
}

export default MyPets;