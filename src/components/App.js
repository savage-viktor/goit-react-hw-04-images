import { Component } from "react";

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

class App extends Component {
  state = {
    imageName: "",
    status: STATUS.IDLE,
    images: [],
    page: 1,
    perPage: 12,
    errorMessage: "",
    currentImage: null,
    modal: false,
  };

  handleLoadMode = () => {
    this.setState((prevState) => {
      return { page: prevState.page + 1 };
    });
  };

  handleSearch = (searchWord) => {
    this.setState({ imageName: searchWord });
  };

  handleOpenModal = (image) => {
    this.setState({ currentImage: image, modal: true });
  };

  handleCloseModal = () => {
    this.setState({ modal: false });
  };

  async componentDidUpdate(_, prevState) {
    const { imageName, perPage, page } = this.state;

    if (prevState.imageName !== imageName) {
      this.setState({ status: STATUS.PENDING });

      try {
        const response = await getImages(imageName, 1, perPage);
        if (response.status === 200) {
          this.setState({ images: response.data.hits });
          this.setState({ status: STATUS.RESOLVED, page: 1 });
        }
        // else return Promise.reject(response);
      } catch (error) {
        this.setState({ errorMessage: error.message, status: STATUS.REJECTED });
      }
    }

    if (prevState.page < page) {
      try {
        const response = await getImages(imageName, page, perPage);
        if (response.status === 200) {
          this.setState((prevState) => ({
            images: [...prevState.images, ...response.data.hits],
          }));
        }
      } catch (error) {
        this.setState({ errorMessage: error.message, status: STATUS.REJECTED });
      } finally {
      }
    }
  }

  render() {
    const { status, images, page, perPage, currentImage, modal, errorMessage } =
      this.state;

    const loadMoreVisible = images.length === page * perPage;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleSearch} />

        {status === STATUS.PENDING && <Loader />}

        {status === STATUS.REJECTED && <Error errorMessage={errorMessage} />}

        {status === STATUS.RESOLVED && (
          <ImageGallery images={images} onClick={this.handleOpenModal} />
        )}

        {loadMoreVisible && <Button onClick={this.handleLoadMode} />}

        {modal && (
          <Modal
            onClose={this.handleCloseModal}
            image={currentImage.largeImageURL}
            description={currentImage.tags}
          />
        )}
      </div>
    );
  }
}

export default App;
