import React from 'react';
import AboutHero from '../components/AboutHero';
import CompanyValues from '../components/CompanyValues';
import TeamSection from '../components/TeamSection';

export default function About() {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <CompanyValues />
      <TeamSection />
    </div>
  );
}