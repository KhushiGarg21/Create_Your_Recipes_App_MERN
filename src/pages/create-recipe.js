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
        "https://create-your-recipes-app-mern-backend.vercel.app/recipes",
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
          "https://images.orientbell.com/media/catalog/product/cache/b9393dc52362842095b7f55239e9b36f/b/d/bdw_texus_brown.jpg"
        })`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
        height: "610px",
        marginTop: "1px",
      }}
    >
      <form onSubmit={handleSubmit} className="">
        <h1 className="font-extrabold animate-bounce text-center text-2xl mt-6">
          Submit Your Recipe
        </h1>
        <p
          className="Heading p-3 text-xl rounded-2xl"
          style={{ marginLeft: "580px", width: "360px" }}
        >
          We might feature it on our instagram!{" "}
        </p>

        <div
          style={{
            backgroundColor: "white",
            width: "900px",
            color: "white",
            padding: "30px",
            marginTop: "20px",
            marginLeft: "310px",
          }}
        >
          <div className="grid grid-cols-2">
            {/* NAME */}
            <div>
              <label
                style={{ color: "black", marginLeft: "4px" }}
                htmlFor="name"
              >
                Name
              </label>
              <br />
              <div className="flex">
                <input
                  style={{ margin: "4px", marginTop: "4px", width: "160px", color:"black" }}
                  type="text"
                  placeholder="First Name"
                  required
                  id="name"
                  name="name"
                  value={recipe.name}
                  onChange={handleChange}
                ></input>
                <input
                  style={{ margin: "4px", marginTop: "4px", width: "160px", color:"black" }}
                  type="name"
                  placeholder="Last Name"
                  required
                ></input>
              </div>
            </div>
            {/* EMAIL */}
            <div style={{ marginLeft: "170px" }}>
              <label style={{ color: "black", marginLeft: "4px" }}>Email</label>
              <br />
              <div className="flex">
                <input
                  style={{ margin: "4px", width: "230px", color:"black" }}
                  type="text"
                  placeholder="example@example.com"
                  required
                ></input>
              </div>
            </div>
            {/* RECIPE */}
            <div style={{ marginTop: "8px" }}>
              <label
                style={{ color: "black", marginLeft: "4px" }}
                htmlFor="description"
              >
                Recipe
              </label>
              <br />
              <textarea
                style={{
                  margin: "4px",
                  marginTop: "4px",
                  width: "820px",
                  height: "150px",
                  color:"black"
                }}
                // class="recipe_input"
                id="description"
                name="description"
                value={recipe.description}
                onChange={handleChange}
                type="text"
                placeholder="Tell us about your recipe"
                required
              ></textarea>
            </div>

            <br />
            {/* ImageURL */}
            <div>
              <label
                style={{
                  color: "black",
                }}
                htmlFor="imageUrl"
              >
                Image URL
              </label>
              <br />
              <input
                style={{
                  width: "820px", color:"black"
                }}
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={recipe.imageUrl}
                onChange={handleChange}
              />
            </div>

            <br />
            <hr style={{ color: "red" }}></hr>
          </div>

          <button
            className=""
            style={{
              marginLeft: "360px",
              marginTop: "14px",
              padding: "5px 15px",
              fontSize: "20px",
              backgroundColor: "#d1d1d1",
              color: "black",
            }}
            type="submit"
          >
            Submit
          </button>

          <h1
            className="submit font-black"
            style={{
              color: "black",
              border: "2px solid black",
              borderRadius: "2rem",
              width: "40px",
              padding: "4px",
            }}
          >
            Sub
          </h1>

          {/* form ends here */}
        </div>
      </form>

      <div
        style={{ backgroundColor: "black", marginTop: "20px", height: "35px" }}
      >
        helo
      </div>
    </div>
  );
};
