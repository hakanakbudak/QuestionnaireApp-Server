const mongoose = require('mongoose');

const connectionString = "mongodb+srv://hakanakbudak06:hakan1234@userregister.hgaugqv.mongodb.net/test?retryWrites=true&w=majority";

// mongoose connetion control
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connection successful.'))
    .catch((error) => console.error("MongoDB connection failed:", error.message))


module.exports = connectionString;
