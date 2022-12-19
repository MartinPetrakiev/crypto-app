import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar, Spin } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../features/api/cryptoApi';

const Exchanges = () => {
    //requires premium subscription to API
    const { data: exchangesList, isFetching, isSuccess, isError, error } = useGetExchangesQuery();
    const exchanges = exchangesList?.data?.exchanges

    if (isFetching) {
        return (<div className="loader"><Spin size="large" /></div>);
    } else if (isError) {
        console.log(error);
        return 'ERROR: Premium subscription needed for API';
    } else if (isSuccess) {
        return (
            <>
                <Row>
                    <Col span={6}>Exchanges</Col>
                    <Col span={6}>24h Trade Volume</Col>
                    <Col span={6}>Markets</Col>
                    <Col span={6}>Change</Col>
                </Row>
                <Row>
                    {exchanges.map((exchange) => (
                        <Col span={24}>
                            <Collapse>
                                <Collapse.Panel
                                    key={exchange.uuid}
                                    showArrow={false}
                                    header={(
                                        <Row key={exchange.uuid}>
                                            <Col span={6}>
                                                <Typography.Text><strong>{exchange.rank}.</strong></Typography.Text>
                                                <Avatar className="exchange-image" src={exchange.iconUrl} />
                                                <Typography.Text><strong>{exchange.name}</strong></Typography.Text>
                                            </Col>
                                            <Col span={6}>${millify(exchange.volume)}</Col>
                                            <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                                            <Col span={6}>{millify(exchange.marketShare)}%</Col>
                                        </Row>
                                    )}
                                >
                                    {HTMLReactParser(exchange.description || '')}
                                </Collapse.Panel>
                            </Collapse>
                        </Col>
                    ))}
                </Row>
            </>
        );
    }
};

export default Exchanges;