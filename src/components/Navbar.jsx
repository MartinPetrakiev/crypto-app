import { BulbOutlined, FundOutlined, HomeOutlined, MenuOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { Avatar, Button, Menu, Typography } from 'antd';
import React from 'react';
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

function Navbar() {
    return (
        <div className="nav-container">
            <div className="logo-container">
                <Avatar src={icon} size="large" />
                <Typography.Title level={2} className="logo">
                    <Link to="/">CryptoMania</Link>
                </Typography.Title>
            </div>
            <Menu theme='dark' items={items} />
        </div>
    );
}

export default Navbar;