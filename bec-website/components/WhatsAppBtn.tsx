import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppBtn = () => {
    return (
        <a
            href="https://wa.me/1234567890" // User should replace this number
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
            aria-label="Chat on WhatsApp"
        >
            <FaWhatsapp className="text-3xl" />
        </a>
    );
};

export default WhatsAppBtn;
