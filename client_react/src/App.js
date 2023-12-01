// includes

// components includes
import Header from "./components/headerComponents/header";
import Footer from "./components/footerComponents/footer";
import Home from "./components/mainComponents/homePage";


// css imports
import "./assets/css/main.css";

function App() {
  return (
    <div className="App">

      <Header />
      <Home />
      <Footer />

    </div>
  );
}

export default App;
