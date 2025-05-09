import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const AddProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const params = useParams();
    const navigate = useNavigate();
    // const [error, setError] = React.useState(false);

    // const addHandler = async () => {
    //     console.log(name, price, catogary, company);
    //     if (!name || !price || !catogary || !company) {
    //         setError(true)
    //         return true;
    //     }
    //     const userId = JSON.parse(localStorage.getItem('user')).id;

    //     let result = await fetch("http://localhost:5000/add-product", {
    //         method: "post",
    //         body: JSON.stringify({ name, price, catogary, company, userId }),
    //         headers: {
    //             'Content-Type': "application/json"
    //         }

    //     });
    //     result = await result.json();
    //     console.log(result);



    // }

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        try {
            console.log(params);

            let response = await fetch(`http://localhost:5000/product/${params.id}`);
            let result = await response.json();

            console.log("result", result); // Do something with `result`
            setName(result.name);
            setPrice(result.price);
            setCategory(result.category);
            setCompany(result.company)


        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };


    const updateProduct = async () => {
        console.log(name, price, category, company);

        try {
            const response = await fetch(`http://localhost:5000/product/${params.id}`, {
                method: "PUT",
                body: JSON.stringify({ name, price, category, company }),
                headers: {
                    'Content-Type': "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Failed to update product");
            }

            const result = await response.json();
            console.log("Updated product:", result);
            navigate('/');
        } catch (err) {
            console.error("Update error:", err);
            alert("Error updating product");
        }
    };


    return (
        <div className="register" >
            <h1>Update Product Product</h1>
            <input type="text" placeholder="Enter Name" value={name} onChange={(e) => { setName(e.target.value) }} className="inputBox" />
            {/* {error && !name && <span className="invailid-input">Enter vailid name</span>} */}
            <input type="text" placeholder="Enter price" value={price} onChange={(e) => { setPrice(e.target.value) }} className="inputBox" />
            <input type="text" placeholder="Enter catogary" value={category} onChange={(e) => { setCategory(e.target.value) }} className="inputBox" />
            <input type="text" placeholder="Enter company" value={company} onChange={(e) => { setCompany(e.target.value) }} className="inputBox" />
            <button className="appbutton" onClick={updateProduct} >Update product</button>
        </div>
    )
}
export default AddProduct; 