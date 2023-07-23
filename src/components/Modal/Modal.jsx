// import PropTypes from "prop-types";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";
import { Component } from "react";

const modalRoot = document.querySelector("#modal");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.listener);
    window.addEventListener("click", this.listener);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.listener);
    window.removeEventListener("click", this.listener);
  }

  listener = (event) => {
    if (event.code === "Escape" || event.target.id === "modal-overlay") {
      this.props.onClose();
    }
  };

  render() {
    const { image, description } = this.props;
    return createPortal(
      <div id="modal-overlay" className={styles.overlay}>
        <div className={styles.modal}>
          <img src={image} alt={description} />
        </div>
      </div>,
      modalRoot
    );
  }
}

// Modal.propTypes = {};

export default Modal;
