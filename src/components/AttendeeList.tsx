import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { ChangeEvent, ComponentProps, useEffect, useState } from "react";
import Button from "../lib/Button";
// import { attendeesFake } from "../data/attendees";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

interface TableCellProps extends ComponentProps<"th"> {
  width?: number;
}

interface Attendees {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  checkedInAt: string;
}

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
    ></td>
  );
}

function Tr(props: TableCellProps) {
  return <tr className={`border-b border-white/10`}>{props.children}</tr>;
}

function Checkbox() {
  return (
    <input
      type="checkbox"
      className={`size-4 bg-black/20 rounded checked:bg-orange-300n:bg-orange-300 `}
    />
  );
}

type Props = {};

function AttendeeList({}: Props) {
  const [search, setSearch] = useState(()=>{
    const url = new URL(window.location.toString())
    if(url.searchParams.has('query')){
      return url.searchParams.get('query') ?? ``
    }
    return ''
  });
  const [total, setTotal] = useState(0);
  const totalPages = Math.ceil(total / 10);
  const [page, setPage] = useState(()=>{
    const url = new URL(window.location.toString())
    if(url.searchParams.has('pageIndex')){
      return Number(url.searchParams.get('pageIndex'))
    }
    return 1
  });

  const [attendees, setAtendees] = useState<Attendees[]>([]);

  

    useEffect(() => {
      fetch(`http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees?pageIndex=${page-1}&${(search.length>0) && 'query='+search}`)
        .then((response) => response.json())
        .then((data) => {
          setAtendees(data.attendees);
          setTotal(data?.total);
          console.log(data)
        });
    }, [page,search]);

    useEffect(()=>{
      if(page>totalPages) setCurrentPage(1)
    },[page,total])

    dayjs.extend(relativeTime);

    function setCurrentPage(page:number){
      const url = new URL(window.location.toString())
      url.searchParams.set('pageIndex', String(page))
      window.history.pushState({},"",url)
      setPage(page)
    }

    function setCurrentSearch(search:string){
      const url = new URL(window.location.toString())
      url.searchParams.set('query', String(search))
      window.history.pushState({},"",url)
      setSearch(search)
    }

    function goToFirstPage() {
      setCurrentPage(1)
    }

    function goToLastPage() {
      setCurrentPage(totalPages)
    }

    function goToPreviousPage() {
      // setPage(page === 1 ? 1 : page - 1);
      setCurrentPage(page-1)
    }

    function goToNextPage() {
      // setPage(page === totalPages ? totalPages : page + 1);
     setCurrentPage(page+1)
    }

    function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>): void {
      setCurrentSearch(event.target.value);
      setPage(1)
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
              onChange={onSearchInputChanged}
              value={search}
            ></input>
          </div>
        </div>
        <div className="border border-white/10 rounded-lg">
          <table className="w-full">
            <thead>
              <Th>
                <Checkbox />
              </Th>
              <Th>Id</Th>
              <Th>Attendee</Th>
              <Th>Signed-up</Th>
              <Th>Checked-in</Th>
              <Th>More</Th>
            </thead>
            <tbody>
              {attendees.map((attendee) => {
                return (
                  <Tr key={attendee.id}>
                    <TableCell width={40}>
                      <Checkbox />
                    </TableCell>
                    <TableCell>{attendee.id}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">{attendee.name}</span>
                        <span className="font-thin ">
                          {attendee.email.toLowerCase()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{dayjs(attendee.createdAt).fromNow()}</TableCell>
                    <TableCell>
                      {attendee.checkedInAt === null
                        ? "Not checked-in yet"
                        : dayjs(attendee.checkedInAt).fromNow()}
                    </TableCell>
                    <TableCell width={40}>
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
                <TableCell colSpan={3}>
                  Mostrando {attendees.length} de {total}
                </TableCell>
                <TableCell colSpan={3}>
                  <div className="flex justify-end items-center px-3">
                    <span className="px-3">
                      Pagina {page} de {totalPages}
                    </span>
                    <Button onClick={goToFirstPage} disabled={page === 1}>
                      <ChevronsLeft />
                    </Button>
                    <Button onClick={goToPreviousPage} disabled={page === 1}>
                      <ChevronLeft />
                    </Button>
                    <Button
                      onClick={goToNextPage}
                      disabled={page === totalPages}
                    >
                      <ChevronRight />
                    </Button>
                    <Button
                      onClick={goToLastPage}
                      disabled={page === totalPages}
                    >
                      <ChevronsRight />
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
