import { Box, Modal, Paper, Stack, TextField, useMediaQuery, useTheme } from "@mui/material";
import ContainedButton from "../ContainedButton";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { editTeam } from "../../store/actions/team";
import errorNotify from "../ErrorNotify";
import { requireMessage } from "../../utils/message";

const EditModal = ({ openEditModal, handleCloseEditModal, team, setTeamId}) => {
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

    const handleUpdate = async (id) => {
        if(city && division && fullName){
            const data = {
                "city": city,
                "division": division,
                "full_name": fullName
            }
            console.log("data:", data)
            await dispatch(editTeam(id, data));
            handleCloseEditModal();
            setTeamId();
        }
        else{
            errorNotify(requireMessage);
        }
    }
    useEffect(() => {
        setFullName(team?.full_name);
        setCity(team?.city);
        setDivision(team?.division);
      }, [team]);
    return (
        <Modal
            open={openEditModal}
            onClose={handleCloseEditModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Paper sx={style}>
                <Stack spacing={1}>

                    <Box>
                        <TextField id="standard-basic" label="Full Name" variant="standard" sx={{ width: '100%' }} onChange={(e) => setFullName(e.target.value)} InputLabelProps={{ shrink: true }} value={fullName} />
                    </Box>
                 
                    <Box>
                        <TextField id="standard-basic" label="City" variant="standard" sx={{ width: '100%' }} onChange={(e) => setCity(e.target.value)} InputLabelProps={{ shrink: true }} value={city} />
                    </Box>
                    <Box>
                        <TextField id="standard-basic" label="Division" variant="standard" sx={{ width: '100%' }} onChange={(e) =>setDivision(e.target.value)} InputLabelProps={{ shrink: true }} value={division} />
                    </Box>
                    <Box sx={{ width: "100%", pt: "20px" }}>
                        <ContainedButton text="Update" onClick={() => handleUpdate(team.id)} />
                    </Box>

                </Stack>
            </Paper>
        </Modal>
    )

}
export default EditModal;