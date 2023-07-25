// import PropTypes from "prop-types";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";

const modalRoot = document.querySelector("#modal");

const Modal = ({ onClose, image, description }) => {
  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Escape" || event.target.id === "modal-overlay") {
        onClose();
      }
    };

    window.addEventListener("keydown", listener);
    window.addEventListener("click", listener);
    return () => {
      window.removeEventListener("keydown", listener);
      window.removeEventListener("click", listener);
    };
  }, [onClose]);

  return createPortal(
    <div id="modal-overlay" className={styles.overlay}>
      <div className={styles.modal}>
        <img src={image} alt={description} />
      </div>
    </div>,
    modalRoot
  );
};

// Modal.propTypes = {};

export default Modal;
