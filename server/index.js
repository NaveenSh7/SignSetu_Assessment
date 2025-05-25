const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const wordRoutes = require('./routes/wordRoutes');

const app = express();
const PORT =  5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/words', wordRoutes);

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running!`));
  })
  .catch((err) => console.error(' MongoDB connection error:', err));
