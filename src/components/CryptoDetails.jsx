import { CheckOutlined, DollarCircleOutlined, ExclamationCircleOutlined, FundOutlined, MoneyCollectOutlined, NumberOutlined, StopOutlined, ThunderboltOutlined, TrophyOutlined } from '@ant-design/icons';
import { Col, Row, Select, Typography } from 'antd';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../features/api/cryptoApi';
import LineChart from './LineChart';


function CryptoDetails() {
    const { coinId } = useParams();
    const [timeperiod, setTimeperiod] = useState('7d');
    const { data, isFetching, isSuccess, isError, error } = useGetCryptoDetailsQuery(coinId);
    const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod });
    const cryptoDetails = data?.data?.coin;

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails?.price && cryptoDetails?.price}`, icon: <DollarCircleOutlined /> },
        { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
        { title: '24h Volume', value: `$ ${cryptoDetails?.["24hVolume"] && millify(cryptoDetails?.["24hVolume"])}`, icon: <ThunderboltOutlined /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
        { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
    ];

    if (isFetching) {
        return 'Loading...';
    } else if (isError) {
        console.log(error);
        return 'ERROR';
    } else if (isSuccess) {
        return (
            <Col className="coin-detail-container">
                <Col className="coin-heading-container">
                    <Typography.Title level={2} className="coin-name">
                        {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price
                    </Typography.Title>
                    <p>{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
                </Col>
                <Select
                    defaultValue="7d"
                    className="select-timeperiod"
                    placeholder="Select Timeperiod"
                    onChange={(value) => setTimeperiod(value)}
                    options={time.map((date) => ({ value: date, label: date }))}
                />
                <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} />
                <Col className="stats-container">
                    <Col className="coin-value-statistics">
                        <Col className="coin-value-statistics-heading">
                            <Typography.Title level={3} className="coin-details-heading">{cryptoDetails.name} Value Statistics</Typography.Title>
                            <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
                        </Col>
                        {stats.map(({ icon, title, value }, idx) => (
                            <Col className="coin-stats" key={idx}>
                                <Col className="coin-stats-name">
                                    <Typography.Text>{icon}</Typography.Text>
                                    <Typography.Text>{title}</Typography.Text>
                                </Col>
                                <Typography.Text className="stats">{value}</Typography.Text>
                            </Col>
                        ))}
                    </Col>
                    <Col className="other-stats-info">
                        <Col className="coin-value-statistics-heading">
                            <Typography.Title level={3} className="coin-details-heading">Other Stats Info</Typography.Title>
                            <p>An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>
                        </Col>
                        {genericStats.map(({ icon, title, value }, idx) => (
                            <Col className="coin-stats" key={idx}>
                                <Col className="coin-stats-name">
                                    <Typography.Text>{icon}</Typography.Text>
                                    <Typography.Text>{title}</Typography.Text>
                                </Col>
                                <Typography.Text className="stats">{value}</Typography.Text>
                            </Col>
                        ))}
                    </Col>
                </Col>
                <Col className="coin-desc-link">
                    <Row className="coin-desc">
                        <Typography.Title level={3} className="coin-details-heading">What is {cryptoDetails.name}?</Typography.Title>
                        {HTMLReactParser(cryptoDetails.description)}
                    </Row>
                    <Col className="coin-links">
                        <Typography.Title level={3} className="coin-details-heading">{cryptoDetails.name} Links</Typography.Title>
                        {cryptoDetails.links?.map((link, idx) => (
                            <Row className="coin-link" key={link.name + '_' + idx}>
                                <Typography.Title level={5} className="link-name">{link.type}</Typography.Title>
                                <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
                            </Row>
                        ))}
                    </Col>
                </Col>
            </Col>
        );
    }
}

export default CryptoDetails;