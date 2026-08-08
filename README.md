# 🇩🇪 German Analyzer & Learning Tool

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 📄 Description
**German Analyzer** is a specialized linguistic tool designed to assist learners in mastering German grammar and sentence structure. Unlike standard translators, this application deconstructs German sentences to provide deep grammatical insights, pointing out the specific case (Nominative, Accusative, Dative, Genitive) for each word and explaining the underlying grammar rules.

The application features a decoupled architecture with a **Python** backend for specific natural language processing and a **React (Vite)** frontend styled with **Tailwind CSS** for a responsive, modern user experience.

## ✨ Key Features

### 🔍 Deep Grammatical Analysis
* **Sentence Breakdown:**
    * Analyzes input text word-by-word.
    * Identifies and explains the **Grammatical Case** for nouns and pronouns.
    * Highlights verb conjugations and sentence structure.
* **Error Detection:**
    * Spots failures in sentence construction.
    * Provides feedback on grammar mistakes and suggests corrections.

### 📚 Learning & Review
* **Translation:**
    * Provides instant translation for individual words and full sentences.
    * Context-aware mapping of meanings.
* **Interactive Review:**
    * Save analyzed sentences for later study.
    * Review past corrections to track improvement.

### ⚙️ Technical Highlights
* **Modern Frontend:** Built with **React** and **Vite** for lightning-fast performance and hot module replacement.
* **Responsive Design:** Utilizes **Tailwind CSS** for a clean, mobile-adaptive interface.
* **Scalable Backend:** **Python** API handles complex linguistic logic and data processing.
* **State Management:** Efficient data handling between the input text bar, output container, and side panels.

## 🛠️ Tech Stack
* **Backend:** Python
* **Frontend:** React.js, Vite
* **Styling:** Tailwind CSS
* **Package Manager:** NPM

## 📂 Project Structure
The solution follows a modern full-stack split:

```text
zeyadamgad7-learn-german/
├── README.md
├── backend/
│   ├── .gitignore
│   └── src/
│       ├── main.py           # Application entry point & API routes
│       └── .env              # Environment variables
└── frontend/
    ├── README.md
    ├── bun.lock
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── tailwind.config.js
    ├── vite.config.js
    ├── .gitignore
    ├── public/
    └── src/
        ├── App.css
        ├── App.jsx
        ├── main.jsx
        ├── assets/
        ├── components/
        │   ├── button.jsx
        │   ├── checkBox.jsx
        │   ├── dropDown.jsx
        │   ├── footer.jsx
        │   ├── leftBar.jsx
        │   ├── navbar.jsx
        │   ├── outputContainer.jsx
        │   ├── sideContainer.jsx
        │   ├── store.js
        │   ├── test.jsx
        │   └── textBar.jsx
        ├── functions/
        │   └── handleSubmit.js
        ├── images/
        └── pages/
            ├── analyze.jsx
            ├── home.jsx
            ├── logout.jsx
            ├── review.jsx
            ├── signin.jsx
            ├── signup.jsx
            └── translate.jsx
```

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed:
* [Python 3.x](https://www.python.org/downloads/)
* [Node.js](https://nodejs.org/)
* Git

### Installation Steps

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/yourusername/zeyadamgad7-learn-german.git](https://github.com/yourusername/zeyadamgad7-learn-german.git)
    cd zeyadamgad7-learn-german
    ```

2. **Run the automated setup script**
   This project includes a shell script that automatically creates a Python virtual environment, installs backend dependencies, and installs frontend node modules.
   For Mac/Linux:
   ```bash
   chmod +x setup.sh
   ./setup.sh
    ```
   For Windows:
   Open Git Bash in the project folder and run the exact same commands as above.

3.  **Configuration**
    * Create a `.env` file in the `backend/src/` directory if your application requires environment variables (e.g., API keys).

4.  **Run the Application**
    You need to run the backend and frontend in separate terminals.

    * **Terminal 1 (Backend):**
        ```bash
        # 1. Navigate to the backend folder
         cd backend
         
         # 2. Activate the virtual environment (Mac/Linux)
         source venv/bin/activate
         # (On Windows Git Bash use: source venv/Scripts/activate)
         
         # 3. Start the Python server
         python src/main.py
        ```

    * **Terminal 2 (Frontend):**
        ```bash
        cd frontend
        npm run dev
        ```

## 💻 Usage
1.  Navigate to `http://localhost:5173` in your browser.
2.  **Sign Up/In:** Create an account or log in to access the dashboard.
3.  **Analyze:** Navigate to the "Analyze" page, enter a German sentence, and click "Submit" to view the case breakdown and translation.
4.  **Review:** Check the "Review" page to see your saved history and past corrections.
