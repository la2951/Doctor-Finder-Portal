import React, { useState } from 'react';
import doctors from '../data/doctors';
import DoctorCard from '../components/DoctorCard';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const doctorsPerPage = 3;

  const specialties = [...new Set(doctors.map(doc => doc.specialty))];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty = specialtyFilter ? doc.specialty === specialtyFilter : true;

    return matchesSearch && matchesSpecialty;
  });

  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "experience") {
      const expA = parseInt(a.experience.replace(/\D/g, ""), 10) || 0;
      const expB = parseInt(b.experience.replace(/\D/g, ""), 10) || 0;
      return expB - expA;
    }
    return 0; // No sorting
  });

  const totalPages = Math.ceil(sortedDoctors.length / doctorsPerPage);
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = sortedDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Our Doctors</h1>

      {/* Filters */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name, specialty, or location"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            padding: '10px 15px',
            width: '250px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginRight: '10px',
            fontSize: '16px',
          }}
        />

        {/* Specialty Filter */}
        <select
          value={specialtyFilter}
          onChange={(e) => {
            setSpecialtyFilter(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginRight: '10px',
            fontSize: '16px',
          }}
        >
          <option value="">All Specialties</option>
          {specialties.map((spec, idx) => (
            <option key={idx} value={spec}>{spec}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
          style={{
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        >
          <option value="">Sort By</option>
          <option value="name">Name (A-Z)</option>
          <option value="experience">Experience (High to Low)</option>
        </select>
      </div>

      {/* Doctor Cards */}
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem' }}>
        {currentDoctors.length > 0 ? (
          currentDoctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>No doctors found.</p>
        )}
      </div>

      {/* Pagination */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            style={{
              margin: '5px',
              padding: '8px 12px',
              borderRadius: '6px',
              border: currentPage === page ? '2px solid #4caf50' : '1px solid #ccc',
              backgroundColor: currentPage === page ? '#4caf50' : '#fff',
              color: currentPage === page ? '#fff' : '#000',
              fontWeight: currentPage === page ? 'bold' : 'normal',
              cursor: 'pointer'
            }}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;



