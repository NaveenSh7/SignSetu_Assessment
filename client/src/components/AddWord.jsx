import { useState } from 'react';
import axios from 'axios';
function AddWord() {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [img, setImg] = useState('');
  const [video, setVideo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ word, definition, img,video });

    try {
    await axios.post('http://localhost:5000/api/words', {
        word : word.toUpperCase(),
        definition,
        img,
        video,
      });
      alert('Word added successfully!');
      setWord('');
      setDefinition('');
      setImg('');
      setVideo('');
    } catch (error) {
      console.log(error);
      
      alert("Failed : word may already exist or server is down")
    }

  };

  return (
    <div className="min-h-screen flex justify-center items-start pt-20 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#00ADB5]">Add New Word</h1>
        <form onSubmit={handleSubmit} className="space-y-5 text-black text-xl">
          <div>
            <label className="block mb-1 font-semibold">Word</label>
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Enter the new word"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Defination</label>
            <input
              type="text"
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              placeholder="What does it mean?"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              required
            />
          </div>
   <div>
            <label className="block mb-1 font-semibold">Image URL</label>
            <input
              type="text"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              placeholder="Image of the corresponding sign"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              required
            />
          </div>
             <div>
            <label className="block mb-1 font-semibold">Video URL</label>
            <input
              type="text"
              value={video}
              onChange={(e) => setVideo(e.target.value)}
              placeholder="Video URL of the corresponding sign"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              required
            />
          </div>
         

          <button
            type="submit"
            className="w-full bg-[#00ADB5] hover:bg-[#4d9397] text-white font-semibold py-2 rounded transition-colors"
          >
            Add Word
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddWord;
