// const express = require('express');
// const app = express();
// const dotenv = require("dotenv");
// const mongoose = require('mongoose');
// const cors = require('cors'); // Add this line
// const productRouter = require('./routes/products');

// dotenv.config();
// mongoose.connect(process.env.MONGO_URL).then(() => console.log("db Connected")).catch((err) => console.log(err));

// app.use(cors()); // Add this line to enable CORS for all routes
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb', extended: true }));

// // create endpoint
// app.use('/api/products', productRouter);

// app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));

const express = require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const cors = require('cors');
const productRouter = require('./routes/products');

dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(() => console.log("db Connected")).catch((err) => console.log(err));

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Replace 'localhost' with your local IP address
const localIpAddress = '192.168.8.100'; 
// create endpoint
app.use(`/api/products`, productRouter);

app.listen(process.env.PORT, localIpAddress, () => {
  console.log(`Example app listening on http://${localIpAddress}:${process.env.PORT}!`);
});
