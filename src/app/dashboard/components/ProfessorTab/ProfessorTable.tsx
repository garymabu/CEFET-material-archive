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
import { TeacherService } from '@/app/integration/cefet-material-archive/teacher/teacher.service';
import { Teacher } from '@/app/entity/teacher.entity';
import { useAuthedEffectfullMutation } from '@/app/hooks/useAuthedEffectfullMutation.hook';

interface ProfessorTableProps {
  data?: Teacher[];
  onDelete: () => void;
}

export default function ProfessorTable({
  onDelete,
  data,
}: ProfessorTableProps) {
  const teacherService = new TeacherService();
  
  const { mutate: deleteTeacher } = useAuthedEffectfullMutation(
    (id: number) => teacherService.deleteTeacher(id),
    {
      onSuccess: () => {
        onDelete();
      },
    }
  );

  const rows: Teacher[] = data ?? [];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
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
            <TableRow key={row?.id} className="w-full">
              <TableCell className="w-1/3">{row?.user?.displayName}</TableCell>
              <TableCell className="w-1/3">
                {(row?.subjects ?? []).map((subj) => subj.name).join(', ')}
              </TableCell>
              <TableCell className="w-1/3">{row.createdAt}</TableCell>
              <TableCell className="flex gap-4">
                <button
                  onClick={() => deleteTeacher(row.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
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
