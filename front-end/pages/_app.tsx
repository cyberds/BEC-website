import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>BEC - Arts, Media & Printing</title>
            </Head>
            <main className={`font-sans`}>
                <Component {...pageProps} />
            </main>
        </>
    );
}
