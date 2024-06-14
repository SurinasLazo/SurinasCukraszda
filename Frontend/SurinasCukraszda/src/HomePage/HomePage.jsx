import Header from "../Header";
import WelcomeMessage from "./Welcome";
import Carousel from "./Carosuel";
import FeaturedProducts from "./FeaturedProducts";
import Footer from "../Footer";
function HomePage() {
  return (
    <div>
      <div className="homepage">
        <Header></Header>
        <WelcomeMessage></WelcomeMessage>
        <Carousel></Carousel>
        <FeaturedProducts></FeaturedProducts>
      </div>
      <Footer></Footer>
    </div>
  );
}
export default HomePage;
