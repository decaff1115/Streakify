import logo from "../../assets/logo.svg"
import { IconExclamationCircle, IconEdit,IconTrash, IconUserCircle, IconCalendar, IconNumber24Small, IconCirclePlus } from "@tabler/icons-react"
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
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [deleteTask, setDeleteTask] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const deleteOpen = () => setDeleteTask(true);
  const deleteClose = () => setDeleteTask(false);
  const editOpen = () => setEditTask(true);
  const editClose = () => setEditTask(false);

  const [username, setUsername] = useState('');

  const [showAddHabit, setShowAddHabit] = useState(false);

  const [openProfile, setOpenProfile] = React.useState(false);
  const handleOpenProfile = () => setOpenProfile(true);
  const handleCloseProfile = () => setOpenProfile(false);

  const [taskArray, setTaskArray] = useState([
    { task: "Task 1", time: "10:00 AM", isChecked: false },
    { task: "Task 2", time: "11:00 AM", isChecked: false },
    { task: "Task 3", time: "12:00 PM", isChecked: false },
  ]);

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

  

  const handleCheckboxChange = (index) => {
    const updatedTasks = [...taskArray];
    updatedTasks[index].isChecked = !updatedTasks[index].isChecked;

    // Sort tasks so checked ones move to the bottom
    updatedTasks.sort((a, b) => a.isChecked - b.isChecked);

    setTaskArray(updatedTasks);
  };
  
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 800,
      height: 420,
      bgcolor: '#7F45FF',
      boxShadow: 24,
      p: 5,
    };

    const style2 = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 750,
      height: 220,
      bgcolor: '#4D57C8',
      boxShadow: 24,
      p: 5,
    };

    const navigate = useNavigate();
    
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

            {/* Profile Modal */}
            <Modal open={openProfile} onClose={handleCloseProfile} aria-labelledby="modal-profile-title">
              <Box sx={style}>
                <Typography id="modal-profile-title" variant="h6" component="h2" className="text-white font-bold">
                  My Profile
                </Typography>
                <div className="font-semibold rounded-[10px] items-center flex w-full text-[15px] justify-center h-[71px] p-[20px] text-center bg-[#FFFFFF] text-[#4D57C8]">
                  First Name Last Name
                </div>
                <button onClick={handleOpenProfile} className="flex border ml-[60%] mt-[200px] bg-[#B4BAFF] h-[53px] mb-6 items-center w-full md:w-[278px] justify-start rounded-[8px] p-[15px]">
                  <div className="flex justify-between items-center w-full">
                    <h1 className="text-[20px] font-bold flex items-center justify-center w-full">Delete account</h1>
                  </div>
                </button>
              </Box>
            </Modal>

            
            {/*Button div */}
              <div>
                <Button style={{ justifyContent: "start" }} className="flex hover:bg-[#B4BAFF] h-[53px] items-center w-[278px] rounded-[8px] p-[15px]"> 
                  <div className="flex justify-between items-center">
                    <IconNumber24Small size={40} color="#2C2268"/>
                    <h1 className="text-[24px] font-bold ml-[25px] text-black"> DAILY</h1>
                  </div>
                </Button>
              </div>

              <div>
                <Button onClick={() => navigate("/Progress")} style={{ justifyContent: "start" }} className="flex hover:bg-[#B4BAFF] h-[53px] items-center w-[278px] justify-start rounded-[8px] p-[15px]"> 
                  <div className="flex justify-between items-center">
                    <img src={fire} className="w-[40px]"/>
                    <h1 className="text-[24px] font-bold ml-[25px] text-black"> PROGRESS </h1>
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
                    <div className=" flex flex-col h-full w-full">
                      <div className="w-full h-full border-red-600 p-[5px]">
                        <div className="flex flex-col ml-[20px]">
                          <h1 className="text-white">Name</h1>
                          <input className="flex h-[37px] rounded-md border"/>
                          <h1 className="text-white mt-[20px]">Goal</h1>
                          <input className="flex h-[37px] rounded-md border"/>
                          <h1 className="text-white mt-[20px]">Start Date</h1>
                          <input className="flex h-[37px] rounded-md border" placeholder={new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric",
                      })}/>
                        </div>
                      </div>
                                          <div className="flex h-max mt-[0%] border-red-600 justify-end">
                                            <Button onClick={editClose}
                                              sx={{
                                              height: "32px",
                                              color: "white",
                                              backgroundColor: "#A5A1FF",
                                              '&:hover': {
                                                backgroundColor: "#1F1A4A", // Change background on hover
                                              },
                                              borderRadius: "8px", // Rounded corners
                                              padding: "8px 16px", // Adjust padding
                                            }}
                                            >Delete</Button>
                                            <Button onClick={editClose}  sx={{
                                              height: "32px",
                                              color: "white",
                                              backgroundColor: "#2C2268",
                                              '&:hover': {
                                                backgroundColor: "#1F1A4A", // Change background on hover
                                              },
                                              borderRadius: "8px", // Rounded corners
                                              padding: "8px 16px", // Adjust padding
                                              marginLeft: "25px",
                                              marginRight: "40px",
                                              marginBottom: "20px"
                                            }}
                                          >Save</Button>
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
                  className="bg-white p-4 flex rounded-lg shadow-md w-[90%] mb-4 border-red-600"
                >

                <input type="checkbox" checked={task.isChecked} onChange={()=> handleCheckboxChange(index)}/>
                  <div className="flex flex-col w-[60%] justify-center ml-[20px]">
                    <h2 className="text-lg font-bold text-gray-800">{task.task}</h2>
                    <p className="text-sm text-gray-600">{task.time}</p>
                  </div>

                  <div className="flex w-full h-full items-center justify-end border-red-600">
                    <Button onClick={deleteOpen}>
                      <IconTrash color="#7889DF"/>
                    </Button>
                    <Button onClick={editOpen}>
                      <IconEdit color="#7889DF"/>
                    </Button>                      
                  </div>
                </div>
              ))}

                <Modal
                  open={deleteTask}
                  onClose={deleteClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                <Box sx={style2}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      <h1 className="flex text-[white] items-center w-[29%] justify-between">
                        <IconExclamationCircle color="red" size={30}/>
                        CONFIRMATION
                      </h1>
                    </Typography>
                    <Typography id="modal-modal-description" className="text-white w-full items-center justify-center flex text-[16px]" sx={{ mt: 2 }}>
                      <h1 className="text-[20px]">Are you sure you want to delete Habit?</h1>
                    </Typography>
                    <div className="flex w-full border-red-500 justify-end mt-[48px]">
                      <div className=" border-red-600 justify-end">
                        <Button onClick={deleteClose} variant="contained" style={{ background: "#A5A1FF" }} className="flex justify-end w-max border border-red-600">
                          <h1 className="text-white">CANCEL</h1>
                        </Button>
                      </div>
                      <div className="flex border-red-600 justify-end">
                        <Button onClick={deleteClose} variant="contained" style={{ background: "#2C2268", marginLeft: "20px" }} className="flex justify-end w-max border  border-red-600">
                          <h1 className="text-white">OK</h1>
                        </Button>
                        </div>
                    </div>
                  </Box>
                </Modal>

                <Modal
                      open={editTask}
                      onClose={editClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className="text-white font-bold">
                      Edit Habit
                    </Typography>
                    <div className=" flex h-full w-full">
                      <div className="w-full h-full border-red-600 p-[5px]">
                        <div className="flex flex-col">
                          <h1 className="text-white">Name</h1>

                        <input className="flex w-[98%] h-[37px] rounded-md border"/>
                          </div>
                            <div className="flex w-full border-red-600 h-max">
                              <div className="flex w-full h-full border-yellow-500 ">
                                <div className=" flex flex-col border-blue-600 w-[60%]">
                                  <div className="flex mt-[20px] justify-between">
                                    <div className="flex">
                                      <input className="flex w-[100px] bg-[#B4BAFF] text-white placeholder:text-white" placeholder="Goal"/>
                                    </div>
                                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" className="text-white font-bold">
                      New Habit
                    </Typography>
                    <div className=" flex flex-col h-full w-full">
                      <div className="w-full h-full border-red-600 p-[5px]">
                        <div className="flex flex-col ml-[20px]">
                          <h1 className="text-white">Name</h1>
                          <input className="flex h-[37px] rounded-md border"/>
                          <h1 className="text-white mt-[20px]">Goal</h1>
                          <input className="flex h-[37px] rounded-md border"/>
                          <h1 className="text-white mt-[20px]">Start Date</h1>
                          <input className="flex h-[37px] rounded-md border" placeholder={new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric",
                      })}/>
                        </div>
                      </div>
                                          <div className="flex h-max mt-[0%] border-red-600 justify-end">
                                            <Button onClick={editClose}
                                              sx={{
                                              height: "32px",
                                              color: "white",
                                              backgroundColor: "#A5A1FF",
                                              '&:hover': {
                                                backgroundColor: "#1F1A4A", // Change background on hover
                                              },
                                              borderRadius: "8px", // Rounded corners
                                              padding: "8px 16px", // Adjust padding
                                            }}
                                            >Delete</Button>
                                            <Button onClick={editClose}  sx={{
                                              height: "32px",
                                              color: "white",
                                              backgroundColor: "#2C2268",
                                              '&:hover': {
                                                backgroundColor: "#1F1A4A", // Change background on hover
                                              },
                                              borderRadius: "8px", // Rounded corners
                                              padding: "8px 16px", // Adjust padding
                                              marginLeft: "25px",
                                              marginRight: "40px",
                                              marginBottom: "20px"
                                            }}
                                          >Save</Button>
                                          </div>
                                </div>
                              </Box>

                                    <Box
                                          sx={{
                                            minWidth: 120,
                                            backgroundColor: "#A5A1FF", // Background color
                                            borderRadius: "8px", // Rounded corners
                                            '& .MuiOutlinedInput-notchedOutline': {
                                            },
                                            '& .MuiInputBase-root': {
                                              color: "white", // Text color
                                              height: "40px",
                                              display: "flex", // Ensure flexbox alignment works
                                              justifyContent: "center", // Center align horizontally
                                              alignItems: "center", // Center align vertically
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
                                          }}
                                        >
                                    </Box>
                                  </div>
                                    <input className="flex w-full h-[37px] rounded-md mt-[15px]"/>
                                  </div>
                                <div className="flex flex-col justify-center w-[40%] items-center">
                                  <div className="flex flex-col text-[11px] text-white">
                                    <div>Repeat</div>
                                    <Box sx={{
                                      width: 250,
                                        minWidth: 120,
                                        backgroundColor: "white", // Background color
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
     

      {/* Add Habit Popup */}
      {showAddHabit && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Add a New Habit</h2>
            <input type="text" placeholder="Enter your habit" />
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
