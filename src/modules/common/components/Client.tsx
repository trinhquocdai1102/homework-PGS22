import React from 'react';

const Client = () => {
  return (
    <select name="client" id="client" form="clientForm">
      <option defaultValue="defaultValue">Client</option>
      <option value="a">a</option>
      <option value="b">b</option>
    </select>
  );
};

export default Client;
