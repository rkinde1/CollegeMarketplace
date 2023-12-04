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

    const deleteRequest = async (e) => {
        e.preventDefault();
        await fetch(`/api/items/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => {
            if (res.status === 200) {
                alert('Success');
                navigate('/market');
            }
            else {
                alert(res.status);
            }
        })
    }

    const initiateTransaction = async (e) => {
        e.preventDefault();
        await fetch(`/api/transaction/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({seller: item.sellerEmail, buyer: localStorage.getItem('email'), amount: item.itemPrice, itemId: id})
        })
        .then((res) => {
            if (res.status === 200) {
                alert('Success');
            }
            else {
                alert(res.status);
            }
        })
    }

    const checkDelete = () => {
        if (localStorage.getItem('email') === item.sellerEmail) {
            return true;
        }
        else {
            return false;
        }
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
                <h1><Link to={`/profile/${item.sellerEmail}`}>seller: {item.sellerEmail}</Link></h1>
                {
                    checkDelete() ? (
                        <form method="DELETE" onSubmit={deleteRequest}>
                            <button type="submit" style={{backgroundColor: "red", float: "center"}}>Delete Item</button>
                        </form> 
                    ) : (
                        <div></div>
                    )
                }
                <form onSubmit={initiateTransaction}>
                    <button style={{float: "right", background: "green"}}>Initiate Transaction</button>
                </form>
                <form>
                    <button style={{float: "left", background: "blue"}}>Message</button>
                </form>
            </div>
        </div>
    )
}

export default ViewSingleItem;