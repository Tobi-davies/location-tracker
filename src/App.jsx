import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
// import MyDocument from "./components/pdf-page/pdf-page";
// import { PDFViewer } from "@react-pdf/renderer";
import { getDatabase, ref, set } from "firebase/database";
import { db } from "./utils/fire";

function App() {
  const [count, setCount] = useState(1);
  const [coordinates, setCoordinates] = useState({});

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos) {
    var crd = pos.coords;

    // console.log("Your current position is:");
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`More or less ${crd.accuracy} meters.`);

    setCoordinates({
      lat: crd.latitude,
      long: crd.longitude,
    });
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  // setInterval(
  //   navigator.geolocation.getCurrentPosition(success)
  //   result.onchange = function () {
  //     console.log(result.state);
  //   };
  //   ,2000
  // )

  console.log(coordinates);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            //If granted then you can directly call your function here
            setInterval(function () {
              console.log("calling");
              navigator.geolocation.getCurrentPosition(success);
            }, 3000);
            // navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      alert("Sorry Not available!");
    }
  }, []);

  const { lat, long } = coordinates;

  function writeUserData() {
    // const db = getDatabase();
    if (lat && long) {
      console.log("available");

      set(ref(db, "locations/" + "61"), {
        latitude: lat,
        longitude: long,
      });
    }
  }

  useEffect(() => {
    writeUserData();
  }, [coordinates]);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn mores
      </p>
      {/* <PDFViewer>
        <MyDocument />
      </PDFViewer> */}
    </div>
  );
}

export default App;
