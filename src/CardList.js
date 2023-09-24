import React, { useState } from 'react';
import './CardList.css';
function CardList({ results, coOccurringWords }) {
    return (
        <div>
            <div className="card-list">
                {results && Array.isArray(results) && results.length > 0 ? (
                    <div>
                        <h2>Top Occurring Words</h2>
                        <div className="card-container">
                            {results.map((result, index) => (
                                <div className="card" key={index}>
                                    <h3>{result[0]}</h3>
                                    <p>{result[1]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>No top occurring words available</p>
                )}
                {coOccurringWords && Array.isArray(coOccurringWords) && coOccurringWords.length > 0 ? (
                    <div>
                        <h2>Top Co-Occurring Word Pairs</h2>
                        <div className="card-container">
                            {coOccurringWords.map((result, index) => (
                                <div className="card" key={index}>
                                    <h3>{result[0]}</h3>
                                    <p>{result[1]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>No top co-occurring word pairs available</p>
                )}
            </div>
        </div>
    );
}

export default CardList;
