import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

function MyItems() {
    const [items, setItems] = useState([]);
    const finished = false;
    const getItems = async (e) => {
        await fetch('/api/transaction/get/seller', {
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

    const status = (item) => {
        if (item.status === true) {
            finished = true;
            return 'Completed';
        }
        else if (item.sellerApproved === true || item.buyerApproved === true) {
            return 'In Progress';
        }
        else {
            return 'Pending';
        }
    }

    const deleteSellerApproved = (_id) => (e)=> {
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

    const changeSellerApproved = (_id) => (e)=> {
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

    const buyerApproved = (item) => {
        if (item.buyerApproved === true) {
            return `${item.buyer} has approved this transaction`
        }
        if (item.buyerApproved === false) {
            return "Waiting on buyer"
        }
    }

    useEffect(() => {
        getItems();
    }, [items.length]);
    return(
        <div>
            <h1>My Posted Items</h1>
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
                    <p>Buyer Approved: {buyerApproved(item)}</p>
                    <p>Seller Approved: </p>
                    { item.sellerApproved === true ? 
                        (
                            <form onSubmit={deleteSellerApproved(item._id)}>
                                <button type="submit">Cancel</button>
                            </form>
                        ) : (
                            <form onSubmit={changeSellerApproved(item._id)}>
                                <button type="submit" style={{backgroundColor: 'green'}}>Approve</button>
                            </form>
                        )
                    }

                    { finished === true ?
                        (
                            <Link to={`/createComment/${item.buyer}`}> <button type= "submit">Write Review</button></Link>
                        ):(
                            null
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

export default MyItems;