import React from 'react';

const Search = () =>
  (
  <div className="search">
    <form>
      <input type="text" id="search"
        className="searchTerm"
        placeholder="search for users"
        required name="search"/>
      <a className="searchButton">
        <i className="mdi-action-search for">
        </i>
      </a>
    </form>
  </div>
  );

export default Search;
