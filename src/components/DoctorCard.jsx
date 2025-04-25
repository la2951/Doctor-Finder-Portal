import React from 'react';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="card">
      <h2>{doctor.name}</h2>
      <p><strong>Specialty:</strong> {doctor.specialty}</p>
      <p><strong>Experience:</strong> {doctor.experience}</p>
      <p><strong>Location:</strong> {doctor.location}</p>
    </div>
  );
};

export default DoctorCard;
