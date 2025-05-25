import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-[85vw] bg-white shadow md:ml-24 text-black">
      <div className="max-w-[60%] mx-auto h-16 px-5 flex items-center justify-between">
      
        <Link
          to="/"
          className="text-3xl font-bold text-black hover:text-[#00ADB5] transition-colors"
        >
          SignSetu
        </Link>

        {/* //hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? '✖' : '☰'}
        </button>

        {/* Nav Links - hidden on mobile*/}
        <ul
          className={`flex flex-col md:flex-row md:items-center gap-6 text-lg font-medium absolute md:static bg-white top-16 left-0 w-full md:w-auto transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-y-10' : '-translate-y-100'
          } md:translate-y-0 md:flex`}
        >
          <li>
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-5 py-3 hover:text-[#00ADB5] transition-colors text-2xl"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/AddWord"
              onClick={() => setIsOpen(false)}
              className="block px-5 py-3 hover:text-[#00ADB5] transition-colors text-2xl"
            >
              Add New Word
            </Link>
          </li>
             <li>
            <Link
              to="/Manage"
              onClick={() => setIsOpen(false)}
              className="block px-5 py-3 hover:text-[#00ADB5] transition-colors text-2xl"
            >
              Library
            </Link>
          </li>
          <li>
            <a
              href="https://www.signsetu.com/"
              target="_blank"
              rel="noreferrer"
              className="block px-5 py-3 hover:text-[#00ADB5] transition-colors text-2xl"
            >
              Visit Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
