import { NextPageContext } from 'next';

function Error({ statusCode }: { statusCode?: number }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6 text-center">
            <h2 className="text-4xl font-bold mb-4">
                {statusCode
                    ? `An error ${statusCode} occurred on server`
                    : 'An error occurred on client'}
            </h2>
            <a href="/" className="mt-8 text-accent hover:underline">Return to Home</a>
        </div>
    )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error
