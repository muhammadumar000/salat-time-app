import { Box, Typography } from "@mui/material";
import styled from "styled-components";
import SalatTime from './Components/SalatTime'




function App() {
  return (
    
    <Container>
     
      <Box>
        <Typography pt={1} color="#FB8122" align="center" variant="h4">Prayer Time App</Typography>
        <StyledLine />
      </Box>
      <SalatTime />
    </Container>
  );
}

export default App;

const Container = styled.div`
  width:100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  background-color: #1D2228
`
const StyledLine = styled('hr')`
  width:50rem;
  margin-block:1rem;
  background-color:#FB8122;
  border: 1px solid  #FB8122;
  @media (max-width:500px){
    width:20rem
  }
`
