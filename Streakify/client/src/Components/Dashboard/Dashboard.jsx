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
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [habitName, setHabitName] = useState("");
  const [goal, setGoal] = useState("");


  //==========ADD HABIT============//
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showAddHabit, setShowAddHabit] = useState(false);

  //==========DELETE HABIT==========//
  const deleteOpen = (taskId) => {
    handleDelete(taskId);
  };
    //const [deleteTask, setDeleteTask] = useState(false);
    //const deleteClose = () => setDeleteTask(false);

  //==========EDIT HABIT=============//
  const [editTask, setEditTask] = useState(false);
  //const editOpen = (taskId) => setEditTask(true);
  const editClose = () => setEditTask(false);

  const [editingHabitId, setEditingHabitId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [editingGoal, setEditingGoal] = useState('');

  const editOpen = (id, name, goal) => {
    setEditingHabitId(id);
    setEditingName(name);
    setEditingGoal(goal);
    setEditTask(true); // Show the modal
  };

  //==========PROFILE=============//
  const [openProfile, setOpenProfile] = React.useState(false);
  const handleOpenProfile = () => setOpenProfile(true);
  const handleCloseProfile = () => setOpenProfile(false);

  //==========DELETE PROFILE==========//
  const [openDelWarning, setDelWarning] = React.useState(false);
  const handleOpenDelWarning = () => setDelWarning(true);
  const handleCloseDelWarning = () => setDelWarning(false);



  //==========TASK ARRAY=============//
  const [taskArray, setTaskArray] = useState([
    //{ id: 1, task: "Task 1", time: "10:00 AM", isChecked: false },
    //{ id: 2, task: "Task 2", time: "11:00 AM", isChecked: false },
    //{ id: 3, task: "Task 3", time: "12:00 PM", isChecked: false },
  ]);


  //============================================================FUNCTIONS===========================================================//
  
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
      fetchUserData(userId);
    }
  }, []);

  //****************************GET USER INFO****************************//
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
      localStorage.setItem("id", userId);
      
      setUsername(data.username);
      console.log('Fetched datauow:', username);
    } catch (err) {
      console.error(error);
      setError("Error fetching user data");
    }
  };

  //****************************CHECKBOX CHANGE****************************//
  const handleCheckboxChange = (index) => {
    const updatedTasks = [...taskArray];
    updatedTasks[index].isChecked = !updatedTasks[index].isChecked;

    // Sort tasks so checked ones move to the bottom
    updatedTasks.sort((a, b) => a.isChecked - b.isChecked);

    setTaskArray(updatedTasks);
  };

  //****************************ADD HABIT****************************//
  const handleSave = async () => {
    // Check if the form is complete
    if (!habitName || !goal) {
      alert("Please fill in all fields.");
    
    }
    const userid = localStorage.getItem('id');
    // Prepare the data to be sent
    const habitData = {
      name: habitName,
      goal: goal,
      user_id: userid, // You would dynamically pass the user_id from your app's state or auth context
    };
    try {
      const response = await fetch("http://localhost:3000/api/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(habitData),
      });
      const newHabit = await response.json();
      if (response.ok) {
        // Update taskArray with the new habit details
        setTaskArray((prevTasks) => [
            ...prevTasks,
            {
                id: newHabit.id,
                name: newHabit.habitName,  // Adjust the property name if necessary
                goal: newHabit.goal,
                isChecked: false,
            },
        ]);
        alert("Habit created successfully!");
    } } 
    catch (error) {
      console.error("Error creating habit:", error);
      alert("Error creating habit.");
    }
  };

  //****************************DELETE HABIT****************************//
  const handleDelete = async (taskId) => {
    try {
      // Send DELETE request to the server
      const response = await fetch(`http://localhost:3000/api/habits/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // If deletion is successful, update the taskArray to remove the deleted habit
        setTaskArray((prevTasks) =>
          prevTasks.filter((task) => task.id !== taskId)
        );
        alert("Habit deleted successfully!");
      } else {
        // Handle any error returned from the server
        alert(`Failed to delete habit: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting habit:", error);
      alert("Error deleting habit.");
    }
  };

  //****************************EDIT HABIT****************************//
  const handleUpdate = async () => {
    const updatedHabit = {
      id: editingHabitId,
      name: editingName,
      goal: editingGoal,
    };

    try {
      const response = await fetch(`http://localhost:3000/api/habits/${editingHabitId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedHabit),
      });

      if (response.ok) {
        const updatedData = await response.json();
        // Update the taskArray with the updated habit details
        setTaskArray((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedData.id
              ? { 
                ...task, 
                name: updatedData.name, 
                goal: updatedData.goal }
              : task
          )
        );
        alert('Habit updated successfully!');
        editClose(); // Close the modal
      } else {
        alert('Failed to update habit.');
      }
    } catch (error) {
      console.error('Error updating habit:', error);
      alert('Error updating habit.');
    }
  };
  
  //****************************DELETE USER****************************//
  const handleDeleteUser = async (userId) => {
    console.log("Deleting user with ID:", userId);  // Log the userId to make sure it's correct

    const token = localStorage.getItem('authToken'); // Get token from localStorage 

    try {
      const response = await fetch(`http://localhost:3000/api/users/deleteUser/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      const data = await response.json();
      console.log('User deleted successfully:', data);
      navigate('/');  // Redirect to WelcomePage (or any route you want)
    } catch (error) {
      console.error('Deletion failed:', error);
    }
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

                {/*User Profile Div*/}
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
                    {username}
                    </div>
                    <button onClick={handleOpenDelWarning} className="flex border ml-[60%] mt-[200px] bg-[#B4BAFF] h-[53px] mb-6 items-center w-full md:w-[278px] justify-start rounded-[8px] p-[15px]">
                      <div className="flex justify-between items-center w-full">
                        <h1 className="text-[20px] font-bold flex items-center justify-center w-full">Delete account</h1>
                      </div>
                    </button>
                  </Box>
                </Modal>
            
                {/*Left SideBar Tabs*/}
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

                  {/*===============================ADD HABIT BUTTON===============================*/ }
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
                              <h1 className="text-white">What habit do you want to keep track of?</h1>
                              <input
                                className="flex h-[37px] rounded-md border"
                                value={habitName}
                                onChange={(e) => setHabitName(e.target.value)} // Update state when user types
                              />
                              <h1 className="text-white mt-[20px]">How many days do you want to keep doing this? Note: It takes 21 days to form a habit!</h1>
                              <input
                                className="flex h-[37px] rounded-md border"
                                value={goal}
                                onChange={(e) => setGoal(e.target.value)} // Update state when user types
                              />
                            </div>
                          </div>

                          <div className="flex h-max mt-[0%] border-red-600 justify-end">
                            <Button
                              onClick={handleSave} // Trigger the save action when clicked
                              sx={{
                              height: "32px",
                              color: "white",
                              backgroundColor: "#2C2268",
                               "&:hover": {
                                backgroundColor: "#1F1A4A",
                               },
                              borderRadius: "8px",
                              padding: "8px 16px",
                              marginLeft: "25px",
                              marginRight: "40px",
                              marginBottom: "20px",
                             }}
                             >Save</Button>
                          </div>
                    </div>
                  </Box>
                </Modal>
              </div>
            </div>


            {/*===============================EDIT HABIT BUTTON===============================*/ }
            <div>
            {/* Edit Habit Modal */}
            <Modal 
              open={editTask} 
              onClose={editClose}
            >
              <Box sx={{ style }}>
                <div className="flex h-full w-full">
                  <div className="w-full h-full border-red-600 p-[5px]">
                    <div className="flex w-full border-red-600 h-max">
                      <div className="flex w-full h-full border-yellow-500">
                        <div className="flex flex-col border-blue-600 w-[60%]">
                          <div className="flex mt-[20px] justify-between">
                            <Box sx={style}>
                              <Typography id="modal-modal-title" variant="h6" component="h2" className="text-white font-bold">
                                Edit Habit
                              </Typography>
                              <div className="flex flex-col h-full w-full">
                                <div className="w-full h-full border-red-600 p-[5px]">
                                  <div className="flex flex-col ml-[20px]">
                                    <h1 className="text-white">Name</h1>
                                    <input
                                      className="flex h-[37px] rounded-md border"
                                      value={editingName}
                                      onChange={(e) => setEditingName(e.target.value)}
                                    />
                                    <h1 className="text-white mt-[20px]">Goal</h1>
                                    <input
                                      className="flex h-[37px] rounded-md border"
                                      value={editingGoal}
                                      onChange={(e) => setEditingGoal(e.target.value)}
                                    />
                                    <h1 className="text-white mt-[20px]">Start Date</h1>
                                    <input
                                      className="flex h-[37px] rounded-md border"
                                      placeholder={new Date().toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                      })}
                                    />
                                  </div>
                                </div>
                                <div className="flex h-max mt-[0%] border-red-600 justify-end">
                                  <Button
                                    onClick={handleUpdate}
                                    sx={{
                                      height: '32px',
                                      color: 'white',
                                      backgroundColor: '#2C2268',
                                      '&:hover': {
                                        backgroundColor: '#1F1A4A', // Change background on hover
                                      },
                                      borderRadius: '8px', // Rounded corners
                                      padding: '8px 16px', // Adjust padding
                                      marginLeft: '25px',
                                      marginRight: '40px',
                                      marginBottom: '20px',
                                    }}
                                  >Save</Button>
                                </div>
                              </div>
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
            
            {/*===============================MAIN CONTENT DIV===============================*/ }
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
                  key={task.id}
                  className="bg-white p-4 flex rounded-lg shadow-md w-[90%] mb-4 border-red-600"
                >

                <input type="checkbox" checked={task.isChecked} onChange={()=> handleCheckboxChange(index)}/>
                  <div className="flex flex-col w-[60%] justify-center ml-[20px]">
                    <h2 className="text-lg font-bold text-gray-800">{task.name}</h2>
                    <h2 className="text-lg font-bold text-gray-800">{task.goal}</h2>
                  </div>

                  <div className="flex w-full h-full items-center justify-end border-red-600">
                    <Button onClick={() => deleteOpen(task.id)}>
                      <IconTrash color="#7889DF"/>
                    </Button> 
                    <Button onClick={() => editOpen(task.id, task.name, task.goal)}>
                      <IconEdit color="#7889DF" />
                    </Button>                  
                  </div>
                </div>
              ))}


                {/*===============================DELETE USER BUTTON===============================*/ }
                <Modal
                  open={openDelWarning}
                  onClose={handleCloseDelWarning}
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
                      <h1 className="text-[20px]">Are you sure you want to delete your user account?</h1>
                    </Typography>
                    <div className="flex w-full border-red-500 justify-end mt-[48px]">
                      <div className=" border-red-600 justify-end">
                        <Button onClick={handleCloseDelWarning} variant="contained" style={{ background: "#A5A1FF" }} className="flex justify-end w-max border border-red-600">
                          <h1 className="text-white">CANCEL</h1>
                        </Button>
                      </div>
                      <div className="flex border-red-600 justify-end">
                        <Button onClick={() => handleDeleteUser(userId)} variant="contained" style={{ background: "#2C2268", marginLeft: "20px" }} className="flex justify-end w-max border  border-red-600">
                          <h1 className="text-white">OK</h1>
                        </Button>
                        </div>
                    </div>
                  </Box>
                </Modal>
            </div>
          </div>
              
              {/*==============================================================LEFT MOST COLUMN==============================================================*/ }
              
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

          </div> {/*DIVE CONTAINING ALL*/}
     

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
