// export default function Search({ search, setSearch, handleSearch }) {
//     return (
//       <div className="search-engine">
//         <input
//           type="text"
//           placeholder="Enter City Name"
//           name="search"
//           value={search}
//           onChange={(event) => setSearch(event.target.value)}
//         />
//         <button onClick={handleSearch}>
//           Search
//         </button>
//       </div>
//     );
//   }

// Search.js
import React from "react";

export default function Search({ search, setSearch, onSearch }) {
  function handleSubmit(e) {
    e.preventDefault();
    if (search.trim()) {
      onSearch(search);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Enter city name"
      />
      <button type="submit">Search</button>
    </form>
  );
}