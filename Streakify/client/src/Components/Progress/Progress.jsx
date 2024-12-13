import logo from "../../assets/logo.svg";
import { IconUserCircle, IconCalendar, IconNumber24Small } from "@tabler/icons-react";
import fire from "../../assets/fire.svg";
import noTaskIcon from "../../assets/HabitSampleIcons.svg";
import { Modal, Box, Typography, Button } from "@mui/material";
import React, { useState } from "react";

const Progress = () => {
  const [openProfile, setOpenProfile] = React.useState(false);
  const [completedPercentage, setCompletedPercentage] = useState(0);
  const [selectedHabit, setSelectedHabit] = useState(null);

  const handleOpenProfile = () => setOpenProfile(true);
  const handleCloseProfile = () => setOpenProfile(false);

  const taskArray = [
    { id: 1, task: "Drink Water", time: "Awhile ago" },
    { id: 2, task: "Exercise", time: "Awhile ago" },
    { id: 3, task: "Read Books", time: "Awhile ago" },
    // Add more tasks as necessary
  ];

  const handleSelectHabit = (habitId) => {
    // Select a habit and reset progress percentage
    setSelectedHabit(habitId);
    setCompletedPercentage(0); // Reset progress when a new habit is selected
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

  return (
    <div className="w-full h-screen flex flex-col bg-[#B4BAFF] overflow-x-hidden">
      {/* Header */}
      <div className="flex w-full h-[78px] justify-center items-center bg-white shadow-lg">
        <img src={logo} className="streakifyLogo" alt="logo" />
      </div>

      <div className="flex flex-col md:flex-row h-full w-full">
        {/* Sidebar */}
        <div className="flex w-full md:w-[30%] justify-center bg-[#4D57C8] p-4 md:p-6">
          <div className="flex flex-col w-full">
            {/* Profile Button */}
            <button onClick={handleOpenProfile} className="flex bg-[#B4BAFF] h-[53px] mb-6 items-center w-full md:w-[278px] justify-start rounded-[8px] p-[15px]">
              <div className="flex justify-between items-center w-full">
                <IconUserCircle size={35} color="#2C2268" />
                <h1 className="text-[20px] font-bold ml-3">My Profile</h1>
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
                <button onClick={handleOpenProfile} className="flex bg-[#B4BAFF] h-[53px] mb-6 items-center w-full md:w-[278px] justify-start rounded-[8px] p-[15px]">
                  <div className="flex justify-between items-center w-full">
                    <h1 className="text-[20px] font-bold ml-3">Delete account</h1>
                  </div>
                </button>
              </Box>
            </Modal>

            {/* Daily Button */}
            <Button style={{ justifyContent: "start" }} className="flex hover:bg-[#B4BAFF] h-[53px] mb-6 items-center w-full md:w-[278px] rounded-[8px] p-[15px]">
              <div className="flex justify-between items-center">
                <IconNumber24Small size={40} color="#2C2268" />
                <p className="text-[20px] font-bold ml-3 text-black"> <a href="/Dashboard">DAILY</a></p>
              </div>
            </Button>

            {/* Progress Button */}
            <Button style={{ justifyContent: "start" }} className="flex hover:bg-[#B4BAFF] h-[53px] mb-6 items-center w-full md:w-[278px] justify-start rounded-[8px] p-[15px]">
              <div className="flex justify-between items-center">
                <img src={fire} className="w-[40px]" alt="fire icon" />
                <h1 className="text-[20px] font-bold ml-3 text-black">PROGRESS</h1>
              </div>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full h-full flex flex-col p-4 md:p-8">
          {/* Date Button */}
          <div className="flex justify-end mb-6">
            <button className="bg-[#7F45FF] rounded-[14px] w-max items-center justify-center flex text-white p-2">
              <div className="flex items-center justify-center">
                <IconCalendar color="white" size={32} className="mr-2" />
                Today
              </div>
            </button>
          </div>

          {/* Task List */}
          <div className="w-full flex flex-col items-center overflow-y-auto p-4">
            {taskArray.length === 0 && (
              <div className="flex flex-col items-center justify-center mb-4">
                <img src={noTaskIcon} className="w-full md:w-[900px]" alt="No tasks" />
                <button className="bg-[#7889DF] text-white w-full md:w-[90%] h-[72px] rounded-[16px] text-[16px] mt-4">
                  You have nothing to do. Add a new habit now!
                </button>
              </div>
            )}

            {taskArray.map((task, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md w-full md:w-[90%] mb-4 border border-gray-300">
                <Button
                key={task.id}
                onClick={() => handleSelectHabit(task.id)}
                style={{ justifyContent: "start" }}
                className="flex hover:bg-[#B4BAFF] h-[53px] mb-6 items-center w-full md:w-[278px] justify-start rounded-[8px] p-[15px]"
              >
                <div className="flex justify-between items-center">
                  <img src={fire} className="w-[40px]" alt="habit icon" />
                  <h1 className="text-[20px] font-bold ml-3 text-black">{task.task}</h1>
                </div>
              </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Column */}
        <div className="w-full md:w-[60%] flex flex-col items-center justify-center mt-6 p-4">
            {/* Streak Info */}
            <div className="w-full flex items-center justify-center mt-6 rounded-[10px] bg-[#FFFFFF] border-red-600 h-[120px] relative">
    <div className="flex items-center justify-center w-full">
        <img src={fire} className="w-[40px] h-[40px] mr-3" alt="fire icon" />
        <div className="flex flex-col items-start justify-center">
            <h1 className="text-[#373737]">Your Current Streak</h1>
            <h1 className="text-[24px]">0 Days</h1>
        </div>
    </div>
</div>

{/* Add vertical space between the sections */}
<div className="w-full flex items-center justify-center mt-12 rounded-[10px] bg-[#FFFFFF] border-red-600 h-[320px] relative">
    {selectedHabit ? (
        <div className="flex flex-col items-center justify-center w-full h-full px-[20px]">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 h-[20px] rounded-[8px] mb-4">
                <div className="bg-blue-500 h-full rounded-[8px] transition-all duration-300" style={{ width: `${completedPercentage}%` }}></div>
            </div>

            {/* Percentage */}
            <div className="text-center text-lg font-semibold text-[#373737]">
                {completedPercentage}% Completed
            </div>
        </div>
    ) : (
        <div className="flex flex-col items-center justify-center mt-6">
            <h2 className="text-xl font-bold text-gray-800">Select a Habit to Track Progress</h2>
            <img src={noTaskIcon} className="w-full md:w-[600px]" alt="No task selected" />
        </div>
    )}
</div>

        </div>
      </div>
    </div>
  );
};

export default Progress;
