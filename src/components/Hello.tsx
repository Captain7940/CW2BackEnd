import React from 'react';

const Hello = (props) => {
  const greeting = `Welcome to ${props.name}!`
  return <h1>{greeting}</h1>
}

export default Hello;