import { Input, Button } from "antd";
import React, { useState } from "react";
import validator from "validator";
import { BACKEND_BASE_URL } from "../../utils/helper";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { updateUser } from "../../features/user/userSlice";

const UserLogin = () => {
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleUserLogin() {
    if (validator.isEmail(userFormData.email) === false) {
      return alert("Please enter valid email");
    }

    if (
      validator.isStrongPassword(userFormData.password, {
        minLength: 6,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
      }) === false
    ) {
      return alert(
        "Password must be 6 Characters, contain number, Uppercase, lowercase and a symbol"
      );
    }

    //   Send user details to server

    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/auth/login`,
        userFormData
      );

      if (response.data.status === "success") {
        // Update user in the store from null to the response from database
        dispatch(updateUser(response.data.data));

        // redirect the user based on the usertype property
        return response.data.data.userType === "admin"
          ? navigate("/admin")
          : navigate("/profile");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid p-4 place-items-center h-[80vh] max-w-[500px] mx-auto">
      <form className="flex flex-col gap-4 w-full border p-4 rounded-md border-green-800">
        <h1 className="text-2xl text-green-500 text-center">
          Login to Farm Market
        </h1>
        <p className="text-gray-500 font-light">
          Enter login details to continue
        </p>
        <Input
          onChange={(e) =>
            setUserFormData({ ...userFormData, email: e.target.value })
          }
          size="large"
          placeholder="Enter your email"
        />
        <Input.Password
          onChange={(e) =>
            setUserFormData({ ...userFormData, password: e.target.value })
          }
          size="large"
          placeholder="Enter your password"
        />
        <Button
          loading={loading}
          disabled={loading}
          onClick={handleUserLogin}
          block
          type="primary"
          size="large"
        >
          Login
        </Button>
        <div className="flex gap-2 mx-auto">
          <p className="text-center text-gray-500 font-light">
            Don't have have an account yet?
          </p>
          <Link
            className="font-medium hover:underline text-black"
            to={"/register"}
          >
            Register here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UserLogin;
