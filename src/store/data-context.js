import React from "react";

const DataContext = React.createContext({
  modalIsOpened: false,
  onOpenModal: () => {},
  onCloseModal: () => {},
  itemsList: [],
  onAddItem: () => {},
  isFirstVisit: true,
  navigateToShoppingList: () => {},
  onUpdateEventHandler: (newListItems) => {},
  isChanged: false,
});

export default DataContext;
