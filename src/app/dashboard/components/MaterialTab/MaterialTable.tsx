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
import { Material } from '@/app/entity/material.entity';
import { useAuthedQuery } from '@/app/hooks/useAuthedQuery.hook';
import { MaterialService } from '@/app/integration/cefet-material-archive/material/material.service';
import { useAuthedMutation } from '@/app/hooks/useAuthedMutation.hook';

interface MaterialTableProps {
  openFeedbackDialog: (material: Material) => void;
}

export default function MaterialTable({
  openFeedbackDialog,
}: MaterialTableProps) {
  const materialService = new MaterialService();
  const { data, refetch: refreshMaterials } = useAuthedQuery('materials', () =>
    materialService.getAllMaterials()
  );
  const { mutate: deleteMaterial } = useAuthedMutation(
    (id: number) => materialService.deleteMaterial(id),
    {
      onSuccess: () => {
        refreshMaterials();
      },
    }
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const rows: Material[] = data?.data ?? [];

  console.log('rows', rows);

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
            <TableRow key={row.id} className="w-full">
              <TableCell className="w-1/2">{row?.description}</TableCell>
              <TableCell className="w-1/2">{row?.subject?.name}</TableCell>
              <TableCell className="flex gap-4">
                <button
                  className="bg-transparent text-purple-400 border border-solid border-purple-400 font-bold py-2 px-4 rounded"
                  onClick={() => {
                    openFeedbackDialog(row);
                  }}
                >
                  Visualizar
                </button>
                <button
                  onClick={() => {
                    deleteMaterial(row.id);
                  }}
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
