import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Layout from "./components/Layout.tsx";
import "./index.css";
import "./normalize.css";
import "bootstrap-icons/font/bootstrap-icons.css"; 
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Layout>
      <App />
    </Layout>
  </BrowserRouter>
);
