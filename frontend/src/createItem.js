import React, {useState} from "react"

function CreateItem () {
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [sentItemImage, setSentItemImage] = useState('');
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
            body: JSON.stringify({ itemName, itemDescription, itemPrice, itemCategory, itemQuantity, sellerEmail, sentItemImage }),
        })
        .then((res) => {
            if (res.status === 200) {
                alert('Success');
                window.location.reload();
                console.log('Success');
                return res.json();
            } 
            else {
                alert('Failed');
                alert(res.status);
                console.log('Failed');
            }
        })
    }

    const handleImage = (e) =>{
        const file = e.target.files[0];
        setFileToBase(file);
        console.log(file);
    }

    const setFileToBase = (file) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setSentItemImage(reader.result);
        }

    }

    return (
        <div>
            <h1>Create Item</h1>
            <form onSubmit={handleCreateItem} method="POST">
                <input type="text" placeholder="Name" id="name" onChange={(e) => setItemName(e.target.value)} value={itemName}/>
                <input type="text" placeholder="Description" id="description" onChange={(e) => setItemDescription(e.target.value)} value={itemDescription}/>
                <input type="number" placeholder="Price" id="price" onChange={(e) => setItemPrice(e.target.value)} value={itemPrice}/>
                <input  onChange={handleImage} type="file" id="formupload" name="image" className="form-control" />

                {/*Change to radio buttons*/}
                <input type="text" placeholder="Category" id="category" onChange={(e) => setItemCategory(e.target.value)} value={itemCategory}/>
                <input type="number" placeholder="Quantity" id="quantity" onChange={(e) => setItemQuantity(e.target.value)} value={itemQuantity}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}


export default CreateItem;

// async function uploadImage(file) { // file from <input type="file"> 
//     const data = new FormData();
//     data.append("file", file);
//     data.append("upload_preset", NAME_OF_UPLOAD_PRESET);
  
//     const res = await fetch(
//       `https://api.cloudinary.com/v1_1/${YOUR_ID}/image/upload`,
//       {
//         method: "POST",
//         body: data,
//       }
//     );
//     const img = await res.json();
//     // Post `img.secure_url` to your server and save to MongoDB
//   }