/* eslint-disable import/order */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-console */
// imports
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const dotenv = require('dotenv');
dotenv.config();


// cloudinary import
// eslint-disable-next-line no-unused-vars
const { resolve } = require('path');
// eslint-disable-next-line no-unused-vars
const { uploader, cloudinaryConfig } = require('./config/cloudinary');
// eslint-disable-next-line no-unused-vars
const { multerUploads } = require('./middleware/multer');
app.use('*', cloudinaryConfig);

// routes
const admin = require('./routes/admin');
const user = require('./routes/user');
const posts = require('./routes/posts');
const likes = require('./routes/like');
const comment = require('./routes/comment');
const gifs = require('./routes/gifs');

// extracts the JSON object from the request
const bodyParser = require('body-parser');

// Using body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: 1000000 }));

// app use for helmet and compression
app.use(compression());
app.use(helmet());
// cors
const isProduction = process.env.NODE_ENV === 'production';
const origin = {
  origin: isProduction ? 'https://teamwork-backendng.herokuapp.com' : '*',
};
app.use(cors(origin));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// rate limit
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // 10 requests,
});

app.use(limiter);

// swagger docs
app.use(`/api/${process.env.VERSION}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// routes use
app.use('/', admin);
app.use(`/api/${process.env.VERSION}/`, admin);
app.use(`/api/${process.env.VERSION}/`, user);
app.use(`/api/${process.env.VERSION}/`, posts);
app.use(`/api/${process.env.VERSION}/`, gifs);
app.use(`/api/${process.env.VERSION}/like`, likes);
app.use(`/api/${process.env.VERSION}/articles/comment`, comment);

module.exports = app;
