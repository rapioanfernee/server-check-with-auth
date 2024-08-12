"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const Dashboard = ({ params }: { params: { id: string } }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState<any>({});

  const fetchUser = async () => {
    const response = await fetch(`http://localhost:3000/user/${params.id}`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    if (data?.error) {
      setErrorMessage(data.message);
    }
    setUser(data);
    console.log(data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {errorMessage ? (
        <div>
          <h2>Unauthorized!</h2>
          <div>{errorMessage}</div>
        </div>
      ) : (
        <div>
          <h2>Dashboard</h2>
          <div>First Name: {user.first_name}</div>
          <div>Last Name: {user.last_name}</div>
          <div>Username: {user.username}</div>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            <Link href={"/server-health"}>Check Server Health</Link>
          </button>
        </div>
      )}
    </>
  );
};

export default Dashboard;
