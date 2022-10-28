import Panel from "./Panel";

import netflix from "../source/netflix.jpg";
import prime from "../source/primevideo.png";
import hbo from "../source/hbo.jpg";
import hulu from "../source/hulu.png";
import disney from "../source/disney.png";
import dazn from "../source/dazn.jpg";

const Panels = (prop) => {
  const providers = [
    {
      name: "Netflix",
      src: netflix,
      color: "red",
    },
    {
      name: "Amazon Prime",
      src: prime,
      color: "blue",
    },
    {
      name: "HBOMax",
      src: hbo,
      color: "purple",
    },
    {
      name: "Hulu",
      src: hulu,
      color: "cyan",
    },
    {
      name: "Disney Plus",
      src: disney,
      color: "black",
    },
    {
      name: "DAZN",
      src: dazn,
      color: "blue",
    },
  ];

  return (
    <>
      <div className="panels">
        <ul className="listPanels">
          {providers.map((provider) => (
            <Panel
              key={provider.src}
              color={provider.color}
              image={provider.src}
              alt={provider.name}
              id={provider.name}
            ></Panel>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Panels;
