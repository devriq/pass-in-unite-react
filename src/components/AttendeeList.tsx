import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { ComponentProps, useState } from "react";
import Button from "../lib/Button";
import { attendees } from "../data/attendees";
import { formatRelative } from "date-fns";
import { enUS } from 'date-fns/locale'

interface TableCellProps extends ComponentProps<'th'> {
  width?: number
};

function Th(props: TableCellProps) {
  return (
    <th className="py-3 px-2.5 text-sm text-left font-semibold">
      {props.children}
    </th>
  );
}

function TableCell(props: TableCellProps) {
  return (
    <td
      {...props}
      className={` w-[${props.width}px] py-3 px-2.5 text-sm text-left`}
    >
      
    </td>
  );
}

function Tr(props: TableCellProps) {
  return <tr className={`border-b border-white/10`}>{props.children}</tr>;
}

function Checkbox() {
  return <input type="checkbox" className={`size-4 bg-black/20 rounded checked:bg-orange-300n:bg-orange-300 `} />;
}

type Props = {};

function AttendeeList({}: Props) {

  // const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(attendees.length/10)

  // function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>){
  //   setSearch(event.target.value)
  // } 

  function goToFirstPage(){
    setPage(1)
  }
  
  function goToLastPage(){
    setPage(totalPages)
  }

  function goToPreviousPage(){
    setPage(page===1 ? 1 : page-1)
  }

  function goToNextPage(){
    setPage(page===totalPages ? totalPages : page+1)
  }

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
            {attendees.slice(((page-1)*10), page*10).map((attendee) => {
              return (
                <Tr key={attendee.id}>
                  <TableCell width={60}>
                    <Checkbox/>
                  </TableCell>
                  <TableCell>{attendee.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">
                        {attendee.name}
                      </span>
                      <span className="font-thin ">
                        {(attendee.email).toLowerCase()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{formatRelative(attendee.createdAt, new Date(), { locale: enUS})}</TableCell>
                  <TableCell>{formatRelative(attendee.checkedInAt, new Date(), { locale: enUS})}</TableCell>
                  <TableCell width={60}>
                    <Button label="">
                      <MoreHorizontal />
                    </Button>
                  </TableCell>
                </Tr>
              );
            })}
          </tbody>
          <tfoot>
            <Tr>
              <TableCell colSpan={3}>Mostrando 10 de {attendees.length}</TableCell>
              <TableCell colSpan={3}>
                <div className="flex justify-end items-center px-3">
                  <span className="px-3">Pagina {page} de {totalPages}</span>
                  <Button onClick={goToFirstPage} disabled={page===1}>
                    <ChevronsLeft   />
                  </Button>
                  <Button onClick={goToPreviousPage} disabled={page===1} >
                    <ChevronLeft />
                  </Button>
                  <Button  onClick={goToNextPage} disabled={page===totalPages}>
                    <ChevronRight/>
                  </Button>
                  <Button onClick={goToLastPage} disabled={page===totalPages}>
                    <ChevronsRight  />
                  </Button>
                </div>
              </TableCell>
            </Tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default AttendeeList;
