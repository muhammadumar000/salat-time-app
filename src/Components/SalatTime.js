import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import PlaceIcon from '@mui/icons-material/Place';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import {CircularProgress} from "@mui/material";


export default function SalatTime() {

  const [prayerTimeData, setPrayerTimeData] = React.useState(null);
  const [cityName, setCityName] = React.useState("");
  const [hour,setHour] = React.useState('');
  const [minutes,setMinutes] = React.useState('');
  const [seconds,setSeconds] = React.useState('');
  const [isLoading,setIsLoading] = React.useState(false);

  const fetchPrayerTimes = async (name) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://muslimsalat.p.rapidapi.com/${name}.json`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "e538a949f4mshb7b566383dcf0eep14bdcbjsnbc696cae1988",
            "X-RapidAPI-Host": "muslimsalat.p.rapidapi.com",
          },
        }
      );
      const data = await response.json();
      setIsLoading(false);
      setPrayerTimeData(data);
      console.log(data);
    } catch (err) {
      alert('Something went Wrong');
      // function to check odd number


    }
  };

  const currentTime = () => {
    const time = new Date();
    setHour(time.getHours())
    setMinutes(time.getMinutes())
    setSeconds(time.getSeconds())
  }

  const searchHandler = () => {
    if (cityName) {
      fetchPrayerTimes(cityName);
      setCityName("");
    } else {
      alert("Enter City Name");
    }
  };

  React.useEffect(() => {
    setTimeout(currentTime,1000)
  })




  return (
    <Box
      flexDirection="column"
      gap="1rem"
      display="flex"
      justifyContent="center"
      alignItems="center"
      paddingY='1rem'
      bgcolor='#E1E2E2'
      sx={{borderRadius:'10px',minWidth:{xs:'80%',sm:'40%'},margin:{xs:'1rem',sm:'unset'}}}
    >
      <Box
        gap="1rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{flexDirection:{xs:'column',sm:'row'}}}
      >
        <TextField
          id="outlined-basic"
          label="City Name..."
          variant="outlined"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
          autoFocus
          sx={{ width: {sm: "22rem",xs:'18rem'},'&:active':{border:'none'},'input':{height:'1rem','&:hover':{outline:'none'}}, 'label':{color:'#1D2228','&:hover':{bgcolor:'red'}} }}
        />
        <Button
          sx={{ height: "2.8rem" ,width:'10rem',bgcolor:'#FB8122',color:'#E1E2E2','&:hover':{bgcolor:'#1D2228'}}}
          variant="contained"
          onClick={searchHandler}
        >
          Search
        </Button>
        </Box>
        {
          isLoading?
          (
            <CircularProgress />
          )
          :
          (
            <>
      <Grid mt={1} width='90%' container spacing={2}>
        <Grid  item xs={6}>
        {prayerTimeData && (
          <Typography  variant="h6">City: {prayerTimeData.query}</Typography>
        )}
        </Grid>
        <Grid  item xs={6}>
        {prayerTimeData && (
          <Typography  variant="h6">Date: {prayerTimeData.items[0].date_for}</Typography>
        )}
        </Grid>
        <Grid  item xs={6}>
        {prayerTimeData && (
          <Typography  variant="h6">Sunrise: {prayerTimeData.items[0].shurooq}</Typography>
        )}
        </Grid>
        <Grid  item xs={6}>
        {prayerTimeData && (
          <Typography variant="h6 sx={{fontSize:'1.2rem'}}">Time: {hour}:{minutes}:{seconds}</Typography>
        )}
        </Grid>
      </Grid>
      
      
          {prayerTimeData && (
            <TableContainer
            sx={{ width: {sm: "32rem",xs:'22rem'}, padding: "1rem", bgcolor:'#FB8122' }}
            component={Paper}
          >
            <Table sx={{ width: {sm: 400,xs:300} }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell color='#1D2228' sx={{fontSize:'1.2rem'}}>Prayer</TableCell>
                  <TableCell color="#1D2228" sx={{fontSize:'1.2rem'}} align="left">Prayer Time</TableCell>
                </TableRow>
              </TableHead>
            <TableBody >
              <TableRow >
                <TableCell sx={{fontSize:'1.2rem'}} component="th" scope="row">
                  fajr
                </TableCell>
                <TableCell sx={{fontSize:'1.2rem'}}l align="left">
                  {prayerTimeData.items[0].fajr}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontSize:'1.2rem'}} component="th" scope="row">
                  dhuhr
                </TableCell>
                <TableCell sx={{fontSize:'1.2rem'}} align="left">
                  {prayerTimeData.items[0].dhuhr}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontSize:'1.2rem'}} component="th" scope="row">
                  asr
                </TableCell>
                <TableCell sx={{fontSize:'1.2rem'}} align="left">
                  {prayerTimeData.items[0].asr}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontSize:'1.2rem'}} component="th" scope="row">
                  maghrib
                </TableCell>
                <TableCell sx={{fontSize:'1.2rem'}} align="left">
                  {prayerTimeData.items[0].maghrib}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{fontSize:'1.2rem'}} component="th" scope="row">
                  isha
                </TableCell>
                <TableCell sx={{fontSize:'1.2rem'}} align="left">
                  {prayerTimeData.items[0].isha}
                </TableCell>
              </TableRow>
            </TableBody>
            </Table>
      </TableContainer>
          )}
     
            </>
          )
        }
    
    </Box>
  );
}
