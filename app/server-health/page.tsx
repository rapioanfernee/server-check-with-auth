"use client";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const [serverDetails, setServerDetails] = useState<any>([]);
  const [logoutMessage, setLogoutMessage] = useState("");

  const fetchServerHealth = async () => {
    const response = await fetch("http://localhost:3000/health", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    if (data?.details) {
      const serverDetails = Object.keys(data.details).map((key) => {
        return {
          name: key,
          details: data.details[key],
        };
      });
      console.log(serverDetails);
      setServerDetails(serverDetails);
    }
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
    fetchServerHealth();
  }, []);

  return (
    <div className="w-1/4 p-5">
      <div className="mb-10 flex justify-between">
        <h2>Server Health</h2>
        <button
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          onClick={onClickLogoutButton}
        >
          Logout
        </button>
        {logoutMessage && <div className="text-green-500">{logoutMessage}</div>}
      </div>
      {serverDetails?.map((serverDetails: any) => {
        return (
          <div className="flex w-100 justify-between">
            <div>{serverDetails.name}</div>
            <div className="flex flex-col text-right">
              Status:{" "}
              <strong
                className={
                  serverDetails.details.status === "up"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {serverDetails.details.status}
              </strong>
              {serverDetails.details.message && (
                <small className="text-red-500">
                  {serverDetails.details.message}
                </small>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
