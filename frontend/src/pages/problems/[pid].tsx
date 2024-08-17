import Topbar from "@/components/Topbar/Topbar";
import Workspace from "@/components/Workspace/Workspace";
import { Problem } from "@/utils/types/problem";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';


type ProblemPageProps = {
	pid: number; // Ensure this matches the parameter name
};

const ProblemPage: React.FC<ProblemPageProps> = ({ }) => {
	const router = useRouter();
	const pid = router.query.pid; 
	const [problem, setProblem] = useState<Problem[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProblem = async () => {
			try {
				const response = await fetch(`http://localhost:4000/problems/getProblemById/${pid}`);
				if (response.ok) {
					const data = await response.json();
					setProblem(data);
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
