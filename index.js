require('dotenv').config();

const path = require('path');
const express = require('express');

const cors = require('cors');

const accessRouter = require('./routes/access');

const { PORT } = process.env;

const app = express();

const router = express.Router();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
app.use(express.static('dist'));

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use('/access', accessRouter);

app.listen(PORT, () => console.log(`Server on PORT ${PORT}`));
