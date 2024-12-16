import { useEffect, useState } from 'react';

const WeekDaysSelector = ({ initialSelectedDays, onDayToggle }) => {
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
    setSelectedDays(initialSelectedDays);
}, [initialSelectedDays]);

  const handleDayToggle = (day) => {
    setSelectedDays((prevSelectedDays) => {
      // ...prevSelectedDays,
      // [day]: !prevSelectedDays[day], // Toggle the day state
      const updatedDays = {
        ...prevSelectedDays,
        [day]: !prevSelectedDays[day], // Toggle the day state
      };
      const dayValue = updatedDays[day] ? 1 : 0;  // 1 if true, 0 if false
      onDayToggle(day, dayValue); // Call the callback passed from parent

      return updatedDays;
    });
  };

  return (
    <div className="w-full flex justify-around items-center bg-white p-4 rounded-lg">
      {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((day) => (
        <div
          key={day}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => handleDayToggle(day)}
        >
          {/* Day name above the circle */}
          <span className="text-sm font-semibold text-[#7889DF]">{day.toUpperCase()}</span>

          {/* Circle for each day */}
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full mt-2 ${
              selectedDays[day] ? 'bg-[#7889DF]' : 'bg-white'
            } border-2 border-[#7889DF]`}
          >
            {selectedDays[day] && (
              <span className="text-white text-xl">✔</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeekDaysSelector;
