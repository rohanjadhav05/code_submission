import Topbar from "@/components/Topbar/Topbar";
import Workspace from "@/components/Workspace/Workspace";
import { problems } from "@/mockProblems/problems";
import { Problem } from "@/utils/types/problem";
import React, { useEffect, useState } from "react";


type ProblemPageProps = {
	pid: string; // Ensure this matches the parameter name
};

const ProblemPage: React.FC<ProblemPageProps> = ({ pid }) => {
	const [problem, setProblem] = useState<Problem | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProblem = async () => {
			try {
				const response = await fetch(`http://localhost:4000/problems/getProblemById/${pid}`);
				if (response.ok) {
					const data: Problem = await response.json();
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


export async function getStaticPaths() {
	const paths = Object.keys(problems).map((key) => ({
		params: { pid: key }, // Ensure 'pid' matches the file name
	}));

	return {
		paths,
		fallback: false,
	};
}


export async function getStaticProps({ params }: { params: { pid: string } }) {
	const { pid } = params;
	const response = await fetch(`http://localhost:4000/problems/getProblemById/${pid}`);
	if (response.ok) {
		const problem: Problem = await response.json();
		if (!problem) {
			return {
				notFound: true,
			};
		}
		//problem.handlerFunction = problem.handlerFunction.toString();
		return {
			props: {
				problem,
			},
		};
	}
	return {
		notFound: true,
	};
}



export default ProblemPage;
