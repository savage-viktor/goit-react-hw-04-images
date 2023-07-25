// import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./Searchbar.module.css";

const Searchbar = ({ onSubmit }) => {
  const [searchWord, setSearchWord] = useState("");

  const handleInput = ({ target: { value } }) => {
    setSearchWord(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchWord.trim() === "") {
      alert("Enter search word");
      return;
    }
    onSubmit(searchWord.trim());
  };

  return (
    <header className={styles.searchbar}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <button type="submit" className={styles.searchFormButton}>
          <span className={styles.searchFormButtonLabel}>Search</span>
        </button>

        <input
          onChange={handleInput}
          name="search"
          className={styles.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchWord}
        />
      </form>
    </header>
  );
};

// Searchbar.propTypes = {};

export default Searchbar;
