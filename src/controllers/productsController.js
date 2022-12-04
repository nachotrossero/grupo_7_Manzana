const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsData.json'); //Para poder leer el json
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productsController = {
  sidras: (req, res)=>{
    res.render('products',{products})
  },
  
  productDetail: (req, res) => {
    let product = products.find(product => product.id == req.params.id); //Matcheamos el id del producto y el de la url
    res.render('productDetail', {product});
  },

  productCart: (req, res) => {
    res.render('productCart', {products});
  },

  createProduct: (req, res) =>{
    res.render('createProduct');
  },

  saveProduct: (req, res) => {
    
    console.log(req.body)
    let newProduct = {
    "id": products[products.length - 1]['id'] + 1,
    "name": req.body.name,
    "price": req.body.price,
    "discount": req.body.discount,
    "category": req.body.category,
    "description": req.body.description,
    "country": req.body.country,
    "region": req.body.region,
    "brand": req.body.brand,
    "cellar": req.body.cellar, 
    "rating": req.body.rating,
    };

     products.push(newProduct); //Pisamos los datos de la variable 

    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, '\t')); //Volvemos a pasar a formato json
    
    res.redirect('/'); //Hacemos redirect al home
  },
  
  editProduct: (req, res) =>{

    let product = products.find(product => product.id == req.params.id)

    res.render('editProduct', {product});
  },
  updateProduct: (req, res) =>{

    console.log(req.body)
    
    let productToEdit = products.find(product => product.id == req.params.id)

    let editedProduct = {
      "id": productToEdit.id,
      "name": req.body.name,
      "price": req.body.price,
      "discount": req.body.discount,
      "category": req.body.category,
      "description": req.body.description,
      "country": req.body.country,
      "region": req.body.region,
      "brand": req.body.brand,
      "cellar": req.body.cellar, 
      "rating": req.body.rating,
      };

      let newProduct = products.map(product => {

        if (product.id === productToEdit.id){
  
          return product = editedProduct;
        }
        return product
  
      })

      fs.writeFileSync(productsFilePath, JSON.stringify(newProduct, null, "\t"));

		res.redirect("/")

  }

}


module.exports = productsController;