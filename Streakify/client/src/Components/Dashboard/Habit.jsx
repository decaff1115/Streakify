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

      <div key={Habit.id} className="bg-white p-4 flex rounded-lg shadow-md w-[90%] mb-4 border-red-600">
        <input type="checkbox" checked={index.isChecked} onChange={() => handleCheckboxChange(index)} />
        <div className="flex flex-col w-[60%] justify-center ml-[20px]">
          <h2 className="text-lg font-bold text-gray-800">{index.name}</h2>
          <h2 className="text-lg font-bold text-gray-800">{index.goal}</h2>
        </div>
      </div>
    </>
  );
}

export default Habit;
