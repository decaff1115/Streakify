import logo from "../../assets/logo.svg"
import { IconExclamationCircle, IconUserCircle, IconCirclePlus, IconTrash, IconEdit, IconArrowLeft } from "@tabler/icons-react"
import noTaskIcon from "../../assets/HabitSampleIcons.svg"
import { Modal, Box, Typography, Button } from "@mui/material"
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import fileIcon from '../../assets/Vector.svg'
import fire2 from "../../assets/fire2.svg"

const token = localStorage.getItem('token');
import { useNavigate } from "react-router-dom"
import TaskSpecific from "./TaskSpecific"

const Dashboard = () => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('')
  const [habitName, setHabitName] = useState("");
  const [goal, setGoal] = useState("");
  const [renderProgress, SetRenderProgress] = useState(false);
  const [habitInfo, setHabitInfo] = useState({ id: 0, name: "", goal: 0, user_id: 0, streak_count: 0, progress_count: 0 })

  //Shows the progress per habit 
  const handleRenderProgress = (habit) => {
    setHabitInfo(habit)
    SetRenderProgress(true)
    setIsActive(false)
  }

    const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/LogInPage");
  };

  //Goes back to list of habits
  const handleHabitClick = () => {
    setIsActive(true);
    SetRenderProgress(false)
  }

  //==========ADD HABIT============//
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showAddHabit, setShowAddHabit] = useState(false);

  const handleClosePopup = () => {
    setShowAddHabit(!showAddHabit)
  }

  //==========DELETE HABIT==========//
  const deleteOpen = (habitId) => {
    handleDelete(habitId);
  };

  //==========EDIT HABIT=============//
  const [editHabit, setEditHabit] = useState(false);
  const editClose = () => setEditHabit(false);

  const [editingHabitId, setEditingHabitId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [editingGoal, setEditingGoal] = useState('');
  const [isActive, setIsActive] = useState(true);


  const editOpen = (id, name, goal) => {
    setEditingHabitId(id);
    setEditingName(name);
    setEditingGoal(goal);
    setEditHabit(true); // Show the modal
  };

  //==========PROFILE=============//
  const [openProfile, setOpenProfile] = React.useState(false);
  const handleOpenProfile = () => setOpenProfile(true);
  const handleCloseProfile = () => setOpenProfile(false);

  //==========DELETE PROFILE==========//
  const [openDelWarning, setDelWarning] = React.useState(false);
  const handleOpenDelWarning = () => setDelWarning(true);
  const handleCloseDelWarning = () => setDelWarning(false);



  //==========HABIT ARRAY=============//
  const [habitArray, setHabitArray] = useState([]);


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

  const fetchHabits = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/habits/?user_id=${userId}`, {
        headers: {
          "Authorization": `Bearer ${token}`, // Include token in header
        },
      });
      const data = await response.json();
      if (response.ok) {
        setHabitArray(data);  // Set the habits into the state
      } else {
        alert('Failed to fetch habits.');
      }
    } catch (error) {
      console.error('Error fetching habits:', error);
      alert('Error fetching habits.');
    }
  };

  useEffect(() => {

    if (userId) {
      fetchHabits();
    }
  }, [userId]);

  //****************************GET USER INFO****************************//
  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
        const data = await response.json();
        localStorage.setItem("name", data.username);
        localStorage.setItem("id", userId);
        localStorage.setItem("email", data.email)

      setUsername(data.username);
      setEmail(data.email)
    } catch (err) {
      console.error(err);
    }
  };

  //****************************CHECKBOX CHANGE****************************//
  // const handleCheckboxChange = (index) => {
  //   const updatedTasks = [...taskArray];
  //   updatedTasks[index].isChecked = !updatedTasks[index].isChecked;

  //   // Sort tasks so checked ones move to the bottom
  //   updatedTasks.sort((a, b) => a.isChecked - b.isChecked);

  //   setTaskArray(updatedTasks);
  // };

  //****************************ADD HABIT****************************//
  const handleSave = async () => {
    // Check if the form is complete
    if (!habitName || !goal) {
      alert("Please fill in all fields.");

    }
    const userid = localStorage.getItem('id');
    const habitData = {
      name: habitName,
      goal: goal,
      user_id: userid, 
    };

    try {
      const response = await fetch("http://localhost:3000/api/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json","Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(habitData),
      });
      const newHabit = await response.json();
      if (response.ok) {
        // Update habitArray with the new habit details
        setHabitArray((prevHabits) => [
          ...prevHabits,
          {
            id: newHabit.id,
            name: newHabit.habitName, 
            goal: newHabit.goal,
            isChecked: false,
          },
        ]);
        alert("Habit created successfully!");
        fetchHabits();
      }
    }
    catch (error) {
      console.error("Error creating habit:", error);
      alert("Error creating habit.");
    }
  };

  //****************************DELETE HABIT****************************//
  const handleDelete = async (habitId) => {
    try {
      // Send DELETE request to the server
      const response = await fetch(`http://localhost:3000/api/habits/${habitId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", "Authorization": `Bearer ${token}`
        },
      });
      if (response.ok) {
        setHabitArray((prevHabits) =>
          prevHabits.filter((habit) => habit.id !== habitId)
        );
        alert("Habit deleted successfully!");
      } else {
        alert(`Failed to delete habit: ${habitId}`);
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
          'Content-Type': 'application/json', "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedHabit),
      });

      if (response.ok) {
        const updatedData = await response.json();
        // Update the habitArray with the updated habit details
        setHabitArray((prevHabits) =>
          prevHabits.map((habit) =>
            habit.id === updatedData.id
              ? {
                ...habit,
                name: updatedData.name,
                goal: updatedData.goal
              }
              : habit
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

  //****************************DROP DOWN: OPEN/CLOSE PROFILE/SIGN OUT****************************//

  const [isOpen, setIsOpen] = useState(false);

  const handleProfSign = () => {
    setIsOpen(prev => !prev);
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

  const style3 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 500,
    bgcolor: '#4D57C8',
    boxShadow: 24,
    p: 5,
  };

  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col bg-[#B4BAFF] overflow-y overflow-x-hidden">
      <div className="flex w-full h-[78px] justify-center items-center bg-white shadow-[0px_0px_9px_0px_rgba(0,0,0,1)]">
        <img src={logo} className="streakifyLogo" />
      </div>

      <div className="flex flex-col md:flex-row h-screen w-full justify-between">
        {/* Sidebar div */}
        <div className="flex flex-col md:flex-row w-full md:w-[30%] bg-[#4D57C8] p-4 md:p-6">
          <div className="border-blue-600 h-max flex flex-col items-center">

            {/*User Profile Div*/}
            <div className="relative">
              <button onClick={handleProfSign} className="flex bg-[#B4BAFF] h-[50px] mb-[30px] items-center w-[240px] justify-start rounded-[8px] p-[15px]">
                <div className="flex justify-between items-center">
                  <IconUserCircle size={35} color="#2C2268" />
                  <h1 className="text-[20px] font-bold ml-[22px] text-[#2C2268]"> {username} </h1>
                </div>
              </button>
              {isOpen && (
                <div
                  className="absolute bg-[#B4BAFF] w-[240px] rounded-[8px] p-[10px] shadow-md border-2 border-[#2C2268] z-10"
                  style={{
                    top: '55px', // Adjust this to overlap the button
                    left: 0,
                  }}
                >
                  <button
                     onClick={handleOpenProfile}
                    className="w-full text-left p-[10px] text-[#2C2268] hover:bg-[#A89DE1] transition-all duration-200"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className=" w-full text-left p-[10px] text-[#2C2268] hover:bg-[#A89DE1] transition-all duration-200"
                  >
                    Log Out
                  </button> 
                  </div>
              )}
            </div>
            {/* Profile Modal */}
      <Modal open={openProfile} onClose={handleCloseProfile} aria-labelledby="modal-profile-title">
      <Box sx={style3} className="bg-[#2C2268] p-[20px] rounded-[10px]">
        <Typography id="modal-profile-title" variant="h6" component="h2" className="text-white font-bold text-center text-[24px]">
          PROFILE
        </Typography>

        <div className="mt-[20px] mb-[20px] flex flex-col items-center">
          <IconUserCircle size={60} color="#FFFFFF" />
          <div className="font-semibold text-center mb-[15px] text-[18px] text-white mt-[10px]">{username}</div>
          <div className="flex flex-col border-t border-b w-full justify-center items-center pt-[15px] pb-[15px]">
            <h1 className="text-white font-extrabold">EMAIL</h1>
            <div className="font-normal text-center flex text-[20px] text-white mt-[5px]">{email}</div>
          </div>    
        </div>

        <div className="mt-[20px] text-center">
          <Typography variant="h6" component="h3" className="text-red-600 mb-[10px]">
            <h1 className="font-extrabold">CAUTION ZONE</h1>
          </Typography>
          <Typography variant="body1" className="text-[#D9D9D9] mb-[20px]">
            All of your habit data will be deleted.
          </Typography>
        </div>

        <button
          onClick={handleOpenDelWarning}
          className="mt-[30px] flex bg-[#B4BAFF] hover:bg-[#A89DE1] w-full h-[53px] justify-center items-center rounded-[8px] p-[15px] mb-[20px]"
        >
          <h1 className="text-[#2C2268] text-[20px] font-bold">Delete Account</h1>
        </button>

        <button
          onClick={handleCloseProfile}
          className="absolute top-[10px] right-[10px] text-[#2C2268] rounded-full p-[8px]"
        >
          <IconArrowLeft size={25} color="white" background="#A89DE1"/>
        </button>
      </Box>
    </Modal>

            {/*Left SideBar Tabs*/}
            <div>
                <Button 
                  onClick={handleHabitClick} 
                  style={{ width: "240px", height: "50px", justifyContent: "start", background: "#B4BAFF", borderRadius: "10px", padding: "none" }} 
                  className={`flex hover:bg-[#B4BAFF] h-[53px] items-center w-[278px] rounded-[8px]`}
                >
                  <div className="flex w-full items-center text-white font-extrabold transition-colors duration-[1]">
                    <img src={fileIcon} className="ml-[5px]" />
                    <h1 className="text-[20px] ml-[25px] text-[#21005D]"> HABITS </h1>
                  </div>
                </Button>
              </div>

              <div className="font-semibold rounded-[10px] items-center flex w-[278px] text-[15px] justify-center h-[71px] p-[20px] text-center bg-[#FFFFFF] text-[#4D57C8] mt-[20px]">
                Complete habit to build your longest streak of perfect day.
              </div>
            <div>
            </div>
          </div>
        </div>
        

        <div className="w-full h-full flex flex-col">
        <div className="h-[10%] border-b flex w-full items-center justify-end px-[20px] md:px-[40px]">
  <div className="flex items-center justify-end border-red-600 w-[120px] sm:w-[180px] h-full">
    {/* ===============================ADD HABIT BUTTON=============================== */}
    {isActive && !renderProgress && (
      <button onClick={handleOpen} className="p-2">
        <IconCirclePlus color="#21005D" size={28} />
      </button>
    )}
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          ...style,
          width: '90%', // Responsive modal width
          maxWidth: '400px', // Restrict max width for larger screens
          padding: '20px',
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="text-white font-bold text-center mb-4"
        >
          New Habit
        </Typography>
        <div className="flex flex-col w-full">
          <div className="w-full p-2">
            <div className="flex flex-col">
              <label className="text-white mb-2">What habit do you want to keep track of?</label>
              <input
                className="w-full h-[40px] rounded-md border px-2 text-sm"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                placeholder="Enter habit name"
              />
            </div>
            <div className="flex flex-col mt-4">
              <label className="text-white mb-2">How many times do you want to keep doing this in a day?</label>
              <input
                className="w-full h-[40px] rounded-md border px-2 text-sm"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Enter goal"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleSave}
              sx={{
                height: '40px',
                color: 'white',
                backgroundColor: '#2C2268',
                '&:hover': {
                  backgroundColor: '#1F1A4A',
                },
                borderRadius: '8px',
                padding: '8px 16px',
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  </div>
</div>



          {/*===============================EDIT HABIT BUTTON===============================*/}
          <Modal open={editHabit} onClose={editClose}>
            <Box
              sx={{
                ...style,
                width: '90%', // Responsive width for smaller screens
                maxWidth: '400px', // Restrict max width for larger screens
                padding: '20px', // Add consistent padding
              }}
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="text-white font-bold text-center mb-4"
              >
                Edit Habit
              </Typography>
              <div className="flex flex-col w-full">
                <div className="w-full p-2">
                  <div className="flex flex-col">
                    <label className="text-white mb-2">Name</label>
                    <input
                      className="w-full h-[40px] rounded-md border px-2 text-sm"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      placeholder="Enter habit name"
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label className="text-white mb-2">Goal</label>
                    <input
                      className="w-full h-[40px] rounded-md border px-2 text-sm"
                      value={editingGoal}
                      onChange={(e) => setEditingGoal(e.target.value)}
                      placeholder="Enter goal in days"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button
                    onClick={handleUpdate}
                    sx={{
                      height: '40px',
                      color: 'white',
                      backgroundColor: '#2C2268',
                      '&:hover': {
                        backgroundColor: '#1F1A4A',
                      },
                      borderRadius: '8px',
                      padding: '8px 16px',
                    }}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </Box>
</Modal>


          {/*===============================MAIN CONTENT DIV===============================*/}

          {isActive && !renderProgress && (
            <div className="w-full h-full flex flex-col items-center p-[20px] scrollbar-hide">
              {habitArray.length === 0 && (
                <div className="flex flex-col items-center justify-center">
                  <div>
                    <img src={noTaskIcon} className="2xl:w-[900px]" alt="No tasks" />
                  </div>
                  <button className="bg-[#7889DF] text-white w-[90%] h-[72px] rounded-[16px] text-[16px] mt-4">
                    You have nothing to do. Add a new habit now!
                  </button>
                </div>
              )}

              {habitArray.map((index) => (
                <div key={index.id} className="bg-white p-4 flex rounded-lg shadow-md w-[90%] mb-4 border-red-600">
                  <div className="flex flex-col w-[60%] justify-center ml-[20px]">
                    <h2 className="text-lg font-bold text-gray-800">{index.name}</h2>
                    <h2 className="text-lg font-bold text-gray-800">{index.goal} Times A Day</h2>
                  </div>

                  <div className="flex w-full h-full items-center justify-end border-red-600">
                    <Button onClick={() => deleteOpen(index.id)}>
                      <IconTrash color="#7889DF" />
                    </Button>
                    <Button onClick={() => editOpen(index.id, index.name, index.goal)}>
                      <IconEdit color="#7889DF" />
                    </Button>

                    <Button onClick={() => handleRenderProgress(index)}>
                      <img className="w-[20px]" src={fire2} />
                    </Button>
                  </div>
                </div>
              ))}

              {/*===============================DELETE USER BUTTON===============================*/}
              <Modal
                open={openDelWarning}
                onClose={handleCloseDelWarning}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style2}>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    <h1 className="flex text-[white] items-center w-[29%] justify-between">
                      <IconExclamationCircle color="red" size={30} />
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
          )}

          {renderProgress && !isActive && (
            <TaskSpecific habit={habitInfo} />
          )}

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
