import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TablePaginationActions from '../TablePaginationActions';
import { useState, ChangeEvent, MouseEvent } from 'react';

const rows = [
  { name: 'Prova 1', classes: 'Matemática', createdAt: '2021-10-10' },
  { name: 'Prova 2', classes: 'Português', createdAt: '2021-10-10' },
  { name: 'Prova 3', classes: 'História', createdAt: '2021-10-10' },
  { name: 'Prova 4', classes: 'Geografia', createdAt: '2021-10-10' },
  { name: 'Prova 5', classes: 'Física', createdAt: '2021-10-10' },
  { name: 'Prova 6', classes: 'Química', createdAt: '2021-10-10' },
  { name: 'Prova 7', classes: 'Biologia', createdAt: '2021-10-10' },
  { name: 'Prova 8', classes: 'Inglês', createdAt: '2021-10-10' },
  { name: 'Prova 9', classes: 'Espanhol', createdAt: '2021-10-10' },
  { name: 'Prova 10', classes: 'Artes', createdAt: '2021-10-10' },
  { name: 'Prova 11', classes: 'Educação Física', createdAt: '2021-10-10' },
  { name: 'Prova 12', classes: 'Filosofia', createdAt: '2021-10-10' },
  { name: 'Prova 13', classes: 'Sociologia', createdAt: '2021-10-10' },
  { name: 'Prova 14', classes: 'Ensino Religioso', createdAt: '2021-10-10' },
  { name: 'Prova 15', classes: 'Língua Portuguesa', createdAt: '2021-10-10' },
  { name: 'Prova 16', classes: 'Matemática', createdAt: '2021-10-10' },
  { name: 'Prova 17', classes: 'Português', createdAt: '2021-10-10' },
  { name: 'Prova 18', classes: 'História', createdAt: '2021-10-10' },
  { name: 'Prova 19', classes: 'Geografia', createdAt: '2021-10-10' },
];

interface ProfessorTableProps {
  openDialog: () => void;
}

export default function ProfessorTable({
  openDialog,
}: ProfessorTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  // page > 0 ? Math.max(0, (1 + page) * rowsPerPage - 0) : 0;

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow className="w-full">
            <TableCell>Nome</TableCell>
            <TableCell>Disciplinas</TableCell>
            <TableCell>Data de entrada</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.name} className="w-full">
              <TableCell className="w-1/3">{row.name}</TableCell>
              <TableCell className="w-1/3">{row.classes}</TableCell>
              <TableCell className="w-1/3">{row.createdAt}</TableCell>
              <TableCell className="flex gap-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Editar
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Apagar
                </button>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows?.length}
              // count={0}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
