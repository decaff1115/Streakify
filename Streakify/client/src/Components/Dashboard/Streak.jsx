import PropTypes from 'prop-types';
import fire2 from '../../assets/fire2.svg'
import { IconTrophy } from '@tabler/icons-react';
import ProgressBar from "@ramonak/react-progress-bar";
import { useState, useEffect } from 'react';

const token = localStorage.getItem('token');

const Streak = ({ habit }) => {
    Streak.propTypes = {
        habit: PropTypes.shape({
            streak_count: PropTypes.number.isRequired,
            progress_count: PropTypes.number.isRequired,
            id: PropTypes.number.isRequired,
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
                  `http://localhost:3000/api/habitLogs/get-checked-days?habit_id=${habit.id}&user_id=${habit.user_id}`, {
                    headers: {
                      "Authorization": `Bearer ${token}`,
                    },
                  }
              );
              const data = await response.json();

              if (data.checked_days) {
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

  const totalCheckedDays = Object.values(selectedDays).filter(Boolean).length;
  const progressPercentage = (totalCheckedDays / 7) * 100;
    
  return (
      <div className='flex flex-col h-full w-full items-center justify-center'>
          <div className='h-[70%] w-full items-center justify-between flex flex-col'>
              <div className='flex w-[90%] pl-[20px] pr-[20px] h-[150px] rounded-lg border items-center font-extrabold text-[#303030] justify-between border-white'>
                  <img src={fire2} className='w-[60px] '/>
                <div className='border-red-600'>
                    <div className='text-[25px]'>
                       CURRENT STREAK
                    </div>
                    <div className='text-[40px]'>
                        { habit.streak_count } Days 
                    </div>
                  </div>
              </div>
              
                <div className='flex flex-col border rounded-lg items-center w-[90%] h-[230px]'>
                    <div className='text-[#303030] text-[24px] font-extrabold pt-[10px] pb-[10px] w-full h-max flex justify-center border-b '>
                        YOUR PROGRESS
                    </div>
                    <div className='pl-[20px] pr-[20px] flex flex-col border-white w-full h-full items-center justify-center'>
                        <div className='w-full h-max flex'>
                          <div>
                              <IconTrophy size="40px" color='#303030'/>
                            </div>
                          <h1 className='mb-[20px] ml-[10px] text-[24px] text-[#303030]'> {totalCheckedDays} Completed / Days</h1>
                        </div>  
                          <ProgressBar D
                            completed={progressPercentage} 
                            bgColor="#7FFF5B" 
                            baseBgColor="#312A7C" 
                            height="20px"
                            width='300px'
                            borderRadius="50px" 
                            labelAlignment="center" 
                            labelColor="#000" 
                          />
                      </div>

                  
                </div>
          </div>
    </div>
  )
}

export default Streak