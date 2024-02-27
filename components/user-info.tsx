import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import * as SelectPrimitive from '@radix-ui/react-select';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{""}</p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-row gap-3 mb-6">
          <div className="flex flex-col items-start justify-start  w-[50%]">
            <p className="text-sm font-medium mb-1">Nombre</p>
            <p className="truncate text-sm uppercase w-full bg-gray-100 shadow-sm border p-3">
              {user?.name}
            </p>
          </div>
          <div className="flex flex-col items-start justify-start  w-[50%]">
            <p className="text-sm font-medium mb-1">Email</p>
            <p className="truncate text-sm uppercase w-full bg-gray-100 shadow-sm border p-3">
              {user?.email}
            </p>
          </div>
        </div>

        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-col">
            <p className="text-sm uppercase mb-1">Departamento</p>
            <Select defaultValue="est">
              <SelectTrigger className="w-[400px] h-[40px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup >
                  <SelectItem value="est" >
                   Soporte Tecnico
                  </SelectItem>
                  <SelectItem value="cst">
                   Departamento de Ventas
                  </SelectItem>
                  <SelectItem value="mst">
                    Departamento de Facturacion
                  </SelectItem>
                  <SelectItem value="pst">
                    Departamento de abuso
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col">
            <p className="text-sm uppercase mb-1"> Servicios Relacionados </p>
            <Select defaultValue="nada">
              <SelectTrigger className="w-[400px] h-[40px]">
                <SelectValue placeholder="Select a timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="nada">
                    Nada
                  </SelectItem>
                  <SelectItem value="cst">
                    Central Standard Time (CST)
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col">
            <p className="text-sm uppercase mb-1">Prioridad</p>
            <Select defaultValue="alta">
              <SelectTrigger className="w-[400px] h-[40px]">
                <SelectValue placeholder="Seleccione Prioridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="baja">Baja</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
