import {
  BrowserRouter,
  Routes,
  Route,
  
} from 'react-router-dom'
// Components
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Container from './components/layouts/Container'
// Pages
import Home from './components/pages/Home';
import Login from './components/pages/auth/Login';
import Register from './components/pages/auth/Register'
import Message from './components/layouts/Message';
import Profile from './components/pages/User/Profile';
import MyPets from './components/Pet/MyPets';
import AddPet from './components/form/PetForm';
import EditPet from './components/Pet/EditPet';
import PetDetails from './components/Pet/PetDetails';
import MyAdoptions from './components/Pet/MyAdoptions';
// context
import { UserProvider } from './context/UserContext';

function App() {
  return (
   
    <BrowserRouter>
    <UserProvider>
      <Navbar />
      <Message />
      <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/user/profile" element={<Profile/>} />
        <Route path='/pet/MyPets' element={<MyPets />} />
        <Route path='/pet/add' element={<AddPet />} />
        <Route path = '/pet/edit/:id' element={<EditPet/>} />
        <Route path='/pet/:id' element={<PetDetails/>} />
        <Route path='/pet/MyAdoptions' element={<MyAdoptions/>} />
        
      </Routes>
      </Container>
      <Footer/>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App