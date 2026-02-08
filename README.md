# Grade 7 CBSE Math Study Companion

A front-end prototype for a teacher-focused application that generates practice questions and flashcards aligned with the CBSE Grade 7 mathematics syllabus.

## Features
- Topic navigation for all Grade 7 chapters
- Question generator with difficulty and type controls
- Flashcard viewer with flip animation, navigation, and shuffle
- Export to JSON and print-ready layout
- Sample data generation for offline demos

## Getting Started
Open `index.html` in a browser. Click **Load Sample Data** to preview generated questions and flashcards.

## Project Structure
```
hello-world/
├── index.html
├── css/
│   ├── styles.css
│   ├── flashcards.css
│   └── print.css
├── js/
│   ├── app.js
│   ├── apiHandler.js
│   ├── questionGenerator.js
│   ├── flashcardGenerator.js
│   └── topicData.js
└── README.md
```

## Next Steps
Connect `apiHandler.js` to a secure Claude API proxy to generate real questions and flashcards.
