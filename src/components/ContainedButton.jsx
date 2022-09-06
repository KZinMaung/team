import { Button, styled } from "@mui/material";

const StyledContainedButton = styled(Button)(({ theme }) => ({
    backgroundColor: "var(--primary-color)",
    width: "100%",
    borderRadius: "10px",
    "&:hover": {
        borderColor: "var(--primary-color)",
        color: "var(--primary-color)",
        backgroundColor: "transparent",
    },
}));

const ContainedButton = ({text, startIcon=< ></>, onClick=()=>{}}) => {
    return (
        <StyledContainedButton
            size="large"
            variant="contained"
            startIcon={startIcon}
            onClick={onClick}
        >
            {text}
        </StyledContainedButton>
    )
}
export default ContainedButton;