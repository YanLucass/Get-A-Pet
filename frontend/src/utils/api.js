import axios from "axios";


//criando uma instancia do axios para definir uma baseUrl
export default axios.create({
    baseURL: 'http://localhost:5000',    
});
