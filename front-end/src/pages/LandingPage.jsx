import React from 'react';
import { GlobeDemo } from '../components/ui/globeDemo.jsx';
import { HeroParallaxDemo } from '../components/ui/heroDemo.jsx';
import Navbar from '../components/main/NavBar.jsx';
import Footer from '../components/main/FooterMain.jsx'

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <GlobeDemo />
      <HeroParallaxDemo />
      <Footer />
    </div>
  );
}
