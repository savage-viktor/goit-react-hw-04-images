// import PropTypes from "prop-types";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";

const modalRoot = document.querySelector("#modal");

const Modal = ({ onClose, image, description }) => {
  const listener = (event) => {
    if (event.code === "Escape" || event.target.id === "modal-overlay") {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", listener);
    window.addEventListener("click", listener);
    return () => {
      window.removeEventListener("keydown", listener);
      window.removeEventListener("click", listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <div id="modal-overlay" className={styles.overlay}>
      <div className={styles.modal}>
        <img src={image} alt={description} />
      </div>
    </div>,
    modalRoot
  );
};

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener("keydown", this.listener);
//     window.addEventListener("click", this.listener);
//   }

//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.listener);
//     window.removeEventListener("click", this.listener);
//   }

//   listener = (event) => {
//     if (event.code === "Escape" || event.target.id === "modal-overlay") {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { image, description } = this.props;
//     return createPortal(
//       <div id="modal-overlay" className={styles.overlay}>
//         <div className={styles.modal}>
//           <img src={image} alt={description} />
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }

// Modal.propTypes = {};

export default Modal;
