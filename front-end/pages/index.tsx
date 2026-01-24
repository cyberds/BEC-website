import Head from 'next/head';
import Navbar from '@/components/Navbar';
import ArtzyHero from '@/components/artzy/ArtzyHero';
import ProblemSolution from '@/components/artzy/ProblemSolution';
import AdvertisingSection from '@/components/artzy/AdvertisingSection';
import HowItWorks from '@/components/artzy/HowItWorks';
import PricingSection from '@/components/artzy/PricingSection';
import DeliveryCapacity from '@/components/artzy/DeliveryCapacity';
import AdvertForm from '@/components/artzy/AdvertForm';
import FAQ from '@/components/artzy/FAQ';
import Footer from '@/components/Footer';
import WhatsAppBtn from '@/components/WhatsAppBtn';

export default function Home() {
    return (
        <>
            <Head>
                <title>BEC Artz - Artzy Box | Tamper-Proof Food Packaging That Advertises</title>
                <meta
                    name="description"
                    content="Artzy Box - Premium tamper-proof, previewable food packaging that turns every delivery into advertising inventory. Safer packaging, stronger brands."
                />
                <meta name="keywords" content="food packaging, tamper-proof, advertising, Lagos, food delivery, brand packaging" />
                <meta property="og:title" content="BEC Artz - Artzy Box | Smart Food Packaging" />
                <meta property="og:description" content="Tamper-proof, previewable food packaging that sells your ad. Every Artzy box is a mobile billboard." />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <link rel="preload" href="/images/food_box front left transparent background.png" as="image" />
                <link rel="preload" href="/images/food_box back right transparent background.png" as="image" />
            </Head>

            <div className="min-h-screen bg-black">
                <Navbar />

                {/* Hero Section */}
                <ArtzyHero />

                {/* Problem & Solution */}
                <ProblemSolution />

                {/* Advertising That Works */}
                <AdvertisingSection />

                {/* How It Works */}
                <HowItWorks />

                {/* Pricing */}
                <PricingSection />

                {/* Delivery & Capacity */}
                <DeliveryCapacity />

                {/* Advert Submission Form */}
                <AdvertForm />

                {/* FAQ */}
                <FAQ />

                {/* Footer */}
                <Footer />

                {/* WhatsApp Button */}
                <WhatsAppBtn />
            </div>
        </>
    );
}
