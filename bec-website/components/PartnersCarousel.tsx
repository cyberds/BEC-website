const partners = [
    "Google", "Amazon", "Netflix", "Spotify", "Samsung", "Adobe", "Microsoft", "Apple"
];

const PartnersCarousel = () => {
    return (
        <section id="partners" className="py-20 bg-black overflow-hidden border-y border-neutral-800">
            <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
                <p className="text-sm text-gray-500 uppercase tracking-widest">Trusted By Leading Brands</p>
            </div>

            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap py-4 flex items-center space-x-16">
                    {/* Duplicate list for seamless loop */}
                    {[...partners, ...partners, ...partners].map((partner, idx) => (
                        <div key={idx} className="text-2xl md:text-4xl font-black text-transparent text-stroke hover:text-white transition-colors cursor-default select-none">
                            {partner}
                        </div>
                    ))}
                </div>

                <div className="absolute top-0 animate-marquee2 whitespace-nowrap py-4 flex items-center space-x-16">
                    {[...partners, ...partners, ...partners].map((partner, idx) => (
                        <div key={idx} className="text-2xl md:text-4xl font-black text-transparent text-stroke hover:text-white transition-colors cursor-default select-none">
                            {partner}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnersCarousel;
