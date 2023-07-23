// import PropTypes from "prop-types";

import styles from "./Error.module.css";
const Error = ({ errorMessage }) => {
  return (
    <p className={styles.message}>
      Whoops, something went wrong: {errorMessage}
    </p>
  );
};

// Error.propTypes = {};

export default Error;
