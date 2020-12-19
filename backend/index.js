const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const addUserController = require('./controllers/addUserController');
const accessTokenController = require('./controllers/accessTokenController');
const myAccountController = require('./controllers/myAccountController');
app.use(bodyParser.json());
app.use(cors());

// Create new users
app.post('/users', async (req, res) => {
  try {
    const data = await addUserController.invoke(req);
    sendSuccessResponse(res, data);
  } catch (err) {
    sendErrorResponse(res, err);
  }
});

// Login user
app.post('/login', async (req, res) => {
  try {
    const data = await accessTokenController.invoke(req);
    sendSuccessResponse(res, data);
  } catch (err) {
    sendErrorResponse(res, err);
  }
});

app.get('/myaccount', async (req, res) => {
  try {
    const data = await myAccountController.invoke(req);
    sendSuccessResponse(res, data);
  } catch (err) {
    // console.log(err.statusCode, err.message);
    sendErrorResponse(res, err);
  }
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});

const sendSuccessResponse = (res, data) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
};

const sendErrorResponse = (res, error) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(error.statusCode);
  res.end(error.message);
};
