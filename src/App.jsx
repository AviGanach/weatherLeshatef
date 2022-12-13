import { useEffect, useState } from "react";
import leshatefLogo from "./images/leshatef.png.png";
import jbhLogo from "./images/jbh.jpg";
import getWeatherByFile from "./api";
import "./App.css";
import Papa from "papaparse";
import { CSVLink, CSVDownload } from "react-csv";

function App() {
  // CSVLinkמשתנה שאחראי להסתרת הקומפוננטה
  let [bool, setBool] = useState(false);
  // מחזיק את הקובץ שנבחר אחר המרתו
  let [file, setFile] = useState([]);
  //מחזיק את הקובץ החדש
  let [newFile, setNewFile] = useState();

  //פוקציה שלוקחת קובץ שנבחר וממירה אותו למערך של אובייקטים
  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log(results.data);
        setFile(results.data);
      },
    });
  };

  //מאזין לשינויי ב 'קובץ'ו
  useEffect(() => {
    file.map((item) =>
      // קורא לפונקציה עם שם עיר
      getWeatherByFile(item.city).then((data) => {
        //מסיף למערך האובייקטים את המאפיינים שהתבקשתי להוסיף
        for (const key in data) {
          if (key == "clouds") {
            item.clouds = data[key].all;
          }
          if (key == "main") {
            item.temp = data[key].temp;
          }
          if (key == "wind") {
            item.wind_speed = data[key].speed;
          }
        }
        setBool(true);
      })
    );
  }, [file]);
//מאזין לשינויי בבוליני 
  useEffect(() => {
  // שם ב'קובץ החדש' את את הקובץ המלא
   setTimeout(() => {
    setNewFile(file)
   }, 1500)
  }, [bool]);

  return (
    <div className="App">
      <div>
        <a href="https://www.leshatefatzmenu.com/" target="_blank">
          <img src={leshatefLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="http://www.avratech.org.il/?lang=he" target="_blank">
          <img src={jbhLogo} className="logo react" alt="leshatef logo" />
        </a>
      </div>
      <h1>wether</h1>
      <div className="card">
        <label>
          Select csv file to upload
          <input type="file" accept=".csv" onChange={changeHandler} />
        </label>
      </div>
      <p className="read-the-docs">
        Click on the Leshatef and JBH logos to learn more
      </p>
      {/* קומפוננתה לינק להורדת הקובץ החדש */}
      {bool && <CSVLink data={newFile}>Download me</CSVLink>}
      {/* <CSVDownload data={file} target="_blank" /> */}
    </div>
  );
}

export default App;
