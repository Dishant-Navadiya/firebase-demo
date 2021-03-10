import React, { useState, useEffect, useContext } from "react";
import M from "materialize-css/dist/js/materialize";
import db from "../firebase/firebase";
import { ListContext } from "./Main";

const Form = (props) => {
  const [name, setName] = useState("");
  const [item, setItem] = useState([]);
  const [table, setTable] = useState([]);
  const [cold, setCold] = useState([]);
  const [extra, setExtra] = useState([]);
  const [orderTable, setOrderTable] = useState("");
  const [orderDhosa, setOrderDhosa] = useState([]);
  const [orderCold, setOrderCold] = useState([]);
  const [orderExtra, setOrderExtra] = useState([]);
  const [finalList, setFinalList] = useContext(ListContext);

  useEffect(() => {
    db.collection("Dhosa").onSnapshot((All) => {
      // setItem(All.docs.map((item) => item.data()));
      setItem(
        All.docs.map((item) => {
          return {
            Item_name: item.data().Item_name,
            Price: item.data().Price,
          };
        })
      );

      M.AutoInit();
    });
    db.collection("Table").onSnapshot((All) => {
      setTable(All.docs.map((item) => item.data()));
      M.AutoInit();
    });
    db.collection("Cold_Drinks").onSnapshot((All) => {
      setCold(All.docs.map((item) => item.data()));
      M.AutoInit();
    });
    db.collection("Extra").onSnapshot((All) => {
      setExtra(All.docs.map((item) => item.data()));
      M.AutoInit();
    });
  }, []);

  const handleDhosa = (event) => {
    // console.log([...event.target.selectedOptions].map((opt) => opt.value));
    setOrderDhosa([...event.target.selectedOptions].map((opt) => opt.value));
  };

  const handleTable = (event) => {
    setOrderTable(event.target.value);
  };

  const handleCold = (event) => {
    setOrderCold([...event.target.selectedOptions].map((opt) => opt.value));
  };

  const handleExtra = (event) => {
    setOrderExtra([...event.target.selectedOptions].map((opt) => opt.value));
  };

  const setOrder = (e) => {
    e.preventDefault();

    const getIteam = [];

    for (var i = 1; i < orderDhosa.length; i++) {
      getIteam.push({
        Item_name: orderDhosa[i].split("+")[0],
        Price: orderDhosa[i].split("+")[1],
        qty: 0,
        total: 0,
      });
    }

    for (var i = 1; i < orderCold.length; i++) {
      getIteam.push({
        Item_name: orderCold[i].split("+")[0],
        Price: orderCold[i].split("+")[1],
        qty: 0,
        total: 0,
      });
    }

    for (var i = 1; i < orderExtra.length; i++) {
      getIteam.push({
        Item_name: orderExtra[i].split("+")[0],
        Price: orderExtra[i].split("+")[1],
        qty: 0,
        total: 0,
      });
    }

    const customer = {
      customerName: name,
      tableNo: orderTable,
      date: Date(),
      items: getIteam,
    };
    // setFinalList((prv) => [...prv, customer]);
    setFinalList(customer);

    props.history.push("/orderfinal");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div class="col s12 m2 "></div>
        <div class="col s12 m8 ">
          <div className="card">
            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4">
                Take Order<i className="material-icons left">border_color</i>
              </span>
              <div className="divider"></div>
              <div className="container">
                <form autoComplete="off">
                  <div className="row">
                    <div class="col s12 m12">
                      <div class="input-field col s12 m12">
                        <input
                          id="Full_Name"
                          type="text"
                          class="validate"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <label for="Full_Name">Full Name</label>
                      </div>
                      <div className="center">
                        <h5>Select Food🍔</h5>
                      </div>
                      <div class="input-field col s12 m7">
                        <select multiple onChange={handleDhosa}>
                          <option value="" disabled selected>
                            -----
                          </option>

                          {item.map((single, index) => {
                            return (
                              <option
                                key={index}
                                value={`${single.Item_name}+${single.Price}`}
                                name={single.Item_name}
                                price={single.Price}
                              >
                                {single.Item_name} : Rs.{single.Price}
                              </option>
                            );
                          })}
                        </select>
                        <label>Select Dhosa</label>
                      </div>
                      <div class="input-field col s12 m5">
                        <select onChange={handleTable}>
                          <option value="" disabled selected>
                            ------
                          </option>
                          {table.map((single, index) => {
                            return (
                              <option key={index} value={`${single.Table_No}`}>
                                {single.Table_No}
                              </option>
                            );
                          })}
                        </select>
                        <label>Select Table.No</label>
                      </div>
                    </div>
                    <div class="col s12 m12">
                      <div className="row">
                        <div class="col s12 m6">
                          <div class="input-field col s12">
                            <select multiple onChange={handleCold}>
                              <option value="" disabled selected>
                                -----
                              </option>
                              {cold.map((single, index) => {
                                return (
                                  <option
                                    key={index}
                                    value={`${single.Item_name}+${single.Price}`}
                                  >
                                    {single.Item_name} : Rs.{single.Price}
                                  </option>
                                );
                              })}
                            </select>
                            <label>Select Cold Drinks</label>
                          </div>
                        </div>
                        {}
                        <div class="col s12 m6">
                          <div class="input-field col s12">
                            <select multiple onChange={handleExtra}>
                              <option value="" disabled selected>
                                -----
                              </option>
                              {extra.map((single, index) => {
                                return (
                                  <option
                                    key={index}
                                    value={`${single.Item_name}+${single.Price}`}
                                  >
                                    {single.Item_name} : Rs.{single.Price}
                                  </option>
                                );
                              })}
                            </select>
                            <label>Select Extra</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="center">
                      <button
                        type="button"
                        class="btn-floating btn-large waves-effect waves-purple purple lighten-1 pulse"
                        onClick={setOrder}
                      >
                        <i class="material-icons right">arrow_forward</i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="col s12 m2 "></div>
      </div>
    </div>
  );
};

export default Form;
