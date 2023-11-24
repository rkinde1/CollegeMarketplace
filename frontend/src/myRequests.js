import React, { useEffect } from 'react';
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './item.css';

function MyRequests() {
    const [items, setItems] = useState([]);
    const getItems = async (e) => {
        await fetch('/api/transaction/get/buyer', {
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

    const deleteBuyerApproved = (_id) => (e)=> {
        e.preventDefault();
        fetch('/api/transaction/delete/approval', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: _id, email: localStorage.getItem('email')}),
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
            console.log(data.message);
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const changeBuyerApproved = (_id) => (e)=> {
        e.preventDefault();
        fetch('/api/transaction/approve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: _id, email: localStorage.getItem('email')}),
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
            console.log(data.message);
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const status = (item) => {
        if (item.status === true) {
            return 'Completed';
        }
        else if (item.sellerApproved === true || item.buyerApproved === true) {
            return 'In Progress';
        }
        else {
            return 'Pending';
        }
    }

    const sellerApproved = (item) => {
        if (item.sellerApproved === true) {
            return `${item.seller} has approved this transaction`
        }
        if (item.sellerApproved === false) {
            return "Waiting on seller"
        }
    }

    const deleteTransaction = (_id) => (e)=> {
        e.preventDefault();
        fetch('/api/transaction/delete/transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: _id, email: localStorage.getItem('email')}),
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
            console.log(data.message);
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getItems();
    }, [items.length]);
    return (
        <div>
            <h1>My Requests</h1>
            {items.map((item) => (
                <div className="item" key={item._id}>
                    <h1>{item.date.substring(0,10)}</h1>
                    <h2>{item.itemName}</h2>
                    <img src={item.itemImage} alt={item.itemName} />
                    <h2>{item.seller}</h2>
                    <p>${item.amount}</p>
                    <p>{item.buyerApproved}</p>
                    <p>{item.sellerApproved}</p>
                    <p>Status: {status(item)}</p>
                    <p>Buyer Approved:</p>
                    { item.buyerApproved === true ? 
                        (
                            <form onSubmit={deleteBuyerApproved(item._id)}>
                                <button type="submit">Cancel</button>
                            </form>
                        ) : (
                            <form onSubmit={changeBuyerApproved(item._id)}>
                                <button type="submit" style={{backgroundColor: 'green'}}>Approve</button>
                            </form>
                        )
                    }
                    <p>Seller Approved: {sellerApproved(item)}</p>
                    { item.sellerApproved === true && item.buyerApproved === true ? 
                        (
                            //Rating form
                            <Link to={`/createComment/${item.seller}`}> <button type= "submit">Write Review</button></Link>
                            
                        ) : (
                            <form onSubmit={deleteTransaction(item._id)}>
                                <button type="submit" style={{backgroundColor: 'red'}}>Delete Transaction</button>
                            </form>
                        )
                    }

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

export default MyRequests;