import { useState, useEffect } from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import EditorFooter from "./EditorFooter";
import { Problem } from "@/utils/types/problem";
import { useRouter } from "next/router";
import useLocalStorage from "@/hooks/useLocalStorage";
import MonacoEditor from "@monaco-editor/react";
import ExampleTabs from "../ExampleTabs";


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

interface LanguageData {
    language: string;
}

const Playground: React.FC<PlaygroundProps> = ({ problem, setSuccess, setSolved }) => {
	let [userCode, setUserCode] = useState<string>(problem.starterCode);
	const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");
	const [languages, setLanguages] = useState([]);
	const [selectedLanguage, setSelectedLanguage] = useState('');
	const [codeId, setCodeId] = useState(0);

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
					codeId : codeId
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
        const fetchLanguages = async () => {
            try {
                const response = await fetch(`http://localhost:4000/problems/lang/${problem.id}`);
                const data = await response.json();
				
				const languageList = data.map((item: LanguageData) => item.language);
                setLanguages(languageList);
                if (languageList.length > 0) {
                    setSelectedLanguage(languageList[0]);
                }
            } catch (error) {
                console.error('Error fetching languages:', error);
            }
        };

        fetchLanguages();
    }, []);

	useEffect(() => {
		const fetchBaseCode = async () => {
			try {
				const response = await fetch(`http://localhost:4000/problems/getBaseCode?language=${selectedLanguage}&id=${problem.id}`);
				const data = await response.json();
				setUserCode(data.starter_code);
				setCodeId(data.codeId);
				console.log("User Code : ",userCode+" code : "+codeId);
			} catch (error) {
				console.error('Error fetching base code:', error);
			}
		};
		fetchBaseCode();
	}, [selectedLanguage]);

	const onChange = (value: string) => {
		if(value){
			setUserCode(value);
			localStorage.setItem(`code-${pid}`, JSON.stringify(value));
		}
	};

	const handleLanguageChange = (newLanguage : string) => {
        setSelectedLanguage(newLanguage);
        // Additional logic to fetch base code for the selected language
    };

	return (
		<div className='flex flex-col bg-dark-layer-1 relative overflow-x-hidden'>
			<PreferenceNav settings={settings} setSettings={setSettings} languages={languages} selectedLanguage={selectedLanguage} onLanguageChange={handleLanguageChange}/>

			<Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60}>
				<div className='w-full overflow-auto'>
				<MonacoEditor
					height="90vh"
					language={selectedLanguage}
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

					<div className='font-semibold my-4'>
						<ExampleTabs examples={problem.examples} />
					</div>
				</div>
			</Split>
			<EditorFooter handleSubmit={handleSubmit} />
		</div>
	);
};
export default Playground;
