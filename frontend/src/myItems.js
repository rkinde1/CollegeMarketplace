import React, { useEffect } from 'react';
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function MyItems() {
    const [items, setItems] = useState([]);
    const getItems = async (e) => {
        e.preventDefault();
        await fetch('/api/transaction/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: localStorage.getItem('email')}),
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
            setItems(data.transactions);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>
            <form onSubmit={getItems}>
                <button type="submit">Get Items</button>
            </form>
            <h1>My Items</h1>
            {items.map((item) => (
                <div className="item" key={item._id}>
                    <h1>{item.date}</h1>
                    <h2>{item.seller}</h2>
                    <p>${item.amount}</p>
                    <p>{item.buyerApproved}</p>
                    <p>{item.sellerApproved}</p>
                    <form>
                        <Link to={`/item/${item.itemId}`}>
                            <button type="submit">View Item</button>
                        </Link>
                    </form>
                </div>   
                ))}
        </div>
    );
}

export default MyItems;