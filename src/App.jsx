import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyMangi from './components/WhyMangi';
import WhatWeDo from './components/WhatWeDo';
import OurWork from './components/OurWork';
import Process from './components/Process';
import LeadSection from './components/LeadSection';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';
import SpaceDetailModal from './components/SpaceDetailModal';

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [initialCategory, setInitialCategory] = useState('');

  const handleOpenConsultation = (category = '') => {
    setInitialCategory(category);
    setIsConsultationOpen(true);
  };

  const handleSelectProject = (project) => {
    setSelectedSpace({
      id: project.id,
      title: project.title,
      subtitle: `${project.category} • ${project.location}`,
      image: project.image,
      hdImage: project.image,
      category: project.category,
      area: project.area,
      description: project.description,
      highlights: project.highlights || [
        'Acoustic architectural design & STC performance',
        'Custom executive joinery and premium finishes',
        'Circadian daylighting & concealed tech integration',
        'Turnkey EPC handover with zero snag guarantee',
      ],
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#1c1917] selection:bg-[#c5a059]/20 selection:text-[#1c1917]">
      {/* Dynamic Contrast Navigation */}
      <Navbar onOpenConsultation={() => handleOpenConsultation()} />

      {/* Main Page Flow strictly structured to Google Doc specification */}
      <main className="flex-1 w-full">
        {/* 01 — HERO & FORM BESIDE HERO */}
        <Hero onOpenConsultation={() => handleOpenConsultation()} />

        {/* 02 — WHY MANGI */}
        <WhyMangi onOpenConsultation={handleOpenConsultation} />

        {/* 03 — WHAT WE DO */}
        <WhatWeDo onOpenConsultation={handleOpenConsultation} />

        {/* 04 — OUR WORK */}
        <OurWork
          onSelectProject={handleSelectProject}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* 05 — SIMPLE PROCESS */}
        <Process onOpenConsultation={handleOpenConsultation} />

        {/* 06 — LEAD SECTION & QUICK FORM */}
        <LeadSection />
      </main>

      {/* 07 — FINAL CTA & FOOTER */}
      <Footer onOpenConsultation={() => handleOpenConsultation()} />

      {/* Interactive Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialCategory={initialCategory}
      />

      {/* Interactive Project Blueprint / Spec Modal */}
      <SpaceDetailModal
        space={selectedSpace}
        onClose={() => setSelectedSpace(null)}
        onBookSpace={(cat) => handleOpenConsultation(cat)}
      />
    </div>
  );
}
