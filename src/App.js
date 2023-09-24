import React, { useState } from 'react';
import './App.css';
import FileUpload from './FileUpload';
import CardList from './CardList';
import WordFrequency from './WordFrequency';

function App() {
  const [results, setResults] = useState({});
  const [filteredResults, setFilteredResults] = useState([]);
  const [wordFrequencies, setWordFrequencies] = useState({});
  const [coOccurringWords, setCoOccurringWords] = useState([]);

  const fetchData = (data) => {
    setResults(data);
    setFilteredResults(data.topWords);
    setWordFrequencies(data.wordFrequencies);
    setCoOccurringWords(data.topCoOccurringWords);
  };


  const handleSearch = (keyword) => {
    // console.log("handle search");
    if (!keyword) {
      setFilteredResults(results.topWords);
    } else {
      const filtered = results.topWords.filter((word) =>
        word[0].toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredResults(filtered);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Text Processing App</h1>
        <FileUpload fetchData={fetchData} />
        <CardList results={filteredResults} handleSearch={handleSearch} coOccurringWords={coOccurringWords} />
        <WordFrequency wordFrequencies={wordFrequencies} />
      </header>
    </div>
  );
}

export default App;
