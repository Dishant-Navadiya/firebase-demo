import React, { useState, useContext, useEffect } from "react";
import { ListContext } from "./Main";
import M from "materialize-css/dist/js/materialize";

const styles ={
  lableRight:{
    float:"right"
  }
}

const Order = () => {
  const [finalList, setFinalList] = useContext(ListContext);
  const [orderDetails, setOrderDetails] = useState([]);

  // console.log(finalList);
  useEffect(() => {
    finalList &&
      setOrderDetails(
        finalList.items.map((single) => {
          return {
            itemName: single.Item_name,
            price: single.Price,
            qty: 0,
             total: 0,
          };
        })
      );
    M.AutoInit();
  }, []);

  const setQty = (e, name) => {
    const qty= e.target.value !== "" ? parseInt(e.target.value) : 0
    const temp=orderDetails.map((each)=>{
      if(each.itemName===name){
        each.total=each.price*qty
        each.qty=qty
      }
      return each
    })
    setOrderDetails(temp)
  };

  return finalList && (
    <div className="container">
      <div className="row">
        <div className="col m1 s12"></div>
        <div className="col m10 s12">
          <div className="card">
            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4">
                bill<i className="material-icons left">border_color</i>
               <label style={styles.lableRight}>Table No:{finalList.tableNo}</label> 
              </span>
              <div className="divider"></div>
              <div className="container-fluid">
                <div className="row">
                  <div className="col m12 s12 center">
  <h5>{finalList.customerName}</h5>
                  </div>
                  <div className="col m12 s12 center">
                    <label>
                      {new Date(
                        finalList.date
                      ).toLocaleString()}
                    </label>
                  </div>
                  <div className="col m12 s12">
                    <table>
                      <thead>
                        <tr>
                          <th>Item Name</th>
                          <th>Item Price</th>
                          <th>qty</th>
                      <th>Total<label style={styles.lableRight}>{orderDetails.length >0 && orderDetails.reduce((p,c)=>p.total+c.total)}</label></th>
                        </tr>
                      </thead>

                      <tbody>
                        {orderDetails &&
                          orderDetails.map((singleItem) => {
                            return (
                              <tr>
                                <td>{singleItem.itemName}</td>
                                <td>Rs.{singleItem.price}</td>
                                <td>
                                  <input
                                    type="number"
                                    min="0"
                                    max="8"
                                    name="qty"
                                    placeholder="Enter qty.."
                                    onChange={(e) =>
                                      setQty(e, singleItem.itemName)
                                    }
                                  />
                                </td>

                                <td>Rs.{singleItem.total}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col m1 s12"></div>
      </div>
    </div>
  );
};

export default Order;
