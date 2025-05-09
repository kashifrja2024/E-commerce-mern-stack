import React, { useState } from "react";



const AddProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);

    const addHandler = async () => {
        console.log(name, price, category, company);
        if (!name || !price || !category || !company) {
            setError(true)
            return true;
        }
        const userId = JSON.parse(localStorage.getItem('user')).id;

        let result = await fetch("http://localhost:5000/add-product", {
            method: "post",
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': "application/json"
            }

        });
        result = await result.json();
        console.log(result);
        setName("")
        setPrice("")
        setCompany("")
        setCategory("")
    }
    return (
        <div className="register" >
            <h1>Add Product</h1>
            <input type="text" placeholder="Enter Name" value={name} onChange={(e) => { setName(e.target.value) }} className="inputBox" />
            {error && !name && <span className="invailid-input">Enter vailid name</span>}
            <input type="text" placeholder="Enter price" value={price} onChange={(e) => { setPrice(e.target.value) }} className="inputBox" />
            <input type="text" placeholder="Enter categaory" value={category} onChange={(e) => { setCategory(e.target.value) }} className="inputBox" />
            <input type="text" placeholder="Enter company" value={company} onChange={(e) => { setCompany(e.target.value) }} className="inputBox" />
            <button className="appbutton" onClick={addHandler}>Add product</button>
        </div>
    )
}
export default AddProduct;