import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3002/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3002/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);
  //backgroundImage: `url(${process.env.PUBLIC_URL + "https://i5.walmartimages.com/asr/989b5dee-e5eb-46cd-95fb-b3569be3554c_1.1e0f7eeaa52c3584b91c8affe970cfc4.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff"})`,backgroundSize:"cover", backgroundRepeat:"no-repeat", width:"1120px", height:"640px"
  return (
    <div
      style={{
        border: "2px solid blue",
        padding: "50px",
        backgroundImage: `url(${
          process.env.PUBLIC_URL +
          "https://th.bing.com/th/id/OIP.a2At_Uhpyjs0vgTuywTNmAHaHa?pid=ImgDet&rs=1"
        })`,
        backgroundSize: "contain",
        // backgroundRepeat: "no-repeat",
        width: "1420px",
        height: "100%",
        backgroundAttachment: "scroll",
      }}
    >
      <h1 className="Heading font-bold items-center text-xl ml-{10px}  " style={{marginLeft:"400px", marginBottom:"20px"}}>All Made Recipes</h1>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto",
          // backgroundColor: "black",
          width: "1200px",
          height: "100%",
          columnGap: "0px",
          rowGap: "0px",
          marginLeft: "60px",
        }}
      >
        {recipes?.map((recipe) => (
          <li key={recipe._id}>
            <div style={{ height: "250px",border:"1px solid black", backgroundColor: "blanchedalmond"}}>
              <button className="animate-bounce"
                style={{
                  paddingBottom:"5px",
                  width: "60px",
                  height: "30px",
                  backgroundColor: "red",
                  color: "white",
                  marginBottom: "10px",
                  position: "absolute",
                  // top:"100%",
                  marginLeft: "220px",
                  marginTop: "10px",
                  zIndex: "10",
                }}
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                style={{
                  height: "200px",
                  width: "300px",
                  marginBottom: "2px",
                  position: "relative",
                }}
              />

              <div
                style={{
                  display: "block",
                  // backgroundColor: "white",
                  marginBottom: "2px",
                  height: "70px",
                }}
              >
                <h2 className="Heading items-center">{recipe.name.toUpperCase()}</h2>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
