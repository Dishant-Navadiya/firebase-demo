import React, { useState, useEffect } from "react";
import db from "../firebase/firebase";
import M from "materialize-css/dist/js/materialize";

const AddDhosa = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [dhosa, setDhosa] = useState([]);
  useEffect(() => {
    db.collection("Dhosa").onSnapshot((snapshot) => {
      setDhosa(
        snapshot.docs.map((singleDoc) => {
          return {
            id: singleDoc.id,
            data: singleDoc.data(),
          };
        })
      );
    });
  }, []);

  const handleData = (event) => {
    event.preventDefault();
    if (name === "" || price === "") {
      alert("Enter valid input.");
    } else {
      db.collection("Dhosa").add({
        Item_name: name,
        Price: parseInt(price),
      });
      setName("");
      setPrice("");
      M.toast({ html: "Added successfully" });
    }
  };

  const handleDelete = (e, id) => {
    db.collection("Dhosa")
      .doc(id)
      .delete()
      .then(M.toast({ html: "Deleted successfully" }));
  };
  return (
    <div className="container">
      <div className="row">
        <div class="col s12 m1"></div>
        <div class="col s12 m10 ">
          <div className="card">
            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4">
                Add Dhosa<i className="material-icons left">border_color</i>
              </span>
              <div className="divider"></div>
              <div className="container">
                <form onSubmit={handleData}>
                  <div className="row">
                    <div class="col s12 m12">
                      <div class="input-field col s9 m9">
                        <input
                          id="dhosa"
                          type="text"
                          class="validate"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="dhosa">Dhosa Name</label>
                      </div>
                      <div class="input-field col s3 m3">
                        <input
                          id="price"
                          type="text"
                          class="validate"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                        <label htmlFor="price">Price</label>
                      </div>
                    </div>
                    <div className="center">
                      <button
                        type="submit"
                        className="btn-floating waves-effect waves-purple purple lighten-1"
                      >
                        <i class="material-icons right">add</i>
                      </button>
                    </div>

                    <div class="col s12 m12">
                      <div className="row">
                        <table className="highlight">
                          <thead>
                            <tr>
                              <th>Item Name</th>
                              <th>Rs.</th>
                              <th>Delete</th>
                            </tr>
                          </thead>

                          <tbody>
                            {dhosa.map((single, index) => {
                              return (
                                <tr key={index}>
                                  <td>{single.data.Item_name}</td>
                                  <td>Rs.{single.data.Price}</td>
                                  <td>
                                    <i
                                      className="material-icons"
                                      onClick={(e) =>
                                        handleDelete(e, single.id)
                                      }
                                      style={{ cursor: "pointer" }}
                                    >
                                      delete
                                    </i>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="col s12 m1"></div>
      </div>
    </div>
  );
};
export default AddDhosa;
