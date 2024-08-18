import { useState, useEffect } from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import EditorFooter from "./EditorFooter";
import { Problem } from "@/utils/types/problem";
import { useRouter } from "next/router";
import useLocalStorage from "@/hooks/useLocalStorage";
import MonacoEditor from "@monaco-editor/react";


type PlaygroundProps = {
	problem: Problem;
	setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
	setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ISettings {
	fontSize: string;
	settingsModalIsOpen: boolean;
	dropdownIsOpen: boolean;
}

const Playground: React.FC<PlaygroundProps> = ({ problem, setSuccess, setSolved }) => {
	console.log(problem)
	let [userCode, setUserCode] = useState<string>(problem.starterCode);

	const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");

	const [settings, setSettings] = useState<ISettings>({
		fontSize: fontSize,
		settingsModalIsOpen: false,
		dropdownIsOpen: false,
	});

	const user = "";
	const {
		query: { pid },
	} = useRouter();

	const handleSubmit = async () => {
		try {
			console.log("user edit code : "+userCode);
			fetch('http://localhost:4000/problems/userRun',{
				method : 'POST',
				headers : {
					'Content-Type': 'application/json',
				},
				body : JSON.stringify({
					userCode : userCode,
					id : problem.id,
					codeId : problem.codeId
				}),
			})
			.then(response => response.json())
			.then(data => {
				console.log('Success : ',data)
			})
			.catch(err => {
				console.error('Error : ',err);
			})
		} catch (error: any) {
			console.log("inside the catch");
		}
	};

	useEffect(() => {
		const code = localStorage.getItem(`code-${pid}`);
		console.log("insde the useEffect of code : ");
		setUserCode(problem.starterCode);
	}, [pid,problem.starterCode]);

	const onChange = (value: string) => {
		if(value){
			setUserCode(value);
			localStorage.setItem(`code-${pid}`, JSON.stringify(value));
		}
	};

	return (
		<div className='flex flex-col bg-dark-layer-1 relative overflow-x-hidden'>
			<PreferenceNav settings={settings} setSettings={setSettings} />

			<Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60}>
				<div className='w-full overflow-auto'>
				<MonacoEditor
					height="90vh"
					language="java"
					value={userCode}
					onChange={onChange}
					theme="vs-dark"
					/>

				</div>
				<div className='w-full px-5 overflow-auto'>
					{/* testcase heading */}
					<div className='flex h-10 items-center space-x-6'>
						<div className='relative flex h-full flex-col justify-center cursor-pointer'>
							<div className='text-sm font-medium leading-5 text-white'>Testcases</div>
							<hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white' />
						</div>
					</div>

					{/* hita TestCases dakycha ahet */}
					<div className='flex'>
						
					</div>

					<div className='font-semibold my-4'>
						<p className='text-sm font-medium mt-4 text-white'>Input:</p>
						<div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
							 {/*problem.examples[activeTestCaseId].inputText*/}
						</div>
						<p className='text-sm font-medium mt-4 text-white'>Output:</p>
						<div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
							{/*problem.examples[activeTestCaseId].outputText*/}
						</div>
					</div>
				</div>
			</Split>
			<EditorFooter handleSubmit={handleSubmit} />
		</div>
	);
};
export default Playground;
