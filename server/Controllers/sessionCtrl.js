module.exports= function(req,res,next){
    if(req.session.user){
        res.status(200).send(req.session.user)
    }else{
        console.log('unauthorized')
        res.redirect('/#/list')
    }

    next()
}