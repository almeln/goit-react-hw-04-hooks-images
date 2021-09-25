import React, { Component } from 'react';
import { Toaster, toast } from 'react-hot-toast';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { Container, NoNameDiv } from './App.styled';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import { fetchPhotos } from '../../services/photos-api';

import Button from 'components/Button';
import PhotosLoader from 'components/Loader/Loader';

import Modal from 'components/Modal';

class App extends Component {
  state = {
    searchName: '',
    selectedPhoto: null,
    selectedAlt: null,
    photos: [],
    error: null,
    status: 'idle',
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.searchName;
    const nextName = this.state.searchName;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const prevPhotos = this.state.photos;

    // Внутри компонента componentDidUpdate всегда обязатлеьно должна быть проверка, чтобы он не зациклился
    if (prevName !== nextName) {
      try {
        console.log('Изменилось имя поиска');
        console.log('prevName', prevName);
        console.log('nextName', nextName);

        this.setState({ status: 'pending', page: 1 });

        await fetchPhotos(nextName, nextPage).then(photos =>
          this.setState({ photos: photos.hits, status: 'resolved' }),
        );
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
      if (this.state.photos.length === 0) {
        return toast.error('Ooops... There are no photos on this result!');
      }
    }

    if (prevPage !== nextPage) {
      try {
        console.log('Изменилась страница');
        console.log('prevPage', prevPage);
        console.log('nextPage', nextPage);

        this.setState({ status: 'pending' });

        await fetchPhotos(nextName, nextPage).then(photos =>
          this.setState({
            photos: [...prevPhotos, ...photos.hits],
            status: 'resolved',
          }),
        );
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  handleFormSubmit = searchName => {
    console.log(searchName);
    // При сабмите формы записываем значение инпута из Серчбар в Апп
    this.setState({ searchName });
  };

  // Для выбора картинки
  handleSelectedPhoto = (imageURL, description) =>
    this.setState({
      selectedPhoto: imageURL,
      selectedAlt: description,
    });

  togleLoadMoreBtn = () => {
    console.log('btn-click');

    this.setState({
      page: this.state.page + 1,
    });

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  closeModal = () =>
    this.setState({
      selectedPhoto: null,
      selectedAlt: null,
    });

  render() {
    const {
      handleFormSubmit,
      handleSelectedPhoto,
      closeModal,
      togleLoadMoreBtn,
    } = this;
    const { searchName, selectedPhoto, selectedAlt, photos, status } =
      this.state;

    // State-машина
    if (status === 'idle') {
      return (
        <>
          <Searchbar onSubmit={handleFormSubmit}></Searchbar>
          <NoNameDiv>Enter search name</NoNameDiv>;
        </>
      );
    }

    if (status === 'pending') {
      return (
        <>
          <Searchbar onSubmit={handleFormSubmit}></Searchbar>
          <PhotosLoader />;
        </>
      );
    }

    if (status === 'rejected') {
      //   return <p>{error.message}</p>;
      return (
        <>
          <Searchbar onSubmit={handleFormSubmit}></Searchbar>
          toast.error('Ooops... There are no photos on this result!');
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <Container>
          <Searchbar onSubmit={handleFormSubmit}></Searchbar>
          {/* <ToastContainer autoClose={3000} /> */}
          <ImageGallery
            searchName={searchName}
            onSelect={handleSelectedPhoto}
            photos={photos}
          />
          {photos.length >= 12 && <Button onClick={togleLoadMoreBtn}></Button>}

          {this.state.selectedPhoto && (
            <Modal onClose={closeModal}>
              <img src={selectedPhoto} alt={selectedAlt} />
            </Modal>
          )}
          <Toaster position="top-right" />
        </Container>
      );
    }
  }
}

export default App;
