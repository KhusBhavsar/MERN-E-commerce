import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products");
    result = await result.json();
    setProducts(result);
  }

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/products/${id}`, {
      method: "Delete"
    });
    getProducts();
  };

  const searchHandle = async (event) => {
    console.warn("working...")
    try {
      const key = event.target.value;
      if (key) {
        const result = await fetch(`http://localhost:5000/search/${key}`);
        const data = await result.json();
        if (data.length > 0) {
          setProducts(data);
        } else {
          getProducts();
        }
      } else {
        getProducts();
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className='prod'>
      <h3>Product List</h3>
      <input type="text" placeholder='Search the product' className='input-element' onChange={searchHandle} />
      <ul>
        <li key="header-sno">S No.</li>
        <li key="header-name">Name</li>
        <li key="header-price">Price</li>
        <li key="header-category">Category</li>
        <li key="header-company">Company</li>
        <li key="header-operation">Operation</li>
      </ul>
      {
         products.map((item) => (
        <ul key={item._id}>
          <li>{item._id}</li>
          <li>{item.name}</li>
          <li>{item.price}</li>
          <li>{item.category}</li>
          <li>{item.company}</li>
          <li>
            <Link to={"/update/" + item._id}>Update</Link>
            <button onClick={() => deleteProduct(item._id)}>DELETE</button>
          </li>
        </ul>
      )
   
    )
  }
    </div>
  );
}

export default ProductList;
