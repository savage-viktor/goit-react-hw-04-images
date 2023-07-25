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
  const [searchAgain, setSearchAgain] = useState(0);

  const handleLoadMode = () => {
    setPage((prevState) => prevState + 1);
  };

  const handleSearch = (searchWord) => {
    if (searchWord !== imageName) {
      setImageName(searchWord);
      setPage(1);
      setImages([]);
    }

    if (status === STATUS.REJECTED) {
      setSearchAgain((prevState) => prevState + 1);
    }
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

    if (page === 1) {
      setStatus(STATUS.PENDING);
    }

    const fetchImages = async () => {
      const response = await getImages(imageName, page, perPage);
      if (response.status === 200) {
        setImages((prevState) => [...prevState, ...response.data.hits]);
        setStatus(STATUS.RESOLVED);
        if (response.data.hits.length === 0) {
          setErrorMessage(`There is no ${imageName}`);
          setStatus(STATUS.REJECTED);
        }
      }
    };

    fetchImages().catch((error) => {
      setErrorMessage(error.message);
      setStatus(STATUS.REJECTED);
    });
  }, [imageName, page, perPage, searchAgain]);

  const loadMoreVisible = images.length === page * perPage;

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleSearch} />

      {status === STATUS.REJECTED && <Error errorMessage={errorMessage} />}

      {status === STATUS.RESOLVED && (
        <ImageGallery images={images} onClick={handleOpenModal} />
      )}

      {status === STATUS.PENDING && <Loader />}

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
