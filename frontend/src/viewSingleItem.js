import React from 'react';
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import './item.css';
import { useEffect } from 'react';

function ViewSingleItem() {
    const [item, setItem] = useState([]);
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        axios.post(`/api/items/${id}`)
        .then(res => {
          setItem(res.data);
        })
        .catch(err => console.log(err))
    }, [id])

    const deleteRequest = async () => {
        await fetch(`/api/items/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => {
            if (res.status === 200) {
                alert('Success');
                return res.json();
            }
            else {
                alert(res.status);
            }
        })
    }


    return (
        <div>
            <div className="viewItem">
                <h1>Item Name: {item.itemName}</h1>
                <img src={item.itemImage}></img>
                <h1>Category: {item.itemCategory}</h1>
                <h1>Description: {item.itemDescription}</h1>
                <h1>${item.itemPrice}</h1>
                <h1>Quantity: {item.itemQuantity}</h1>
                <h1>seller: {item.sellerEmail}</h1>
                <form method="DELETE" action="/api/items/delete/:id">
                    <button onClick={() => deleteRequest()} style={{backgroundColor: "red"}}>Delete Item</button>
                </form>
            </div>
        </div>
    )
}

export default ViewSingleItem;