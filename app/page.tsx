"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Home() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        username: userName,
        password: password,
        is_admin: isAdmin,
      }),
    });

    const data = await response.json();
    if (data?.errors) {
      setErrorMessage(data.errors.message);
      return;
    }
    setMessage("User successfully created, logging in...");
  }
  return (
    <div className="h-screen w-screen flex flex-col items-center ">
      <form onSubmit={onSubmit} className="flex flex-col">
        <label>First Name: </label>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          name="first_name"
        />
        <label>Last Name: </label>
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          name="last_name"
        />
        <label>Username: </label>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          name="username"
        />
        <label>Password: </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
        />
        <div>
          <label>Admin: </label>
          <input
            onChange={() => setIsAdmin(true)}
            name="is_admin"
            id="yes"
            type="radio"
            value="true"
          ></input>
          <label htmlFor="yes">Yes</label>
          <input
            onChange={() => setIsAdmin(false)}
            name="is_admin"
            id="no"
            type="radio"
            value="false"
          ></input>
          <label htmlFor="no">No</label>
        </div>
        {errorMessage && <label className="text-red-500">{errorMessage}</label>}
        {message && <label className="text-green-500">{message}</label>}
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Create an Account
        </button>
      </form>
      <Link href="/login">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login with username
        </button>
      </Link>
    </div>
  );
}

// - first_name -> String
// - last_name -> String
// - username -> String
// - password -> String
// - is_admin -> Boolean
