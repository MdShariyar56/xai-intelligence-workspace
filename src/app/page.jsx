import DashboardPreview from '@/components/dashboard/DashboardPreview';
import HeroScene from '@/components/hero/HeroScene';
import InsightFlow from '@/components/insight-flow/InsightFlow';
import SignatureInteraction from '@/components/signature/SignatureInteraction';
import React from 'react';

const Home = () => {
  return (
    <main className="bg-black text-white">
      <HeroScene />
      <InsightFlow />
      <DashboardPreview />
      <SignatureInteraction />
    </main>
  );
};

export default Home;