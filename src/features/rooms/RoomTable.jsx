import React, { useState } from "react";
import { useRooms } from "./useRooms";

const RoomTable = () => {
  const { isLoading, rooms } = useRooms();

  //TODO: add spinner
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleDelete = (roomId) => {
    // setRooms(rooms.filter((room) => room.id !== roomId));
    console.log(`Delete room with ID ${roomId}`);
  };

  const handleUpdate = (roomId) => {
    // Implement your update logic here
    console.log(`Update room with ID ${roomId}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
              Image
            </th>
            <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
              Name
            </th>
            <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
              Bed Type
            </th>
            <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
              Price
            </th>
            <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-500">
              Discount
            </th>
            <th className="bg-gray-50 px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {rooms.map((room) => (
            <tr key={room.id}>
              <td className="whitespace-no-wrap px-6 py-4">
                <img
                  src={room.image_url}
                  alt={room.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
              </td>
              <td className="whitespace-no-wrap px-6 py-4">{room.name}</td>
              <td className="whitespace-no-wrap px-6 py-4">{room.bed_type}</td>
              <td className="whitespace-no-wrap px-6 py-4">${room.price}</td>
              <td className="whitespace-no-wrap px-6 py-4">
                ${room.discount_price}
              </td>
              <td className="whitespace-no-wrap px-6 py-4 text-right text-sm font-medium leading-5">
                <button
                  onClick={() => handleUpdate(room.id)}
                  className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(room.id)}
                  className="ml-2 text-red-600 hover:text-red-900 focus:outline-none"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomTable;
