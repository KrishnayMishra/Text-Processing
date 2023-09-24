import React, { useState } from 'react';

function WordFrequency({ wordFrequencies }) {
    const [searchKeyword, setSearchKeyword] = useState('');

    const handleKeywordChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const filteredWordFrequencies = Object.entries(wordFrequencies).filter(([word]) =>
        word.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    return (
        <div className="word-frequency">
            <h2>Word Frequencies</h2>
            <input
                type="text"
                placeholder="Search keywords"
                value={searchKeyword}
                onChange={handleKeywordChange}
            />
            <div className="card-container">
                {filteredWordFrequencies.map(([word, frequency], index) => (
                    <div className="card" key={index}>
                        <h3>{word}</h3>
                        <p>Frequency: {frequency}</p>
                    </div>
                ))}
                {filteredWordFrequencies.length === 0 && <p>No matching word frequencies found</p>}
            </div>
        </div>
    );
}

export default WordFrequency;
