import React from 'react';
import { GlobeDemo } from '../components/ui/globeDemo.jsx';
import { HeroParallaxDemo } from '../components/ui/heroDemo.jsx';
import Navbar from './NavBar.jsx';
import Footer from './FooterMain.jsx'

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
