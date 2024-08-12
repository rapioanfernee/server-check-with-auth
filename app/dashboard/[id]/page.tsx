"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState<any>({});
  const [logoutMessage, setLogoutMessage] = useState("");

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
  };

  const onClickLogoutButton = async () => {
    const response = await fetch("http://localhost:3000/auth/logout", {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    if (data.msg) {
      setLogoutMessage(data.msg);
    }

    router.replace("/");
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
          <button
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={onClickLogoutButton}
          >
            Logout
          </button>
          {logoutMessage && (
            <div className="text-green-500">{logoutMessage}</div>
          )}
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
