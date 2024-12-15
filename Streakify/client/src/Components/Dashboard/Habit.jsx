import { Button, Modal, Box, Typography } from '@mui/material';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import fire2 from "../../assets/fire.svg";
import { useState } from 'react';
import PropTypes from 'prop-types';

function Habit ({ index }) {
  const [editingHabitId, setEditingHabitId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [editingGoal, setEditingGoal] = useState('');
  const [editTask, setEditTask] = useState(false);
  const [taskArray, setTaskArray] = useState([]);
  
  const editClose = () => setEditTask(false);

  // Define PropTypes outside of the component
  Habit.propTypes = {
    Habit: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      goal: PropTypes.number.isRequired,
      user_id: PropTypes.number.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
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
        setTaskArray((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedData.id
              ? { ...task, name: updatedData.name, goal: updatedData.goal }
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

  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/habits/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setTaskArray((prevTasks) =>
          prevTasks.filter((task) => task.id !== taskId)
        );
        alert("Habit deleted successfully!");
      } else {
        alert(`Failed to delete habit: ${taskId}`);
      }
    } catch (error) {
      console.error("Error deleting habit:", error);
      alert("Error deleting habit.");
    }
  };

  const deleteOpen = (taskId) => {
    handleDelete(taskId);
  };

  const editOpen = (id, name, goal) => {
    setEditingHabitId(id);
    setEditingName(name);
    setEditingGoal(goal);
    setEditTask(true);
  };

  const handleCheckboxChange = (index) => {
    const updatedTasks = [...taskArray];
    updatedTasks[index].isChecked = !updatedTasks[index].isChecked;
    updatedTasks.sort((a, b) => a.isChecked - b.isChecked);
    setTaskArray(updatedTasks);
  };

  return (
    <>
      {/* Edit Habit Modal */}
      <Modal open={editTask} onClose={editClose}>
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
                                  backgroundColor: '#1F1A4A',
                                },
                                borderRadius: '8px',
                                padding: '8px 16px',
                                marginLeft: '25px',
                                marginRight: '40px',
                                marginBottom: '20px',
                              }}
                            >
                              Save
                            </Button>
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

      <div key={Habit.id} className="bg-white p-4 flex rounded-lg shadow-md w-[90%] mb-4 border-red-600">
        <input type="checkbox" checked={index.isChecked} onChange={() => handleCheckboxChange(index)} />
        <div className="flex flex-col w-[60%] justify-center ml-[20px]">
          <h2 className="text-lg font-bold text-gray-800">{index.name}</h2>
          <h2 className="text-lg font-bold text-gray-800">{index.goal}</h2>
        </div>
        <div className="flex w-full h-full items-center justify-end border-red-600">
          <Button onClick={() => deleteOpen(index.id)}>
            <IconTrash color="#7889DF" />
          </Button>
          <Button onClick={() => editOpen(index.id, index.name, index.goal)}>
            <IconEdit color="#7889DF" />
          </Button>
          <Button onClick={() => editOpen(index.id, index.name, index.goal)}>
            <img className="w-[20px]" src={fire2} />
          </Button>
        </div>
      </div>
    </>
  );
}

export default Habit;
