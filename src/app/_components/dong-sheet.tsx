import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GeoFeature } from "@/types/geo";

interface DongSheetProps {
  geo: GeoFeature;
}

export function DongSheet({ geo }: DongSheetProps) {
  const name = geo.properties.KOR_NM;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="rounded bg-white p-1 text-sm hover:bg-gray-300">{name}</button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{name}</SheetTitle>
          <SheetDescription>{name}에 대한 설명</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt eos aut corrupti
          provident possimus sint laboriosam, quasi harum commodi omnis voluptates numquam id! Ipsa
          delectus ipsum magnam saepe incidunt accusamus.
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <button type="button">확인</button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
