import React, { useState, useEffect } from 'react';
//import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createProduct } from './apiAdmin';

const AddProduct = () => {

        const [values, setValues] = useState({
        //Properties to create new product
        name: '',
        price: '',
        weight: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '', //initially it will be empty, but after creating product it will tell the user that prodcut has been crated
        redirectToProfile: false,
        formData: ''
    });

    const { user, token } = isAuthenticated();

    const {
        name,
        price,
        weight,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

        useEffect(() => {
        setValues({...values, formData: new FormData()})
    }, []);


        const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

        const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

                createProduct(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    photo: '',
                    price: '',
                    weight: '',
                    loading: false,
                    createdProduct: data.name
                });
            }
        });
    };


        const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit} >
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input  onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label className="text-muted">Weight</label>
                <input onChange={handleChange('weight')} type="text" className="form-control" value={weight} />
            </div>

            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    );
        
    return (
        <div> 
            <h1>{user.name}, ready to add a new product?</h1>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {/* {showLoading()}
                    {showSuccess()}
                    {showError()} */}
                    {newPostForm()}
                </div>
            </div>
        </div>
    );
};

// //creating AddProduct component
// const AddProduct = () => {
//     //created state - going to an object
//     //state for new prodcut
//     const [values, setValues] = useState({
//         //Properties to create new product
//         name: '',
//         description: '',
//         price: '',
//         categories: [],
//         category: '',
//         shipping: '',
//         quantity: '',
//         photo: '',
//         loading: false,
//         error: '',
//         createdProduct: '', //initially it will be empty, but after creating product it will tell the user that prodcut has been crated
//         redirectToProfile: false,
//         formData: ''
//     });

//     //checking user authentication
//     const { user, token } = isAuthenticated();
//     //destruct from the actual state value
//     const {
//         name,
//         description,
//         price,
//         categories,
//         category,
//         shipping,
//         quantity,
//         loading,
//         error,
//         createdProduct,
//         redirectToProfile,
//         formData
//     } = values;

//     // load categories and set form data
//     const init = () => {
//         getCategories().then(data => {
//             if (data.error) {
//                 setValues({ ...values, error: data.error });
//             } else {
//                 setValues({
//                     ...values,
//                     categories: data,
//                     formData: new FormData()
//                 });
//             }
//         });
//     };

//     useEffect(() => {
//         init();
//     }, []);

//     //grab the name and return another fucntion, function returning another function
//     const handleChange = name => event => {
//         const value = name === 'photo' ? event.target.files[0] : event.target.value;
//         formData.set(name, value);
//         setValues({ ...values, [name]: value });
//     };

    
//     const clickSubmit = event => {
//         event.preventDefault();
//         setValues({ ...values, error: '', loading: true });

//         createProduct(user._id, token, formData).then(data => {
//             if (data.error) {
//                 setValues({ ...values, error: data.error });
//             } else {
//                 setValues({
//                     ...values,
//                     name: '',
//                     description: '',
//                     photo: '',
//                     price: '',
//                     quantity: '',
//                     loading: false,
//                     createdProduct: data.name
//                 });
//             }
//         });
//     };


//     //add product form
//     const newPostForm = () => (
//         <form className="mb-3" onSubmit={clickSubmit}>
//             <h4>Post Photo</h4>
//             <div className="form-group">
//                 <label className="btn btn-secondary">
//                     <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
//                 </label>
//             </div>

//             <div className="form-group">
//                 <label className="text-muted">Name</label>
//                 <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
//             </div>

//             <div className="form-group">
//                 <label className="text-muted">Description</label>
//                 <textarea onChange={handleChange('description')} className="form-control" value={description} />
//             </div>

//             <div className="form-group">
//                 <label className="text-muted">Price</label>
//                 <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
//             </div>

//             <div className="form-group">
//                 <label className="text-muted">Category</label>
//                 <select onChange={handleChange('category')} className="form-control">
//                     <option>Please select</option>
//                     {categories &&
//                         categories.map((c, i) => (
//                             <option key={i} value={c._id}>
//                                 {c.name}
//                             </option>
//                         ))}
//                 </select>
//             </div>

//             <div className="form-group">
//                 <label className="text-muted">Shipping</label>
//                 <select onChange={handleChange('shipping')} className="form-control">
//                     <option>Please select</option>
//                     <option value="0">No</option>
//                     <option value="1">Yes</option>
//                 </select>
//             </div>

//             <div className="form-group">
//                 <label className="text-muted">Quantity</label>
//                 <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
//             </div>

//             <button className="btn btn-outline-primary">Create Product</button>
//         </form>
//     );

//     const showError = () => (
//         <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
//             {error}
//         </div>
//     );

//     const showSuccess = () => (
//         <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
//             <h2>{`${createdProduct}`} is created!</h2>
//         </div>
//     );

//     const showLoading = () =>
//         loading && (
//             <div className="alert alert-success">
//                 <h2>Loading...</h2>
//             </div>
//         );

//     return (
//         <Layout title="Add a new product" description={`G'day ${user.name}, ready to add a new product?`}>
//             <div className="row">
//                 <div className="col-md-8 offset-md-2">
//                     {showLoading()}
//                     {showSuccess()}
//                     {showError()}
//                     {newPostForm()}
//                 </div>
//             </div>
//         </Layout>
//     );
// };

export default AddProduct;