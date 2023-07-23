// import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.button} type="button">
      Load more
    </button>
  );
};

// Button.propTypes = {};

export default Button;
