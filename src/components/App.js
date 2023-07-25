import { useState, useEffect } from "react";
import styles from "./App.module.css";

import Searchbar from "./Searchbar/Searchbar";
import Loader from "./Loader/Loader";
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";
import Error from "./Error/Error";

import { getImages } from "../services/getImages";

const STATUS = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

const App = () => {
  const [imageName, setImageName] = useState("");
  const [status, setStatus] = useState(STATUS.IDLE);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentImage, setCurrentImage] = useState(null);
  const [modal, setModal] = useState(false);

  const handleLoadMode = () => {
    setPage((prevState) => prevState + 1);
  };

  const handleSearch = (searchWord) => {
    setImageName(searchWord);
  };

  const handleOpenModal = (image) => {
    setCurrentImage(image);
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  useEffect(() => {
    if (imageName === "") {
      return;
    }

    setStatus(STATUS.PENDING);

    const fetchImages = async () => {
      const response = await getImages(imageName, 1, perPage);
      if (response.status === 200) {
        setImages(response.data.hits);
        setStatus(STATUS.RESOLVED);
        setPage(1);
      }
    };

    fetchImages().catch((error) => {
      setErrorMessage(error.message);
      setStatus(STATUS.REJECTED);
    });
  }, [imageName, perPage]);

  useEffect(() => {
    if (page === 1) {
      return;
    }

    const fetchImages = async () => {
      const response = await getImages(imageName, page, perPage);
      if (response.status === 200) {
        setImages((prevState) => [...prevState, ...response.data.hits]);
        setStatus(STATUS.RESOLVED);
      }
    };

    fetchImages().catch((error) => {
      setErrorMessage(error.message);
      setStatus(STATUS.REJECTED);
    });
  }, [page, perPage]);

  const loadMoreVisible = images.length === page * perPage;

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleSearch} />

      {status === STATUS.PENDING && <Loader />}

      {status === STATUS.REJECTED && <Error errorMessage={errorMessage} />}

      {status === STATUS.RESOLVED && (
        <ImageGallery images={images} onClick={handleOpenModal} />
      )}

      {loadMoreVisible && <Button onClick={handleLoadMode} />}

      {modal && (
        <Modal
          onClose={handleCloseModal}
          image={currentImage.largeImageURL}
          description={currentImage.tags}
        />
      )}
    </div>
  );
};

export default App;
