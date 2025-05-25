const express = require('express');
const router = express.Router();
const Word = require('../models/Word');

//Adding new word
router.post('/', async (req, res) => {
  const { word, definition, img, video } = req.body;

  try {
    const newWord = new Word({ word, definition, img, video });
    await newWord.save();
    res.status(201).json(newWord);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add word', details: err.message });
  }
});

//Get all words
router.get('/', async (req, res) => {
  try {
    const words = await Word.find().sort({ createdAt: -1 });
    res.json(words);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch all words' });
  }
});

//Get a single word by query
router.get('/:query', async (req, res) => {
  try {
    const word = await Word.findOne({ word: req.params.query });
    if (!word) return res.status(404).json({ error: 'Word not found' });
    res.json(word);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch word' });
  }
});

// Update word by word param
router.put('/:query', async (req, res) => {
  try {
    const updatedData = req.body;
    const updatedWord = await Word.findOneAndUpdate(
      { word: req.params.query },
      updatedData,
      { new: true } 
    );
    if (!updatedWord) return res.status(404).json({ error: 'Word not found' });
    res.json(updatedWord);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update word' });
  }
});

// Delete word by word param
router.delete('/:query', async (req, res) => {
  try {
    const deletedWord = await Word.findOneAndDelete({ word: req.params.query });
    if (!deletedWord) return res.status(404).json({ error: 'Word not found' });
    res.json({ message: 'Word deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete word' });
  }
});

module.exports = router;
