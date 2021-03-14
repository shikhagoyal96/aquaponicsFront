import React, {useState, useEffect} from "react";
//import Layout from "./Layout";
import {getFilteredProducts} from "./apiCore";
import Card from "./Card";
import {prices} from './fixedPrices';
import RadioBox from './RadioBox';

const Shop = () => {

    const[myFilters, setMyFilters] = useState({
        filters: {price: []}
    });

    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [filteredResults, setFilteredResults] = useState(0);

    const loadFilteredResults = newFilters => {
        //console.log(newFilters);
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                //setFilteredResults(data.data);
                //setSize(data.size);
                setSkip(0);
            }
        });
    };

    useEffect(() => {
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
        const newFilters = {...myFilters};
        newFilters.filters[filterBy] = filters;

        if(filterBy == "price"){
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters)
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = []

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };


    return(
        <>
            <div className="container-fluid"> 
                <div className="row">
                    <div className="col-4">
                        <h4>Filter By Price Range</h4>
                        <div>
                            <RadioBox
                                prices={prices}
                                handleFilters={filters =>
                                    handleFilters(filters, "price")
                                }/>
                        </div>
                    </div>
                    <div className="col-8">
                        {/* {JSON.stringify(filteredResults)} */}
                        <h2 className="mb-4">Products</h2>
                        <div className="row">//displaying the products based on filteration 
                            {filteredResults.map((product, i) => (
                                <div key={i} className="col-4 mb-3">
                                    <Card product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Shop;

