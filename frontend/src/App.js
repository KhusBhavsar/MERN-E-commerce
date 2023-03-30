import './App.css';
import Nav from './Components/Nav';
import Foot from './Components/Foot';
import SignUp from './Components/SignUp';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';
import AddProduct from './Components/Add-Product';
import ProductList from './Components/ProductList';
import UpdateProduct from './Components/UpdateProduct';
function App() {
  return (
    <>
    <div className="contain"></div>
    <div className="App">
    
        <BrowserRouter>
          <Nav/>
            <Routes>
            <Route element={<PrivateComponent/>}>
              <Route path='/' element={<ProductList/>}/>
              <Route path='/add' element={<AddProduct/>}/>
              <Route path='/update/:id' element={<UpdateProduct/>}/>
              <Route path='/logout' element={<h1>Logout </h1>}/>
              <Route path='/Profile' element={<h1>Your Profile </h1>}/>
              </Route>
              <Route path='/SignUp' element=<SignUp/> />
              <Route path='/Login' element=<Login/> />
            </Routes>
        </BrowserRouter>
        <Foot/>
    </div>
    </>
  );
}

export default App;
