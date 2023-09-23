//Layout.tsx

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCountries } from "../hooks/useCountries";
import { useColapse } from "../hooks/useColapse";

const Search = () => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (search.length > 0) {
      setShow(true);
    } else {
      setShow(false);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [search]);

  const {
    data: countries,
    loading: countriesLoading,
    error: countriesError,
  } = useCountries(search);
  const setColapse = useColapse((state) => state.setColapse);

  console.log(countries, countriesLoading, countriesError);

  return (
    <div className="relative w-[370px] h-[50px] flex items-center justify-center gap-2">
      <div className="search flex items-center justify-center w-full h-[50px] rounded-[9px] bg-[#f8f8f8] max-w-[370px] relative">
        <button className="w-[50px] h-full flex items-center justify-center rounded-[9px]">
          <i className="bi bi-search text-[15px]"></i>
        </button>
        <input
          onFocus={() => setShow(true)}
          type="text"
          className="w-full h-full rounded-[9px] outline-none pr-4 bg-[#f8f8f8]"
          placeholder="Search here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {show && (
        <ul
          className="absolute top-[50px] left-0 w-full bg-white rounded-[9px] shadow-md mt-2"
          ref={dropdownRef}
        >
          {countries &&
            [...countries]?.splice(0, 5).map((place, index) => (
              <li key={place.name.common}>
                <Link
                  onClick={() => {
                    setSearch("");
                    setShow(false);
                    setColapse(true);
                  }}
                  to={`/weather/${place.name.common.toLowerCase()}`}
                  className="flex items-center h-[50px] gap-2 px-4 hover:bg-[#f8f8f8] transition-all duration-200"
                  style={{
                    borderTopLeftRadius: index === 0 ? "9px" : "0px",
                    borderTopRightRadius: index === 0 ? "9px" : "0px",
                    borderBottomLeftRadius:
                      index === countries.length - 1 ? "9px" : "0px",
                    borderBottomRightRadius:
                      index === countries.length - 1 ? "9px" : "0px",
                  }}
                >
                  <img
                    src={place.flags.png}
                    alt="flag"
                    className="h-[20px] w-[30px] square rounded-[5%]"
                  />
                  <h1 className="text-xl font-bold m-0">{place.name.common}</h1>
                </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

const Button = ({
  name,
  path,
  icon,
  colapse,
}: {
  name: string;
  path: string;
  icon: string;
  colapse: boolean;
}) => {
  const { pathname } = useLocation();

  return (
    <li className="w-full flex justify-center items-center">
      <Link
        to={path}
        className="flex items-center w-[80%] h-[50px] rounded-[9px] transition-all duration-200 gap-4"
        style={{
          backgroundColor: pathname === path ? "#5D60EF" : "transparent",
          justifyContent: colapse ? "center" : "flex-start",
          width: colapse ? "50px" : "80%",
        }}
      >
        <i
          className={`bi bi-${icon.toLowerCase()} text-[25px]`}
          style={{
            color: pathname === path ? "#fff" : "#7F819A",
            paddingLeft: colapse ? "0px" : "10px",
            fontSize: colapse ? "28px" : "25px",
          }}
        ></i>
        <h1
          className="text-xl font-bold m-0"
          style={{
            color: pathname === path ? "#fff" : "#7F819A",
            display: colapse ? "none" : "block",
          }}
        >
          {name}
        </h1>
      </Link>
    </li>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [colapse, setColapse] = useColapse((state) => [
    state.colapse,
    state.setColapse,
  ]);
  const navigate = useNavigate();

  return (
    <div className="w-[100vw] h-[100vh] flex">
      <div
        className="side flex flex-col items-center bg-white transition-all duration-200 py-4 gap-2 border-r border-[#55555520]"
        style={{
          width: colapse ? "80px" : "300px",
          minWidth: colapse ? "80px" : "300px",
        }}
      >
        <div
          className="flex items-center w-full px-4 transition-all duration3200 justify-end"
          style={{
            justifyContent: colapse ? "center" : "flex-end",
          }}
        >
          <button onClick={() => setColapse(!colapse)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="transition-all duration-200"
              style={{
                transform: !colapse ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <path
                fillRule="evenodd"
                d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8Zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5Z"
              />
            </svg>
          </button>
        </div>

        <Link
          className="logo flex items-center justify-center w-full h-[50px] gap-2 mt-2"
          to="/"
        >
          <img
            src="/logo.png"
            alt="logo"
            className="h-full square rounded-[25%]"
          />
          <h1
            className="text-2xl font-bold m-0"
            style={{
              display: colapse ? "none" : "block",
            }}
          >
            YourWeather
          </h1>
        </Link>

        <ul className="menu flex flex-col items-center justify-center w-full gap-2 mt-4">
          <Button
            name="Countries"
            path="/countries"
            icon="Globe"
            colapse={colapse}
          />
          <Button
            name="Settings"
            path="/settings"
            icon="Gear"
            colapse={colapse}
          />
        </ul>
      </div>

      <div className="content flex-1 flex flex-col">
        <header className="header h-[65px] min-h-[65px] flex items-center justify-between bg-white w-full px-4">
          <div className="flex gap-2 items-center">
            <button onClick={() => navigate(-1)}>
              <i className="bi bi-arrow-left text-[25px]"></i>
            </button>

            <button onClick={() => navigate(1)}>
              <i className="bi bi-arrow-right text-[25px]"></i>
            </button>
          </div>

          <Search />
          <a href="https://github.com/SergioAcostaTer" target="_blank">
            <div className="flex items-center h-[45px] bg-[#101630] rounded-[9px] justify-center w-[45px] cursor-pointer hover:bg-[#1C1F4B] transition-all duration-200 hover:shadow-md hover:scale-105">
              <i className="bi bi-github text-[25px] text-white"></i>
            </div>
          </a>
        </header>

        <main className="main flex flex-col items-center justify-center bg-[#f8f8f8] flex-1 h-[calc(100vh-65px)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
