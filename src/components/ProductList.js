
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    console.log("products", products);


    useEffect(() => {
        getProduct();
    }, []);

    // const getProduct = async () => {
    //     let result = await fetch("http://localhost:5000/product");
    //     result = await result.json();
    //     console.log("result", result);

    //     setProducts(result);
    // }

    const getProduct = async () => {
        try {
            const response = await fetch("http://localhost:5000/product");

            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }

            const result = await response.json();
            console.log("Fetched products:", result);
            setProducts(result);
        } catch (error) {
            console.error("Error fetching product list:", error);
        }
    };

    // const deleteProduct = async (itemId) => {
    //     console.log(itemId);

    //     let result = await fetch(`http://localhost:5000/product/${itemId}`, {
    //         method: "Delete"
    //     })
    //     result = await result.json();
    //     // if (result) {
    //     // alert("record is deleted");
    //     // call the get functio updated list

    //     await getProduct();

    //     // }

    // }

    const deleteProduct = async (itemId) => {
        try {
            console.log("Deleting item:", itemId);

            const response = await fetch(`http://localhost:5000/product/${itemId}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                console.error("Delete failed");
                return;
            }

            const result = await response.json();
            console.log("Delete response:", result);

            await getProduct();
        } catch (err) {
            console.error("deleteProduct error:", err);
        }
    };

    const searchHandle = async (event) => {
        console.log(event.target.value);
        let key = event.target.value;
        if (key) {


            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();

            if (result) {
                setProducts(result)
            }
        } else {
            getProduct()
        }


    }

    return (
        <div className="product-list">
            <h3>Product list</h3>
            <input type="text" placeholder="search product" className="search-product-box" onChange={searchHandle} />
            <ul>
                <li>Sl No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                {/* delete functionalty */}
                <li>Operation</li>
            </ul>
            {
                products.length > 0 ? products.map((item, index) => (
                    <ul key={index}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li><button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={`/update/${item._id}`} >Update</Link>
                        </li>
                    </ul>
                ))
                    :
                    <h1>No result Found</h1>
            }
        </div>
    );
}

export default ProductList;

