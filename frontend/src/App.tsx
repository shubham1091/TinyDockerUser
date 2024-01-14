import React, { useEffect, useState } from "react";
import CardComponent from "./components/CardComponent";
import fetchData from "./util/apiUtils";
import { API_URL } from "./Constants";

interface User {
    id: number;
    name: string;
    email: string;
}

function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState({ name: "", email: "" });
    const [loading, setLoading] = useState(false);
    const [updateUser, setUpdateUser] = useState({
        id: "",
        name: "",
        email: "",
    });

    //fetch users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const data = await fetchData(`${API_URL}/users`);
                setUsers(data.reverse());
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = await fetchData(`${API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });
            setUsers((prevUsers) => [data, ...prevUsers]);
            setNewUser({ name: "", email: "" });
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await fetchData(`${API_URL}/users/${updateUser.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateUser),
            });
            setUpdateUser({ id: "", name: "", email: "" });
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === parseInt(updateUser.id)
                        ? {
                              ...user,
                              name: updateUser.name,
                              email: updateUser.email,
                          }
                        : user
                )
            );
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const deleteUser = async (userId: number) => {
        try {
            await fetchData(`${API_URL}/users/${userId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setUsers((prevUsers) =>
                prevUsers.filter((user) => user.id !== userId)
            );
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
            <div className="space-y-4 w-full max-w-2xl">
                <h1 className="text-2xl font-bold text-gray-800 text-center">
                    User Management App
                </h1>

                <form
                    onSubmit={createUser}
                    className="p-4 bg-blue-100 rounded shadow"
                >
                    <input
                        type="text"
                        placeholder="Name"
                        value={newUser.name}
                        onChange={({ target }) =>
                            setNewUser((prev) => ({
                                ...prev,
                                name: target.value,
                            }))
                        }
                        className="mb-2 w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={({ target }) =>
                            setNewUser((prev) => ({
                                ...prev,
                                email: target.value,
                            }))
                        }
                        className="mb-2 w-full p-2 border border-gray-300 rounded"
                    />
                    <button
                        type="submit"
                        className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        Add User
                    </button>
                </form>

                <form
                    onSubmit={handleUpdateUser}
                    className="p-4 bg-green-100 rounded shadow"
                >
                    <input
                        type="text"
                        placeholder="User ID"
                        value={updateUser.id}
                        onChange={({ target }) =>
                            setUpdateUser((prev) => ({
                                ...prev,
                                id: target.value,
                            }))
                        }
                        className="mb-2 w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        placeholder="New Name"
                        value={updateUser.name}
                        onChange={({ target }) =>
                            setUpdateUser((prev) => ({
                                ...prev,
                                name: target.value,
                            }))
                        }
                        className="mb-2 w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="email"
                        placeholder="New Email"
                        value={updateUser.email}
                        onChange={({ target }) =>
                            setUpdateUser((prev) => ({
                                ...prev,
                                email: target.value,
                            }))
                        }
                        className="mb-2 w-full p-2 border border-gray-300 rounded"
                    />
                    <button
                        type="submit"
                        className="w-full p-2 text-white bg-green-500 rounded hover:bg-green-600"
                    >
                        Update User
                    </button>
                </form>

                <div className="space-y-2">
                    {loading ? (
                        <p className="text-gray-500">Loading...</p>
                    ) : (
                        users.map((user) => (
                            <div
                                className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
                                key={user.id}
                            >
                                <CardComponent card={user} />
                                <button
                                    onClick={() => deleteUser(user.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                                >
                                    Delete user
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}

export default App;
