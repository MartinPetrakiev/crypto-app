import { Card, Col, Input, Row } from 'antd';
import millify from 'millify';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../features/api/cryptoApi';

function Cryptocurrencies({ simplified }) {
    const countOfCoins = simplified ? 10 : 100;
    const { data: cryptosList, isFetching, isSuccess, isError, error } = useGetCryptosQuery(countOfCoins);
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setCryptos(cryptosList?.data?.coins);

        const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

        setCryptos(filteredData);
    }, [cryptosList, searchTerm]);

    if (isFetching) {
        return 'Loading...';
    } else if (isError) {
        console.log(error);
        return 'ERROR';
    } else if (isSuccess) {
        return (
            <>
                {(countOfCoins == 100 || !countOfCoins) ? (
                    <div className="search-crypto">
                        <Input placeholder='Search Cryptocurrency' onChange={(event) => setSearchTerm(event.target.value)} />
                    </div>
                ) : null}
                <Row gutter={[32, 32]} className="crypto-card-container">
                    {cryptos?.map((currency, idx) => (
                        <Col xs={24} xm={12} lg={6} className="crypto-card" key={currency.uuid + idx}>
                            <Link to={`/crypto/${currency.id}`}>
                                <Card
                                    title={`${currency.rank}. ${currency.name}`}
                                    extra={<img className="crypto-image" src={currency.iconUrl} />}
                                    hoverable
                                >
                                    <p>Price: {millify(currency.price)}</p>
                                    <p>Market Cap: {millify(currency.marketCap)}</p>
                                    <p>Daily Change: {millify(currency.change)}%</p>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>

            </>
        );
    }

}

export default Cryptocurrencies;