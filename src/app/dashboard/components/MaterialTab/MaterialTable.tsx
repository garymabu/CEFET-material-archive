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

interface MaterialTableProps {
  openFeedbackDialog: () => void;
}

const rows = [
  { name: 'Prova 1', class: 'Matemática' },
  { name: 'Prova 2', class: 'Português' },
  { name: 'Prova 3', class: 'História' },
  { name: 'Prova 4', class: 'Geografia' },
  { name: 'Prova 5', class: 'Física' },
  { name: 'Prova 6', class: 'Química' },
  { name: 'Prova 7', class: 'Biologia' },
  { name: 'Prova 8', class: 'Inglês' },
  { name: 'Prova 9', class: 'Espanhol' },
  { name: 'Prova 10', class: 'Artes' },
  { name: 'Prova 11', class: 'Educação Física' },
  { name: 'Prova 12', class: 'Filosofia' },
  { name: 'Prova 13', class: 'Sociologia' },
  { name: 'Prova 14', class: 'Ensino Religioso' },
  { name: 'Prova 15', class: 'Língua Portuguesa' },
  { name: 'Prova 16', class: 'Matemática' },
  { name: 'Prova 17', class: 'Português' },
  { name: 'Prova 18', class: 'História' },
  { name: 'Prova 19', class: 'Geografia' },
  { name: 'Prova 20', class: 'Física' },
  { name: 'Prova 21', class: 'Química' },
  { name: 'Prova 22', class: 'Biologia' },
  { name: 'Prova 23', class: 'Inglês' },
  { name: 'Prova 24', class: 'Espanhol' },
  { name: 'Prova 25', class: 'Artes' },
  { name: 'Prova 26', class: 'Educação Física' },
  { name: 'Prova 27', class: 'Filosofia' },
  { name: 'Prova 28', class: 'Sociologia' },
  { name: 'Prova 29', class: 'Ensino Religioso' },
  { name: 'Prova 30', class: 'Língua Portuguesa' },
  { name: 'Prova 31', class: 'Matemática' },
];

export default function MaterialTable({
  openFeedbackDialog,
}: MaterialTableProps) {
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
            <TableCell>Disciplina</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.name} className="w-full">
              <TableCell className="w-1/2">{row.name}</TableCell>
              <TableCell className="w-1/2">{row.class}</TableCell>
              <TableCell className="flex gap-4">
                <button
                  className="bg-transparent text-purple-400 border border-solid border-purple-400 font-bold py-2 px-4 rounded"
                  onClick={openFeedbackDialog}
                >
                  Visualizar
                </button>
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
