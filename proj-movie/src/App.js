import { Route, Routes } from 'react-router-dom';
import './App.css';
import Body from './components/body/Body';
import './components/body/Body.css'
import Favourite from './components/favourite/Favourite';
import Header from './components/header/Header';
import Login from './components/login/Login';
import MyNavbar from './components/nav/Navbar';
import Register from './components/register/Register';
import Search from './components/search/Search';
import Admin from './components/admin/Admin';



function App() {

    return (
        <>
            <div className='App' >
                <div className='bodyBg'>
                    <div className='background'></div>
                    <Header />
                    <MyNavbar />
                    <Routes>
                        <Route path='/' element={<Body />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/favourite" element={<Favourite />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/admin" element={<Admin />} />
                    </Routes>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
}

export default App;
