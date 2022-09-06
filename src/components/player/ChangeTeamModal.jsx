import { Box, FormControl, InputLabel, MenuItem, Modal, Paper, Select, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import ContainedButton from "../ContainedButton";
import { useSelector, useDispatch} from "react-redux";
import { changeTeamOfPlayer, getTeam, getTeams } from "../../store/actions";

const ChangeTeamModal = ({ openModal, handleClose , playerId}) => {

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

    const teams = useSelector((state)=> state.team.teams);
    const team = useSelector((state)=> state.team.team);
    const dispatch = useDispatch();
    const [teamId, setTeamId] = useState('');

    useEffect(()=>{
        const fetchData = async ()=>{
            await dispatch(getTeams())
        }
        fetchData();
    },[dispatch])

    useEffect(()=>{
        dispatch(getTeam(teamId))
    }, [dispatch, teamId])

   
    const handleChange = (event) => {
        setTeamId(event.target.value);
      };

      const handleSave = async()=>{
        await dispatch(changeTeamOfPlayer(playerId, team))
        handleClose();
        setTeamId('');
      }
 
      console.log("team:", team)

    return (
        <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Paper sx={style}>
                <Stack spacing={1}>
                    <Box sx={{ margin: 2}}>
                    <Typography variant="body2" fontSize={16} fontWeight={200}>
                        Choose the team to which you want to change!
                    </Typography>
                    </Box>
                   
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Team</InputLabel>
                        
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Team"
                            value={teamId}
                            onChange={handleChange}

                        >
                            {
                                teams.map((team)=>(
                                    <MenuItem value={team.id}>{team.full_name}</MenuItem> 
                                )
                                )
                            }
                        </Select>
                        
                        
                    </FormControl>
                    
                   
                    <Box sx={{ width: "100%", pt: "20px" }}>
                        <ContainedButton text="Save" onClick={handleSave} />
                    </Box>

                </Stack>
            </Paper>
        </Modal>
    )
}
export default ChangeTeamModal;