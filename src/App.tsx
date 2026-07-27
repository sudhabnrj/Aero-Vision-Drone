import React, { useState } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { HeroScrollAnimation } from './components/HeroScrollAnimation';
import { LoadingScreen } from './components/LoadingScreen';
import { ProductGrid } from './components/ProductGrid';
import { FlyingDroneExperience } from './components/FlyingDroneExperience';
import { ShotOnSection } from './components/ShotOnSection';
import { InnovationSection } from './components/InnovationSection';
import { FieldsSection } from './components/FieldsSection';
import { QuickServicesSection } from './components/QuickServicesSection';
import { FlightModesScrollAnimation } from './components/FlightModesScrollAnimation';
import { DroneSimulatorSection } from './components/DroneSimulatorSection';
import { DroneComparisonSection } from './components/DroneComparisonSection';
import { SkyPixelCommunitySection } from './components/SkyPixelCommunitySection';
import { Footer } from './components/Footer';
import { BuyModal, FeedbackModal } from './components/Modals';
import { ProductCard } from './types';

export default function App() {
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductCard | null>(null);
  const [loadProgress, setLoadProgress] = useState<number>(0);

  const handleOpenBuy = (product?: ProductCard) => {
    setSelectedProduct(product || null);
    setBuyModalOpen(true);
  };

  return (
    <div className="min-h-screen text-slate-900 font-sans antialiased selection:bg-blue-500 selection:text-white bg-slate-50/50">
      {/* Full Page Drone Flying Loading Screen */}
      <LoadingScreen progress={loadProgress} />

      {/* Header Navigation */}
      <HeaderNav onOpenBuyModal={() => handleOpenBuy()} />

      <main className="space-y-4">
        {/* Scroll-Based Hero Frame Animation */}
        <HeroScrollAnimation onProgress={(pct) => setLoadProgress((prev) => Math.max(prev, pct))} />

        {/* Quick Access Services & Care Refresh */}
        <QuickServicesSection />

        {/* Product Catalog Section (6 Drones in 3x2 Grid) */}
        <ProductGrid onSelectProduct={(card) => handleOpenBuy(card)} />

        {/* Animated Flying Drone Feature Discovery Section */}
        <FlyingDroneExperience />

        {/* New Pure Scroll Animation Section using 240 WebP Drone Frames */}
        <FlightModesScrollAnimation />

        {/* NEW UNIQUE SECTION 1: Interactive Flight Telemetry & HUD Simulator */}
        <DroneSimulatorSection />

        {/* Cinematography Showcase Gallery */}
        <ShotOnSection />

        {/* NEW UNIQUE SECTION 2: Interactive Spec Comparison Matrix */}
        <DroneComparisonSection onSelectProduct={(card) => handleOpenBuy(card)} />

        {/* Innovation Section */}
        <InnovationSection />

        {/* Industry Ecosystems Section */}
        <FieldsSection />

        {/* NEW UNIQUE SECTION 3: SkyPixel Global Aerial Creators Community */}
        <SkyPixelCommunitySection />


      </main>

      {/* Footer */}
      <Footer onOpenFeedbackModal={() => setFeedbackModalOpen(true)} />

      {/* Interactive Modals */}
      <BuyModal
        isOpen={buyModalOpen}
        onClose={() => setBuyModalOpen(false)}
        selectedProduct={selectedProduct}
      />

      <FeedbackModal
        isOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
      />
    </div>
  );
}
