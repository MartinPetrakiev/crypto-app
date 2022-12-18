import { Avatar, Card, Col, Option, Row, Select, Typography } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { useGetCryptosQuery } from '../featueres/api/cryptoApi';
import { useGetCryptoNewsQuery } from '../featueres/api/cryptoNewsApi';

function News({ simplified }) {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const [newsList, setNewsList] = useState([]);
    const { data } = useGetCryptosQuery(100);
    const { data: cryptoNews, isFetching, isSuccess, isError, error } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });

    useEffect(() => {
        setNewsList(cryptoNews?.value);
    }, [cryptoNews]);

    const demoImage = "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

    if (isFetching) {
        return 'Loading...';
    } else if (isError) {
        console.log(error);
        return 'ERROR';
    } else if (isSuccess) {
        return (
            <Row gutter={[24, 24]}>
                {!simplified && (
                    <Col span={24}>
                        <Select
                            showSearch
                            className="select-news"
                            placeholder="Select a Crypto"
                            onChange={(value) => setNewsCategory(value)}
                            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                            options={data?.data?.coins?.map((currency) => ({ value: currency.name, label: currency.name }))}
                        />
                    </Col>
                )}
                {newsList?.map((news, idx) => (
                    <Col xs={24} sm={12} lg={8} key={idx}>
                        <Card hoverable className="news-card">
                            <a href={news.url} target="_blank" rel="noreferrer">
                                <div className="news-image-container">
                                    <Typography.Title className="news-title" level={4}>
                                        {news.name}
                                        <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" className="img" />
                                    </Typography.Title>
                                    <p>
                                        {(news.description > 100)
                                            ? (`${news.description.substring(0, 100)}`)
                                            : news.description
                                        }
                                    </p>
                                    <div className="provider-container">
                                        <div>
                                            <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                                            <Typography.Text className="provider-name">{news.provider[0]?.name}</Typography.Text>
                                        </div>
                                        <Typography.Text>{moment(news.datePublished).startOf('ss').fromNow()}</Typography.Text>
                                    </div>
                                </div>
                            </a>
                        </Card>
                    </Col>
                ))}
            </Row>
        );
    }
}

export default News;