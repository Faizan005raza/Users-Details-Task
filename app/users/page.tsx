"use client";
import { useEffect, useState, useMemo, useCallback } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
}

export default function UserDetails() {
  const [data, setData] = useState<User[]>([]); // Stores the Users Details
  const [search, setSearch] = useState(""); // Stores the Searched Users
  const [sortColumn, setSortColumn] = useState<
    //Stores the Sorted Column of FirstName, LastName and Age.
    "firstName" | "lastName" | "age"
  >("firstName");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(false); // Used for the loading state ..(we can use suspense also)

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const [totalUsers, setTotalUsers] = useState(0);

  const fetchUsers = useCallback(() => {
    setLoading(true);

    const skip = (currentPage - 1) * usersPerPage;

    fetch(
      `https://dummyjson.com/users/search?q=${search}&limit=${usersPerPage}&skip=${skip}`
    )
      .then((response) => response.json())
      .then((json) => {
        debugger;
        setData(json.users);
        setTotalUsers(json.total);
        setLoading(false);
      });
  }, [search, currentPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 1000);

    return () => clearTimeout(timer);
  }, [search, currentPage, fetchUsers]);

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      return sortOrder === "asc"
        ? (valueA as number) - (valueB as number)
        : (valueB as number) - (valueA as number);
    });
  }, [data, sortColumn, sortOrder]);

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const handleSort = (column: "firstName" | "lastName" | "age") => {
    debugger;
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center gap-3 mb-5 mt-6">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-4 py-2 rounded-lg w-64"
        />
      </div>

      {loading && (
        <h2 className="text-center text-xl font-semibold">Loading...</h2>
      )}

      <div className="text-center sm:flex-col">
        {data.length === 0 && !loading ? (
          <h2 className="text-xl font-semibold text-red-500">
            No Users Found!
          </h2>
        ) : (
          <table className="w-[80%] mx-auto border-collapse mt-5">
            <thead>
              <tr className="bg-gray-200 cursor-pointer">
                <th
                  onClick={() => handleSort("firstName")}
                  className="border px-4 py-3 text-left"
                >
                  First Name{" "}
                  {sortColumn === "firstName" &&
                    (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th
                  onClick={() => handleSort("lastName")}
                  className="border px-4 py-3 text-left"
                >
                  Last Name{" "}
                  {sortColumn === "lastName" &&
                    (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th
                  onClick={() => handleSort("age")}
                  className="border px-4 py-3 text-left"
                >
                  Age
                </th>
              </tr>
            </thead>

            <tbody>
              {sortedData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100 transition">
                  <td className="border px-4 py-2">{item.firstName}</td>
                  <td className="border px-4 py-2">{item.lastName}</td>
                  <td className="border px-4 py-2">{item.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {!loading && totalUsers > 0 && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 border rounded disabled:opacity-40"
          >
            Previous
          </button>

          <span className="font-semibold">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
