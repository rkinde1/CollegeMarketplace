import React, {useEffect, useState} from "react";
//import axios from "axios" //not axios (twice) need to be changed
import { useNavigate, Link} from "react-router-dom";
import Popup from "reactjs-popup";
import CreateItem from "./createItem";
import "./item.css";
//import "./searchBar";

const token = localStorage.getItem("token");

function Marketplace () {
    //Use effect to call view items here
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');  

    const handleSubmit = async (e) => {
        await fetch('/api/items/view', {
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

    //filer the list of items that we retrieved from the database
    const searchResults = items.filter(item =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
        || item.itemDescription.toLowerCase().includes(searchTerm.toLowerCase())
        || item.itemCategory.toLowerCase().includes(searchTerm.toLowerCase())
      );

    useEffect(() => {
        handleSubmit();
    }, [items.length]);

    return (
        <div>
            <h1>Marketplace</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="searchbar">
                        <strong>View Items</strong>
                    </label>
                    <input
                        type="item_search"
                        placeholder="Enter Item Name"
                        autoComplete="off"
                        name="item_search"
                        className="form-control rounded-0"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button type="button" className="btn btn-success w-100 rounded-0">
                    Search Marketplace
                </button>
            </form>
            <div className="item-list">
            {searchResults.map((item) => (
                <div className="item" key={item._id}>
                    <img src={item.itemImage} style={{height: '200px',}}/>
                    <h2>{item.itemName}</h2>
                    <p>{item.itemDescription}</p>
                    <p>${item.itemPrice}</p>
                    <p>{item.itemCategory}</p>
                    <p>{item.itemQuantity}</p>
                    <p className="userFont">{item.sellerEmail}</p>
                    <form>
                        <Link to={`/item/${item._id}`}>
                            <button type="submit">View Item</button>
                        </Link>
                    </form>
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