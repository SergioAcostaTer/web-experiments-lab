import { useParams } from "react-router-dom";
import Header from "../components/Header";

import netflix from "../source/netflix.jpg";
import prime from "../source/primevideo.png";
import hbo from "../source/hbo.jpg";
import hulu from "../source/hulu.png";
import disney from "../source/disney.png";
import dazn from "../source/dazn.jpg";
import { useEffect, useState } from "react";
import MoviesOfProviders from "../components/MoviesOfProviders";

const ProviderDetail = () => {
  const { name } = useParams();
  const [pic, setPic] = useState();
  const [prov, setProv] = useState();


  const providers = [
    {
      name: "Netflix",
      src: netflix,
      color: "red",
      prov: "netflix",
    },
    {
      name: "Amazon Prime",
      src: prime,
      color: "blue",
      prov: "amazon",
    },
    {
      name: "HBOMax",
      src: hbo,
      color: "purple",
      prov: "hbo",
    },
    {
      name: "Hulu",
      src: hulu,
      color: "cyan",
      prov: "hulu"
    },
    {
      name: "Disney Plus",
      src: disney,
      prov: "disney",
      color: "black",
    },
    {
      name: "DAZN",
      src: dazn,
      prov: "dazn",
      color: "blue",
    },
  ];

  useEffect(() => {
    for (let i = 0; i < providers.length; i++) {
      if (name === providers[i].name) {
        setPic(providers[i].src);
        setProv(providers[i].prov)
      }
    }
  }, []);

  return (
    <>
      <Header></Header>

      <section className="banner">
        <img src={pic ? pic : ""} alt={prov}></img>
      </section>
      <MoviesOfProviders provider={prov ? prov : ""}></MoviesOfProviders>
    </>
  );
};

export default ProviderDetail;
