import TitleEditorComponent from "../components/titleEditor/TitleEditorComponent";
import { MRT_ColumnDef } from "material-react-table";
import { Task } from "./Task";
import SelectOptionComponent from "../components/selectOption/SelectOptionComponent";
import DatePickerComponent from "../components/DatePicker/DatePickerComponent";
import ActionsComponent from "../components/actions/ActionsComponent";

export const Columns: MRT_ColumnDef<Task>[] = [
  {
    accessorKey: "task_title",
    header: "Title",
    size: 650,
    Cell: (table) => <TitleEditorComponent task={table.row.original} />,
  },
  {
    accessorKey: "status",
    header: "Stauts",
    size: 200,
    Cell: (table) => <SelectOptionComponent task={table.row.original} />,
  },
  {
    accessorKey: "tags",
    header: "Tags",
    size: 200,
  },
  {
    accessorKey: "due_date",
    header: "Due date",
    size: 260,
    Cell: (table) => <DatePickerComponent task={table.row.original} />,
  },
  {
    header: "Actions",
    size: 260,
    Cell: (table) => <ActionsComponent task={table.row.original} />,
  },
];
