import { Button } from "@mui/material";
import styled from '@emotion/styled';

const StyledOutlinedButton = styled(Button)(({ theme }) => ({
    borderColor: "var(--primary-color)",
    color: "var(--primary-color)",
    '&:hover': {
        borderColor: "var(--primary-color)",
        backgroundColor: "var(--primary-color)",
        color: "white",
    },
}));

const OutlinedButton = ({ text, onClick, size }) => (
    <StyledOutlinedButton variant="outlined" onClick={onClick} size={size}>{text}</StyledOutlinedButton>
)

export default OutlinedButton;