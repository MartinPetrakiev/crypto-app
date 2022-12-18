import { Col, Row, Statistic, Typography } from 'antd';
import millify from 'millify';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Cryptocurrencies, News } from '../components';
import { useGetCryptosQuery } from '../featueres/api/cryptoApi';

function Homepage() {
    const { data: dataFetched, isLoading, isFetching, error, isSuccess } = useGetCryptosQuery(10);
    const globalStats = dataFetched?.data?.stats;

    if (isFetching) return 'Loading...';

    return (
        <>
            <Typography.Title level={2} className="heading">Global Crypto Stats</Typography.Title>
            <Row>
                <Col span={12}>
                    <Statistic title="Cryptocurrencies" value={globalStats.total} />
                </Col>
                <Col span={12}>
                    <Statistic title="Exchanges" value={millify(globalStats.totalExchanges)} />
                </Col>
                <Col span={12}>
                    <Statistic title="Market Cap" value={millify(globalStats.totalMarketCap)} />
                </Col>
                <Col span={12}>
                    <Statistic title="24h Volume" value={millify(globalStats.total24hVolume)} />
                </Col>
                <Col span={12}>
                    <Statistic title="Markets" value={millify(globalStats.totalMarkets)} />
                </Col>
            </Row>
            <div className="home-heading-container">
                <Typography.Title className="home-title" level={2}>To 10 Cryptocurencies in the worlds</Typography.Title>
                <Typography.Title className="show-more" level={3}><Link to="/cryptocurrencies">Show more</Link></Typography.Title>
            </div>
            <Cryptocurrencies simplified={true} />
            <div className="home-heading-container">
                <Typography.Title level={2} className="home-title">Latest Crypto News</Typography.Title>
                <Typography.Title level={3}><Link to="/news">Show more</Link></Typography.Title>
            </div>
            <News />
        </>
    );
}

export default Homepage;