//! форма при добавлении фильма

import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { adminContext } from "../contexts/AdminContext";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const AddPage = () => {
  const schema = yup.object({
    name: yup
      .string()
      .min(3, "Минимальное количество символов 2")
      .max(30, "Максимальное количество символов 30")
      .required("Поле обязательно для заполнения"),

    image: yup
      .string()

      .required("Поле обязательно для заполнения"),
    link: yup
      .string()
      .min(3, "Минимальное количество символов 3")

      .required("Поле обязательно для заполнения"),
  });
  const { addMovie } = React.useContext(adminContext);
  const navigate = useNavigate();
  const handleSubmit = (movie) => {
    addMovie(movie);
    navigate("/admin");
  };
  return (
    <div className="add-page">
      <h2>add a movie</h2>
      <Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
          name: "",

          image: "",
          link: "",
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name of movie</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={values.name}
                error={!!errors.name && touched.name}
                helperText={touched.name ? errors.name : ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Image of movie</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={values.image}
                error={!!errors.image && touched.image}
                helperText={touched.image ? errors.image : ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Link of movie</Form.Label>
              <Form.Control
                type="text"
                name="link"
                value={values.link}
                error={!!errors.link && touched.link}
                helperText={touched.link ? errors.link : ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="danger" type="submit">
              add a movie
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddPage;
