import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BrandsStrip } from "@/components/BrandsStrip";
import { Products } from "@/components/Products";
import { OrderEnquiry } from "@/components/OrderEnquiry";
import { ProjectDiscussion } from "@/components/ProjectDiscussion";
import { Gallery } from "@/components/Gallery";
import { Delivery } from "@/components/Delivery";
import { About } from "@/components/About";
import { BookConsultation } from "@/components/BookConsultation";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Vallaba Ganapathy Associates | Premium Construction Materials in Chennai</title>
        <meta name="description" content="Trusted supplier of premium steel, cement, paints, sand, and construction materials delivered across Chennai. Request a quote for your project." />
        <meta property="og:title" content="Vallaba Ganapathy Associates | Premium Construction Materials" />
        <meta property="og:description" content="Trusted supplier of premium steel, cement, paints, sand, and construction materials delivered across Chennai." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <BrandsStrip />
          <Products />
          <OrderEnquiry />
          <ProjectDiscussion />
          <Gallery />
          <Delivery />
          <About />
          <BookConsultation />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}