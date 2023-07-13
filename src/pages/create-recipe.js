import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Menu from "../images/Menu.jpg";

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/recipes",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="create-recipe"
      style={{
        backgroundImage: `url(${
          process.env.PUBLIC_URL +
          "https://i.pinimg.com/originals/b2/36/e1/b236e1a66a14aaf0e6c52d5af24939ef.jpg"
        })`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
        height: "560px",
        marginTop: "1px",
      }}
    >

      <form
        onSubmit={handleSubmit}
        
      >
        <div style={{
          width: "1600px",
          // color: "white",
          marginTop: "20px",
          marginLeft: "100px",
          display:"grid",
          gridTemplateColumns:"auto auto"
        }}>
        <div style={{ display: "flex", marginBottom: "35px", width:"400px" }}>
          <label
            style={{
              marginLeft: "45px",
              marginRight: "58px",
              marginTop: "4px",
              fontSize: "30px",
              width: "80px",
            }}
            htmlFor="name"
          >
            Name
          </label>
          <input
            style={{ marginTop: "5px", width:"300px", marginLeft:"20px" }}
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: "flex", marginBottom: "25px", marginLeft:"10px", marginRight:"320px" }}>
          <label
            style={{ marginLeft: "2px", marginTop: "8px", fontSize: "20px" }}
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            style={{ marginLeft: "60px", marginTop: "5px", height:"36px" }}
            rows="1"
            cols="25"
            id="description"
            name="description"
            value={recipe.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div style={{ display: "flex", marginBottom: "25px", width:"400px", marginTop:"50px"}}>
          <label
            style={{
              marginLeft: "34px",
              marginRight: "78px",
              marginTop: "4px",
              fontSize: "30px",
              width: "60px",
            }}
            htmlFor="ingredients"
          >
            Ingredients
          </label>
          {recipe.ingredients.map((ingredient, index) => (
            <input
              style={{ marginTop: "20px", width:"600px"  }}
              key={index}
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, index)}
            />
          ))}

          <button type="button" style={{height:"36px"}} onClick={handleAddIngredient}>
            Add Ingredient
          </button>
        </div>
        <div style={{ display: "flex", marginBottom: "25px" }}>
          <label
            style={{
              marginLeft: "13px",
              marginRight: "78px",
              marginTop: "15px",
              fontSize: "30px",
              width: "60px",
            }}
            htmlFor="instructions"
          >
            Instructions
          </label>
          <textarea
            style={{ marginTop: "10px", height:"36px", marginLeft:"28px" }}
            rows="1"
            cols="25"
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
          ></textarea>
        </div>

        <div style={{ display: "flex", marginBottom: "25px", marginTop:"50px" }}>
          <label
            style={{
              marginLeft: "38px",
              marginTop: "4px",
              fontSize: "30px",
              width: "full",
              display: "flex",
              height: "20px",
            }}
            htmlFor="imageUrl"
          >
            Image URL
          </label>
          <input
            style={{ marginTop: "10px",marginLeft: "18px", height:"22px" }}
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={recipe.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: "flex", marginBottom: "10px" }}>
          <label
            style={{
              marginLeft: "20px",
              marginRight: "78px",
              marginTop: "4px",
              fontSize: "20px",
              width: "60px",
              height: "20px",
            }}
            htmlFor="cookingTime"
          >
            Cooking Time (minutes)
          </label>
          <input
            style={{ marginTop: "10px", marginLeft:"20px" }}
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
          />
        </div>
        </div>
        <button className=" animate-bounce"
          style={{
            marginLeft: "1200px",
            marginTop: "140px",
            paddingLeft: "60px",
            fontSize: "20px",
            width: "240px",
            display: "flex",
  
          }}
          type="submit"
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
};
