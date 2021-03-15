import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({
  product,
  //showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
//   setRun = f => f,
//   run = undefined
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

//   const showViewButton = showViewProductButton => {
//     return (
//       showViewProductButton && (
//         <Link to={`/product/${product._id}`} className="mr-2">
//           <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">View Product</button>
//         </Link>
//       )
//     );
//   };
  const addToCart = () => {
    // console.log('added');
    addItem(product, 
        () => {
        setRedirect(true)
    });
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (showAddToCartButton) => {
    return (
       showAddToCartButton && (
        <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2 card-btn-1  ">
          Add to cart
        </button>
      )
    );
  };

  const handleChange = productId => event => {
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if(event.target.value >= 1){
        updateItem(productId, event.target.value)
    }  
  };

  const showCartUpdateOptions = cartUpdate => {
      return cartUpdate && <div>
          <div className="input-group mb-3">
            <div className="input-group prepend">
                <span className="input-group-text">AdjustQuantity</span>
            </div>
            <input type="number" className="form-control" value={count}
                onChange={handleChange(product._id)}/>
            </div>
      </div>
  }

  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => 
            removeItem(product._id)
            //setRun(!run); // run useEffect in parent Cart
          }
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };

  return (
    <div className="card ">
      <div className="card-header card-header-1 ">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
        <p className="card-p black-10">$ {product.price}</p>
        <p className="card-p black-10">{product.weight}</p>
        {/* <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p> */}

  <br />

        {/* {showViewButton(showViewProductButton)} */}

        {showAddToCart(showAddToCartButton)}

        {showCartUpdateOptions(cartUpdate)}

        {showRemoveButton(showRemoveProductButton)} 
      </div> 
    </div>
  );
};

export default Card;