import "./App.css";
import { Dogs } from "./components/Dogs";
import { Viewed } from "./components/Viewed";
import { BanList } from "./components/Banned";
import { useState } from "react";
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [dogs, setDogs] = useState([]);
  const [viewed, setViewed] = useState([]);
  const [banList, setBanList] = useState([]);

  const callAPI = async () => {
    const response = await fetch(
      `https://api.thedogapi.com/v1/images/search?api_key=${ACCESS_KEY}&has_breeds=true`
    );
    const data = await response.json();
    return data;
  };

  const checkInfo = (data) => {
    return data.filter((dog) => {
      return !banList.includes(
        banList.find((ban) => {
          return (
            dog.breeds[0].name === ban ||
            dog.breeds[0].weight.metric === ban ||
            dog.breeds[0].breed_group === ban ||
            dog.breeds[0].life_span === ban
          );
        })
      );
    });
  };
  const getDog = async () => {
    let dogsCheck;
  
    try {
      const data = await callAPI();
  
      dogsCheck = checkInfo(data); 
  
      if (dogsCheck.length > 0) {
        setViewed([...viewed, dogsCheck[0]]);
        return dogsCheck;
      }
  
    } catch (error) {
      console.log(error);
    }
  
    if (!dogsCheck || dogsCheck.length === 0) {
      return getDog(); 
    }
  
    return dogsCheck;
  };
  return (
    <>
      <div className="App">
        <Viewed viewed={viewed} />
        <Dogs
          dogs={dogs}
          banList={banList}
          setBanList={setBanList}
          setViewed={setViewed}
          getDog={getDog}
          setDogs={setDogs}
        />
        <BanList ban={banList} setBanList={setBanList} />
      </div>
    </>
  );
}

export default App;