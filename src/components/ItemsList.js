import React, { useState, useEffect, useContext } from "react";

import "./ItemsList.scss";

const ItemsList = (props) => {
  const [itemsList, setItemsList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [unCompletedList, setUnCompletedList] = useState([]);
  const [isAscending, setIsAscending]  = useState(true);

  useEffect(() => {
    setCompletedList(props.items.filter(obj => { return obj.isCompleted == true}));
    setUnCompletedList(props.items.filter(obj => { return obj.isCompleted == false}));
    setItemsList(props.items);
  }, [props.items, props.isChanged]);

  const sortListItems = (list, sortBy, ascending) => {
    if(sortBy === "name")
    {
      return list.sort((a, b) => {
        if (ascending) {
          return a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
        } else {
          return a.name.toUpperCase() > b.name.toUpperCase() ? -1 : 1;
        }
      });
    }
    else if(sortBy === "price")
    {
      return list.sort((a, b) => {
        if (ascending) {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    }
  };

  const sortHandler = (event) => {
    var sortedList = [...unCompletedList];
    sortedList = sortListItems(sortedList, event.target.value , isAscending);
    setUnCompletedList(sortedList);
    setIsAscending(!isAscending);
  }

  const markTaskAsCompleted = (event) => {
    if (event.target.checked) {
      var item= itemsList.filter(obj => { return obj.id == event.target.id})[0];
      item.isCompleted = true;
      setItemsList(itemsList);

      var updatedUnCompletedList = [...unCompletedList];
      var updatedCompletedList = [...completedList];

      updatedCompletedList = [...updatedCompletedList, updatedUnCompletedList.filter(obj => { return obj.id == event.target.id})[0]]
      setCompletedList(updatedCompletedList);

      updatedUnCompletedList = updatedUnCompletedList.filter(obj => { return obj.id != event.target.id})
      setUnCompletedList(updatedUnCompletedList);
      
      props.onUpdateEventHandler(itemsList);
    }
  };

  const markTaskAsUncompleted = (event) => {
    if (!event.target.checked) {
      var item= itemsList.filter(obj => { return obj.id == event.target.id})[0];
      item.isCompleted = false;
      setItemsList(itemsList);

      var updatedUnCompletedList = [...unCompletedList];
      var updatedCompletedList = [...completedList];

      updatedUnCompletedList = [...updatedUnCompletedList, updatedCompletedList.filter(obj => { return obj.id == event.target.id})[0]]
      setUnCompletedList(updatedUnCompletedList);

      updatedCompletedList = updatedCompletedList.filter(obj => { return obj.id != event.target.id})
      setCompletedList(updatedCompletedList);

      props.onUpdateEventHandler();
    }
  };
  
  return (
    <React.Fragment>
      {props.unCompleted && <div className="sorting-container">
        <span>Sort by: </span>
        <button onClick={sortHandler} value="name">Name</button>
        <button onClick={sortHandler} value="price">Price</button>
      </div>}

      {props.unCompleted && <ul className="items-list">
        {unCompletedList.map((item) => (
          <li className="item" key={item.id}>
            <label className="checkbox-container">
              <div className="item-info">
                <span className="item-name">{item.name}</span>
                <span className="item-price">{item.price}</span>
              </div>
              <input type="checkbox" id={item.id} onChange={markTaskAsCompleted} />
              <span className="checkmark"></span>
            </label>
          </li>
        ))}
      </ul>}

      {props.completed && <ul className="items-list">
        {completedList.map((item) => (
          <li className="item" key={item.id}>
          <label className="checkbox-container">
            <div className="item-info">
              <span className="item-name">{item.name}</span>
              <span className="item-price">{item.price}</span>
            </div>
            <input type="checkbox" id={item.id} onChange={markTaskAsUncompleted} checked />
            <span className="checkmark"></span>
          </label>
        </li>
        ))}
      </ul>} 
    </React.Fragment>
  );
};

export default ItemsList;
