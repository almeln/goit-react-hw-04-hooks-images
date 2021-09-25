import { Component } from 'react';
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

class SearchBar extends Component {
  state = {
    searchName: '',
  };

  handleNameChange = event => {
    this.setState({ searchName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    const { searchName } = this.state;

    event.preventDefault();

    // Проверка на пустоту
    if (searchName.trim() === '') {
      return toast.error('Enter search name !');
    }

    // В форму передали сабмит
    this.props.onSubmit(searchName);

    this.setState({ searchName: '' });
  };

  render() {
    const { handleSubmit, handleNameChange } = this;
    const { searchName } = this.state;

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
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
