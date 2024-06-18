// src/PetForm.tsx
import React, { useState } from 'react';

type FormData = {
  title: string;
  variety: string;
  gender: string;
  age: string;
  info: string;
  location: string;
  imageurl: string;
};

const PetForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    variety: '',
    gender: '',
    age: '',
    info: '',
    location: '',
    imageurl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/pet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      alert('Data submitted successfully!');
    } catch (error) {
      console.error('Error posting data:', error);
      alert(`Failed to submit data. Error: ${error}`);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
      <input type="text" name="variety" value={formData.variety} onChange={handleChange} placeholder="Variety" />
      <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" />
      <input type="text" name="age" value={formData.age} onChange={handleChange} placeholder="Age" />
      <input type="text" name="info" value={formData.info} onChange={handleChange} placeholder="Other Information" />
      <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
      <input type="text" name="imageurl" value={formData.imageurl} onChange={handleChange} placeholder="Image URL" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PetForm;

