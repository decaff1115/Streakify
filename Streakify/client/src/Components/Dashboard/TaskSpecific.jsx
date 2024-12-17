import PropTypes from 'prop-types';
import WeekDaysSelector from './WeekDaysSelector';
import { useState, useEffect } from 'react';
import { IconTrophy } from '@tabler/icons-react';
import ProgressBar from "@ramonak/react-progress-bar";

const token = localStorage.getItem('token');


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

    const [streakCount, setStreakCount] = useState(0);

    useEffect(() => {
        const fetchCheckedDays = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/habitLogs/get-checked-days?habit_id=${habit.id}&user_id=${habit.user_id}`, {
                        headers: {
                          "Authorization": `Bearer ${token}`, // Include token in header
                        },
                      }
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
                    setSelectedDays(mappedCheckedDays);                }

                if (data.updatedStreak !== undefined) {
                    setStreakCount(data.updatedStreak);  // Set the streak count from the response
                }
            } catch (error) {
                console.error('Error fetching checked days:', error);
            }
        };
    
        fetchCheckedDays();
    }, [habit.id, habit.user_id]);
    
    const updateCheckedDaysOnServer = async (habitId, userId, updatedDays) => {
        try {
            const response = await fetch('http://localhost:3000/api/habitLogs/update-checked-days', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json', "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    habit_id: habitId,
                    user_id: userId,
                    ...updatedDays, // Include all days (sun, mon, tue, ...)
                }),
            });
            const responseData = await response.json();
            if (response.ok) {
                console.log('Successfully updated streak');
                // Update streak on the frontend with the returned value
                setStreakCount(responseData.updatedStreak);  // Set the streak count from the response
            } else {
                console.error('Failed to update checked days');
            }
            //calculateStreak(updatedDays);
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

    const handleUnselectAll = () => {
        const resetDays = {
            sun: false,
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
        };
        setSelectedDays(resetDays);
        updateCheckedDaysOnServer(habit.id, habit.user_id, resetDays);
    };


    const totalCheckedDays = Object.values(selectedDays).filter(Boolean).length;
    const progressPercentage = Math.round((totalCheckedDays / 7) * 100);

  return (
    <div className="w-full h-[calc(100vh-120px)] flex flex-col md:flex-row border-red-600 overflow-y-auto items-start p-[20px] gap-8">
    {/* Left Column (Habit Name, Goal, WeekDaysSelector) */}
    <div className="flex flex-col w-full md:w-[60%] items-start justify-start md:mr-4">
        <div className="bg-[#7889DF] p-4 w-full flex rounded-lg shadow-md mb-4 border-red-600">
            <div className="flex flex-col w-full justify-start ml-[20px]">
                <h2 className="text-lg font-bold text-white">{habit.name}</h2>
                <h2 className="text-lg font-bold text-white">{habit.goal}</h2>
            </div>
        </div>

        <div className="w-full mt-4">
            <WeekDaysSelector 
                initialSelectedDays={selectedDays}
                onDayToggle={handleDayToggle}
            />
        </div>

        <button
            onClick={handleUnselectAll}
            className="mt-4 bg-pink-400 text-white px-4 py-2 rounded-lg"
        >
            Reset Progress
        </button>
    </div>

    {/* Right Column (Streak and Your Progress) */}
    <div className="flex flex-col w-full md:w-[35%] items-start justify-start">
        <div className="text-[20px] md:text-[25px] font-bold mb-2">Current Streak</div>
        <div className="text-[30px] md:text-[40px] font-extrabold mb-4">{streakCount} Days</div>

        <div className="text-[20px] md:text-[25px] font-bold mb-2">Your Progress</div>
        <div className="flex items-center mb-4">
            <IconTrophy size="30px" md:size="40px" color="#303030" />
            <h1 className="ml-[10px] text-[18px] md:text-[24px] text-[#303030]">
                {totalCheckedDays} Completed / Days
            </h1>
        </div>

        <ProgressBar 
            completed={progressPercentage} 
            bgColor="#7FFF5B" 
            baseBgColor="#312A7C" 
            height="15px md:height-20px" 
            width='300px'
            borderRadius="50px" 
            labelAlignment="center" 
            labelColor="#000" 
        />
    </div>
</div>


    );
};

export default TaskSpecific;
