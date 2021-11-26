import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import * as yup from "yup";

import { Button, Form } from "react-bootstrap";

import { adminContext } from "../contexts/AdminContext";
import { Formik } from "formik";

const EditPage = () => {
  const schema = yup.object({
    name: yup
      .string()
      .min(3, "Минимальное количество символов 2")
      .max(30, "Максимальное количество символов 30")
      .required("Поле обязательно для заполнения"),
    image: yup.string().required("Поле обязательно для заполнения"),
    link: yup
      .string()
      .min(3, "Минимальное количество символов 3")
      .required("Поле обязательно для заполнения"),
  });

  const params = useParams();
  const { getMovieToEdit, movieToEdit, saveEditedMovie } =
    useContext(adminContext);

  useEffect(() => {
    getMovieToEdit(params.id);
  }, []);
  const navigate = useNavigate();

  return (
    <div className="edit-page">
      <h2>edit movie</h2>

      {movieToEdit ? (
        <Formik
          validationSchema={schema}
          onSubmit={(editedMovie) => {
            saveEditedMovie(editedMovie);
            navigate("/admin");
          }}
          initialValues={movieToEdit}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
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

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
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
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Category of movie</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  type="text"
                  name="category"
                  value={values.category}
                  error={!!errors.category && touched.category}
                  helperText={touched.category ? errors.category : ""}
                  onChange={handleChange}
                >
                  <option>Chose movie category</option>
                  <option value="horror">Horror</option>
                  <option value="comedy">Comedy</option>
                  <option value="fantasy">Fantasy</option>

                  <option value="drama">Dramas</option>
                </Form.Select>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
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
                submit changes
              </Button>
            </form>
          )}
        </Formik>
      ) : (
        <h2>loading...</h2>
      )}
    </div>
  );
};

export default EditPage;
