import { useState } from 'react'
import axios from 'axios';

function Home() {
 
const [ word , setWord] = useState("");
  const [wordData, setWordData] = useState(null);
  const [error, setError] = useState('');

  const handleFetch = async () => {
    try {
      
      const response = await axios.get(`http://localhost:5000/api/words/${word.toUpperCase()}`);
      setWordData(response.data);
      setError('');
    } catch (err) {
      setWordData(null);
      if (err.response) {
        if (err.response.status === 404) {
          setError('Word not found');
        } else {
          setError('Backend error: ' + (err.response.data.error || 'Unknown error'));
        }
      } else {
        setError('Network error or server not reachable');
      }
    }
  };
  return (
<>


    <div className=' h-screen'>
{/* 
    <!-- Search Bar --> */}
<div className="flex items-center justify-center p-5 text-black">
  <div className="w-full max-w-md  rounded-lg bg-gray-200 p-4 mt-10">
    <div className="flex items-stretch">
    
      <div className="flex items-center justify-center px-3 bg-white border-r border-gray-300 rounded-l-lg">
        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"/>
        </svg>
      </div>
      <input
        type="text"
        value={word}
        onChange={(e)=>setWord(e.target.value)}
        placeholder="Search Word"
        className="w-full bg-white px-4 py-2 text-base  text-sm  md:text-xl text-bold text-gray-800 outline-none"
      /> 
      <button
                onClick={handleFetch}

        className="bg-[#00ADB5] hover:bg-[#4d9397] transition-colors text-white font-semibold px-4 rounded-r-lg "
      >
        Search
      </button>
    </div>
  </div>
</div>


      {wordData && (
        <div className="mt-4 p-3 border rounded bg-gray-50 text-black">

          <p className="text-4xl font-semibold text-[#00ADB5] mt-3">{wordData.word} </p>
   <p className="text-2xl mt-4">
  Definition : {wordData.definition}
</p>



<div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mt-16">

  {wordData.img && (
    <img
      src={wordData.img}
      alt={wordData.word}
      className="w-full md:w-1/2 h-auto md:h-[400px] max-w-full object-contain mt-2"
    />
  )}

  {wordData.video && (
    <iframe
      className="w-full md:w-1/2 h-[250px] md:h-[400px]"
      src={wordData.video}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  )}

</div>

  

</div>
      )}


          {error && <p className="mt-2 text-red-600">{error}</p>}
     
      </div>
   </>
  )
}

export default Home
