const {Router} = require('express');
const router = Router();

router.use((req, res, next)=>{
    if(req.session.user){
        next();
    }else res.send(401)
})
const superMarkets = [
    {
        id:1,
        store:'Whole Foods',
        miles: 0.6
    },
    {
        id:2,
        store:'Trader Joes',
        miles: 2.5
    },
    {
        id:3,
        store:'Albertsons',
        miles: 1.6
    },
    {
        id:4,
        store:'Albertsons',
        miles: 3.5
    },
    {
        id:5,
        store:'Albertsons',
        miles: 2.7
    }
];

router.get("", (req, res)=>{
    console.log(req.query)
    const {miles} = req.query;
    const parsedMiles = parseInt(miles);
    if(!isNaN(parsedMiles)){
    const fileredStores = superMarkets.filter((s)=> s.miles <= parsedMiles)
    res.send(fileredStores)

    }else{
    res.send(superMarkets);
    }
})

module.exports = router;