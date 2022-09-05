import { Box } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import ShowPlayers from "./ShowPlayers";


const pages = [
    {
        name: 'Dashboard',
        route: 'dashboard',
        element:"<Dashboard/>"
    },
    {
        name: 'Players',
        route: 'show-players',
        element:<ShowPlayers/>
    },
    {
        name: 'Teams',
        route: 'show-teams',
        element:" </>"
    },
   
];

const Admin = () => {
    return (
        <Box>
            <ResponsiveAppBar pages={pages} />
            <Box sx={{ bgcolor:'white',mt: 15 ,padding: '1% 16%' }} component='main'>
            <Routes>
                    <Route path="/" element={<Navigate to="/admin/dashboard"></Navigate>}></Route>
                    {pages.map((page)=>(
                        <Route path={page.route} element={page.element}></Route>
                    ))}
                    
                </Routes>
            </Box>
        </Box>
    )
}
export default Admin;