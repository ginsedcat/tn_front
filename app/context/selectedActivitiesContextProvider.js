import React, { createContext, useState } from 'react';

export const SelectedActivitiesContext = createContext();

export const SelectedActivitiesProvider = ({ children }) => {
  const [selectedActivities, setSelectedActivities] = useState({});
  
  const addSelectedActivity = (activity) => {
    setSelectedActivities(currentActivities => ({
      ...currentActivities,
      [activity.key]: activity
    }));
  };

  return (
    <SelectedActivitiesContext.Provider value={{ selectedActivities, setSelectedActivities, addSelectedActivity }}>
      {children}
    </SelectedActivitiesContext.Provider>
  );
};
