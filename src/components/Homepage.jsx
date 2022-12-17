import { Col, Row, Statistic, Typography } from 'antd';
import millify from 'millify';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../featueres/api/cryptoApi';

function Homepage() {
    const { data: dataFetched, isLoading, isFetching, error, isSuccess } = useGetCryptosQuery();

    if (isFetching) return 'Loading...';

    return (
        <>
            <Typography.Title level={2} className="heading">Global Crypto Stats</Typography.Title>
            <Row>
                <Col span={12}>
                    <Statistic title="Cryptocurrencies" value={5} />
                    <Statistic title="Exchanges" value={5} />
                    <Statistic title="Market Cap" value={5} />
                    <Statistic title="24h Volume" value={5} />
                    <Statistic title="Markets" value={5} />
                </Col>
            </Row>
        </>
    );
}

export default Homepage;