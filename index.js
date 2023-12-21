const express = require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const cors = require('cors');
const productRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const orderRouter = require('./routes/order');
const cartRouter = require('./routes/cart');

dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(() => console.log("db Connected")).catch((err) => console.log(err));

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Replace 'localhost' with your local IP address
const localIpAddress = '192.168.56.1'; 
// create endpoints
app.use(`/api/products`, productRouter);
app.use('/api/', authRouter );
app.use('/api/users',  userRouter );
app.use('/api/orders',  userRouter );
app.use('/api/carts', cartRouter);

app.listen(process.env.PORT, localIpAddress, () => {
  console.log(`Example app listening on http://${localIpAddress}:${process.env.PORT}!`);
});
