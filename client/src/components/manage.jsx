import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Manage() {
  const [words, setWords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingWord, setEditingWord] = useState(null);
  const [formData, setFormData] = useState({
    word: '',
    definition: '',
    img: '',
    video: '',
  });

  // Fetch all words
  const fetchWords = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/words');
      setWords(res.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch words');
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  // Delete 
  const handleDelete = async (word) => {
    if (!window.confirm('Are you sure you want to delete this word?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/words/${word}`);
 setWords(words.map(w => w._id === editingWord._id ? { ...w, ...formData } : w));
cancelEdit();

    } catch {
    //   alert('Failed to delete word');
    }
    fetchWords();
  };

  // Filter words based on search term (case-insensitive)
  const filteredWords = words.filter((w) =>
    w.word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //editing word
  const handleEdit = (word,definition,img,video) => {
    console.log(word)
    setEditingWord(word);
    setFormData({
      word: word,
      definition: definition,
      img: img,
      video: video || '',
    });
  };

    // Save edit
  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/words/${editingWord}`, formData);
      // Update local list
setWords(words.map(w => w.word === editingWord ? { ...w, ...formData } : w));
fetchWords();
cancelEdit();
    } catch (err) {
      alert('Failed to update word');
      console.log(err)
    }
    setLoading(false);
  };
  // Cancel editing
  const cancelEdit = () => {
    setEditingWord(null);
    setFormData({ word: '', definition: '', img: '', video: '' });
  };

  return (
    <div className="max-w-5xl mx-auto p-5 h-screen">
      <h1 className="text-3xl font-bold mb-5">Manage Words</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search words..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
        />
      </div>

      {loading ? (
        <p>Loading words...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredWords.length === 0 ? (
        <p>No words found.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-[#00ADB5] text-2xl">
              <th className="border border-gray-300 px-4 py-2 text-left">Word</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Definition</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Video</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredWords.map(({ _id, word, definition, img, video }) => (
              <tr key={_id} className="hover:bg-gray-50 hover:text-black">
                <td className="border border-gray-300 px-4 py-2">{word}</td>
                <td className="border border-gray-300 px-4 py-2">{definition}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {img ? (
                    <img src={img} alt={word} className="max-h-20 max-w-32 object-contain" />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {video ? (
                    <a href={video} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      Video Link
                    </a>
                  ) : (
                    'No Video'
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 space-x-2 text-center">
                  <button
                    onClick={() => handleEdit(word,definition,img,video)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(word)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

          {/* Edit form modal */}
      {editingWord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-5 z-50 text-black">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 relative">
            <h2 className="text-xl font-semibold mb-4">Edit Word</h2>

            <label className="block mb-2 font-medium">Word</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2 mb-4"
              value={formData.word}
              onChange={(e) => setFormData({ ...formData, word: e.target.value.toUpperCase() })}
            />

            <label className="block mb-2 font-medium">Definition</label>
            <textarea
              className="w-full border border-gray-300 rounded p-2 mb-4"
              rows={3}
              value={formData.definition}
              onChange={(e) => setFormData({ ...formData, definition: e.target.value.toUpperCase() })}
            />

            <label className="block mb-2 font-medium">Image URL</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2 mb-4"
              value={formData.img}
              onChange={(e) => setFormData({ ...formData, img: e.target.value })}
            />

            <label className="block mb-2 font-medium">Video URL</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-2 mb-6"
              value={formData.video}
              onChange={(e) => setFormData({ ...formData, video: e.target.value })}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={cancelEdit}
                className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#00ADB5] text-white rounded hover:bg-[#008c8f]"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Manage;
