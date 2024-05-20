const passport = require('passport')
const { Strategy } = require('passport-discord')
const DiscordUser = require("../schemas/DiscordUser")

passport.serializeUser((user, done)=>{
    console.log("Serialiizing User...");
    console.log(user)
   done(null, user.id)
})
passport.deserializeUser(async(id, done)=>{
    console.log("Deserialiizing User...");
   console.log(id)
   try{
    const user = await DiscordUser.findById(id);
    if(!user) throw new Error("User not found")
    console.log(user)
    done(null,user)
   }catch(err){
    console.log(err)
    done(err, null)
   }
})

passport.use(
    new Strategy({
        clientID: '1222788751839989860',
        clientSecret: 'L5GY4uhU7Behv3aiwInh8ax1pfgVhv76',
        callbackURL: 'http://localhost:4000/api/v1/auth/discord/redirect',
        scope: ['identify']
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken, refreshToken)
        console.log(profile)
        try {
            const discordUser = await DiscordUser.findOne({ discordId: profile.id })

            if (discordUser) {
                console.log(`Found User: ${discordUser}`)
                return done(null, discordUser)
            } else {
                const newUser = await DiscordUser.create({
                    discordId: profile.id,
                });
                console.log(`Create User: ${newUser}`)
                return done(null, newUser)
            }
        } catch (err) {
            return done(err, null);
        }
    })
)