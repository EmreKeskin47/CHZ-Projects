import BackToHub from "@/components/BackToHub";
import proposals from "@/data/mock_proposal";
import React, { useState } from "react";

const VotingPage: React.FC = () => {
    const [selectedOptions, setSelectedOptions] = useState<
        Record<number, string | null>
    >({});

    const handleOptionChange = (proposalId: number, option: string) => {
        setSelectedOptions((prev) => ({ ...prev, [proposalId]: option }));
    };

    return (
        <div>
            <h1 className="my-8 text-center text-3xl font-bold  ">
                Active Proposals
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {proposals.map((proposal) => (
                    <div
                        key={proposal.id}
                        className="bg-gray-800 text-white p-6 rounded-lg shadow-md"
                    >
                        <h2 className="text-2xl font-bold mb-4">
                            {proposal.title}
                        </h2>
                        {proposal.options.map((option) => (
                            <label key={option} className="block mb-2">
                                <input
                                    type="radio"
                                    name={`proposal_${proposal.id}`}
                                    value={option}
                                    checked={
                                        selectedOptions[proposal.id] === option
                                    }
                                    onChange={() =>
                                        handleOptionChange(proposal.id, option)
                                    }
                                    className="mr-2"
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                ))}
            </div>

            <BackToHub />
        </div>
    );
};

export default VotingPage;
