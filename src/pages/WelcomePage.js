import { useState, useContext } from "react";

import AddItem from "../components/AddItem";
import DataContext from "../store/data-context";

import WelcomeImg from "../../src/assets/images/cart.png";

import "./WelcomePage.scss";

const WelcomePage = (props) => {
    const ctx = useContext(DataContext);
    
    return (<div className="welcome-page">
       <img src={WelcomeImg} alt="Welcome image" className="welcome-img" />
       <div className="welcome-text">
        <p>Welcome to EIKA’s shopping list. Here you will be able to create a todo list for the furniture you want to buy. </p>
        <p>To get started press the Add new item button and a popup will ask you the name and the price of the item you want to add.</p>
       </div>
       <button className="btn primary-btn" onClick={ctx.onOpenModal}>Add a new item</button>
       { ctx.modalIsOpened && <AddItem onCancel={ctx.onCloseModal} redirect />}
    </div>);
}

export default WelcomePage;