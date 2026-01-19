import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>BEC - Arts, Media & Printing</title>
            </Head>
            <main className={`${inter.variable} font-sans`}>
                <Component {...pageProps} />
            </main>
        </>
    );
}
