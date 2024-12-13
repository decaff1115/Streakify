import logo from "../../assets/logo.svg"
import { IconUserCircle, IconCalendar, IconNumber24Small, IconCirclePlus } from "@tabler/icons-react"
import fire  from "../../assets/fire.svg"
import noTaskIcon from "../../assets/HabitSampleIcons.svg"
import noStreaks from "../../assets/NoStreaks.svg"
import Dots from "../../assets/Dots.svg"
import { Modal, Box, Typography, Select } from "@mui/material"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import React from "react"

const Dashboard = () => {
  // const [currentStreak, setCurrentStreak] = useState(0)
 // const [longestStreak, setLongestStreak] = useState(0)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [age, setAge] = React.useState('');


  const handleChange = (event) => {
    setAge(event.target.value);
  };


    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 736,
      height: 401,
      bgcolor: '#7F45FF',
      boxShadow: 24,
      p: 5,
    };

  

  return (
      <div className="w-full h-screen flex flex-col bg-[#B4BAFF]">
      <div className="flex w-full h-[78px] justify-center items-center bg-white shadow-[0px_0px_9px_0px_rgba(0,0,0,1)]">
          <img src={logo} className="streakifyLogo"/>
        </div>

        <div className="flex border-red-600 h-full w-full justify-between">
          {/* Sidebar div */}
          <div className="flex w-[30%] justify-center bg-[#4D57C8] p-[20px] border-red-600">
            <div className="border-blue-600 h-max flex flex-col">
            {/*Button div */}
            <button className="flex bg-[#B4BAFF] h-[53px] mb-[30px] items-center w-[278px] justify-start rounded-[8px] p-[15px]"> 
              <div className="flex justify-between items-center">
                <IconUserCircle size={35} color="#2C2268"/>
                <h1 className="text-[24px] font-bold ml-[25px]"> John Doe </h1>
              </div>
            </button>
            {/*Button div */}
              <div>
                <button className="flex hover:bg-[#B4BAFF] h-[53px] items-center w-[278px] justify-start rounded-[8px] p-[15px]"> 
                  <div className="flex justify-between items-center">
                    <IconNumber24Small size={40} color="#2C2268"/>
                    <h1 className="text-[24px] font-bold ml-[25px]"> DAILY</h1>
                  </div>
                </button>
              </div>

            <div className="flex">
              <button className="flex hover:bg-[#B4BAFF] h-[53px] items-center w-[278px] justify-start rounded-[8px] p-[15px]"> 
                <div className="flex justify-between items-center">
                  <IconCalendar size={40} color="#2C2268"/>
                  <h1 className="text-[24px] font-bold ml-[25px]"> WEEKLY</h1>
                </div>
              </button>
            </div>

              <div>
                <button className="flex hover:bg-[#B4BAFF] h-[53px] items-center w-[278px] justify-start rounded-[8px] p-[15px]"> 
                  <div className="flex justify-between items-center">
                    <img src={fire} className="w-[40px]"/>
                    <h1 className="text-[24px] font-bold ml-[25px]"> PROGRESS </h1>
                  </div>
              </button>
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
                        <div className="flex flex-col">
                          <div className="flex mt-[20px] justify-between w-full">
                            <Box sx={{
                                  minWidth: 120,
                                  backgroundColor: "#A5A1FF", // Background color
                                  borderRadius: "8px", // Rounded corners
                                  '& .MuiOutlinedInput-notchedOutline': {
                                  },
                                  '& .MuiInputBase-root': {
                                    color: "white", // Text color
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
                                }}>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label" sx={{color: 'white'}}>Goal</InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={age}
                                  label="Goal"
                                  onChange={handleChange}
                                >
                                  <MenuItem value={1}>1</MenuItem>
                                  <MenuItem value={2}>2</MenuItem>
                                  <MenuItem value={3}>3</MenuItem>
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
                                }}>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label" sx={{color: 'white'}}>Time</InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={age}
                                  label="Time"
                                  onChange={handleChange}
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
                              }}>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label" sx={{color: 'white'}}>Per Day</InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={age}
                                  label="Per Day"
                                  onChange={handleChange}
                                >
                                  <MenuItem value={10}>Per Day</MenuItem>
                                  <MenuItem value={30}>Per Week</MenuItem>
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
                              }}>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label" sx={{ color: 'white' }}>Repeat</InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={age}
                                  label="Repeat"
                                  onChange={handleChange}
                                >
                                  <MenuItem value={10}>Daily</MenuItem>
                                  <MenuItem value={20}>Weekly</MenuItem>
                                  <MenuItem value={30}>Monthly</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Box>
                </Modal>
              </div>
            </div>
            
            <div className="w-full items-center justify-center h-full flex flex-col">
              <div className="">
                <img src={noTaskIcon}></img>
              </div>
            
              <button className="bg-[#7889DF] text-white w-[90%] h-[85px] rounded-[16px] text-[16px]"> You have nothing to do. Add a new habit now!</button>
            </div>
          </div>


          <div className="w-[60%] p-[30px] flex items-center border-l flex-col">
            <div className="font-semibold rounded-[10px] items-center flex w-[100%] text-[15px] justify-center h-[71px] p-[20px] text-center bg-[#FFFFFF] text-[#4D57C8]"> Complete habit to build your longest streak of 
              perfect day.  
            </div>

            <div className="w-[100%] flex items-center justify-between mt-[24px] rounded-[10px] bg-[#FFFFFF] border-red-600 h-[182px] relative">
              <div className="flex-col flex text-[#373737] w-full h-full items-center justify-center">
                <div className="flex-col flex">
                  <h1 className="text-[31px]">{/*currentStreak*/0} Day </h1>
                  <h1> Your Current Streak </h1>
                </div>
                <div className="flex-col flex">
                  <h1 className="text-[31px]">{/*longestStreak*/0} Day </h1>
                  <h1> Your Longest Streak</h1>
                </div>
              </div>
                <img src={noStreaks} className="z-10 w-max"></img>
                <img src={Dots} className="absolute z-0"></img>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Dashboard