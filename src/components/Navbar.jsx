import { BulbOutlined, FundOutlined, HomeOutlined, MenuOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { Avatar, Button, Menu, Typography } from 'antd';
import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import icon from "../images/cryptocurrency.png";

const items = [
    {
        label: (<Link to="/">Home</Link>),
        key: 'home',
        icon: <HomeOutlined />,
    },
    {
        label: (<Link to="/cryptocurrencies">Cryptocurrencies</Link>),
        key: 'coins',
        icon: <FundOutlined />,
    },
    {
        label: (<Link to="/exchanges">Exchanges</Link>),
        key: 'exchange',
        icon: <MoneyCollectOutlined />,
    },
    {
        label: (<Link to="/news">News</Link>),
        key: 'news',
        icon: <BulbOutlined />,
    },
];

function reducer(state, action) {
    switch (action.type) {
      case 'show':
        return true;
      case 'hide':
        return false;
      default:
        throw new Error();
    }
}

function Navbar() {
    const [activeMenu, dispatchActiveMenu] = useReducer(reducer, true);
    const [screenSize, setScreenSize] = useState(null);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth)

        window.addEventListener('resize', handleResize);
        
        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
        };
    }, []);

    useEffect(() => {
        if (screenSize < 800) {
            dispatchActiveMenu({type: 'hide'})
        } else {
            dispatchActiveMenu({type: 'show'})
        }
    }, [screenSize]);

    return (
        <div className="nav-container">
            <div className="logo-container">
                <Avatar src={icon} size="large" />
                <Typography.Title level={2} className="logo">
                    <Link to="/">CryptoMania</Link>
                </Typography.Title>
                <Button type="text" className="menu-control-container" onClick={() => dispatchActiveMenu(activeMenu ? {type: 'hide'} : {type: 'show'})}>
                        <MenuOutlined />
                </Button>
            </div>
            {activeMenu && (<Menu theme="dark" items={items} />)}
        </div>
    );
}

export default Navbar;