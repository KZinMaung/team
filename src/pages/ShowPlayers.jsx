import { Box, Grid, Typography } from "@mui/material";
import { useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from "react";
import { getPlayers } from "../store/actions/player";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import OutlinedButton from "../components/OutlinedButton";

const columns = [
  { id: 'first_name', label: 'First Name', minWidth: 170 },
  { id: 'last_name', label: 'Last Name', minWidth: 100 },
  { id: 'position', label: 'Postion', minWidth: 170 },
  { id: 'team', label: 'Team', minWidth: 100 },
  { id: 'actions', label:'Actions', minWidth: 100}
];


const ShowPlayers = () => {
    const players = useSelector((state)=> state.player.players);
    const dispatch = useDispatch();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  

    useEffect(()=>{
        dispatch(getPlayers(page+1));
    },[dispatch, page])
    console.log("Players:", players)

    const handleChangeTeam = (row)=>{
      console.log("Row:", row)
    }
    return (
        <>
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
                      if(column.id === 'actions'){
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <OutlinedButton text="Change Team" size="small" onClick={()=>{handleChangeTeam(row)}}/>
                          </TableCell>
                        )
                        
                      }
                      else{
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
        rowsPerPageOptions={[]}
        component="div"
        count={100}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
       
      />
    </Paper>
                </Grid>
            </Grid>
        </>
    )
}
export default ShowPlayers;