import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import {Link} from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const getDetails = () => {
    axios
      .get("https://61e908277ced4a00172ff791.mockapi.io/users")
      .then((res) => setData(res.data));
  };

  useEffect(() => {
    getDetails();
  }, []);

  const handleDelete = (id) => {
    console.log("Delete Clicked");
    fetch("https://61e908277ced4a00172ff791.mockapi.io/users/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((users) => getDetails());
  };

  const handleUpdate = (id) => {
    fetch("https://61e908277ced4a00172ff791.mockapi.io/users/" + id)
      .then((res) => res.json())
      .then((users) => formik.setValues(users));
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      location: "",
      designation: "",
    },
    onSubmit: (values) => {
      console.log(values);
      if (values.id) {
        fetch(
          "https://61e908277ced4a00172ff791.mockapi.io/users/" + values.id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        )
          .then((res) => res.json())
          .then((users) => getDetails());
      } else {
        fetch("https://61e908277ced4a00172ff791.mockapi.io/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((res) => res.json())
          .then((users) => getDetails());
      }
      values.username = "";
      values.email = "";
      values.location = "";
      values.designation = "";
    },

    validate: (values) => {
      let errors = {};
      if (!values.username) {
        errors.username = "Username is Required";
      }
      if (!values.email) {
        errors.email = "Email is Required";
      }
      if (!values.location) {
        errors.location = "Location is Required";
      }
      if (!values.designation) {
        errors.designation = "Designation is Required";
      }
      return errors;
    },
  });
  return (
    <div className="d-lg-flex flex-column mt-3">
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className="row">
          <div className="col">
            <label htmlFor="username">UserName</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              className="form-control"
              placeholder="Please enter your username..."
            />
            {formik.errors.username ? (
              <div style={{ color: "red" }}>{formik.errors.username}</div>
            ) : null}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="form-control"
              placeholder="Please enter your email..."
            />
            {formik.errors.email ? (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            ) : null}
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              id="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              className="form-control"
              placeholder="Please enter your location..."
            />
            {formik.errors.location ? (
              <div style={{ color: "red" }}>{formik.errors.location}</div>
            ) : null}
            <label htmlFor="designation">Designation</label>
            <input
              type="text"
              name="designation"
              id="designation"
              value={formik.values.designation}
              onChange={formik.handleChange}
              className="form-control"
              placeholder="Please enter your designation..."
            />
            {formik.errors.designation ? (
              <div style={{ color: "red" }}>{formik.errors.designation}</div>
            ) : null}
          </div>
        </div>
        <div className="mt-3">
          <center>
            <input type="submit" value="Submit" className="btn btn-success" />
          </center>
        </div>
      </form>
      <div className="mt-3">
        {data.map((item, index) => {
          return (
            <div className="card mt-3 border-dark">
              <div className="card-body" key={item.id}>
                <h6>{index + 1}</h6>
                <div className="row">
                  <h6>
                    <b>UserName:</b> {item.username}
                  </h6>
                  <h6>
                    <b>Email:</b> {item.email}
                  </h6>

                  <h6>
                    <b>Location:</b> {item.location}
                  </h6>
                  <h6>
                    <b>Designation:</b> {item.designation}
                  </h6>
                </div>

                <h6>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                  <Link to="edit-user"><button
                    className="btn btn-success"
                    type="button"
                    onClick={() => handleUpdate(item.id)}
                  >
                    Edit
                  </button></Link>
                </h6>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
