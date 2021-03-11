const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const cfg = require('./../../config/main.config');



// Definimos o máximo de ouvintes por conexões
// require('events').EventEmitter.prototype._maxListeners = cfg.mongodb.maxListeners;

const mongoDBConnect = async function () {

    const cdb = cfg.mongodb;
    const uri = `${cdb.protocol}://${cdb.username}:${cdb.password}@${cdb.host}:${cdb.port}/`;
    const client = new MongoClient(uri, cdb.options);

    try {
        console.log(`------------------------------------------
Trying to connect to host ${cdb.host}.\nIn the ${cdb.database} database...`);
        await client.connect();
        const db = client.db(cdb.database);

        console.log(`------------------------------------------
Connected to database ${cdb.database}`);

        // Criamos o objeto global.db para armazenar dados de conexão
        global.db = typeof global.db === 'undefined' ? {} : global.db;

        // Registramos a instância de mongo para uso global
        global.db['mongo'] = mongo;

        // Registramos a conexão para uso global
        global.db['mongodb'] = db;

        // Registramos a função geradora de auto incremento
        global.db['mongodb']['sequence'] = getNextSequence;

    } catch (err) {
        // console.log(err);
        console.log(`------------------------------------------
Connection failed. Trying again in 5s...`);
        setTimeout(() => {
            mongoDBConnect();
        }, 5000);
    }

};

// Função geradora de auto incremento
async function getNextSequence(name) {
    const col = global.db['mongodb'].collection('__counters');
    let ret = await col.findOneAndUpdate(
        { _id: name },
        { $set: { _id: name }, $inc: { _seq: 1 } },
        { upsert: true, returnNewDocument: true }
    );
    let _seq = ret.value === null ? 0 : ret.value._seq;
    return (_seq + 1);
}

module.exports = mongoDBConnect;