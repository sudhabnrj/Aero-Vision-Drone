import { HeroSlide, ProductCard, InnovationItem, FieldItem, FooterColumn } from '../types';
import p1 from '../../assets/p1.png';
import p2 from '../../assets/p2.png';
import p3 from '../../assets/p3.png';
import p4 from '../../assets/p4.png';
import p5 from '../../assets/p5.png';
import p6 from '../../assets/p6.png';
import p7 from '../../assets/p7.png';
import p8 from '../../assets/p8.png';
import p9 from '../../assets/p9.png';
import p10 from '../../assets/p10.png';

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'agras-t100',
    category: 'Smart Agricultural Equipment',
    title: 'Aero Vision AGRAS T100',
    tagline: 'Big Drone, Big Jobs.',
    buttons: [
      { text: 'Aero Vision AGRAS T100 >', url: '#agras-t100' },
      { text: 'Aero Vision MAVIC 3 PRO >', url: '#mavic-3-pro' }
    ],
    image: p1
  },
  {
    id: 'mavic-3-pro',
    category: 'Flagship Cinematography',
    title: 'Aero Vision MAVIC 3 PRO',
    tagline: 'Triple-Camera System with Hasselblad CMOS.',
    buttons: [
      { text: 'Aero Vision MAVIC 3 PRO >', url: '#mavic-3-pro' },
      { text: 'Aero Vision INSPIRE 3 >', url: '#inspire-3' }
    ],
    image: p2
  }
];

export const PRODUCT_CARDS: ProductCard[] = [
  {
    id: 'agras-t100',
    category: 'Smart Agriculture Drone',
    title: 'Aero Vision AGRAS T100',
    subtitle: 'Heavy-payload agricultural spraying and multispectral spreading system',
    price: '$14,999',
    originalPrice: '$16,500',
    specs: ['50kg Spray Payload', 'Active Phased Array Radar', 'Dual Atomizing Sprayers'],
    rating: 4.9,
    isNew: true,
    links: [
      { text: 'Learn More', url: '#agras-t100-learn' },
      { text: 'Buy Now', url: '#agras-t100-buy', primary: true }
    ],
    image: p1,
    imageAlt: 'Aero Vision Agras T100 Agricultural Spraying Drone'
  },
  {
    id: 'mavic-3-pro',
    category: 'Flagship Triple-Camera Drone',
    title: 'Aero Vision MAVIC 3 PRO',
    subtitle: 'Triple-camera system with Hasselblad 4/3 CMOS main camera',
    price: '$2,199',
    originalPrice: '$2,499',
    specs: ['4/3 CMOS Hasselblad', '43-Min Flight Time', '15km O4 Transmission'],
    rating: 4.9,
    isBestSeller: true,
    links: [
      { text: 'Learn More', url: '#mavic-3-learn' },
      { text: 'Buy Now', url: '#mavic-3-buy', primary: true }
    ],
    image: p2,
    imageAlt: 'Aero Vision Mavic 3 Pro Camera Drone'
  },
  {
    id: 'avata-2',
    category: 'FPV Motion-Control Drone',
    title: 'Aero Vision AVATA 2',
    subtitle: 'Immersive FPV acrobatic flying with 4K HDR 157° ultra-wide camera',
    price: '$999',
    specs: ['1/1.3" CMOS 4K Sensor', '157° Ultra-Wide FOV', 'Built-in Propeller Guard'],
    rating: 4.8,
    isNew: true,
    links: [
      { text: 'Learn More', url: '#avata-2-learn' },
      { text: 'Buy Now', url: '#avata-2-buy', primary: true }
    ],
    image: p3,
    imageAlt: 'Aero Vision Avata 2 FPV Drone'
  },
  {
    id: 'air-3s',
    category: 'Dual-Camera Travel Drone',
    title: 'Aero Vision AIR 3S',
    subtitle: 'Dual 1-inch primary camera system with omnidirectional nightscape sensing',
    price: '$1,099',
    originalPrice: '$1,199',
    specs: ['1" CMOS Main Camera', 'Nightscape Sensing', '45-Min Flight Time'],
    rating: 4.8,
    links: [
      { text: 'Learn More', url: '#air-3s-learn' },
      { text: 'Buy Now', url: '#air-3s-buy', primary: true }
    ],
    image: p4,
    imageAlt: 'Aero Vision Air 3S Camera Drone'
  },
  {
    id: 'mini-4-pro',
    category: 'Sub-249g Mini Camera Drone',
    title: 'Aero Vision MINI 4 PRO',
    subtitle: 'Ultralight palm-sized folding drone with omnidirectional obstacle sensing',
    price: '$759',
    originalPrice: '$859',
    specs: ['< 249g Lightweight', '4K/60fps HDR Video', 'True Vertical Shooting'],
    rating: 4.9,
    isBestSeller: true,
    links: [
      { text: 'Learn More', url: '#mini-4-learn' },
      { text: 'Buy Now', url: '#mini-4-buy', primary: true }
    ],
    image: p5,
    imageAlt: 'Aero Vision Mini 4 Pro Drone'
  },
  {
    id: 'matrice-350-rtk',
    category: 'Enterprise Inspection Drone',
    title: 'Aero Vision MATRICE 350 RTK',
    subtitle: 'Rugged weatherproof commercial drone platform for mapping and inspection',
    price: '$11,500',
    specs: ['IP55 Rating Weatherproof', '55-Min Max Flight Time', 'Night Vision FPV Cam'],
    rating: 5.0,
    links: [
      { text: 'Learn More', url: '#matrice-350-learn' },
      { text: 'Buy Now', url: '#matrice-350-buy', primary: true }
    ],
    image: p6,
    imageAlt: 'Aero Vision Matrice 350 RTK Enterprise Drone'
  },
  {
    id: 'inspire-3',
    category: 'Cinema Master Drone',
    title: 'Aero Vision INSPIRE 3',
    subtitle: 'Full-frame 8K ProRes RAW video camera drone system for feature films',
    price: '$9,699',
    specs: ['8K/75fps ProRes RAW', 'Full-Frame Sensor', '360° Pan Dual Control'],
    rating: 5.0,
    links: [
      { text: 'Learn More', url: '#inspire-3-learn' },
      { text: 'Buy Now', url: '#inspire-3-buy', primary: true }
    ],
    image: p7,
    imageAlt: 'Aero Vision Inspire 3 Cinema Drone'
  },
  {
    id: 'mavic-3-enterprise',
    category: 'Thermal & Survey Drone',
    title: 'Aero Vision MAVIC 3 ENTERPRISE',
    subtitle: 'Compact thermal camera drone for thermal inspection and surveying',
    price: '$3,810',
    specs: ['Thermal & Mechanical Shutter', '56x Hybrid Zoom', 'RTK Centimeter Module'],
    rating: 4.9,
    links: [
      { text: 'Learn More', url: '#m3e-learn' },
      { text: 'Buy Now', url: '#m3e-buy', primary: true }
    ],
    image: p8,
    imageAlt: 'Aero Vision Mavic 3 Enterprise Thermal Drone'
  },
  {
    id: 'osmo-pocket-3',
    category: 'Handheld & Gimbal Camera',
    title: 'Aero Vision OSMO POCKET 3',
    subtitle: '1-inch CMOS pocket-sized 4K 120fps rotating touch display camera',
    price: '$519',
    specs: ['1" CMOS 4K/120fps', '2-Inch Rotatable Screen', '3-Axis Mechanical Stabilization'],
    rating: 4.9,
    isBestSeller: true,
    links: [
      { text: 'Learn More', url: '#osmo-3-learn' },
      { text: 'Buy Now', url: '#osmo-3-buy', primary: true }
    ],
    image: p9,
    imageAlt: 'Aero Vision Osmo Pocket 3 Camera'
  },
  {
    id: 'dock-2',
    category: 'Autonomous Drone Station',
    title: 'Aero Vision DOCK 2',
    subtitle: 'Automated remote drone deployment and high-speed fast charging dock',
    price: '$9,999',
    specs: ['Automated Deployment', 'IP55 Weatherproof', '10-km Operating Radius'],
    rating: 4.9,
    isNew: true,
    links: [
      { text: 'Learn More', url: '#dock-2-learn' },
      { text: 'Buy Now', url: '#dock-2-buy', primary: true }
    ],
    image: p10,
    imageAlt: 'Aero Vision Dock 2 Station'
  }
];

export const SHOT_ON_SLIDES = [
  {
    id: 'van-road',
    title: 'Shot on Aero Vision Mavic 3 Pro',
    subtitle: 'Winding Mountain Pass Aerial',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop',
    caption: 'Sunset photography over winding coastal alpine highways recorded in 4K HDR.'
  },
  {
    id: 'city-night',
    title: 'Shot on Aero Vision Air 3S',
    subtitle: 'Metropolitan Nightscape Panorama',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop',
    caption: 'Ultra-low-light nightscape capture using LiDAR obstacle sensing and 10-bit color.'
  },
  {
    id: 'coast-drive',
    title: 'Shot on Aero Vision Mini 4 Pro',
    subtitle: 'Turquoise Ocean Reef Waves',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop',
    caption: 'Crystal-clear aerial reef survey shot with true vertical 4K HDR video.'
  }
];

export const INNOVATION_ITEMS: InnovationItem[] = [
  {
    id: 'agriculture-report',
    category: 'Industry Insight Report',
    title: 'Aero Vision Agriculture Annual Report',
    linkText: 'Learn More >',
    image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'ronin-award',
    category: 'Engineering, Science & Technology',
    title: 'Aero Vision Gimbal System Honored with 2025 Scientific and Technical Award',
    linkText: 'Learn More >',
    image: 'https://images.unsplash.com/photo-1533561052604-c3beb6d55b8d?q=80&w=1000&auto=format&fit=crop'
  }
];

export const FIELD_ITEMS: FieldItem[] = [
  {
    id: 'video-production',
    title: 'Video Production',
    description: 'Professional Aerial and Ground Filmmaking Tools',
    linkText: 'Learn More >',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'enterprise',
    title: 'Enterprise',
    description: 'Drone Solutions for a New Generation of Work',
    linkText: 'Learn More >',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'agriculture',
    title: 'Agriculture',
    description: 'Efficient and Intelligent Agricultural Solution',
    linkText: 'Learn More >',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000&auto=format&fit=crop'
  }
];

export const FOOTER_DATA: FooterColumn[] = [
  {
    title: 'Product Categories',
    links: [
      { label: 'Consumer', href: '#consumer' },
      { label: 'Professional', href: '#professional' },
      { label: 'Enterprise', href: '#enterprise' },
      { label: 'Components', href: '#components' }
    ],
    sections: [
      {
        title: 'Service Plans',
        links: [
          { label: 'Aero Vision Care Refresh', href: '#care-refresh' },
          { label: 'Aero Vision Care Pro', href: '#care-pro' },
          { label: 'Aero Vision Care Enterprise', href: '#care-enterprise' },
          { label: 'Aero Vision Maintenance Program', href: '#maintenance' }
        ]
      }
    ]
  },
  {
    title: 'Where to Buy',
    links: [
      { label: 'Aero Vision Online Store', href: '#online-store' },
      { label: 'Flagship Stores', href: '#flagship' },
      { label: 'Aero Vision-Operated Stores', href: '#operated' },
      { label: 'Retail Stores', href: '#retail' },
      { label: 'Enterprise Retailers', href: '#enterprise-retail' },
      { label: 'Agricultural Drone Dealer', href: '#agri-dealer' },
      { label: 'Delivery Drone Dealer', href: '#delivery-dealer' },
      { label: 'Pro Retailers', href: '#pro-retailers' },
      { label: 'Aero Vision Store App', href: '#store-app' }
    ],
    sections: [
      {
        title: 'Cooperation',
        links: [
          { label: 'Become a Dealer', href: '#become-dealer' },
          { label: 'Apply for Authorized Store', href: '#apply-store' }
        ]
      }
    ]
  },
  {
    title: 'Fly Safe',
    links: [
      { label: 'Fly Safe', href: '#fly-safe' },
      { label: 'Aero Vision Flying Tips', href: '#flying-tips' }
    ],
    sections: [
      {
        title: 'Support',
        links: [
          { label: 'Product Support', href: '#product-support' },
          { label: 'Service Request and Inquiry', href: '#service-request' },
          { label: 'Help Center', href: '#help-center' },
          { label: 'After-Sales Service Policies', href: '#after-sales' },
          { label: 'Download Center', href: '#download' },
          { label: 'Security and Privacy', href: '#security-privacy' }
        ]
      }
    ]
  },
  {
    title: 'Explore',
    links: [
      { label: 'Media Center', href: '#media-center' },
      { label: 'Buying Guides', href: '#buying-guides' },
      { label: 'Aero Vision Trust Center', href: '#trust-center' },
      { label: 'Aero Vision Blog', href: '#blog' }
    ],
    sections: [
      {
        title: 'Trending Now',
        links: [
          { label: 'Phone Gimbals', href: '#phone-gimbals' },
          { label: 'Camera Gimbals', href: '#camera-gimbals' },
          { label: 'Action Cameras', href: '#action-cameras' },
          { label: 'Wireless Microphones', href: '#microphones' },
          { label: 'Portable Power Stations', href: '#power-stations' },
          { label: 'Vlog Cameras', href: '#vlog-cameras' }
        ]
      }
    ]
  },
  {
    title: 'Community',
    links: [
      { label: 'SkyPixel', href: '#skypixel' },
      { label: 'Aero Vision Forum', href: '#forum' },
      { label: 'Developer', href: '#developer' }
    ]
  }
];
