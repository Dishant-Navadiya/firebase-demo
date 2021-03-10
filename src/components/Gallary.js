import React, { useState, useEffect } from "react";
import db from "../firebase/firebase";
import firebase from "firebase";
import M from "materialize-css/dist/js/materialize";

const styles = {
  per:{
    margin:0
  }
}
const Gallary = () => {
  const [file, setFile] = useState([]);
  const [selected, setSelected] = useState(false);
  const [prograss, setPrograss] = useState(0);
  const [show, setShow] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    db.collection("Photos").onSnapshot((snapshot) => {
      setPhotos(
        snapshot.docs.map((singleUrl) => {
          return {
            id: singleUrl.id,
            photo: singleUrl.data().photo,
          };
        })
      );
    });
  }, []);

  const handleFile = (e) => {
    if (
      e.target.files[0].name.split(".")[1] === "jpeg" ||
      e.target.files[0].name.split(".")[1] === "jpg" ||
      e.target.files[0].name.split(".")[1] === "png"
    ) {
      setFile(e.target.files[0]);
      setSelected(true);
    } else {
      alert("Please select Image");
    }
  };

  const uploadPhoto = () => {
    setShow(true);
    const storageRef = firebase.storage().ref("image/" + file.name);

    let task = storageRef.put(file);
    task.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      async (snapshot) => {
        setPrograss(
          Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        );
        if (snapshot.bytesTransferred === snapshot.totalBytes) {
          setShow(false);
          setSelected(false);
          M.toast({ html: "Upload successfully" });
        }
      },
      (err) => {
        console.log(err);
      },
      async () => {
        db.collection("Photos").add({
          photo: await storageRef.getDownloadURL(),
        });
      }
    );
  };

  return (
    <div className="container">
      <div className="row ">
        <div className="col m3 s12"></div>
        <div className="col m4 s12">
          <div class="file-field input-field">
            <div class="btn waves-effect waves-grey  grey lighten-2 black-text">
              <i class="material-icons right">add_a_photo</i>
              <span>Select</span>

              <input type="file" id="photo" onChange={handleFile} />
            </div>
            {selected && (
              <div>
                <i class="material-icons">check</i> Selected
              </div>
            )}
          </div>
        </div>
        <div className="col m3 s12" style={{ marginTop: "15px" }}>
          <button
            type="button"
            className="waves-effect waves-black btn grey darken-3"
            onClick={uploadPhoto}
          >
            Upload
          </button>
        </div>
        <div className="col m2 s12"></div>
        {show && (
          <div className="row">
            <div className="col m12 s12">
              <h6 style={styles.per} className="col m1 s6">
                {prograss}%
                </h6>
              <div class="progress col m11 s6">
            
                <div
                  class="determinate"
                  style={{ width: `${prograss}%` }}
                ></div>
              </div>
            </div>
          </div>
        )} 

        <div className="row">
          <div className="col m12 s12 center">
            <h4>Our photos📷</h4>
            <div className="divider"></div>
          </div>
        </div>
        <div className="row">
          <div className="col m12 s12">
            {photos.map((singlePhoto, index) => {
              return (
                <div key={index} className="col m4 s6">
                  <img
                    className="responsive-img"
                    src={singlePhoto.photo}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Gallary;
