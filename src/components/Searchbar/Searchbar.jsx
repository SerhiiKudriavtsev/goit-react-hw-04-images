import PropTypes from 'prop-types';
import { useState } from "react";
import {
  Header,
  SearchForm,
  Input,
  Button,
  SearchIcon,
  Label,
  Select,
} from "./Searchbar.styled";

export default function Searchbar({onSearchWord, onPrePage}) {

  const [wordSearch, setWordSearch] = useState('');
  const [prePage, setPrePage] = useState(20);

  const handleSubmit = event => {
    event.preventDefault();

    if(wordSearch.trim() === '') {
      alert("Enter a word to search for")
      return;
    };
    onSearchWord(wordSearch);
    onPrePage(prePage);
  };

  const handleWordChange = event => {
    setWordSearch(event.currentTarget.value);
  };

  const handlePrePageChange = event => {
    setPrePage(event.currentTarget.value);
  };

  return (
    <div>
      <Header>
        <SearchForm  onSubmit={handleSubmit}>
          <Button  type="submit" className="button">
            <span ><SearchIcon /></span>
          </Button>

          <Input
            className="input"
            type="text"
            name="wordSearch"
            value={wordSearch}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleWordChange}
          />
          <Label>
              <Select value={prePage} name="prePage" onChange={handlePrePageChange}>
                <option value="20">20</option>
                <option value="40">40</option>
                <option value="60">60</option>
                <option value="80">80</option>
                <option value="100">100</option>
            </Select>
            on page
            </Label>
        </SearchForm>
      </Header>
    </div>
  )
}
  
Searchbar.propTypes = {
  onSearchWord: PropTypes.func.isRequired,
  onPrePage: PropTypes.func.isRequired,
};

// export default class Searchbar extends Component {
//   state = {
//     wordSearch: '',
//     prePage: 20,
//   }

//   handleSubmit = event => {
//     event.preventDefault();

//     if(this.state.wordSearch.trim() === '') {
//       alert("Enter a word to search for")
//       return;
//     };

    
//     this.props.onSearchWord(this.state.wordSearch);
//     this.props.onPrePage(this.state.prePage);
//     // this.setState({ wordSearch: '' });
//   };
  
//   // handleWordChange = event => {
//   //   this.setState({wordSearch: event.currentTarget.value.toLowerCase(),});    
//   // };

//   handleChange = event => {
//     // this.setState({ prePage: event.currentTarget.value });
//     const { name, value } = event.currentTarget;
//     this.setState({ [name]: value });
//   };


//   render() {

// return (
//   <div>
//     <Header>
//       <SearchForm  onSubmit={this.handleSubmit}>
//         <Button  type="submit" className="button">
//           <span ><SearchIcon /></span>
//         </Button>

//         <Input
//           className="input"
//           type="text"
//           name="wordSearch"
//           value={this.state.wordSearch}
//           autoComplete="off"
//           autoFocus
//           placeholder="Search images and photos"
//           onChange={this.handleChange}
//         />
//         <Label>
//             <Select value={this.state.prePage} name="prePage" onChange={this.handleChange}>
//               <option value="20">20</option>
//               <option value="40">40</option>
//               <option value="60">60</option>
//               <option value="80">80</option>
//               <option value="100">100</option>
//           </Select>
//           on page
//           </Label>
//       </SearchForm>
//       {/* <PrePage onPrePage={this.prePage} /> */}
//     </Header>
//   </div>
//   )}
// }
  
// Searchbar.propTypes = {
//   onSearchWord: PropTypes.func.isRequired,
//   onPrePage: PropTypes.func.isRequired,
// };