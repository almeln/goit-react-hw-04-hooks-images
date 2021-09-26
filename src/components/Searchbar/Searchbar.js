import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SearchBarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './SearchBar.styled';

import { ImSearch } from 'react-icons/im';
import toast from 'react-hot-toast';

export default function SearchBar({ onSubmit }) {
  const [searchName, setSearchName] = useState('');

  const handleNameChange = event => {
    setSearchName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Проверка на пустоту
    if (searchName.trim() === '') {
      return toast.error('Enter search name !');
    }

    // В форму передали сабмит
    onSubmit(searchName);

    setSearchName('');
  };

  return (
    <SearchBarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <ImSearch />
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchName"
          value={searchName}
          onChange={handleNameChange}
        />
      </SearchForm>
    </SearchBarHeader>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// class SearchBar2 extends Component {
//   state = {
//     searchName: '',
//   };

//   handleNameChange = event => {
//     this.setState({ searchName: event.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = event => {
//     const { searchName } = this.state;

//     event.preventDefault();

//     // Проверка на пустоту
//     if (searchName.trim() === '') {
//       return toast.error('Enter search name !');
//     }

//     // В форму передали сабмит
//     this.props.onSubmit(searchName);

//     this.setState({ searchName: '' });
//   };

//   render() {
//     const { handleSubmit, handleNameChange } = this;
//     const { searchName } = this.state;

//     return (
//       <SearchBarHeader>
//         <SearchForm onSubmit={handleSubmit}>
//           <SearchFormButton type="submit">
//             <ImSearch />
//             <SearchFormButtonLabel>Search</SearchFormButtonLabel>
//           </SearchFormButton>

//           <SearchFormInput
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             name="searchName"
//             value={searchName}
//             onChange={handleNameChange}
//           />
//         </SearchForm>
//       </SearchBarHeader>
//     );
//   }
// }

// export default SearchBar;
