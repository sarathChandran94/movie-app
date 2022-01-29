// import 'bootstrap/dist/css/bootstrap.min.css';

import {  Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import Body from './components/body/Body';
import Favourite from './components/favourite/Favourite';
import Header from './components/header/Header';
import MyNavbar from './components/nav/Navbar';
import Search from './components/search/Search';




function App() {

    return (
        <>
            <div className='App' >
                <Header />
                <MyNavbar />
                <Outlet />
            </div>
            {/* <Footer /> */}
        </>
    );
}

export default App;
