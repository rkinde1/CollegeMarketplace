import React from 'react';
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import './item.css';

function ViewSingleItem() {
    const [item, setItem] = useState([]);
    const navigate = useNavigate()
    const {id} = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post(`/api/items/${id}`)
        .then(res => {
          alert(res.status);
          alert(JSON.stringify(res.data));
          setItem(res.data);
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <h1>View Single Item</h1>
            <form onSubmit={handleSubmit}>
                <button type="submit" className="btn btn-success w-100 rounded-0">
                    View
                </button>
            </form>
            <div className="viewItem">
                <img src={item.itemImage}></img>
                <h1>Category: {item.itemCategory}</h1>
                <h1>Item Name: {item.itemName}</h1>
                <h1>Description: {item.itemDescription}</h1>
                <h1>${item.itemPrice}</h1>
                <h1>Quantity: {item.itemQuantity}</h1>
                <h1>seller: {item.sellerEmail}</h1>
            </div>
        </div>
    )
}

export default ViewSingleItem;