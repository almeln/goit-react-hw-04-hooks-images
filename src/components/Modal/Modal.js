import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {
  useEffect(() => {
    // Вешаем слушателя событий
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      // Чистим слушатель событий
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log('Нажали ESC, нужно закрыть модалку');
      onClose();
    }
  };

  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <ModalWindow>{children}</ModalWindow>
    </Overlay>,
    modalRoot,
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

// class Modal2 extends Component {
//   // Слушатель событий на Виндовс можно повесить в этом методе
//   componentDidMount() {
//     console.log('ModalComponentDidMount');
//     // Вешаем слушателя событий
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     console.log('ModalComponentWillUnmount');
//     // Чистим слушатель событий
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       console.log('Нажали ESC, нужно закрыть модалку');
//       this.props.onClose();
//     }
//   };

//   handleOverlayClick = e => {
//     console.log('Click on overlay');

//     console.log('currentTarget: ', e.currentTarget);
//     console.log('target: ', e.target);

//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     const { handleOverlayClick } = this;

//     return createPortal(
//       <Overlay onClick={handleOverlayClick}>
//         <ModalWindow>{this.props.children}</ModalWindow>
//       </Overlay>,
//       modalRoot,
//     );
//   }
// }

// export default Modal;
