import PropTypes from 'prop-types';
import WeekDaysSelector from './WeekDaysSelector';
import { useState, useEffect } from 'react';


//Check progress
const TaskSpecific = ({ habit }) => {
        TaskSpecific.propTypes = {
        habit: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            goal: PropTypes.number.isRequired,
            user_id: PropTypes.number.isRequired,
        }).isRequired,
    };
    const [selectedDays, setSelectedDays] = useState({
        sun: false,
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
    });

    useEffect(() => {
        const fetchCheckedDays = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/habitLogs/get-checked-days?habit_id=${habit.id}&user_id=${habit.user_id}`
                );
                const data = await response.json();
                
                if (data.checked_days) {
                    // Map the response keys to match the state keys (sun, mon, tue, ...)
                    const mappedCheckedDays = {
                        sun: data.checked_days.sunday,
                        mon: data.checked_days.monday,
                        tue: data.checked_days.tuesday,
                        wed: data.checked_days.wednesday,
                        thu: data.checked_days.thursday,
                        fri: data.checked_days.friday,
                        sat: data.checked_days.saturday,
                    };
                    setSelectedDays(mappedCheckedDays);
                }
            } catch (error) {
                console.error('Error fetching checked days:', error);
            }
        };
    
        fetchCheckedDays();
    }, [habit.id, habit.user_id]);
    
    const updateCheckedDaysOnServer = async (habitId, userId, updatedDays) => {
        try {
            // Send a PATCH request to update checked days
            console.log('Sending data to update checked days:', {
                habitId,
                userId,
                updatedDays
              });

            const response = await fetch('http://localhost:3000/api/habitLogs/update-checked-days', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    habit_id: habitId,
                    user_id: userId,
                    ...updatedDays, // Include all days (sun, mon, tue, ...)
                }),
            });
            const responseData = await response.json();
            if (!response.ok) {
                console.error('Failed to update checked days');
            }
        } catch (error) {
            console.error('Error updating checked days:', error);
        }
    };
    const handleDayToggle = (day, dayValue) => {
        // Update the selected days state
        setSelectedDays((prevSelectedDays) => {
            const updatedDays = {
                ...prevSelectedDays,
                [day]: dayValue === 1, // Set day as true if dayValue is 1, false if 0
            };

            // Update the checked days in the backend
            updateCheckedDaysOnServer(habit.id, habit.user_id, updatedDays);
            return updatedDays;
        });
    };
    

  return (
        <div className="w-full h-[calc(100vh-120px)]  flex flex-col border-red-600 overflow-y-auto items-center p-[20px]">
        <div className="bg-[#7889DF] p-4 w-full flex rounded-lg shadow-md mb-4 border-red-600">
            <div className="flex flex-col w-[60%] justify-center ml-[20px]">
            <h2 className="text-lg font-bold text-white">{habit.name}</h2>
            <h2 className="text-lg font-bold text-white">{habit.goal}</h2>
            
            </div>
        </div>
          <WeekDaysSelector 
          initialSelectedDays={selectedDays}
          onDayToggle={handleDayToggle}/>
    </div>
    );
};

export default TaskSpecific;
