import Image from "next/image";
import dynamic from 'next/dynamic';
import './globals.css'; 
import Navbar from "@/components/navbar";
import { FeatureStepsDemo } from "@/components/featuredemo";
import Footer from "@/components/footer";
import HeroSection from "@/components/Hero";
import FAQ from "@/components/faq";
export default function Home() {
  return (
    <div>
      <Navbar/>
       <HeroSection/>
       <FeatureStepsDemo/>
       <FAQ/>
       <Footer/>
    </div>
  );
}
