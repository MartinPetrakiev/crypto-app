import { Layout, Space, Typography } from 'antd';
import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Navbar } from './components';

function App() {
    return (
        <div className='app'>
            <div className="navbar">
                <Navbar />
            </div>
            <div className="main">

            </div>
            <div className="footer">

            </div>
        </div>
    );
}

export default App;