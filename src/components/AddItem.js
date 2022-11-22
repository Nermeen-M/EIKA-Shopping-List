import { useState, useEffect, useContext } from "react";
// import { Navigate, useNavigate } from 'react-router-dom'; // don't comment imports, remove them

import Modal from "./Modal";
import DataContext from "../store/data-context";


import "./AddItem.scss";
import ItemsList from "./ItemsList"; // formating -1 unused import

const AddItem = (props) => {
    const dataCtx = useContext(DataContext);
    const[enteredItemName, setEnteredItemName] = useState("");
    const[enteredItemPrice, setEnteredItemPrice] = useState("");
    const[enteredNameIsValid, setEnteredNameIsValid] = useState(true);
    const[enteredPriceIsValid, setEnteredPriceIsValid] = useState(true);

    const itemNameChangeHandler = (event) => {
        setEnteredItemName(event.target.value);
        if(enteredItemName.trim().length === 0){
            setEnteredNameIsValid(false);
        }
        setEnteredNameIsValid(true);
    };

    const itemPriceChangeHandler = (event) => {
        setEnteredItemPrice(event.target.value);
        if( enteredItemPrice.trim().length === 0 || enteredItemPrice < 1 ){
            setEnteredPriceIsValid(false);
        }
        setEnteredPriceIsValid(true);
    };

  const submitHandler = (event) => {
    event.preventDefault();
    if(enteredItemName.trim().length === 0){
        setEnteredNameIsValid(false);
        return;
    }
    if( enteredItemPrice.trim().length === 0 || enteredItemPrice < 1 ){
        setEnteredPriceIsValid(false);
        return;
    }
    setEnteredNameIsValid(true);
    setEnteredPriceIsValid(true);

    dataCtx.onAddItem(enteredItemName, enteredItemPrice);
    {props.redirect && dataCtx.navigateToShoppingList()};
            
    setEnteredItemName("");
    setEnteredItemPrice("");
    dataCtx.onCloseModal();
  };

  return (
    <Modal onCancel={dataCtx.onCloseModal} title="Add New Task">
        <form className="form" onSubmit={submitHandler}>
            <div className="form-field">
                <label htmlFor="item-name">Item name</label>
                <input id="item-name" type="text" value={enteredItemName} onChange={itemNameChangeHandler} placeholder="Item name" />
                {!enteredNameIsValid && <p className="error">Please enter a valid name.</p>}
            </div>
            <div className="form-field">
                <label htmlFor="item-price">Price</label>
                <input id="item-price" type="number" value={enteredItemPrice} onChange={itemPriceChangeHandler} placeholder="Item price" />
                {!enteredPriceIsValid && <p className="error">Please enter a valid price.</p>}
            </div>
            <div className="form-actions">
                <button className="btn primary-btn" type="submit">
                    Add
                </button>
                <button className="btn secondary-btn" onClick={dataCtx.onCloseModal}>
                    Cancel
                </button>
            </div>
        </form>
    </Modal>
  );
};

export default AddItem;
