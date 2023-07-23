// import PropTypes from "prop-types";
import styles from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ src, alt, onClick }) => {
  return (
    <li className={styles.imageGalleryItem}>
      <img
        className={styles.imageGalleryItemImage}
        src={src}
        alt={alt}
        onClick={onClick}
      />
    </li>
  );
};

// ImageGalleryItem.propTypes = {};

export default ImageGalleryItem;
