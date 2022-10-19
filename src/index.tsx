import ReactDOM from "react-dom/client";
import HomePage from "Hompage";

import "Global.scss";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("No root!");
}

const root = ReactDOM.createRoot(rootElement);

root.render(<HomePage />);

//RGAPI-4c72180b-7eda-41ca-936c-286bda23fcfb
