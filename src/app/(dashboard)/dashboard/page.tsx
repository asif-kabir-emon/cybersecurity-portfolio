"use client";
import AppHeader from "@/components/Dashboard/app-header";
import React from "react";

const DashboardPage = () => {
  return (
    <div>
      <AppHeader showLastPath={false} />
      <div className="m-5">
        <h1>Dashboard</h1>
        <p>Welcome to the dashboard.</p>
      </div>
    </div>
  );
};

export default DashboardPage;
