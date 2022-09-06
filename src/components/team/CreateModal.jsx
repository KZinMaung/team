import { Box, Modal, Paper, Stack, TextField, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import ContainedButton from "../ContainedButton";
import { useDispatch } from "react-redux";
import { createTeam } from "../../store/actions/team";

const CreateModal = ({openCreateModal, handleCloseCreateModal})=>{
    const dispatch = useDispatch();

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
   
      const [fullName, setFullName] = useState();
      const [city, setCity] = useState();
      const [division, setDivision] = useState();
      const [noOfPlayers, setNoOfPlayers] = useState();

      const handleCreate = ()=>{
        const data = {
            "full_name": fullName,
            "city": city,
            "division": division,
            "no_of_players": noOfPlayers   
        }
        dispatch(createTeam(data));
        handleCloseCreateModal();
      }
    return(
        <Modal
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style}>
          <Stack spacing={1}>

            <Box>
              <TextField id="standard-basic" label="Full Name" variant="standard" sx={{ width: '100%' }} onChange={(e) => setFullName(e.target.value)} />
            </Box> <Box>
              <TextField id="standard-basic" label="Number of Players" variant="standard" sx={{ width: '100%' }} onChange={(e) => setNoOfPlayers(e.target.value)} />
            </Box>
            <Box>
              <TextField id="standard-basic" label="City" variant="standard" sx={{ width: '100%' }} onChange={(e) => setCity(e.target.value)} />
            </Box>
            <Box>
              <TextField id="standard-basic" label="Division" variant="standard" sx={{ width: '100%' }} onChange={(e) => setDivision(e.target.value)} />
            </Box>
            <Box sx={{ width: "100%", pt: "20px" }}>
              <ContainedButton text="Create" onClick={handleCreate} />
            </Box>

          </Stack>
        </Paper>
      </Modal>
    )
}
export default CreateModal;