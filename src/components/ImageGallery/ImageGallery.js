import PropTypes from 'prop-types';
import { ImageGalleryList, ImageGalleryListItem } from './ImageGallery.styled';

import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({ photos, onSelect }) => {
  return (
    <>
      <ImageGalleryList>
        {photos.map(({ id, largeImageURL, tags, webformatURL }) => (
          <ImageGalleryListItem
            key={id}
            onClick={() => onSelect(largeImageURL, tags)}
          >
            <ImageGalleryItem src={webformatURL} alt={tags} />
          </ImageGalleryListItem>
        ))}
      </ImageGalleryList>
    </>
  );
};

ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ImageGallery;

// class OldImageGallery extends Component {
//   state = {
//     photos: null,
//     // loading: false,
//     error: null,
//     status: 'idle',
//     page: 1,
//   };

//   // Когда компонент обновляется (обновляются или пропсы или стейт)
//   async componentDidUpdate(prevProps, prevState) {
//     const prevName = prevProps.searchName;
//     const nextName = this.props.searchName;
//     const prevPage = prevState.page;
//     const nextPage = this.state.page;
//     const prevPhotos = this.state.photos;
//     // Внутри компонента componentDidUpdate всегда обязатлеьно должна быть проверка, чтобы он не зациклился
//     if (prevName !== nextName) {
//       try {
//         console.log('Изменилось имя поиска');
//         console.log('prevName', prevName);
//         console.log('nextName', nextName);

//         this.setState({ status: 'pending', page: 1 });

//         await fetchPhotos(nextName, nextPage).then(photos =>
//           this.setState({ photos: photos.hits, status: 'resolved' }),
//         );
//       } catch (error) {
//         this.setState({ error, status: 'rejected' });
//       }
//       if (this.state.photos.length === 0) {
//         return toast.error('Ooops... There are no photos on this result!');
//       }
//     }

//     if (prevPage !== nextPage) {
//       try {
//         console.log('Изменилась страница');
//         console.log('prevPage', prevPage);
//         console.log('nextPage', nextPage);

//         this.setState({ status: 'pending' });

//         await fetchPhotos(nextName, nextPage).then(photos =>
//           this.setState({
//             photos: [...prevPhotos, ...photos.hits],
//             status: 'resolved',
//           }),
//         );
//       } catch (error) {
//         this.setState({ error, status: 'rejected' });
//       }
//     }

//     window.scrollTo({
//       top: document.documentElement.scrollHeight,
//       behavior: 'smooth',
//     });
//   }

//   togleLoadMoreBtn = () => {
//     console.log('btn-click');

//     this.setState({
//       page: this.state.page + 1,
//     });

//     window.scrollTo({
//       top: document.documentElement.scrollHeight,
//       behavior: 'smooth',
//     });
//   };

//   render() {
//     const { photos, status } = this.state;

//     // State-машина
//     if (status === 'idle') {
//       return <NoNameDiv>Enter search name</NoNameDiv>;
//     }

//     if (status === 'pending') {
//       return <PhotosLoader />;
//     }

//     if (status === 'rejected') {
//       //   return <p>{error.message}</p>;
//       return toast.error('Ooops... There are no photos on this result!');
//     }

//     if (status === 'resolved') {
//       const { togleLoadMoreBtn } = this;

//       return (
//         <>
//           <ImageGalleryList>
//             {photos.map(({ id, largeImageURL, tags, webformatURL }) => (
//               <ImageGalleryListItem
//                 key={id}
//                 onClick={() => this.props.onSelect(largeImageURL, tags)}
//               >
//                 <ImageGalleryItem src={webformatURL} alt={tags} />
//               </ImageGalleryListItem>
//             ))}
//           </ImageGalleryList>
//           {photos.length >= 12 && <Button onClick={togleLoadMoreBtn}></Button>}
//         </>
//       );
//     }
//   }
// }

// export { OldImageGallery } ;
