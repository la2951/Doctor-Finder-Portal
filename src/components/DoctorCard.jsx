import React from 'react';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="card" data-testid="doctor-card">
      <h2 data-testid="doctor-name">{doctor.name}</h2>
      <p data-testid="doctor-specialty"><strong>Specialty:</strong> {doctor.specialty}</p>
      <p data-testid="doctor-experience"><strong>Experience:</strong> {doctor.experience}</p>
      <p data-testid="doctor-location"><strong>Location:</strong> {doctor.location}</p>
    </div>
  );
};

export default DoctorCard;

