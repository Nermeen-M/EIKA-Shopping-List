import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import WelcomePage from "./pages/WelcomePage";
import ShoppingListPage from "./pages/ShoppingListPage";
import DataContext from "./store/data-context";

import "./App.scss";

function App() {
  // Name -1: What kind of data is this one?
  const dataCtx = useContext(DataContext);

  return (
    <div>
      <Header />
      <div className="main">
        {dataCtx.isFirstVisit && <WelcomePage />}
        {!dataCtx.isFirstVisit && <ShoppingListPage />}
      </div>
    </div>
  );
}

export default App;
