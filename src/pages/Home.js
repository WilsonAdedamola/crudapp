import React, { useEffect, useState } from "react";
import fireDb from "../firebase";
import "./Home.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [sort, setSort] = useState(false);

  useEffect(() => {
    fireDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
    return () => {
      setData({});
    };
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      fireDb.child(`contacts/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Contact deleted successfully");
        }
      });
    }
  };

  const handleChange = (e) => {
    setSort(true);
    fireDb
      .child("contacts")
      .orderByChild(`${e.target.value}`)
      .on("value", (snapshot) => {
        let sortedData = [];
        snapshot.forEach((snap) => {
          sortedData.push(snap.val());
        });
        setSortedData(sortedData);
      });
  };

  const handleReset = () => {
    setSort(false);
  };

  return (
    <>
      <div style={{ marginTop: "100px" }} className="scroll">
        <table className="table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No.</th>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>Email</th>
              <th style={{ textAlign: "center" }}>Number</th>
              {!sort && <th style={{ textAlign: "center" }}>Actions</th>}
            </tr>
          </thead>
          {!sort && (
            <tbody>
              {Object.keys(data).map((id, index) => {
                return (
                  <tr key={id}>
                    <th scope="row">{index + 1}</th>
                    <td>{data[id].name}</td>
                    <td>{data[id].email}</td>
                    <td>{data[id].contact}</td>
                    <td>
                      <Link to={`/view/${id}`}>
                        <button className="btn view">View</button>
                      </Link>
                      <Link to={`/update/${id}`}>
                        <button className="btn edit">Edit</button>
                      </Link>
                      <button
                        className="btn delete"
                        onClick={() => handleDelete(id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
          {sort && (
            <tbody>
              {sortedData.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.contact}</td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
      <label>Sort by:</label>
      <select name="colValue" className="dropdown" onChange={handleChange}>
        <option>Please select</option>
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="contact">Number</option>
        {/* <option value="status">Status</option> */}
      </select>
      <button className=" btn reset" onClick={handleReset}>
        Reset
      </button>
      <br />
      <a href="https://twitter.com/wildam_wildam" target="blank" className="prog">wilsonAdedamola</a>
    </>
  );
};

export default Home;
