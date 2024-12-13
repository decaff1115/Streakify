import logo from "../../assets/logo.svg"
import { IconUserCircle, IconCalendar, IconNumber24Small, IconCirclePlus } from "@tabler/icons-react"
import fire  from "../../assets/fire.svg"
import noTaskIcon from "../../assets/HabitSampleIcons.svg"
import noStreaks from "../../assets/NoStreaks.svg"
import { Modal, Box, Typography, Select, Button } from "@mui/material"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem('token');

const Dashboard = () => {
  // const [currentStreak, setCurrentStreak] = useState(0)
 // const [longestStreak, setLongestStreak] = useState(0)
  const [open, setOpen] = React.useState(false);
  const [openProfile, setOpenProfile] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenProfile = () => setOpenProfile(true);
  const handleClose = () => setOpen(false);
  const handleCloseProfile = () => setOpenProfile(false);
  const [goal, setGoal] = React.useState('');
  const [time, setTime] = React.useState('');
  const [day, setDay] = React.useState('');
  const [repeat, setRepeat] = React.useState('');
  const [task, setTasks] = useState(false);

  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Decode the JWT token to get the user ID
    const token = localStorage.getItem('authToken'); // assuming the token is stored in localStorage
    if (token) {
      const decodedToken = jwtDecode(token);  // Decode the token to get user data
      //console.log('Fetched data:', decodedToken);
      const userId = decodedToken.userId;  // Assuming the ID is stored in 'id' field
      // Fetch user data using the user ID
      fetchUserData(userId);
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${userId}`, { 
        method: 'GET',
        headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    console.log('Fetched datarem:', userId);
      const data = await response.json();
      localStorage.setItem("name", data);
      //console.log('Fetched datawow:', data.username);
      setUsername(data.username);
      console.log('Fetched datauow:', username);
    } catch (err) {
      console.error(error);
      setError("Error fetching user data");
    }
  };

  

  const handleGoal = (event) => {
    setGoal(event.target.value);
  };

  const handleTime = (event) => {
    setTime(event.target.value);
  };

  const handleDay = (event) => {
    setDay(event.target.value);
  };

  const handleRepeat = (event) => {
    setRepeat(event.target.value);
  };
  
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 800,
      height: 450,
      bgcolor: '#7F45FF',
      boxShadow: 24,
      p: 5,
    };
    const taskArray = [{
      task: "Drink Water",
      time: "Awhile ago", 
    },
    {
      task: "Drink Water",
      time: "Awhile ago",
      
    },
    {
      task: "Drink Water",
      time: "Awhile ago",
      
    },
    {
      task: "Drink Water",
      time: "Awhile ago",
      
    },
    {
      task: "Drink Water",
      time: "Awhile ago",
      
    },{
      task: "Drink Water",
      time: "Awhile ago",
      
    },
    {
      task: "Drink Water",
      time: "Awhile ago",
      
    },
        {
      task: "Drink Water",
      time: "Awhile ago",
      
    }
  ]


  return (
      <div className="w-full h-screen flex flex-col bg-[#B4BAFF] overflow-y-hidden overflow-x-hidden">
      <div className="flex w-full h-[78px] justify-center items-center bg-white shadow-[0px_0px_9px_0px_rgba(0,0,0,1)]">
          <img src={logo} className="streakifyLogo"/>
        </div>

        <div className="flex border-red-600 h-full w-full justify-between">
          {/* Sidebar div */}
          <div className="flex w-[30%] justify-center bg-[#4D57C8] p-[20px] border-red-600">
            <div className="border-blue-600 h-max flex flex-col">
            {/*Button div */}
            <button onClick={handleOpenProfile} className="flex bg-[#B4BAFF] h-[53px] mb-[30px] items-center w-[278px] justify-start rounded-[8px] p-[15px]"> 
              <div className="flex justify-between items-center">
                <IconUserCircle size={35} color="#2C2268"/>
                <h1 className="text-[24px] font-bold ml-[25px]"> {username}'s Profile </h1>
              </div>
            </button>
            <Modal
                      open={openProfile}
                      onClose={handleCloseProfile}
                      aria-labelledby="modal-profile-title"
                      aria-describedby="modal-profile-description"
                    >
                  <Box sx={style}>
                    <Typography id="modal-profile-title" variant="h6" component="h2" className="text-white font-bold">
                      My Profile
                    </Typography>
                    <div className="font-semibold rounded-[10px] items-center flex w-[100%] text-[15px] justify-center h-[71px] p-[20px] text-center bg-[#FFFFFF] text-[#4D57C8]"> 
                      First Name Last Name  
                    </div>
                    <button onClick={handleOpenProfile} className="flex bg-[#B4BAFF] h-[53px] mb-[30px] items-center w-[278px] justify-start rounded-[8px] p-[15px]"> 
                      <div className="flex justify-between items-center">
                        <h1 className="text-[24px] font-bold ml-[25px]">Delete account</h1>
                      </div>
                    </button>
                  </Box>  
            </Modal>
            {/*Button div */}
              <div>
                <Button style={{ justifyContent: "start" }} className="flex hover:bg-[#B4BAFF] h-[53px] items-center w-[278px] rounded-[8px] p-[15px]"> 
                  <div className="flex justify-between items-center">
                    <IconNumber24Small size={40} color="#2C2268"/>
                    <p className="text-[24px] font-bold ml-[25px] text-black"> <a href="/Dashboard">DAILY</a></p>
                  </div>
                </Button>
              </div>

              <div>
                <Button style={{ justifyContent: "start" }} className="flex hover:bg-[#B4BAFF] h-[53px] items-center w-[278px] justify-start rounded-[8px] p-[15px]"> 
                  <div className="flex justify-between items-center">
                    <img src={fire} className="w-[40px]"/>
                    <p className="text-[24px] font-bold ml-[25px] text-black" > <a href="/Progress">PROGRESS</a></p>
                  </div>
                </Button>
              </div>

            </div>
          </div>
          
          <div className="w-full h-full flex flex-col">
            <div className="h-[10%] border-b flex w-full items-center justify-end pr-[20px] pl-[20px]"> 
              <div className="flex items-center justify-between border-red-600  w-[180px] h-full">
                <button className="bg-[#7F45FF] rounded-[14px] w-max items-center justify-center flex text-white h-[60%] p-[10px]">
                  <div className="flex w-[100px] items-center justify-center">  
                      <IconCalendar color="white" size={32} className="mr-[10px]"/> 
                      Today
                  </div> 
                  </button>
                  <button onClick={handleOpen}><IconCirclePlus size={32}/></button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className="text-white font-bold">
                      New Habit
                    </Typography>
                    <div className=" flex h-full w-full">
                      <div className="w-full h-full border-red-600 p-[15px]">
                        <div className="flex flex-col">
                          <h1 className="text-white">Name</h1>

                      <input className="flex w-full h-[37px] rounded-md"/>
                        </div>
                          <div className="flex w-full border-red-600 h-max">
                            <div className="flex w-full h-full border border-yellow-500 ">
                              <div className=" flex flex-col border-blue-600 border w-[60%]">
                                <div className="flex mt-[20px] justify-between">
                                  <div className="flex">
                                    <input className="flex w-[100px] bg-[#B4BAFF] text-white placeholder:text-white" placeholder="Goal"/>
                                  </div>
                                  <Box sx={{
                                    minWidth: 150, // Adjust the minimum width
                                    maxWidth: 200, // Set a maximum width if needed
                                    backgroundColor: "#A5A1FF", // Background color
                                    borderRadius: "8px", // Rounded corners
                                    '& .MuiOutlinedInput-notchedOutline': {},
                                    '& .MuiInputBase-root': {
                                      color: "white", // Text color
                                      height: "40px", // Adjust height
                                    },
                                    '& .MuiInputLabel-root': {
                                      color: "white", // Label color
                                    },
                                    '& .MuiSvgIcon-root': {
                                      color: "white", // Dropdown arrow color
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                      borderColor: "white",
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                      borderColor: "white",
                                    },
                                    '&:focus': {
                                      outline: "none",
                                    },
                                  }}>
                                    <FormControl fullWidth>
                                      <InputLabel id="demo-simple-select-label" sx={{ color: 'white' }}>Time</InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={time}
                                        label="Time"
                                        onChange={handleTime}
                                      >
                                        <MenuItem value={10}>Times</MenuItem>
                                        <MenuItem value={30}>Minutes</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Box>

                                  <Box sx={{
                                      minWidth: 120,
                                      backgroundColor: "#A5A1FF", // Background color
                                      borderRadius: "8px", // Rounded corners
                                      '& .MuiOutlinedInput-notchedOutline': {
                                      },
                                      '& .MuiInputBase-root': {
                                        color: "white", // Text color
                                        height: "40px"
                                      },
                                      '& .MuiInputLabel-root': {
                                        color: "white", // Label color
                                      },
                                      '& .MuiSvgIcon-root': {
                                        color: "white", // Dropdown arrow color
                                      },
                                      '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: "white",
                                      },
                                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: "white",
                                      },
                                    '&:focus': {
                                        outline: "none",
                                      },
                                    }}>
                                    <FormControl fullWidth>
                                      <InputLabel id="demo-simple-select-label" sx={{color: 'white'}}>Per Day</InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={day}
                                        label="Per Day"
                                        onChange={handleDay}
                                      >
                                        <MenuItem value={10}>Per Day</MenuItem>
                                        <MenuItem value={30}>Per Week</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Box>
                                </div>
                                  <input className="flex w-full h-[37px] rounded-md mt-[15px]"/>
                                </div>
                              <div className="flex flex-col justify-center border w-[40%] items-center">
                                <div className="flex flex-col text-[11px]">
                                  <div>Repeat</div>
                                  <Box sx={{
                                    width: 200,
                                      minWidth: 120,
                                      backgroundColor: "#A5A1FF", // Background color
                                      borderRadius: "8px", // Rounded corners
                                      '& .MuiOutlinedInput-notchedOutline': {
                                      },
                                      '& .MuiInputBase-root': {
                                        color: "white", // Text color
                                        height: "40px"
                                      },
                                      '& .MuiInputLabel-root': {
                                        color: "white", // Label color
                                      },
                                      '& .MuiSvgIcon-root': {
                                        color: "white", // Dropdown arrow color
                                      },
                                      '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: "white",
                                      },
                                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: "white",
                                      },
                                    '&:focus': {
                                        outline: "none",
                                      },
                                    }}>
                                    <FormControl fullWidth>
                                      <InputLabel id="demo-simple-select-label" sx={{color: 'white'}}></InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={day}
                                        label="Per Day"
                                        onChange={handleDay}
                                      >
                                        <MenuItem value={10}>Per Day</MenuItem>
                                        <MenuItem value={30}>Per Week</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Box>
                                </div>

                                <div className="flex flex-col text-[11px]">
                                  <div>Start Date</div>
                                  <Box sx={{
                                      width: 165,
                                      minWidth: 120,
                                      backgroundColor: "#A5A1FF", // Background color
                                      borderRadius: "8px", // Rounded corners
                                      '& .MuiOutlinedInput-notchedOutline': {
                                      },
                                      '& .MuiInputBase-root': {
                                        color: "white", // Text color
                                        height: "40px"
                                      },
                                      '& .MuiInputLabel-root': {
                                        color: "white", // Label color
                                      },
                                      '& .MuiSvgIcon-root': {
                                        color: "white", // Dropdown arrow color
                                      },
                                      '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: "white",
                                      },
                                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: "white",
                                      },
                                    '&:focus': {
                                        outline: "none",
                                      },
                                    }}>
                                    <FormControl fullWidth>
                                      <InputLabel id="demo-simple-select-label" sx={{color: 'white'}}></InputLabel>
                                      <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={day}
                                        label="Per Day"
                                      >
                                        <MenuItem value={10}>Per Day</MenuItem>
                                        <MenuItem value={30}>Per Week</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Box>
                                </div>    

                              </div>
                              </div>
                            </div>
                          </div>
                      </div>
                  </Box>
                </Modal>
              </div>
            </div>
            
            {/* MAIN CONTENT DIV */}
            <div className="w-full h-[calc(100vh-120px)] flex flex-col border-red-600 overflow-y-auto items-center p-[20px] scrollbar-hide">
              {taskArray.length === 0 && (
                <div className="flex flex-col items-center justify-center">
                  <div>
                    <img src={noTaskIcon} className="2xl:w-[900px]" alt="No tasks" />
                  </div>
                  <button className="bg-[#7889DF] text-white w-[90%] h-[72px] rounded-[16px] text-[16px] mt-4">
                    You have nothing to do. Add a new habit now!
                  </button>
                </div>
              )}
              {taskArray.map((task, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md w-[90%] mb-4 border border-gray-300"
                >
                  <h2 className="text-lg font-bold text-gray-800">{task.task}</h2>
                  <p className="text-sm text-gray-600">{task.time}</p>
                </div>
              ))}
            </div>
              </div>

              <div className="2xl:w-[40%] lg:w-[60%] p-[30px] flex items-center border-l flex-col">
                <div className="font-semibold rounded-[10px] items-center flex w-[100%] text-[15px] justify-center h-[71px] p-[20px] text-center bg-[#FFFFFF] text-[#4D57C8]"> Complete habit to build your longest streak of 
                  perfect day.  
                </div>

                <div className="w-full flex items-center justify-between mt-[24px] rounded-[10px] bg-[#FFFFFF] border-red-600 h-[182px] relative">
                  <div className="flex-col flex text-[#373737] w-full h-full items-start justify-center z-20">
                    <div className="flex-col flex border-red-600 w-max h-max ml-[10px]">
                      <h1 className="text-[24px]">{/*currentStreak*/0} Day </h1>
                      <h1> Your Current Streak </h1>
                    </div>
                    <div className="flex-col flex w-max h-max ml-[10px]">
                      <h1 className="text-[24px]">{/*longestStreak*/0} Day </h1>
                      <h1> Your Longest Streak</h1>
                    </div>
                </div>
                    <img
                      src={noStreaks}
                      alt="No Streaks"
                      className="absolute top-0 left-0 w-full h-[112.5%] object-cover rounded-[10px]"
                    />
                </div>
              </div>
          </div>
      </div>
  )
}

export default Dashboard