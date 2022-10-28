import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Movie = (prop) => {
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {});
  // console.log(prop)
  return (
    <>
      <Link
        to={`/${prop.id}`}
        key={prop.image + prop.id + prop.rate + prop.alt}
      >
        <div
          onMouseEnter={() => setIsFocus(true)}
          onMouseLeave={() => setIsFocus(false)}
          className={isFocus ? "focus movie" : `notfocus movie`}
        >
          <label className="label">
            <i className="bi bi-star-fill"></i>
            <span className="rate">{prop.rate}</span>
            <span className="smallrate">/10</span>
          </label>
          <img src={prop.image} alt={prop.alt}></img>
          <div className="watch">
            {/* <a >
              <Button size="large" variant="contained">
                WATCH!!
              </Button>
            </a> */}
          </div>
        </div>
      </Link>
    </>
  );
};

export default Movie;
