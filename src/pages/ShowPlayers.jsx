import { Box, Grid, Typography } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { getPlayers, getTotalCount } from "../store/actions/player";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import OutlinedButton from "../components/OutlinedButton";
import ChangeTeamModal from "../components/player/ChangeTeamModal";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import successNotify from "../components/SuccessNotify";
import { successEditMessage } from "../utils/message";
import errorNotify from "../components/ErrorNotify";

const columns = [
  { id: 'first_name', label: 'First Name', minWidth: 170 },
  { id: 'last_name', label: 'Last Name', minWidth: 100 },
  { id: 'position', label: 'Postion', minWidth: 170 },
  { id: 'team', label: 'Team', minWidth: 100 },
  { id: 'actions', label: 'Actions', minWidth: 100 }
];


const ShowPlayers = () => {
  const players = useSelector((state) => state.player.players);
  const totalCount = useSelector((state)=> state.player.totalCount);
  const status = useSelector((state)=> state.status);
  const error = useSelector((state)=> state.error);
  const [playerId, setPlayerId] = useState();
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setOpenModal(false);
    setPlayerId();
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (status.edit_success) {
      successNotify(successEditMessage);
    }
    return () => status.edit_success;
  }, [status.edit_success]);


  useEffect(() => {
    if (error.message !== null) {
      errorNotify(error.message);
    }
    return () => error.message;
  }, [error.message]);


  useEffect(() => {
    dispatch(getPlayers(page + 1));
  }, [dispatch, page, openModal])


  useEffect(() => {
    if (playerId) {
      handleOpen();
    }

  }, [playerId])

  useEffect(()=>{
    dispatch(getTotalCount());
  },[dispatch])

  return (
    <>
      <ToastContainer/>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ width: "100%", bgcolor: 'white' }}>
            <Typography
              variant="h4"
              component="h1"
            >
              <b>Player List</b>
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          {/* table */}
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {players
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            if (column.id === 'actions') {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  <OutlinedButton text="Change Team" size="small" onClick={() => setPlayerId(row.id)} />
                                </TableCell>
                              )

                            }
                            else {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {typeof value === 'object'
                                    ? value.full_name
                                    : value}


                                </TableCell>
                              );
                            }

                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}

            />
          </Paper>
        </Grid>
      </Grid>
      <ChangeTeamModal  openModal={openModal} handleClose={handleClose} playerId={playerId}/>
    </>
  )
}
export default ShowPlayers;