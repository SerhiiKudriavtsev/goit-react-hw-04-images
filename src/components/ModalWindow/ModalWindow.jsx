import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalImage } from './ModalWindow.styled';

export default function ModalWindow({onClose, largeImage}) {
  
  useEffect(() => { 
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  },[onClose]);
  
  const handleClickBackdrop = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  
  return (
    <Overlay onClick={handleClickBackdrop}>
      <ModalImage>
        <img src={largeImage} alt="" />
      </ModalImage>
    </Overlay>
  );
}

ModalWindow.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};

// class ModalWindow extends Component {
//   static propTypes = {
//     onClose: propTypes.func.isRequired,
//     largeImage: propTypes.string.isRequired,
//   };

//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }
  
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleClickBackdrop = event => {
//     if (event.target === event.currentTarget) {
//       this.props.onClose();
//     }
//   };

//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return (
//       <Overlay onClick={this.handleClickBackdrop}>
//         <ModalImage>
//           <img src={this.props.largeImage} alt="" />
//         </ModalImage>
//       </Overlay>
//     );
//   }
// }

// export default ModalWindow;