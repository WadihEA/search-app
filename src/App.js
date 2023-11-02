import React, { useState } from 'react';
import articles from './data'; // Import the articles array

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search articles..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <ul>
        {articles.map((article) => {
          const searchRegex = new RegExp(searchTerm, 'gi');
          const highlightedTitle = article.title.replace(searchRegex, (match) => `<mark>${match}</mark>`);
          const highlightedContent = article.content.replace(searchRegex, (match) => `<mark>${match}</mark>`);

          if (!highlightedTitle.includes('<mark>') && !highlightedContent.includes('<mark>')) {
            return null; // Skip rendering the article if it doesn't contain the search term
          }

          return (
            <li key={article.id}>
              <strong dangerouslySetInnerHTML={{ __html: highlightedTitle }} /><br />
              <span dangerouslySetInnerHTML={{ __html: highlightedContent }} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchComponent;