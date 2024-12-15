import PropTypes from 'prop-types';
import fire2 from '../../assets/fire2.svg'
import { IconTrophy } from '@tabler/icons-react';
import ProgressBar from "@ramonak/react-progress-bar";

const Streak = ({ habit }) => {
    Streak.propTypes = {
        habit: PropTypes.shape({
            streak_count: PropTypes.number.isRequired,
            progress_count: PropTypes.number.isRequired,
        }).isRequired,
    };
    
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

                  <div className='flex flex-col h-full w-full items-center justify-center  border-red-600'>
                      <div className='pl-[20px] pr-[20px] flex flex-col border-white w-full h-full items-center justify-center'>
                        <div className='w-full h-max flex'>
                          <div>
                              <IconTrophy size="40px" color='#303030'/>
                            </div>
                          <h1 className='mb-[20px] ml-[10px] text-[24px] text-[#303030]'>Completed / Days</h1>
                        </div>  
                          <ProgressBar D
                            completed={70} 
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
    </div>
  )
}

export default Streak