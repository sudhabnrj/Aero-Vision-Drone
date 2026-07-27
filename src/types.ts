export interface ProductCard {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  specs?: string[];
  rating?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  links: { text: string; url: string; primary?: boolean }[];
  image: string;
  imageAlt: string;
}

export interface HeroSlide {
  id: string;
  category: string;
  title: string;
  tagline: string;
  buttons: { text: string; url: string }[];
  image: string;
}

export interface InnovationItem {
  id: string;
  category: string;
  title: string;
  linkText: string;
  image: string;
}

export interface FieldItem {
  id: string;
  title: string;
  description: string;
  linkText: string;
  image: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
  sections?: { title: string; links: { label: string; href: string }[] }[];
}
