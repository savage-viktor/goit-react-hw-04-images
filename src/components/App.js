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
  // state = {
  //   imageName: "",
  //   status: STATUS.IDLE,
  //   images: [],
  //   page: 1,
  //   perPage: 12,
  //   errorMessage: "",
  //   currentImage: null,
  //   modal: false,
  // };

  const [imageName, setImageName] = useState("");
  const [status, setStatus] = useState(STATUS.IDLE);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentImage, setCurrentImage] = useState(null);
  const [modal, setModal] = useState(false);

  const handleLoadMode = () => {
    setPerPage((prevState) => prevState + 1);
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
    console.log("Змінилось імя");

    const fetchImages = async () => {
      console.log("Всередині fetchImages");
      const response = await getImages(imageName, 1, perPage);
      console.log("response>>>>>", response);
      if (response.status === 200) {
        setImages(response.data.hits);
        setStatus(STATUS.RESOLVED);
      }
    };

    fetchImages().catch(console.error);

    // console.log("Response >>>>", response());
  }, [imageName]);

  // useEffect(() => {
  //   if (page !== 1) {
  //     try {
  //       const response = getImages(imageName, page, perPage);
  //       if (response.status === 200) {
  //         setImages((prevState) => [
  //           ...prevState.images,
  //           ...response.data.hits,
  //         ]);
  //       }
  //     } catch (error) {
  //       setErrorMessage(error.message);
  //       setStatus(STATUS.REJECTED);
  //     } finally {
  //     }
  //   }
  // }, [page]);

  // async componentDidUpdate(_, prevState) {
  //   const { imageName, perPage, page } = this.state;

  //   if (prevState.imageName !== imageName) {
  //     this.setState({ status: STATUS.PENDING });

  //     try {
  //       const response = await getImages(imageName, 1, perPage);
  //       if (response.status === 200) {
  //         this.setState({ images: response.data.hits });
  //         this.setState({ status: STATUS.RESOLVED, page: 1 });
  //       }
  //       // else return Promise.reject(response);
  //     } catch (error) {
  //       this.setState({ errorMessage: error.message, status: STATUS.REJECTED });
  //     }
  //   }

  //   if (prevState.page < page) {
  //     try {
  //       const response = await getImages(imageName, page, perPage);
  //       if (response.status === 200) {
  //         this.setState((prevState) => ({
  //           images: [...prevState.images, ...response.data.hits],
  //         }));
  //       }
  //     } catch (error) {
  //       this.setState({ errorMessage: error.message, status: STATUS.REJECTED });
  //     } finally {
  //     }
  //   }
  // }

  // render() {
  //   const { status, images, page, perPage, currentImage, modal, errorMessage } =
  //     this.state;

  //   const loadMoreVisible = images.length === page * perPage;

  //   return (
  //     <div className={styles.App}>
  //       <Searchbar onSubmit={this.handleSearch} />

  //       {status === STATUS.PENDING && <Loader />}

  //       {status === STATUS.REJECTED && <Error errorMessage={errorMessage} />}

  //       {status === STATUS.RESOLVED && (
  //         <ImageGallery images={images} onClick={this.handleOpenModal} />
  //       )}

  //       {loadMoreVisible && <Button onClick={this.handleLoadMode} />}

  //       {modal && (
  //         <Modal
  //           onClose={this.handleCloseModal}
  //           image={currentImage.largeImageURL}
  //           description={currentImage.tags}
  //         />
  //       )}
  //     </div>
  //   );
  // }

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
