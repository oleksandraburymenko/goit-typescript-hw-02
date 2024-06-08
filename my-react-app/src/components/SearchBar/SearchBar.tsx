import css from "./SearchBar.module.css";
import { FiSearch } from "react-icons/fi";
import toast, { Toaster } from 'react-hot-toast';
import { SearchBarProps } from "../../types";
import React, { FC, FormEvent } from 'react';

const SearchBar:FC<SearchBarProps> = ({onSearch}) => {
  const onSubmitHeader = (event: FormEvent<HTMLElement>) => {
event.preventDefault();
const form = event.target as HTMLFormElement;
const request = form.elements.namedItem('query') as HTMLInputElement;
const query = request.value.trim();
if (query.length === 0) {
  toast.success("Please, type something");
  return;
}
onSearch(query)
form.reset()
  }

  return <header className={css.header }>
    <form onSubmit={onSubmitHeader} className={css.form }>
      <div className={css.wrapper}>
      <input
        type="text"
        name="query"
        placeholder="Search images and photos"
      className={css.input}/>
      <button type="submit" className={css.button}>
        <FiSearch />
        </button>
      </div>
      <Toaster />
    </form>
  </header>;
}

export default SearchBar;