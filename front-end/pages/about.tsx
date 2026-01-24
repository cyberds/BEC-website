import { useAnalytics } from '@/hooks/useAnalytics';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import PartnersCarousel from '@/components/PartnersCarousel';
import VideoTestimonials from '@/components/VideoTestimonials';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import WhatsAppBtn from '@/components/WhatsAppBtn';

export default function Home() {
    useAnalytics(); // Hook to track visitor

    return (
        <div className="bg-black min-h-screen text-white selection:bg-accent selection:text-white">
            <Navbar />
            <Hero />
            <Services />
            <PartnersCarousel />
            <VideoTestimonials />
            <ContactForm />
            <Footer />
            <WhatsAppBtn />
        </div>
    );
}
