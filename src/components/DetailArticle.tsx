import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const DetailArticle = () => {
  const [pet, setPet] = useState(null);
  const { aid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/pet/${aid}`);
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
  }, [aid]);

  if (!pet) {
    return (
      <>
        <p>No details found</p>
        <Button type="primary" onClick={() => navigate(-1)}>Back</Button>
      </>
    );
  }

  const onClickAdopt = () => {
    // Implement your adopt functionality here
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={pet.imageurl}
          alt="Article Image"
          style={{ maxWidth: '100%', height: 'auto', marginRight: 10 }}
        />
        <div>
          <p>Title:<br />{pet.title}</p>
          <p>Variety:<br />{pet.variety}</p>
          <p>Gender:<br />{pet.gender}</p>
          <p>Ages:<br />{pet.age}</p>
          <p>Other Information:<br />{pet.info}</p>
          <p>Location of shelter:<br />{pet.location}</p>
        </div>
      </div>

      <Button type="primary" onClick={() => navigate(-1)}>Back</Button>
      <Button type="primary" onClick={onClickAdopt}>Adopt</Button>
    </>
  );
};

export default DetailArticle;
