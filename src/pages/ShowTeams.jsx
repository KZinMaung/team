import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Grid, IconButton, Modal, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { deleteTeam, editTeam, getTeam, getTeams } from "../store/actions/team";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { Stack } from "@mui/system";
import ContainedButton from "../components/ContainedButton";
import AddIcon from '@mui/icons-material/Add';


const columns = [
  { id: 'full_name', label: 'Full Name', minWidth: 170 },
  { id: 'city', label: 'City', minWidth: 100 },
  { id: 'division', label: 'Division', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 100 }
];


const ShowTeams = () => {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const handleOpenCreateModal = () => setOpenCreateModal(true);
  const handleCloseCreateModal = () => setOpenCreateModal(false);

  const teams = useSelector((state) => state.team.teams);
  const team = useSelector((state) => state.team.team);
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const theme = useTheme();
  const downThanMd = useMediaQuery(theme.breakpoints.down('md'));
  const downThanLg = useMediaQuery(theme.breakpoints.down('lg'));
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: downThanLg ? (downThanMd ? "65vw" : "50vw") : "35vw",
    p: 4,
    borderRadius: "10px"
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleUpdate= (id)=>{
    dispatch(editTeam(id));
  }


  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch])

  const [teamId, setTeamId] = useState();
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getTeam(teamId));
    }
    if (teamId) {
      fetchData();
      handleOpenEditModal();
    }
  }, [teamId, dispatch])

  const [deletedId, setDeletedId] = useState();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    if(deletedId){
      handleClickOpen();
      
    }
    
  },[deletedId])

 const handleDelete = ()=>{
  dispatch(deleteTeam(deletedId));
  handleClose();
 }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item lg={9} md={8} xs={12}>
          <Box sx={{ width: "100%", bgcolor: 'white' }}>
            <Typography
              variant="h4"
              component="h1"
            >
              <b>Team List</b>
            </Typography>
          </Box>
        </Grid>
        <Grid item lg={3} md={4} xs={12}>
          <Box sx={{ width: "100%" }}>
            <ContainedButton text="Add Team" startIcon={<AddIcon />} onClick={handleOpenCreateModal} />
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
                  {teams
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            if (column.id === 'actions') {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  <Stack direction='row' spacing={1}>
                                    <IconButton sx={{ color: "#389e0d" }} aria-label="edit" size="small" onClick={() => setTeamId(row.id)}>
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton sx={{ color: "red" }} aria-label="delete" size="small" onClick={()=> setDeletedId(row.id)}>
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </Stack>
                                </TableCell>
                              )

                            }
                            else {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {typeof value === 'object'
                                    ? value.name
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
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={teams?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}


            />
          </Paper>
        </Grid>
      </Grid>
      <Modal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style}>
          <Stack spacing={1}>

            <Box>
              <TextField id="standard-basic" label="Full Name" variant="standard" sx={{ width: '100%' }} onChange={(e) => { }} />
            </Box> <Box>
              <TextField id="standard-basic" label="Number of Players" variant="standard" sx={{ width: '100%' }} onChange={(e) => { }} />
            </Box>
            <Box>
              <TextField id="standard-basic" label="City" variant="standard" sx={{ width: '100%' }} onChange={(e) => { }} />
            </Box>
            <Box>
              <TextField id="standard-basic" label="Division" variant="standard" sx={{ width: '100%' }} onChange={(e) => { }} />
            </Box>
            <Box sx={{ width: "100%", pt: "20px" }}>
              <ContainedButton text="Create" onClick={() => { }} />
            </Box>

          </Stack>
        </Paper>
      </Modal>
      <Modal
        open={openEditModal}
        onClose={handleCloseEditModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style}>
          <Stack spacing={1}>

            <Box>
              <TextField id="standard-basic" label="Full Name" variant="standard" sx={{ width: '100%' }} onChange={(e) => { }} InputLabelProps={{ shrink: true }} placeholder={team.full_name} />
            </Box> 
            {/* <Box>
              <TextField id="standard-basic" label="Number of Players" variant="standard" sx={{ width: '100%' }} onChange={(e) => { }} InputLabelProps={{ shrink: true }} placeholder={team.full_name} />
            </Box> */}
            <Box>
              <TextField id="standard-basic" label="City" variant="standard" sx={{ width: '100%' }} onChange={(e) => { }} InputLabelProps={{ shrink: true }} placeholder={team.city} />
            </Box>
            <Box>
              <TextField id="standard-basic" label="Division" variant="standard" sx={{ width: '100%' }} onChange={(e) => { }} InputLabelProps={{ shrink: true }} placeholder={team.division} />
            </Box>
            <Box sx={{ width: "100%", pt: "20px" }}>
              <ContainedButton text="Update" onClick={() => {handleUpdate(team.id)}} />
            </Box>

          </Stack>
        </Paper>
      </Modal>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default ShowTeams;