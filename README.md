# SignSetu - Mini Sign Language Visual Dictionary

A responsive MERN stack application that lets users search, add, edit, and delete sign language words with image and video references.

---

# Features

🌐 Frontend (React.js + Tailwind CSS)

* **Search Bar** on Home to search words
* **Display Word Details**
  * Word 
  * Definition
  * Image 
  * Video
    
* **Add Word Form**
 
  * Word + Definition + Image URL + Video URL
    
* **Manage Page**

  * View all words
  * Edit existing words
  * Delete words
  * 
### 🔧 Backend (Node.js + Express + MongoDB)

* `GET /api/words` – Fetch all words
* `GET /api/words/:query` – Fetch word by query
* `POST /api/words` – Add a new word
* `PUT /api/words/:word` – Update a word
* `DELETE /api/words/:word` – Delete a word


## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/signsetu.git
cd signsetu
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in `/server`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the backend:

npm start
```

### 3. Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

Frontend: `http://localhost:3000`
Backend: `http://localhost:5000`

---



