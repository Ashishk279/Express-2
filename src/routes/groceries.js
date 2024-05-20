const {Router} = require('express');
// const { route } = require('./groceries');
const router = Router();

const groceryList = [{
    item : 'milk',
    quantity: 2
},{
    item : 'cereal',
    quantity: 1
},{
    item : 'pop-track',
    quantity: 3
}]

router.use((req, res, next)=>{
    console.log("Inside Groceries Auth Check Middleware")
    console.log(req.user)
    if(req.user){
        next();
    }else res.send(401)
})
router.get('',  (req, res, next) =>{
    console.log("Before handling Request") // After this is not response back because we are not sending anytbing to the client.
    next()
}, (req, res, next)=>{
    // res.cookie('visited', true)
    res.cookie('visited', true, {
        maxAge: 60000
    });
    res.send(groceryList)
    next()
},(req, res, next)=>{
    console.log("Finished Executing Get request")
    next();
},(req, res, next)=>{
    console.log("End")
    // res.send(403)
    next();
})

router.get('/:item', (req, res)=>{
    console.log(req.cookies)
    const {item} = req.params;
    const groceryItem = groceryList.find((g)=>  g.item === item );
    console.log(req.params.item);
    res.send(groceryItem)
})

router.post('', (req, res)=>{
    console.log(req.body);
    groceryList.push(req.body);
    res.send(201);
})

router.get('/shopping/cart', (req, res)=>{
   const {cart} = req.session;
   if(!cart){
    res.send("You have no cart session")
   }else{
    res.send(cart)
   }
})
router.post('/shopping/cart/item', (req, res)=>{
    const {item, quantity} = req.body;
    const cartItem = {item , quantity};
    const { cart } = req.session;
    if(cart){
        req.session.cart.item.push(cartItem);
    }else {
        req.session.cart = {
            item: [cartItem]
        }
    }
    res.send(201)
})

module.exports = router
