// import 'bootstrap/dist/css/bootstrap.min.css';

import {  Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import MyNavbar from './components/nav/Navbar';




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
