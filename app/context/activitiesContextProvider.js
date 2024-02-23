import React, { createContext, useState, useEffect } from 'react';
import activitiesData from '../../misc/data.json';

export const ActivitiesContext = createContext();

export const ActivitiesProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [activitiesTypes, setActivitiesTypes] = useState({lectures: [], activities: []});

  useEffect(() => {
    // Here you would fetch your data from an API instead of using the static data
    setActivities(activitiesData['all_items']);
    setActivitiesTypes(activitiesData['activities_types'])
  }, []);

  return (
    <ActivitiesContext.Provider value={{ activities, activitiesTypes }}>
      {children}
    </ActivitiesContext.Provider>
  );
};
