import { useState } from "react";
// import search from "../services/Search"
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [keyword, setKeyword] = useState();
  const navigate = useNavigate();

  const handleOnChange = (evt) => {
    setKeyword(evt.target.value);
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword}`);
    }
  };

  return (
    <>
      <form className="searchform" onSubmit={handleOnSubmit}>
        <input
          className="searchbar"
          onChange={handleOnChange}
          type={"text"}
          value={keyword}
        ></input>
        <button className="button">
          <i className="bi bi-search"></i>
        </button>
      </form>
    </>
  );
};

export default SearchBar;
