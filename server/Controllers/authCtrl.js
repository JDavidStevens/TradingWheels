const axios= require('axios');

module.exports={

    authCallBack: async(req,res)=>{
        const payload = {
            client_id: process.env.REACT_APP_CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: req.query.code,
            grant_type: 'authorization_code',
            redirect_uri: `${process.env.AUTH_PROTOCAL}://${req.headers.host}/auth/callback`
        }

        let resWithToken= await axios.post
        (`https://${process.env.REACT_APP_DOMAIN}/oauth/token`,payload)

        let resWithUserData = await axios.get
        (`https://${process.env.REACT_APP_DOMAIN}/userinfo/?access_token=${resWithToken.data.access_token}`)

        const db=req.app.get('db');
        let {sub,email,name}=resWithUserData.data;
        let foundUser = await db.read_user([sub]);
        if(foundUser[0]){
            req.session.user=foundUser[0]
            res.redirect('/#/list')
        }else{
            let createdUser=await db.create_user([sub,name,email])
            req.session.user=createdUser[0];
            res.redirect('/#/list')
        }
    },

guest: async(req,res)=>{
    console.log('guest',req.body)
    const db=req.app.get('db');
    let {sub,email,name}=req.body;
    let foundUser = await db.read_user([sub]);
    if(foundUser[0]){
        console.log('foundguest',foundUser[0])
        req.session.user=foundUser[0]
        res.status(200).send()
    }
},

    logout: (req,res)=>{
        req.session.destroy();
        // res.redirect('/#/')
    }
}