import Footer from "../components/Footer";
import Header from "../components/Header";
import Movies from "../components/Movies";
// import Panels from "../components/Panels";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <>
      <Header></Header>
      <Slider></Slider>
      {/* <Panels></Panels> */}
      <Movies></Movies>
      <Footer/>
    </>
  );
};

export default Home;
