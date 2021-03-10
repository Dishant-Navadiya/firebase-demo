import React, { useState, useEffect } from "react";
import db from "../firebase/firebase";
import firebase from "firebase";
const pointerCursor = {
  starsCss: {
    cursor: "pointer",
    color: "#ffc107 ",
  },
  show: {
    color: "#ffc107 ",
  },
};

const Feedback = () => {
  const [review, setReview] = useState("");
  const [ratings, setRating] = useState(0);
  const [name, setName] = useState("");
  const [stars, setStars] = useState([
    { num: 1, status: false },
    { num: 2, status: false },
    { num: 3, status: false },
    { num: 4, status: false },
    { num: 5, status: false },
  ]);
  const [allReview, setAllReview] = useState([]);

  useEffect(() => {
    db.collection("review")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) => {
        setAllReview(snapshot.docs.map((single) => single.data()));
      });
  }, []);

  const handleReview = (event) => {
    setReview(event.target.value);
  };
  const handleStar = (number) => {
    setRating(number);
    stars.filter((single) =>
      single.num <= number ? (single.status = true) : (single.status = false)
    );
  };
  const sendData = (event) => {
    event.preventDefault();
    if (review === "" || ratings === 0 || name === "") {
      alert("Give proper review and ratings");
    } else {
      db.collection("review")
        .add({
          name,
          review,
          ratings,
          timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((data) => {
          if (data.id) {
            setName("");
            setReview("");
            setRating(0);
            stars.filter((star) =>
              star.status ? (star.status = false) : (star.status = false)
            );
          }
        })
        .catch((err) => console.log("err", err));
    }
  };
  const printReview = (n) => {
    let arr = new Array(5);
    arr.fill(false);
    for (let i = 0; i < n; i++) {
      arr[i] = true;
    }
    return arr;
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col m12 s12 center">
          <h4>How much do you like..? Please share with us📝</h4>
          <div className="divider"></div>
        </div>
      </div>
      <div className="row">
        <div className="col m2 s12"></div>
        <div className="col m8 s12">
          <div className="card ">
            <div className="card-content ">
              <span className="card-title center">Review</span>
              <form onSubmit={sendData} autoComplete="off">
                <div className="container">
                  <div class="input-field">
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="name">Enter name</label>
                  </div>
                  <div class="input-field">
                    <textarea
                      value={review}
                      onChange={handleReview}
                      placeholder="Type something...."
                      class="materialize-textarea"
                    ></textarea>
                  </div>
                  <div className="center">
                    {stars.map((star) => {
                      return star.status ? (
                        <i
                          className="material-icons"
                          style={pointerCursor.starsCss}
                          key={star.num}
                          onClick={() => handleStar(star.num)}
                        >
                          star
                        </i>
                      ) : (
                        <i
                          className="material-icons"
                          style={pointerCursor.starsCss}
                          key={star.num}
                          onClick={() => handleStar(star.num)}
                        >
                          star_border
                        </i>
                      );
                    })}
                  </div>
                  <div className="center">
                    <button className="btn-small purple" type="submit">
                      Give⭐
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col m2 s12"></div>
      </div>
      <div className="row">
        <div className="col m12 s12">
          <div className="row">
            {allReview.map((single) => {
              return (
                <div className="col m12 s12">
                  <div className="divider"></div>
                  <h4>
                    {single.name}
                    {printReview(single.ratings).map((e) =>
                      e ? (
                        <i
                          className="material-icons"
                          style={pointerCursor.show}
                        >
                          star
                        </i>
                      ) : (
                        <i
                          className="material-icons"
                          style={pointerCursor.show}
                        >
                          star_border
                        </i>
                      )
                    )}
                  </h4>
                  <p>{single.review}</p>
                  <div className="divider"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
