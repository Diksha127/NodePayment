require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")("sk_test_51N00U8FFReMpJzWzW0k62c5BgKrjWNJaFnu3DHoO8PUOKie0XyHlJBwVKQaLPsORqJ9udcg2RDWNlbqExcrDxecF00uNWboKYU");
const path = require('path');

app.use(express.json());
app.use(cors());

// Serve static React.js build files
app.use(express.static("public"));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
  });

// checkout api
app.post("/api/create-checkout-session",async(req,res)=>{
    const {products} = req.body;


    const lineItems = products.OrderDetail.map((product)=>({
        price_data:{
            currency:"usd",
            product_data:{
                name:product.ProductName,
               // images:[product.imgdata]
            },
            unit_amount:product.Price * 100,
        },
        quantity:product.Qty
    }));
    //console.log(lineItems);
    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"https://paymentserver-vpjj.onrender.com/sucess",
        cancel_url:"https://paymentserver-vpjj.onrender.com/cancel",
    });

    console.log(session);

    res.json({id:session.id})
 
})


app.listen(7000,()=>{
    console.log("server start")
})