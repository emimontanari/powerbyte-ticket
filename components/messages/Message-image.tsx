import { Image as ImageType } from "@prisma/client";
import Image from "next/image";

interface Props {
  value: ImageType;
}

export const ProductImage = ({ value }: Props) => {
  return (
    <div className=" gap-2 mt-10 cursor-pointer">
      <div
        key={value.url}
        className="relative w-[150px] h-[150px] rounded-md overflow-hidden"
      >
        <Image fill className="object-cover" alt="Image" src={value.url} />
      </div>
    </div>
  );
};
