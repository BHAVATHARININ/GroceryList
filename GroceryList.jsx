import { useState } from "react";
import grocery from "./GroceryData";
import './GroceryStyle.css';

const groceries = Array.from(new Set(grocery.map(g => g.category)));

export default function GroceryList() {
    const [selectedCategory, setSelectedCategory] = useState(""); // To select the particular category
    const [selectedProducts, setSelectedProducts] = useState({}); // To select the products that the user wants from the category (may be multiple / single).

    function handleCategory(e) {
        setSelectedCategory(e.target.value); // To handle the selected category function by the user.
    }

    function handleProduct(e) {
        const product = e.target.value;

        setSelectedProducts(prevSelectedProducts => {
            const newSelectedProducts = { ...prevSelectedProducts }; // If the products are previously selected, then their entire structure must be appended to the variable.

            if (e.target.checked) { // If the checkbox is checked
                if (newSelectedProducts[selectedCategory]) { // If the category is already added, then add the newly selected product into that category
                    newSelectedProducts[selectedCategory] = [...newSelectedProducts[selectedCategory], product];
                } else {
                    newSelectedProducts[selectedCategory] = [product]; // If not already selected, then I have to append the new product.
                }
            } else {
                newSelectedProducts[selectedCategory] = newSelectedProducts[selectedCategory].filter(p => p !== product); // If unchecked then I have to filter from the variable and display the rest.
                if (newSelectedProducts[selectedCategory].length === 0) { // If no products were found then I have to delete the entire variable.
                    delete newSelectedProducts[selectedCategory];
                }
            }
            return newSelectedProducts;
        });
    }

    const filteredProducts = grocery.filter(item => item.category === selectedCategory); // To apply filtering for the products of the selected category
    const allSelectedProducts = Object.values(selectedProducts).flat(); // used to gather all selected products from different categories into a single flat array.

    return (

            <div className="main">
                <div className="grocery-wrapper">
                    {/* Dropdown menu */}
                    <div className="dropdown">
                        <select value={selectedCategory} onChange={handleCategory}>
                            <option value="">Select a Category</option>
                            {groceries.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    {/* Selected category */}
                    <div className="selectedcategory">
                        {selectedCategory && (
                            <div>
                                <h3 className="cattitle">{selectedCategory}:</h3>
                                <ul>
                                    {filteredProducts.map((item, index) => (
                                        <li key={index}>
                                            <div className="product-checkbox">
                                                <input
                                                    type="checkbox"
                                                    value={item.product}
                                                    checked={selectedProducts[selectedCategory]?.includes(item.product) || false}
                                                    onChange={handleProduct}
                                                />
                                                <label>{item.product}</label>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Selected products */}
                    <div className="selectedproducts">
                        {allSelectedProducts.length > 0 && (
                            <div>
                                <h3 className="glist">Your Items</h3>
                                <ul>
                                    {allSelectedProducts.map((product, index) => (
                                        <li key={index}>🪄 {product}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
    );
}
