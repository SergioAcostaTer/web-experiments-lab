import { Link } from "react-router-dom";

const Panel = (prop) => {
  return (
    <>
      <li className="listPanels-li" key={prop.id}>
        <Link to={`/providers/${prop.alt}`}>
          <div className="panel">
            <img src={prop.image} alt={prop.alt}></img>
          </div>
        </Link>
      </li>
    </>
  );
};

export default Panel;
