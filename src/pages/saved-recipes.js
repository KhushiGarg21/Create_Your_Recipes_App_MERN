import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
// import homeImg from "../images/homeImg.jpg";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://create-your-recipes-app-mern-backend.vercel.app/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);
  return (
    <div
      style={{
        border: "2px solid blue",
        padding: "50px",
        backgroundImage: `url(${
          process.env.PUBLIC_URL +
          "https://media.istockphoto.com/id/1188111184/vector/abstract-3d-polygonal-pattern-luxury-dark-blue-with-gold-background.jpg?s=612x612&w=0&k=20&c=Rl4znmfp1_P9zIDHWyaF8Y7zj4XAvLdX6sPL2zfsUgs="
        })`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
      }}
    >
      <div>
        <h1
          className="Heading font-bold"
          style={{ marginLeft: "50px", marginBottom: "20px", fontSize:"28px" }}
        >
          {" "}
          Your Saved Recipes
        </h1>
        <ul style={{ display: "grid",gridTemplateColumns:"auto auto",rowGap:4, width: "600px", height: "100%" }}>
          {savedRecipes?.map((recipe) => (
            <li key={recipe._id}>
              <div
                className="cursor-pointer shadow-md shadow-gray-600 rounded-lg h-full relative hover:opacity:0"
                style={{
                  height: "400px",
                  width: "480px",
                  marginLeft: "155px",
                  border: "2px solid white",
                }}
              >
                <img
                  // className="rounded-[20px] z-10 h-full w-[480px] p-2"
                  className="rainbow"
                  src={recipe.imageUrl}
                  alt={recipe.name}
                />

                <div
                  
                  className={`opacity-0 hover:opacity-100 absolute inset-0 z-20 text-center rounded-lg block text-1xl text-white font-bold align-items-center bg-black border-2`}
                >
                  {recipe.name.toUpperCase()}
                  {/* {recipe.ingredients} */}
                  <p className="block">{recipe.description}</p>
                  <p className="m-[265px] ml-[140px] flex w-full">Cooking Time: {recipe.cookingTime} minutes</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
