const express = require('express');
require("./config");
const users = require("./Users");
const Products = require("./products");
const cors = require('cors');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


const app = express();

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
  const data = new users(req.body);

  try {
    let result = await data.save();
    result = result.toObject();
    delete result.password;
    res.send(result);

  } catch (err) {
    console.error('Error saving data to MongoDB', err);
    res.status(500).send('Error saving data to MongoDB');
  }
});

app.post('/login', async (req, res) => {
  try {
    if (req.body.password && req.body.email) {
      const user = await users.findOne({ email: req.body.email });
      if (user) {
        if (user.password === req.body.password) {
          const { password, ...userData } = user.toObject();
          res.send(userData);
        } else {
          res.send({ result: "Invalid credentials" });
        }
      } else {
        res.send({ result: "No User Found" });
      }
    } else {
      res.status(400).send('Missing email or password');
    }
  } catch (error) {
    console.error('Error fetching user data from MongoDB', error);
    res.status(500).send('Error fetching user data from MongoDB');
  }
});

app.post('/add-product', async (req, res) => {
  const data = new Products(req.body);

  try {
    let result = await data.save();
    res.send(result);

  } catch (err) {
    console.error('Error saving data to MongoDB', err);
    res.status(500).send('Error saving data to MongoDB');
  }
});

app.get("/products", async (req, resp) => {
  let products = await Products.find();
  if (products.length > 0) {
    resp.send(products)
  } else {
    resp.send({ result: "No data found" })
  }
});

app.delete("/products/:id", async (req, resp) => {
  try {
    const result = await Products.deleteOne({ _id: req.params.id });
    resp.send(result);
  } catch (error) {
    console.error('Error deleting data from MongoDB', err);
    resp.status(500).send('Error deleting data from MongoDB');

  }
});


app.get("/product/:id", async (req, resp) => {
  try {
    const id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error('Invalid ObjectId');
    }
    let result = await Products.findOne({_id: id});
    if (result) {
      resp.send(result);
    } else {
      resp.send({ result: "No data found" });
    }
  } catch (error) {
    console.error('Error finding MongoDB document', error);
    resp.status(500).send('Error finding MongoDB document');
  }
});

app.put("/product/:id", async (req, resp) => {
  try {
    const id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error('Invalid ObjectId');
    }
    let result = await Products.updateOne(
      {_id: id},
      {$set: req.body}
    );
    resp.send(result);
  } catch (error) {
    console.error('Error updating MongoDB', error);
    resp.status(500).send('Error updating MongoDB');
  }
});


app.get("/search/:key", async(req,resp)=>{
  let result = await Products.find({
    "$or":[
      {name : {$regex: req.params.key}},
      {category : {$regex: req.params.key}},
      {company : {$regex: req.params.key}}
    ]
  });
  resp.send(result);
})


const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

