import Link from "next/link";
import React from "react";

const BackToHome = () => {
    return (
        <Link href="/">
            <h2 className="m-4  py-4 px-5 rounded border border-gray-300 bg-gray-700 w-fit">
                Back to Home
            </h2>
        </Link>
    );
};
export default BackToHome;
