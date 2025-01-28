import { Input, Button } from "antd";
import React, { useState } from "react";
import validator from "validator";
import { BACKEND_BASE_URL } from "../../utils/helper";
import axios from "axios";
import { useNavigate, Link } from "react-router";

const UserRegister = () => {
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleUserRegister() {
    if (
      validator.isEmpty(userFormData.name, { ignore_whitespace: true }) === true
    ) {
      return alert("Please enter name");
    }

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
        `${BACKEND_BASE_URL}/auth/register`,
        userFormData
      );

      if (response.data.status === "success") {
        return navigate("/login");
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
          Join Farm Market
        </h1>
        <p className="text-gray-500 font-light">
          Enjoy exciting deals when you register.
        </p>
        <Input
          onChange={(e) =>
            setUserFormData({ ...userFormData, name: e.target.value })
          }
          size="large"
          placeholder="Enter your name"
        />
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
          onClick={handleUserRegister}
          block
          type="primary"
          size="large"
        >
          Register
        </Button>
        <div className="flex gap-2 mx-auto">
          <p className="text-center text-gray-500 font-light">
            Already have an account?
          </p>
          <Link
            className="font-medium hover:underline text-black"
            to={"/login"}
          >
            Login here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UserRegister;
