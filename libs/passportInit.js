import passportInit from 'passport';
import User from '../models/User.js';

passportInit.serializeUser((user, done) => {
    done(null, {id: user._id, username: user.username});
});
//req.user
passportInit.deserializeUser(async (user, done)=>{
    const userDB = await User.findById(user.id);
    return done(null, {id: userDB._id, username: userDB.username});
});

export default passportInit;