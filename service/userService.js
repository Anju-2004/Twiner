const db = require('../models');
const {comparePass, hashPass} = require('./bcryptService');
db.sequelize.sync();


async function checkLogin(username, password){
    let user = await db.users.findOne({where : {username : username}});
    console.log(user,username, password);
    if(user && await comparePass(password,user.passwordhash)){
        return user;
    }
    else return null;

}

async function createuser(userdata){
    console.log('userdata',userdata);
    userdata.passwordhash = await hashPass(userdata.password);
    let usercreated = db.users.create(userdata);
    return usercreated;
}
module.exports = {checkLogin, createuser}