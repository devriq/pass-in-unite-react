import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { PropsWithChildren } from "react";
import Button from "../lib/Button";

type TableCellProps = {
  colSpan?: number;
  width?: number;
};

function Th(props: PropsWithChildren<TableCellProps>) {
  return (
    <th className="py-3 px-2.5 text-sm text-left font-semibold">
      {props.children}
    </th>
  );
}

function Td(props: PropsWithChildren<TableCellProps>) {
  return (
    <td
      colSpan={props.colSpan}
      className={` w-[${props.width}px] py-3 px-2.5 text-sm text-left`}
    >
      {props.children}
    </td>
  );
}

function Tr(props: PropsWithChildren<TableCellProps>) {
  return <tr className={`border-b border-white/10`}>{props.children}</tr>;
}

function Checkbox() {
  return <input type="checkbox" className={`size-4 bg-black/20 rounded checked:bg-orange-300n:bg-orange-300 `} />;
}

type Props = {};

function AttendeeList({}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="flex items-center gap-3 p-2 border border-white/10 bg-transparent rounded-lg w-72">
          <Search className="size-4 text-orange-300" />
          <input
            className="flex-1 bg-transparent outline-none border-none p-0"
            placeholder="Buscar participante"
          ></input>
        </div>
      </div>
      <div className="border border-white/10 rounded-lg">
        <table className="w-full">
          <thead>
            <Th>
              <Checkbox/>

            </Th>
            <Th>Id</Th>
            <Th>Attendee</Th>
            <Th>Signed-up</Th>
            <Th>Checked-in</Th>
            <Th>More</Th>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, i) => {
              return (
                <Tr key={i}>
                  <Td width={60}>
                    <Checkbox/>
                  </Td>
                  <Td>7e8f-2134-df42</Td>
                  <Td>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">
                        Arthur Henrique Costa Cordovil
                      </span>
                      <span className="font-thin ">
                        arthur.hcordovil@gmail.com
                      </span>
                    </div>
                  </Td>
                  <Td>7 days ago</Td>
                  <Td>3 days ago</Td>
                  <Td width={60}>
                    <Button label="">
                      <MoreHorizontal />
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </tbody>
          <tfoot>
            <Tr>
              <Td colSpan={3}>Mostrando 10 de 220</Td>
              <Td colSpan={3}>
                <div className="flex justify-end items-center px-3">
                  <span className="px-3">Pagina 1 de 23</span>
                  <Button>
                    <ChevronsLeft />
                  </Button>
                  <Button>
                    <ChevronLeft />
                  </Button>
                  <Button>
                    <ChevronRight />
                  </Button>
                  <Button>
                    <ChevronsRight />
                  </Button>
                </div>
              </Td>
            </Tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default AttendeeList;
