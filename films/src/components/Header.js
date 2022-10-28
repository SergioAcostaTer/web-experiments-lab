import { Link } from "react-router-dom";
import SearchBar from "./Searchbar";
import yt from "../source/youtube.png";
import { Avatar } from "@mui/material";

const Header = () => {
  return (
    <>
      <header className={"header"}>
        {/* <Link className="logo" to={"/"}>
          <img src={yt} alt="yt"></img>
        </Link> */}
        <SearchBar></SearchBar>
        {/* <Avatar src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/00/00274a9f056ecfff319154cbb76e557722a4b44f.jpg" /> */}
      </header>

      {/* <ul className="menu">
                <Link to={"/"}><li>Movies</li></Link>
                <Link to={"/"}><li>TV Shows</li></Link>
                <Link to={"/"}><li>People</li></Link>
                <Link to={"/"}><li>News</li></Link>
            </ul> */}
    </>
  );
};

export default Header;
