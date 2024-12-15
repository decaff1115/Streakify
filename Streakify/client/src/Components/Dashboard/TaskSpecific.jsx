import PropTypes from 'prop-types';
import WeekDaysSelector from './WeekDaysSelector';

const TaskSpecific = ({ habit }) => {
        TaskSpecific.propTypes = {
        habit: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            goal: PropTypes.number.isRequired,
            user_id: PropTypes.number.isRequired,
        }).isRequired,
    };
  return (
        <div className="w-full h-[calc(100vh-120px)]  flex flex-col border-red-600 overflow-y-auto items-center p-[20px]">
        <div className="bg-[#7889DF] p-4 w-full flex rounded-lg shadow-md mb-4 border-red-600">
            <div className="flex flex-col w-[60%] justify-center ml-[20px]">
            <h2 className="text-lg font-bold text-white">{habit.name}</h2>
            <h2 className="text-lg font-bold text-white">{habit.goal}</h2>
            </div>
        </div>
          <WeekDaysSelector/>
    </div>
    );
};

export default TaskSpecific;
