import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Routes, Route, useNavigate } from 'react-router-dom';
import Favourite from './components/favourite/Favourite';
import Body from './components/body/Body';
import Search from './components/search/Search'

ReactDOM.render(
  <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route index element={<Body />} />
                    <Route path="/favourite" element={<Favourite />} />
                    <Route path="/search" element={<Search />} />
                </Route>
            </Routes>
        </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
