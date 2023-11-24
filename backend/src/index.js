import express from 'express';
import cors from 'cors';


// routes imports
import userRoutes from '../routes/userRoutes';
import petRoutes from '../routes/petRoutes';


const app = express();

//Config JSON reponse
app.use(express.json());

// Solve Cors(Resolver o problema do cors)
app.use(cors({ credentials: true,  origin: 'http://localhost:3000'}));

//Public folder images (Pasta publica de imagens)
app.use(express.static('public'));

//routes
app.use('/users', userRoutes);
app.use('/pets', petRoutes);


app.listen(5000);