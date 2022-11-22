import React, { useState, useContext } from "react";
import AddItem from "../components/AddItem";
import ItemsList from "../components/ItemsList";
import DataContext from "../store/data-context";

import "./ShoppingListPage.scss";

// Formatting: Don't pass props if you are not using them, because you are using Context API
const ShoppingListPage = (props) => {
  const dataCtx = useContext(DataContext);
  const [completedIsShown, setCompletedIsShown] = useState(false);

  const toggleCompletedTasks = () => {
    setCompletedIsShown(!completedIsShown);
  };

  return (
    <div className="shopping-list">
      <ItemsList
        items={dataCtx.items}
        isChanged={dataCtx.isChanged}
        onUpdateEventHandler={dataCtx.onUpdateEventHandler}
        unCompleted
      />
      <button className="btn primary-btn" onClick={dataCtx.onOpenModal}>
        Add a new item
      </button>
      {dataCtx.modalIsOpened && <AddItem onCancel={dataCtx.onCloseModal} />}
      <button className="toggle-btn" onClick={toggleCompletedTasks}>
        {completedIsShown ? "Hide completed items" : "View completed items"}
      </button>
      {completedIsShown && (
        <ItemsList
          items={dataCtx.items}
          isChanged={dataCtx.isChanged}
          onUpdateEventHandler={dataCtx.onUpdateEventHandler}
          completed
        />
      )}
    </div>
  );
};

export default ShoppingListPage;
