import axios from "axios";
import { useState } from "react";

function App() {
    const [longUrl, setLongUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");

    const handleSubmit = async () => {
        try {
            const apiResponse = await axios.post(
                "http://localhost:3000/shortener",
                { longUrl },
            );

            setShortUrl(apiResponse.data.shortUrl);
        } catch (error) {
            console.error(error);
            setShortUrl("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    URL Shortener
                </h1>

                <input
                    type="text"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    placeholder="Enter long URL"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-200"
                >
                    Shorten URL
                </button>

                {shortUrl && (
                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm mb-2">Short URL:</p>
                        <a
                            href={shortUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 font-medium hover:underline break-all"
                        >
                            {shortUrl}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
