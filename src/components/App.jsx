import React, { useState, useEffect } from "react";
import { animateScroll as scroll } from 'react-scroll';
// import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from './Button/Button';
import Message from './Message/Message';
import ModalWindow from './ModalWindow/ModalWindow';
import { fetchImagesAPI } from "servises/gallery-api";

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {

  const [wordSearch, setWordSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesArr, setImagesArr] = useState([]);
  const [status, setStatus] = useState('idle');
  const [prePages, setPrePages] = useState(20);
  const [showModal, setShowModal] = useState(false);
  const [totalHits, setTotalHits] = useState('');
  const [modalImg, setModalImg] = useState('');

  const handlePrePeageChange = prePage => { 
    if (prePages === prePage) {
      return;
    }else
    {
      setPrePages(prePage);
      setCurrentPage(1);
      setImagesArr([]);
    }
  };

  const handleFormSubmit = (wordValue) => {
    if (wordValue === wordSearch) { 
      return
    } else
    {
      setWordSearch(wordValue);
      setCurrentPage(1);
      setImagesArr([]);
    }
  }
  
  useEffect(() => {
    if (wordSearch === '') {
      return;
    }

    currentPage === 1 ? setStatus(Status.PENDING) : scroll.scrollToBottom();

    (async function fetchImages() {
      try {
        let { imagesArr, totalHits } = await fetchImagesAPI(wordSearch, currentPage, prePages);
        setImagesArr(image => [...image, ...imagesArr]);
        setTotalHits(totalHits);
        setStatus(Status.RESOLVED);
      } catch (error) {
        alert();
      }
    })();

  }, [wordSearch, currentPage, prePages] )

  const LargeImages = url => {
    toggleModal();
    setModalImg(url);
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const handleChangeCurrentPage = () => {
      setCurrentPage(currentPage => currentPage + 1);
  };

  const isEndGallery = currentPage > totalHits/prePages;
  return (
    <div>
      <Searchbar
        onSearchWord={handleFormSubmit}
        onPrePage={handlePrePeageChange}
      />
      {status === 'pending' && <Loader />}
      {status === 'resolved' && (
        <ImageGallery imagesArr={imagesArr} onClickWord={LargeImages} />
      )}
      {status === 'resolved' && !isEndGallery && (
        <Button
          text={'Load more'}
          onClickBtn={handleChangeCurrentPage}
        />
      )}
      {imagesArr.length === 0 && status === 'resolved' && (
        <Message text="Nothing found.
        Change the search filter." />
      )}
      {status === 'rejected' && <Message text="Something went wrong!" />}
      {showModal && (
        <ModalWindow onClose={toggleModal} largeImage={modalImg} />
      )}
    </div>
  );

};

// export default class App extends Component {

//   state = {
//     wordSearch: '',
//     currentPage: 1,
//     imagesArr: [],
//     loading: false,
//     status: 'idle',
//     prePages: 20,
//   }

//   // componentDidMount() {
//   //   console.log("componentDidMount")
//   //   this.setState({loading: true});
  
//   // }
  
//   handleFormSubmit = (wordSearch) => {
//     if(this.state.wordSearch !== wordSearch)
//     this.setState({
//       wordSearch: wordSearch,
//       currentPage: 1,
//       // imagesArr: [],
//     });
//   }

//   handlePrePeageChange = prePages => { 
//     this.setState({
//       prePages: prePages,
//     });
//   };
  
//   componentDidUpdate(prevProps, prevState) {
//     console.log("componentDidUpdate");
//     const { wordSearch, currentPage, prePages } = this.state;

//     if (wordSearch === '') {
//       return;
//     }

//     if (prevProps.wordSearch === wordSearch &&
//       prevState.currentPage === currentPage &&
//       prevState.prePages === prePages) {
      
//       return(alert("You are already watching " + wordSearch));
//     }
    
//     if (prevState.wordSearch !== wordSearch ||
//       prevState.currentPage !== currentPage ||
//       prevState.prePages !== prePages
//       ) {
//       if (currentPage === 1) {
//         this.setState({
//           imagesArr: [],
//           status: Status.PENDING,
//         });
//       }
//       this.fetchImages();

//       if (currentPage > 1) {
//         scroll.scrollToBottom();
//       }
//       return;
//     }

//     if (prevState.wordSearch === wordSearch &&
//       prevState.prePages !== prePages
//       ) {
//       if (currentPage === 1) {
//         this.setState({
//           status: Status.PENDING,
//         });
//       }
//       this.fetchImages();

//       if (currentPage > 1) {
//         scroll.scrollToBottom();
//       }
//     }
//   }

//   async fetchImages() {
//     const { wordSearch, currentPage, prePages } = this.state;
//     try {
//       let { imagesArr, totalHits } = await fetchImagesAPI(wordSearch, currentPage, prePages);
//       this.setState(prevState => ({
//         imagesArr: [...prevState.imagesArr, ...imagesArr],
//         totalHits: totalHits,
//         status: Status.RESOLVED,
//       }));
//     } catch (error) {
//       alert();
//     }
//   }

//   LargeImages = url => {
//     this.toggleModal();
//     this.setState({ modalImg: url });
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   handleChangeCurrentPage = () => {
//     this.setState(prevState => ({
//       currentPage: prevState.currentPage + 1,
//     }));
//   };

  

//   // searchedImagesChange = searchedImages => {
//   //   this.setState({ searchedImages });
//   // }

//   render() {
//     const { imagesArr, currentPage, status, totalHits, modalImg, showModal, prePages } =
//       this.state;
//     const isEndGallery = currentPage > totalHits/prePages;
//     return (
//       <div>
//         <Searchbar
//           onSearchWord={this.handleFormSubmit}
//           onPrePage={this.handlePrePeageChange}
//         />
//         {status === 'pending' && <Loader />}
//         {status === 'resolved' && (
//           <ImageGallery imagesArr={imagesArr} onClickWord={this.LargeImages} />
//         )}
//         {status === 'resolved' && !isEndGallery && (
//           <Button
//             text={'Load more'}
//             onClickBtn={this.handleChangeCurrentPage}
//           />
//         )}
//         {imagesArr.length === 0 && status === 'resolved' && (
//           <Message text="Nothing found.
//           Change the search filter." />
//         )}
//         {status === 'rejected' && <Message text="Something went wrong!" />}
//         {showModal && (
//           <ModalWindow onClose={this.toggleModal} largeImage={modalImg} />
//         )}
//       </div>
//     );
//   }
// };
