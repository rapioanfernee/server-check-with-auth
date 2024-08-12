"use client";
import { FormEvent, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userName,
        password: password,
      }),
      credentials: "include",
    });

    const data = await response.json();

    if (data?.statusCode && data.statusCode !== 200) {
      setErrorMessage(data.message);
      return;
    }
    setMessage(data.msg);
    setErrorMessage("");

    router.push(`dashboard/${data.user.id}`);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center ">
      <form onSubmit={onSubmit} className="flex flex-col">
        <label>First Name: </label>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          name="first_name"
        />
        <label>Last Name: </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="last_name"
        />
        {errorMessage && <label className="text-red-500">{errorMessage}</label>}
        {message && <label className="text-green-500">{message}</label>}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login with username
        </button>
      </form>
    </div>
  );
};

export default Page;
