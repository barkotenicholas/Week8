import React, { useEffect } from "react";
import styles from "./Single.module.css";
import { FaCartPlus } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getTotals } from "../../redux/features/cartSlice";
import { addToFirebaseCart } from "../../redux/features/cartSlice";

import {
  deleteProduct,
  fetchProducts,
} from "../../redux/features/ProductSlice";
import {
  getAllCartItems,
  getCartStatus,
  fetchAllCart,
} from "../../redux/features/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SingleProduct = ({ product }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login.user);
  const userid = user.id;

  const cartStatus = useSelector(getCartStatus);

  useEffect(() => {
    if (cartStatus === "idle") {
      dispatch(fetchAllCart(user.id));
      dispatch(getTotals())
    }
  });
  const cartItems = useSelector(getAllCartItems);
  const handleClick = () => {
    
    const item = cartItems.findIndex((item) => item.product_id === product.id);
    console.log(item);
    if (item >= 0) {
      toast.info("Product already added to cart", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const newcartItem = {
        uid: userid,
        quantity: 1,
        pid: product.id,
        pname: product.name,
        pdesc: product.decription,
        pprice: product.price,
        pdiscount: product.discount,
        imageurl:product.imageurl
      };
      dispatch(addToFirebaseCart(newcartItem));
      dispatch(getTotals());
      toast.success("Added to cart", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleDelete = () => {
    console.log("Product id "+product.id);
    dispatch(deleteProduct(product.id));
    dispatch(fetchProducts());
    dispatch(getTotals())
  };
  return (
    <div className={styles.card}>
      <div className={styles.cardmedia}>
        <img
          className={styles.cardimg}
          src={product.imageurl}
          alt={product.title}
        />
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{product.name}</p>
        <p className={styles.body}>{product.decription}</p>
        <p className={styles.price}>{product.price} $</p>
      </div>
      <div className={styles.cardfooter}>
        <FaCartPlus
          onClick={handleClick}
          className={styles.carticon}
          size={20}
        />
      </div>
      <FaTrashAlt className={styles.delete} size={30} onClick={handleDelete} />
    </div>
  );
};

export default SingleProduct;
