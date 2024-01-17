import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { allUsers } from './ChipConstant'

const UserPicker = () => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const HighlightedName = ({ name, inputValue }) => {
        if (!inputValue) {
            return <span>{name}</span>;
        }

        const parts = name.split(new RegExp(`(${inputValue})`, 'gi'));
        return (
            <span>
                {parts.map((part, index) =>
                    part.toLowerCase() === inputValue.toLowerCase() ? (
                        <span key={index} className="highlight text-blue-500">
                            {part}
                        </span>
                    ) : (
                        <span key={index}>{part}</span>
                    )
                )}
            </span>
        );
    };

    //InputhandleChange
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        if (event.target.value === '') {
            setSelectedUsers([]);
        }
        console.log("ashif", inputValue)
        const filteredUsers = allUsers.filter((user) =>
            user.name.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setUsers(filteredUsers);
    };

    //selected chip handle
    const handleUserSelect = (user) => {
        const isSelected = selectedUsers.some((selectedUser) => selectedUser.id === user.id);
        if (!isSelected) {
            setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);
            setUsers(users.filter((u) => u.id !== user.id));
            setInputValue('');
        }
    };

    //chipDisplay
    const handleChipRemove = (user) => {
        setSelectedUsers((prevSelectedUsers) =>
            prevSelectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
        );
        setUsers((prevUsers) => [...prevUsers, user]);
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <h2 className='font-bold text-blue-700 items-center mx-auto mt-10 text-3xl mb-10'>Pick Users</h2>
            <div className="flex flex-col justify-center mt-16">
                {/* chips display */}
                <div className='flex flex-wrap -my-10 z-0 space-x-5'>
                    {selectedUsers.map((user) => (
                        <div
                            key={user.id}
                            className="text-gray-700 bg-gray-200 rounded-full px-0.5 py-2 h-8 flex justify-between items-center mb-2"
                        >
                            <img src={user.image} alt="imag" className='h-7 w-7 rounded-full' />
                            <span className={`text-sm mr-2 items-center ml-2 font-semibold`}>{user.name}</span>
                            <button
                                className="text-gray-600 items-center hover:text-gray-900 focus:outline-none mr-1 hover:text-xl font-bold"
                                onClick={() => handleChipRemove(user)}
                            >
                                <IoClose />
                            </button>
                        </div>
                    ))}
                </div>
                 {/* input */}
                <div onClick={handleInputChange}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        className="py-2 px-2 outline-none border-b-2 border-blue-500 w-full"
                        placeholder="Add new user....."
                    />
                </div>
            </div>
             {/* list of all user display */}
            <div className="-ml-28 shadow-2xl shadow-gray-500 rounded" style={{ maxHeight: "300px", overflowY: "auto", maxWidth: "700px" }}>
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="cursor-pointer py-5 px-4 flex justify-between items-center bg-gray-50 hover:bg-gray-200 space-x-4"
                        onClick={() => handleUserSelect(user)}
                    >
                        <div className='flex items-center'>
                            <img src={user.image} className='h-8 w-8 rounded-full' alt='img' />
                            <h2 className='ml-2 font-semibold text-sm'><HighlightedName name={user.name} inputValue={inputValue} /></h2>
                        </div>
                        <div className='text-gray-500 text-sm'>{user.email}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserPicker;