import React,{useState} from 'react'


const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error,setError] = useState(false);
    const addProduct = async () =>{

      if(!name || !price || !category || !company){
        setError(true);
        return false;
      }else {
        setError(false);
      }
        console.warn(name,price,category,company)
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        try {
          let result = await fetch("http://localhost:5000/add-product", {
            method: "post",
            body: JSON.stringify({name,price,category,company,userId}),
            headers: {
              "Content-type": "application/json",
            },
          });
          result = await result.json;
          console.warn(result);
        }catch (error) {
            console.error(error);
          }
        }
  return (
    <div className='in'>
      <h1 >Add-Product</h1>
      <input className='inputBox' type="text" placeholder='Enter the name ' 
      value={name} onChange={(e) => setName(e.target.value)}/>
      {error && !name && (<span className="error-message">Enter a valid name</span>)}

      <input className='inputBox' type="text" placeholder='Enter the price' 
      value={price} onChange={(e) => setPrice(e.target.value)}/>
        {error && !price && <span className="error-message">Enter a valid price</span>}

      <input className='inputBox' type="text" placeholder='Enter the category' 
      value={category} onChange={(e) => setCategory(e.target.value)}/>
        {error && !category && <span className="error-message">Enter a valid category</span>}

      <input className='inputBox' type="text" placeholder='Enter the company' 
      value={company} onChange={(e) => setCompany(e.target.value)}/>
        {error && !company && <span className="error-message">Enter a valid company</span>}

      <button type='button' onClick={addProduct}>Add Product</button>
    </div>
  )
}

export default AddProduct;
