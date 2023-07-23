// import PropTypes from "prop-types";
import { Component } from "react";
import styles from "./Searchbar.module.css";

class Searchbar extends Component {
  state = {
    searchWord: "",
  };

  handleInput = ({ target: { value } }) => {
    this.setState({ searchWord: value });
  };

  handleSubmit = (event) => {
    const { onSubmit } = this.props;
    const { searchWord } = this.state;
    event.preventDefault();
    if (searchWord.trim() === "") {
      alert("Enter search word");
      return;
    }
    onSubmit(searchWord.trim());
  };

  render() {
    return (
      <header className={styles.searchbar}>
        <form onSubmit={this.handleSubmit} className={styles.searchForm}>
          <button type="submit" className={styles.searchFormButton}>
            <span className={styles.searchFormButtonLabel}>Search</span>
          </button>

          <input
            onChange={this.handleInput}
            name="search"
            className={styles.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchWord}
          />
        </form>
      </header>
    );
  }
}

// Searchbar.propTypes = {};

export default Searchbar;
