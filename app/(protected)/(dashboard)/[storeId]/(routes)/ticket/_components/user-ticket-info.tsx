import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import * as SelectPrimitive from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormInput } from "../../../../../../../components/form/form-input";
import { Label } from "@/components/ui/label";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const departmentDb = [
  {
    id: "1",
    name: "Soporte Tecnico",
  },
  {
    id: "2",
    name: "Departamento de Ventas",
  },
  {
    id: "3",
    name: "Departamento de Facturacion",
  },
  {
    id: "4",
    name: "Departamento de abuso",
  },
];

export const servicesDb = [
  {
    id: "1",
    name: "Nada",
  },
  {
    id: "2",
    name: "Central Standard Time (CST)",
  },
];

export const priorityDb = [
  {
    id: "1",
    name: "Alta",
  },
  {
    id: "2",
    name: "Media",
  },
  {
    id: "3",
    name: "Baja",
  },
];

export const UserTicketInfo = ({ user, label }: UserInfoProps) => {
  return (
    <div className="flex flex-row gap-3 mb-6">
      <div className="flex flex-col items-start justify-start  w-[50%]">
        <FormInput
          label="Nombre"
          id="name"
          className="w-full text-sm uppercase bg-gray-100 shadow-sm border p-3 h-10 rounded-none"
          defaultValue={user?.name!}
          disabled
        />
      </div>

      <div className="flex flex-col items-start justify-start  w-[50%]">
        <FormInput
          label="Email"
          id="name"
          className="w-full text-sm uppercase bg-gray-100 shadow-sm border p-3 h-10 rounded-none"
          defaultValue={user?.email!}
          disabled
        />
      </div>
    </div>
  );
};
