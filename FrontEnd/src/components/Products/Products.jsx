import React, { useEffect, useState } from "react";
import { IoBagAddSharp } from "react-icons/io5";
import AddProduct from "./AddProduct";
import styles from "./product.module.css";
import { useSelector, useDispatch } from "react-redux";
import ReactLoading from "react-loading";
import { clearMessage } from "../../redux/features/messageSlice";
import {
  getAllProducts,
  getProductsStatus,
  getProductsError,
  fetchProducts,
} from "../../redux/features/ProductSlice";
import { ToastContainer, toast } from "react-toastify";

import SingleProduct from "./SingleProduct";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productsStaus = useSelector(getProductsStatus);
  const error = useSelector(getProductsError);
  const productsDetails = useSelector(getAllProducts);

  const user = useSelector((state) => state.login.user);

  const { message } = useSelector((state) => state.message);

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    dispatch(fetchProducts());
  };
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  if(message === 'jwt expired'){
    sessionStorage.removeItem('user')
    navigate('/')
  }
  useEffect(() => {
    if (productsStaus === "idle") {
      dispatch(fetchProducts(user.token)).then(()=>{

      }).catch(err=>{
        console.log(err);
      })
 
    }
  });

  let content;
  if (productsStaus === "loading") {
    content = (
      <div className={styles.loading}>
        <ReactLoading
          type="spin"
          color="#0000FF"
          height={100}
          width={100}
          className={styles.loading}
        />
      </div>
    );
  } else if (productsStaus === "succeed") {
    if (productsDetails.length !== 0) {
      content = productsDetails.map((product) => (
        <SingleProduct
          key={product.id}
          product={product}
          className={styles.center}
        />
      ));
    } else {
      content = <p className={styles.center}> There are no Products</p>;
    }
  } else if (productsStaus === "failed") {
    content = <p>{error}</p>;
  }

  return (
    <>
      <div className={styles.head}>
        <button className={styles.addbtn} onClick={() => setIsOpen(true)}>
          <IoBagAddSharp />
          Add Product
        </button>
      </div>
      <div className={styles.allproducts}>
        <div>{content}</div>
      </div>
      {isOpen && <AddProduct setIsOpen={setIsOpen} handleClose={handleClose} />}
      <ToastContainer />
    </>
  );
};

export default Products;
