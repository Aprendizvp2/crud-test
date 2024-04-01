import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface UsersProps {
  users: any[];
  onEditUser: (id: number) => void;
  onDeleteUser: (id: number) => void;
}

function Users({ users, onEditUser, onDeleteUser }: UsersProps) {
  return (
    <div className="w-3/5">
      <h2 className="text-blue-500 text-3xl font-bold pt-8">Usuarios</h2>
      <div className="relative overflow-x-auto pt-4">
        <table className="w-full text-sm text-left rtl:text-right border-2 border-black">
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="bg-white border-2 dark:border-gray-700"
              >
                <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap text-black">
                  {user.id}
                </td>
                <td className="px-4 py-4">{user.name}</td>
                <td className="px-4 py-4">
                  <img className="w-10" src={user.photo} alt="img" />
                </td>
                <td className="px-4 py-4">
                  <IconButton onClick={() => onEditUser(user.id)}>
                    <EditIcon sx={{ color: "rgb(59 130 246)" }} />
                  </IconButton>
                  <IconButton onClick={() => onDeleteUser(user.id)}>
                    <DeleteIcon sx={{ color: "rgb(59 130 246)" }} />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
