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
import AddPet from './components/Pet/AddPet';
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
      </Routes>
      </Container>
      <Footer/>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App