import React, {useEffect, useState} from "react"
//import axios from "axios" //not axios (twice) need to be changed
import { useNavigate, Link} from "react-router-dom"
import Popup from "reactjs-popup";
import CreateItem from "./createItem"
import "./item.css";

function Marketplace () {
    //Use effect to call view items here
    const [items, setItems] = useState([]);

    const handleSubmit = (e) => {
        fetch('/api/items/view', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => {
            if (res.status === 200) {
                console.log('Success');
                return res.json();
            } else {
                console.log('Failed');
            }
        })
        .then((data) => {
            // alert(JSON.stringify(data));
            setItems(data);
        })
    }
    return (
        <div>
            <h1>Marketplace</h1>
            <button onClick={handleSubmit}>View Items</button>
            <div className="item-list">
            {items.map((item) => (
                <div className="item" key={item._id}>
                    <h2>{item.itemName}</h2>
                    <p>{item.itemDescription}</p>
                    <p>${item.itemPrice}</p>
                    <p>{item.itemCategory}</p>
                    <p>{item.itemQuantity}</p>
                    <p className="userFont">{item.sellerEmail}</p>
                </div>   
                ))}
            </div>
            <Popup trigger={<button> Create Item </button>}>
                <CreateItem />
            </Popup>
        </div>
    )
}

export default Marketplace;