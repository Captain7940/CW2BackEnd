import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Flex } from "antd";
import { Link } from 'react-router-dom';

const Articles = () => {
  const [pet, setPet] = useState([]);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/pet'); // Replace with your backend URL
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPet(data);
      } catch (error) {
        console.error('Error fetching pet:', error);
      }
    };

    fetchPet();
  }, []);

  return (
    <>
      <Flex justify="space-evenly" wrap="wrap" gap="middle">
        <Row>
          {pet && pet.map(({ id, title, info, variety, gender, age, location, imageurl }) => (
            <Col key={id}>
              <Link to={`/${id}`} style={{ textDecoration: 'none' }}>
                <Card
                  style={{ width: 300, height: 350, marginTop: 10, marginRight: 10 }}
                  cover={<img alt="example" src={imageurl} style={{ maxWidth: '100%', height: 'auto' }} />}
                  hoverable
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <h3>{title}</h3>
                      <h3>{gender}</h3>
                    </div>
                    <div>
                      <h3>{variety}</h3>
                      <h3>{age}</h3>
                    </div>
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Flex>
    </>
  );
};

export default Articles;
