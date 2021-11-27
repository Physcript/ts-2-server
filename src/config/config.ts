require('dotenv').config()


export default  {
    server: {
        host: 'localhost',
        port: process.env.PORT || 1337
    },
    database: {
        url: process.env.MONGO_URL,
        options: {
            useUnifiedTopology: true,
            maxPoolSize: 50,
            wtimeoutMS: 50000
        }
    },
    token: {
        login: process.env.JWT_SECRET
    }

}
