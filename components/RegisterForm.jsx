"use client"
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '1234',
        name: '',
        role: 'pnp user',
        outlets: [],
    });

    const [newOutlet, setNewOutlet] = useState('');
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'outlets' ? [value] : value,
        }));
    };

    const handleAddOutlet = () => {
        if (newOutlet.trim() !== '') {
            setFormData((prevData) => ({
                ...prevData,
                outlets: [...prevData.outlets, newOutlet.trim().toUpperCase()],
            }));
            setNewOutlet('');
        }
    };

    const handleRemoveOutlet = (index) => {
        setFormData((prevData) => ({
            ...prevData,
            outlets: prevData.outlets.filter((_, i) => i !== index),
        }));
    };

    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddOutlet();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.preventDefault();
        // Check if any required field is empty

        const trimmedFormData = {
            email: formData.email.trim(),
            password: formData.password.trim(),
            name: formData.name.trim(),
            role: formData.role.trim(),
            outlets: formData.outlets.map(outlet => outlet.trim()), // Trim each outlet
          };

        
        if (
            trimmedFormData.email.trim() === '' ||
            trimmedFormData.password.trim() === '' ||
            trimmedFormData.name.trim() === '' ||
            trimmedFormData.role.trim() === '' ||
            trimmedFormData.outlets.length === 0
        ) {
            console.error('Error: Please fill in all required fields.');
            toast.error("Please Fill up all of the fields")
            return;
        }
        console.log(trimmedFormData);

        setLoading(true)


        try {

            const res = await fetch("api/user", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(trimmedFormData)
            })

            const json = await res.json()
            // console.log(json);

            if (res.ok) {

                toast.success("User created successfully!")
                // setEmail("")
                setFormData({
                    email: '',
                    password: '1234',
                    name: '',
                    role: 'pnp user',
                    outlets: [],
                })
                setLoading(false)
                // router.push('/verify', { scroll: false })

            } else {
                console.log("submission failed");
                toast.error('Failed to create user!')
                setLoading(false)
            }

        } catch (error) {
            console.log("registration failed with:", error);
            setLoading(false)
            toast.error('Failed to create user!')

        }
    };

    return (
        <div className="grid">
            <div className="shadow-md p-5 rounded-lg border-t-4 border-slate-700 w-[300px] sm:w-[500px]" >
                <h2 className="text-xl font-bold my-4">Register Users</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600 mb-2">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    {/* <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600 mb-2">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div> */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-600 mb-2">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="role" className="block text-gray-600 mb-2">
                            Role:
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="pnp user">PNP User</option>
                            {/* <option value="pnp admin">PNP User</option>
                    <option value="admin">PNP User</option> */}
                            <option value="zonal">Zonal</option>
                            {/* Add other role options as needed */}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="outlets" className="block text-gray-600 mb-2">
                            Outlets:
                        </label>
                        <div className="flex">
                            <input
                                type="text"
                                id="outlets"
                                name="outlets"
                                value={newOutlet}
                                onChange={(e) => setNewOutlet(e.target.value)}
                                onKeyDown={handleInputKeyPress}
                                className="flex-1 p-2 border rounded mr-2"

                            />
                            <button
                                type="button"
                                onClick={handleAddOutlet}
                                className="bg-rose-800 text-white py-2 px-4 rounded hover:bg-teal-600"
                            >
                                Add
                            </button>
                        </div>
                        <ul className="flex gap-2 flex-wrap mt-3">
                            {formData.outlets.map((outlet, index) => (
                                <li key={index} onClick={() => handleRemoveOutlet(index)} className="cursor-pointer py-2 px-3 bg-teal-600 rounded-sm text-white text-sm">
                                    {outlet}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-slate-700 text-white py-2 rounded hover:bg-slate-800"
                    >
                        Register
                    </button>
                </form>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
        </div>
    );
};

export default RegisterForm;
