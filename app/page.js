"use client";

import styles from "./page.module.css";

import React, { useContext } from 'react';
// import { ActivitiesProvider, ActivitiesContext } from './context/activitiesContextProvider';
import { Register } from './comp/register';

export default function Home() {
  return (
    <main className={styles.main}>
      <Register></Register>
      {/* <ActivitiesProvider>
        <Register></Register>
        <App></App>
      </ActivitiesProvider> */}
    </main>
  );
}

function App() {
  const { activities, activitiesTypes } = useContext(ActivitiesContext);
  return (
    <Register activities={activities} activitiesTypes={activitiesTypes}></Register>
  )
}