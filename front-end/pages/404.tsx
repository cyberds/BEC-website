import Link from 'next/link';

export default function Custom404() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6 text-center">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-xl text-gray-400 mb-8">Oops! The page you are looking for does not exist.</p>
            <Link href="/" className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
                Go Back Home
            </Link>
        </div>
    );
}
