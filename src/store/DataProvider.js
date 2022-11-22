import { useState, useEffect } from "react";
import DataContext from "./data-context";

const DataProvider = (props) => {
  const [modalIsOpened, setModalIsOpened] = useState(false);
  const [itemsList, setItemsList] = useState([]);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("items") != null) {
      const storedItems = JSON.parse(localStorage.getItem("items"));
      setItemsList(storedItems);

      if (storedItems.length > 0) {
        setIsFirstVisit(false);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(itemsList));
  }, [itemsList, isChanged]);

  const openModalHandler = () => {
    setModalIsOpened(true);
  };
  const closeModalHandler = () => {
    setModalIsOpened(false);
  };

  const addItemHandler = (name, price) => {
    setItemsList((prevList) => {
      return [
        ...prevList,
        {
          name: name,
          price: price,
          id: Math.random().toString(),
          isCompleted: false,
        },
      ];
    });
  };

  const navigateToShoppingListHandler = () => {
    setIsFirstVisit(false);
  };

  const onUpdateEventHandler = () => {
    setIsChanged(!isChanged);
  };

  // Naming -1 Notice that some keys have the same name as the value but others don't.
  // This is something you can optimize
  const dataContext = {
    modalIsOpened: modalIsOpened,
    onOpenModal: openModalHandler,
    onCloseModal: closeModalHandler,
    items: itemsList,
    onAddItem: addItemHandler,
    isFirstVisit: isFirstVisit,
    navigateToShoppingList: navigateToShoppingListHandler,
    onUpdateEventHandler: onUpdateEventHandler,
    isChanged: isChanged,
  };

  return (
    <DataContext.Provider value={dataContext}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
