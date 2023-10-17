import React, {useState} from "react"

function CreateItem () {
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    // const [itemImage, setItemImage] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const sellerEmail = localStorage.getItem('email');

    const handleCreateItem = (e) => {
        e.preventDefault();
        fetch('/api/items/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemName, itemDescription, itemPrice, itemCategory, itemQuantity, sellerEmail }),
        })
        .then((res) => {
            if (res.status === 200) {
                alert('Success');
                console.log('Success');
                return res.json();
            } else if (res.status === 400) {
                alert('Item already exists');
                console.log('Item already exists');
            }
            else {
                alert('Failed');
                alert(res.status);
                console.log('Failed');
            }
        })

    }

    return (
        <div>
            <h1>Create Item</h1>
            <form onSubmit={handleCreateItem} method="POST">
                <input type="text" placeholder="Name" id="name" onChange={(e) => setItemName(e.target.value)} value={itemName}/>
                <input type="text" placeholder="Description" id="description" onChange={(e) => setItemDescription(e.target.value)} value={itemDescription}/>
                <input type="number" placeholder="Price" id="price" onChange={(e) => setItemPrice(e.target.value)} value={itemPrice}/>
                {/* <input type="image" alt="" placeholder="Image" id="image" onChange={(e) => setItemImage(e.target.value)} value={itemImage}/> */}
                {/*Change to radio buttons*/}
                <input type="text" placeholder="Category" id="category" onChange={(e) => setItemCategory(e.target.value)} value={itemCategory}/>
                <input type="number" placeholder="Quantity" id="quantity" onChange={(e) => setItemQuantity(e.target.value)} value={itemQuantity}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateItem;