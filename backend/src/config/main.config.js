module.exports = {

    server: {
        port: '3000',
        host: '0.0.0.0'
    },
    mongodb: {
        type: 'mongodb',
        protocol: 'mongodb',
        host: '192.168.0.160',
        port: '27017',
        database: 'multiplier-test',
        username: 'admin',
        password: 'dev102030',
        options: {
            useUnifiedTopology: true
        },
        maxListeners: 100

    }

}

