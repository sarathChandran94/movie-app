import {  Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Body from './components/body/Body';
import './components/body/Body.css'
import Favourite from './components/favourite/Favourite';
import Header from './components/header/Header';
import Login from './components/login/Login';
import MyNavbar from './components/nav/Navbar';
import Register from './components/register/Register';
import Search from './components/search/Search';
import {ItemContext} from './components/body/Body'



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
                        <ItemContext>
                            <Route path="/favourite" element={<Favourite />} />
                        </ItemContext>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
}

export default App;
