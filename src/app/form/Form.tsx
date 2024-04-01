import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArticleIcon from "@mui/icons-material/Article";
import UserDetail from "../components/userdetail/UserDetail";

export interface User {
  id: number;
  name: string;
  lastName: string;
  title: string;
  photo: string;
  gender: string;
  email: string;
  birthday: string;
  phone: string;
}

const API_URL = "http://localhost:3001/users";

function Form() {
  // Estados para los campos del formulario
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("mr");
  const [photo, setPhoto] = useState("");
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");

  // Estado para el ID del usuario en edición
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  // Estado para almacenar la lista de usuarios
  const [users, setUsers] = useState<User[]>([]);

  // Estado para filtrar usuarios por nombre
  const [filterByName, setFilterByName] = useState("");

  // Estado para el usuario seleccionado para ver detalles
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Estado para controlar la apertura del diálogo de detalles del usuario
  const [openDetailDialog, setOpenDetailDialog] = useState(false);

  // Estado para controlar la apertura del diálogo de confirmación de eliminación
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  // Estado para almacenar temporalmente el ID del usuario que se va a eliminar
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);

  // Función para mostrar los detalles del usuario seleccionado
  const handleViewUserDetails = (user: User) => {
    setSelectedUser(user);
    setOpenDetailDialog(true);
  };

  // Función para obtener la lista de usuarios del servidor
  useEffect(() => {
    fetchData();
  }, []);

  // Funcion para taraer los usuarios
  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Función para crear un nuevo usuario
  const handleCreateUser = async () => {
    try {
      const newUser = {
        name,
        lastName,
        title: title || "mr", // Si no se selecciona ninguna opción, se usa "mr"
        photo,
        gender: gender || "male", // Si no se selecciona ninguna opción, se usa "male"
        email,
        birthday,
        phone,
      };
      await axios.post(API_URL, newUser);
      // Limpiar los campos del formulario después de crear un usuario
      handleCleanInputs();
      fetchData();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Función para editar un usuario
  const handleEditUser = async (id: number) => {
    try {
      const userToEdit = users.find((user: any) => user.id === id);
      if (userToEdit) {
        // Llenar los campos del formulario con los datos del usuario a editar
        setName(userToEdit.name);
        setLastName(userToEdit.lastName);
        setTitle(userToEdit.title);
        setPhoto(userToEdit.photo);
        setGender(userToEdit.gender);
        setEmail(userToEdit.email);
        setBirthday(userToEdit.birthday);
        setPhone(userToEdit.phone);
        setEditingUserId(id);
      }
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  // Función para actualizar un usuario
  const handleUpdateUser = async () => {
    try {
      const updatedUser = {
        name,
        lastName,
        title,
        photo,
        gender,
        email,
        birthday,
        phone,
      };
      await axios.put(`${API_URL}/${editingUserId}`, updatedUser);
      // Limpiar los campos del formulario después de actualizar un usuario
      handleCancelAction();
      fetchData();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Función para abrir el diálogo de confirmación de eliminación
  const handleOpenDeleteConfirmation = (id: number) => {
    setUserIdToDelete(id);
    setOpenDeleteConfirmation(true);
  };

  // Función para eliminar un usuario
  const handleDeleteUser = async () => {
    try {
      if (userIdToDelete) {
        await axios.delete(`${API_URL}/${userIdToDelete}`);
        setOpenDeleteConfirmation(false);
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Función para limpiar los campos del formulario
  const handleCleanInputs = () => {
    setName("");
    setLastName("");
    setTitle("");
    setPhoto("");
    setGender("");
    setEmail("");
    setBirthday("");
    setPhone("");
  };

  // Función para cancelar la acción de edición o creación
  const handleCancelAction = () => {
    setName("");
    setLastName("");
    setTitle("");
    setPhoto("");
    setGender("");
    setEmail("");
    setBirthday("");
    setPhone("");
    setEditingUserId(null);
  };

  // Filtrar usuarios por nombre
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(filterByName.toLowerCase())
  );

  // Función para determinar si el botón de creación está deshabilitado
  const isCreateButtonDisabled = () => {
    return (
      !name ||
      !lastName ||
      !photo ||
      !email ||
      !birthday ||
      !phone ||
      (!title && title !== "mr") ||
      (!gender && gender !== "male")
    );
  };

  return (
    <div className="px-4 md:px-8 pt-28">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-20">
        <div className="flex flex-col items-start w-full md:w-2/5">
          <select
            className="border-2 border-blue-500 mb-4 p-2 rounded-md w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          >
            <option value="mr">mr</option>
            <option value="ms">ms</option>
            <option value="mrs">mrs</option>
            <option value="miss">miss</option>
            <option value="dr">dr</option>
          </select>
          <input
            className="border-2 border-blue-500 mb-4 p-2 rounded-md w-full"
            type="text"
            placeholder="Nombres"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="border-2 border-blue-500 mb-4 p-2 rounded-md w-full"
            type="text"
            placeholder="Apellidos"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            className="border-2 border-blue-500 mb-4 p-2 rounded-md w-full"
            type="text"
            placeholder="Photo"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
          <select
            className="border-2 border-blue-500 mb-4 p-2 rounded-md w-full"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">other</option>
          </select>
          <input
            className="border-2 border-blue-500 mb-4 p-2 rounded-md w-full"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border-2 border-blue-500 mb-4 p-2 rounded-md w-full"
            type="text"
            placeholder="Fecha de nacimiento"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
          <input
            className="border-2 border-blue-500 mb-4 p-2 rounded-md w-full"
            type="number"
            placeholder="Teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {editingUserId !== null ? (
            <div className="flex flex-row gap-2">
              <button
                className="px-8 py-2 bg-blue-500 text-white hover:text-blue-500 hover:bg-white border-2 transition duration-500 border-blue-500 hover:border-blue-500 rounded-md"
                onClick={handleUpdateUser}
              >
                Actualizar
              </button>
              <button
                className="px-8 py-2 bg-red-500 text-white hover:text-red-500 hover:bg-white border-2 transition duration-500 border-red-500 hover:border-red-500 rounded-md"
                onClick={handleCancelAction}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <div className="flex flex-row gap-2">
              <button
                className="px-8 py-2 bg-blue-500 text-white hover:text-blue-500 hover:bg-white border-2 transition disabled:bg-blue-600 duration-500 border-blue-500 hover:border-blue-500 rounded-md"
                onClick={handleCreateUser}
                disabled={isCreateButtonDisabled()}
              >
                Crear
              </button>
              <button
                className="px-8 py-2 bg-gray-500 text-white hover:text-gray-500 hover:bg-white border-2 transition duration-500 border-gray-500 hover:border-gray-500 rounded-md"
                onClick={handleCleanInputs}
              >
                Limpiar campos
              </button>
            </div>
          )}
        </div>
        <div className="w-full md:w-3/5 pb-4">
          <h2 className="text-blue-500 text-3xl font-bold pt-2">Usuarios</h2>
          <input
            className="border-2 border-blue-500 my-4 p-2 rounded-md"
            type="text"
            placeholder="Buscar por nombre"
            value={filterByName}
            onChange={(e) => setFilterByName(e.target.value)}
          />
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right border-2 border-black">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-blue-600 text-white">
                <tr>
                  <th scope="col" className="px-4 py-3 text-xs md:text-base">
                    Id
                  </th>
                  <th scope="col" className="px-4 py-3 text-xs md:text-base">
                    Nombres y apellidos
                  </th>
                  <th scope="col" className="px-4 py-3 text-xs md:text-base">
                    Foto
                  </th>
                  <th scope="col" className="px-4 py-3 text-xs md:text-base">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((item) => (
                    <tr
                      key={item.id}
                      className="bg-white border-2 dark:border-gray-700"
                    >
                      <td className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap text-black">
                        {item.id}
                      </td>
                      <td className="px-4 py-4">{item.name}</td>
                      <td className="px-4 py-4">
                        <img
                          className="w-10 rounded-full"
                          src={item.photo}
                          alt="img"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <IconButton onClick={() => handleEditUser(item.id)}>
                          <EditIcon sx={{ color: "rgb(59 130 246)" }} />
                        </IconButton>
                        <IconButton
                          onClick={() => handleOpenDeleteConfirmation(item.id)}
                        >
                          <DeleteIcon sx={{ color: "rgb(59 130 246)" }} />
                        </IconButton>
                        <IconButton onClick={() => handleViewUserDetails(item)}>
                          <ArticleIcon sx={{ color: "rgb(59 130 246)" }} />
                        </IconButton>
                        <UserDetail
                          open={openDetailDialog}
                          onClose={() => setOpenDetailDialog(false)}
                          user={selectedUser}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center text-xl py-8">
                      No se encontraron resultados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Diálogo de confirmación de eliminación */}
      <Dialog
        open={openDeleteConfirmation}
        onClose={() => setOpenDeleteConfirmation(false)}
      >
        <DialogTitle>Confirmación de eliminación</DialogTitle>
        <DialogContent>
          <p>¿Estás seguro de que quieres eliminar este usuario?</p>
        </DialogContent>
        <DialogActions>
          <button
            className="px-8 py-2 bg-blue-500 text-white hover:text-blue-500 hover:bg-white border-2 transition duration-500 border-blue-500 hover:border-blue-500 rounded-md"
            onClick={handleDeleteUser}
          >
            Eliminar
          </button>
          <button
            className="px-8 py-2 bg-red-500 text-white hover:text-red-500 hover:bg-white border-2 transition duration-500 border-red-500 hover:border-red-500 rounded-md"
            onClick={() => setOpenDeleteConfirmation(false)}
          >
            Cancelar
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Form;
