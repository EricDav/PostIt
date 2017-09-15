import React from 'react';

const Search = (props) =>
  (
  <div className="search">
    <form>
      <input type="text" id="search"
        className="searchTerm"
        placeholder="serch for groups"
        required name="search"/>
      <a className="searchButton">
        <i className="mdi-action-search for">
        </i>
      </a>
    </form>
  </div>
  );

export default Search;
