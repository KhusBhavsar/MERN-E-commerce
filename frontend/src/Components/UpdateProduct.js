// 




















import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const getProductDetails = useCallback(async () => {
    const response = await fetch(`http://localhost:5000/product/${params.id}`);
    const data = await response.json();
    setName(data.name);
    setPrice(data.price);
    setCategory(data.category);
    setCompany(data.company);
  }, [params.id]);

  useEffect(() => {
    getProductDetails();
  }, [getProductDetails]);

  const updateProduct = async () => {
    const result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        price,
        category,
        company
      })
    });
    const data = await result.json();
    console.log(data);
    navigate('/');
  }

  return (
    <div className='in'>
      <h1>Update-Product</h1>
      <input
        className='inputBox'
        type="text"
        placeholder='Enter the name '
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className='inputBox'
        type="text"
        placeholder='Enter the price'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        className='inputBox'
        type="text"
        placeholder='Enter the category'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        className='inputBox'
        type="text"
        placeholder='Enter the company'
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <button type='button' onClick={updateProduct}>Update Product</button>
    </div>
  )
}

export default UpdateProduct;
