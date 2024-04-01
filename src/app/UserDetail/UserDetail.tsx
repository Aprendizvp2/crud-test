import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { User } from "../form/Form";

interface UserDetailProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

function UserDetail({ open, onClose, user }: UserDetailProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        Detalle del Usuario
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {user && (
          <div>
            <div className="flex flex-row items-start gap-2 my-2">
              <h1 className="text-black text-xl font-bold">Título:</h1>
              <span className="text-black text-xl">{user.title}</span>
            </div>
            <div className="flex flex-row items-start gap-2 my-2">
              <h1 className="text-black text-xl font-bold">Nombre:</h1>
              <span className="text-black text-xl">{user.name}</span>
            </div>
            <div className="flex flex-row items-start gap-2 my-2">
              <h1 className="text-black text-xl font-bold">Apellido:</h1>
              <span className="text-black text-xl">{user.lastName}</span>
            </div>
            <div className="flex flex-row items-start gap-2 my-2">
              <h1 className="text-black text-xl font-bold">Foto:</h1>
              <span className="text-black text-xl">{user.photo}</span>
            </div>
            <div className="flex flex-row items-start gap-2 my-2">
              <h1 className="text-black text-xl font-bold">
                Correo electrónico:
              </h1>
              <span className="text-black text-xl">{user.email}</span>
            </div>
            <div className="flex flex-row items-start gap-2 my-2">
              <h1 className="text-black text-xl font-bold">
                Fecha de nacimiento:
              </h1>
              <span className="text-black text-xl">{user.birthday}</span>
            </div>
            <div className="flex flex-row items-start gap-2 my-2">
              <h1 className="text-black text-xl font-bold">Teléfono:</h1>
              <span className="text-black text-xl">{user.phone}</span>
            </div>
            <div className="flex flex-row items-start gap-2 my-2">
              <h1 className="text-black text-xl font-bold">Género:</h1>
              <span className="text-black text-xl">{user.gender}</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default UserDetail;
