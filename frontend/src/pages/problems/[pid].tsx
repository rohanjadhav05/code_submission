import Topbar from "@/components/Topbar/Topbar";
import Workspace from "@/components/Workspace/Workspace";
import { Example, Problem } from "@/utils/types/problem";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';


type ProblemPageProps = {
	pid: number; // Ensure this matches the parameter name
};

const ProblemPage: React.FC<ProblemPageProps> = ({ }) => {
	const router = useRouter();
	const pid = router.query.pid; 
	const [problem, setProblem] = useState<Problem | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProblem = async () => {
			try {
				const response = await fetch(`http://localhost:4000/problems/getProblemById/${pid}`);
				if (response.ok) {
					const data = await response.json();
					const examples: Example[] = data.map((row: any, index: number) => ({
						id: index, // You can use the index as id, or row.id if it exists
						inputText: row.input, 
						outputText: row.output,
						explanation: row.explanation
					}));
					const problemData : Problem = {
						id : data[0].id,
						name : data[0].name,
						description : data[0].description,
						constraints : data[0].constraints,
						difficulty : data[0].difficulty,
						examples,
						starterCode : data[0].starterCode,
						order : 1,
						topic : data[0].topic,
						codeId : data[0].codeId,
					}

					setProblem(problemData);
				} else {
					setError('Problem not found');
				}
			} catch (error) {
				setError('Failed to fetch problem');
			} finally {
				setLoading(false);
			}
		};
	
		fetchProblem();
	}, [pid]);
	

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	if (!problem) {
		return <p>Problem not found</p>;
	}

	return (
		<div>
			<Topbar problemPage />
			<Workspace problem={problem} />
		</div>
	);
};



export default ProblemPage;
