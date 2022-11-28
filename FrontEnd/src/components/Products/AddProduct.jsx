import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, fetchProducts } from "../../redux/features/ProductSlice";
import { v4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearMessage, setMessage } from "../../redux/features/messageSlice";

const AddProduct = ({ setIsOpen, handleClose }) => {
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const initialValues = {
    id: getRandomId(),
    name: "",
    description: "",
    imageurl: "",
    price: null,
    discount: null,
  };
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  console.log(message);
  const [formValues, setFormValues] = useState(initialValues);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormValues({
      ...formValues,
    });
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      dispatch(addProduct(formValues));
      dispatch(fetchProducts());
      toast.info("Added product successfully", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handleClose();
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.title = "Title is required";
    }
    if (!values.description) {
      errors.description = "Description is required";
    }
    if (!values.price) {
      errors.price = "Price is required";
    }
    if (!values.discount) {
      errors.discount = "Discount is required";
    }
    if (!values.imageurl) {
      errors.discount = "Discount is required";
    }

    return errors;
  };
  function getRandomId() {
    return v4();
  }
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Add Product</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            <form className={styles.formList} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label>Title:</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter title"
                  value={formValues.name}
                  onChange={handleChange}
                />
              </div>
              <p className={styles.err}>{formErrors.title}</p>
              <div className={styles.field}>
                <label>Image Url:</label>
                <input
                  type="text"
                  name="imageurl"
                  placeholder="Enter Image Url"
                  value={formValues.imageurl}
                  onChange={handleChange}
                />
              </div>
              <p className={styles.err}>{formErrors.imageurl}</p>
              <div className={styles.field}>
                <label>Description:</label>
                <input
                  type="text"
                  name="description"
                  placeholder="Enter Description"
                  value={formValues.description}
                  onChange={handleChange}
                />
              </div>
              <p className={styles.err}>{formErrors.description}</p>
              <div className={styles.field}>
                <label>Discount:</label>
                <input
                  type="number"
                  name="discount"
                  placeholder="Enter Discount"
                  value={formValues.discount}
                  onChange={handleChange}
                />
              </div>
              <p className={styles.err}>{formErrors.discount}</p>
              <div className={styles.field}>
                <label>price:</label>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  value={formValues.price}
                  onChange={handleChange}
                />
              </div>
              <p className={styles.err}>{formErrors.price}</p>

              <button className={styles.addBtn} onClick={() => handleSubmit}>
                Submit
              </button>
            </form>
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button
                className={styles.deleteBtn}
                onClick={() => setIsOpen(false)}
              >
                Delete
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default AddProduct;
