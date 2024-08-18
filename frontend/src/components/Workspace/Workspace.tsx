import { useState } from "react";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription/ProblemDescription";
import Playground from "./Playground/Playground";
import { Problem } from "@/utils/types/problem";
import Confetti from "react-confetti";
import useWindowSize from "@/hooks/useWindowSize";
import ProgressLevel from "../Progress/ProgressLevel";

type WorkspaceProps = {
	problem: Problem[];
};

const Workspace: React.FC<WorkspaceProps> = ({ problem }) => {
	const { width, height } = useWindowSize();
	const [success, setSuccess] = useState(false);
	const [solved, setSolved] = useState(false);
	

	return (
		<Split className='split' minSize={0}>
			<ProgressLevel/>
		</Split>
	);
};
export default Workspace;
