const {db} = require('./db')
const NOMBRE_COLLECCION = 'users'

async function getUserByName(id)
{
    console.log('Busco username')
    const user = await db()
    .collection(NOMBRE_COLLECCION)
    .findOne({username:id});
    return user;
}

async function insertUser(user)
{
    await db().collection(NOMBRE_COLLECCION)
            .insertOne(user);
    return ;
}

module.exports = [getUserByName, insertUser];