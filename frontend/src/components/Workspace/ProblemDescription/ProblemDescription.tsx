import CircleSkeleton from "@/components/Skeletons/CircleSkeleton";
import RectangleSkeleton from "@/components/Skeletons/RectangleSkeleton";
//import { auth, firestore } from "@/firebase/firebase";
import { DBProblem, Example, Problem } from "@/utils/types/problem";
import { arrayRemove, arrayUnion, doc, getDoc, runTransaction, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
//import { useAuthState } from "react-firebase-hooks/auth";
import { AiFillLike, AiFillDislike, AiOutlineLoading3Quarters, AiFillStar } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import { toast } from "react-toastify";
import { BsChat } from "react-icons/bs";
import { LuTag } from "react-icons/lu";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type ProblemDescriptionProps = {
	problem: Problem;
	_solved: boolean;
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem, _solved }) => {
	const [problemDifficultyClass, setProblemDifficultyClass ] = useState("");
	const [loading, setLoading ] = useState(false);
	const example : Example[] = problem.examples;
	const topic = problem?.topic;
	let topicArray = null;
	if (topic){
		topicArray = problem.topic.split(',').map(topic => topic.trim());
	}
	const user = "";//useAuthState(auth);
	//const { currentProblem, loading, problemDifficultyClass, setCurrentProblem } = useGetCurrentProblem(problem.id);
	//const { liked, disliked, solved, setData, starred } = useGetUsersDataOnProblem(problem.id);
	const [updating, setUpdating] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	console.log(JSON.stringify(problem));
	useEffect(()=> {
		if(!problem){
			setLoading(true);
		}
		setProblemDifficultyClass(
			problem.difficulty === "Easy"
				? "bg-olive text-olive"
				: problem.difficulty === "Medium"
				? "bg-dark-yellow text-dark-yellow"
				: " bg-dark-pink text-dark-pink"
		);
	},[problem])

	const toggleOpen = () => {
		setIsOpen(prev => !prev);
	};

	const formatInputText = (inputText: Record<string, any[]>) => {
		return Object.entries(inputText)
				.map(([key, value]) => {
					if (Array.isArray(value)) {
						return `${key} = [${value.join(', ')}]`;
					} else if (typeof value === 'string') {
						return `${key} = "${value}"`;
					}
					return `${key} = ${value}`;
				})
				.join(', ');
	};

	const handleLike = async () => {
		if (!user) {
			toast.error("You must be logged in to like a problem", { position: "top-left", theme: "dark" });
			return;
		}
		if (updating) return;
		setUpdating(true);
		// await runTransaction(firestore, async (transaction) => {
		// 	const { problemDoc, userDoc, problemRef, userRef } = await returnUserDataAndProblemData(transaction);

		// 	if (userDoc.exists() && problemDoc.exists()) {
		// 		if (liked) {
		// 			// remove problem id from likedProblems on user document, decrement likes on problem document
		// 			transaction.update(userRef, {
		// 				likedProblems: userDoc.data().likedProblems.filter((id: string) => id !== problem.id),
		// 			});
		// 			transaction.update(problemRef, {
		// 				likes: problemDoc.data().likes - 1,
		// 			});

		// 			setCurrentProblem((prev) => (prev ? { ...prev, likes: prev.likes - 1 } : null));
		// 			setData((prev) => ({ ...prev, liked: false }));
		// 		} else if (disliked) {
		// 			transaction.update(userRef, {
		// 				likedProblems: [...userDoc.data().likedProblems, problem.id],
		// 				dislikedProblems: userDoc.data().dislikedProblems.filter((id: string) => id !== problem.id),
		// 			});
		// 			transaction.update(problemRef, {
		// 				likes: problemDoc.data().likes + 1,
		// 				dislikes: problemDoc.data().dislikes - 1,
		// 			});

		// 			setCurrentProblem((prev) =>
		// 				prev ? { ...prev, likes: prev.likes + 1, dislikes: prev.dislikes - 1 } : null
		// 			);
		// 			setData((prev) => ({ ...prev, liked: true, disliked: false }));
		// 		} else {
		// 			transaction.update(userRef, {
		// 				likedProblems: [...userDoc.data().likedProblems, problem.id],
		// 			});
		// 			transaction.update(problemRef, {
		// 				likes: problemDoc.data().likes + 1,
		// 			});
		// 			setCurrentProblem((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null));
		// 			setData((prev) => ({ ...prev, liked: true }));
		// 		}
		// 	}
		// });
		setUpdating(false);
	};

	// const handleDislike = async () => {
	// 	if (!user) {
	// 		toast.error("You must be logged in to dislike a problem", { position: "top-left", theme: "dark" });
	// 		return;
	// 	}
	// 	if (updating) return;
	// 	setUpdating(true);
	// 	await runTransaction(firestore, async (transaction) => {
	// 		const { problemDoc, userDoc, problemRef, userRef } = await returnUserDataAndProblemData(transaction);
	// 		if (userDoc.exists() && problemDoc.exists()) {
	// 			// already disliked, already liked, not disliked or liked
	// 			if (disliked) {
	// 				transaction.update(userRef, {
	// 					dislikedProblems: userDoc.data().dislikedProblems.filter((id: string) => id !== problem.id),
	// 				});
	// 				transaction.update(problemRef, {
	// 					dislikes: problemDoc.data().dislikes - 1,
	// 				});
	// 				setCurrentProblem((prev) => (prev ? { ...prev, dislikes: prev.dislikes - 1 } : null));
	// 				setData((prev) => ({ ...prev, disliked: false }));
	// 			} else if (liked) {
	// 				transaction.update(userRef, {
	// 					dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
	// 					likedProblems: userDoc.data().likedProblems.filter((id: string) => id !== problem.id),
	// 				});
	// 				transaction.update(problemRef, {
	// 					dislikes: problemDoc.data().dislikes + 1,
	// 					likes: problemDoc.data().likes - 1,
	// 				});
	// 				setCurrentProblem((prev) =>
	// 					prev ? { ...prev, dislikes: prev.dislikes + 1, likes: prev.likes - 1 } : null
	// 				);
	// 				setData((prev) => ({ ...prev, disliked: true, liked: false }));
	// 			} else {
	// 				transaction.update(userRef, {
	// 					dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
	// 				});
	// 				transaction.update(problemRef, {
	// 					dislikes: problemDoc.data().dislikes + 1,
	// 				});
	// 				setCurrentProblem((prev) => (prev ? { ...prev, dislikes: prev.dislikes + 1 } : null));
	// 				setData((prev) => ({ ...prev, disliked: true }));
	// 			}
	// 		}
	// 	});
	// 	setUpdating(false);
	// };

	// const handleStar = async () => {
	// 	if (!user) {
	// 		toast.error("You must be logged in to star a problem", { position: "top-left", theme: "dark" });
	// 		return;
	// 	}
	// 	if (updating) return;
	// 	setUpdating(true);

	// 	if (!starred) {
	// 		const userRef = doc(firestore, "users", user.uid);
	// 		await updateDoc(userRef, {
	// 			starredProblems: arrayUnion(problem.id),
	// 		});
	// 		setData((prev) => ({ ...prev, starred: true }));
	// 	} else {
	// 		const userRef = doc(firestore, "users", user.uid);
	// 		await updateDoc(userRef, {
	// 			starredProblems: arrayRemove(problem.id),
	// 		});
	// 		setData((prev) => ({ ...prev, starred: false }));
	// 	}

	// 	setUpdating(false);
	// };

	return (
		<div className='bg-dark-layer-1'>
			{/* TAB */}
			<div className='flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden'>
				<div className={"bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"}>
					Description
				</div>
			</div>

			<div className='flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto'>
				<div className='px-5'>
					{/* Problem heading */}
					<div className='w-full'>
						<div className='flex space-x-4'>
							<div className='flex-1 mr-2 text-lg text-white font-semibold'>{problem?.id} . {problem?.name}</div>
						</div>
						{!loading && (
							<div className='flex items-center mt-3'>
								<div
									className={`${problemDifficultyClass} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize mb-2 `}
								>
									{problem.difficulty}
								</div>

								<a href="#topics" className="flex inline-block px-2.5 py-1 space-x-1 bg-gray-400 bg-opacity-[.15] text-white text-xs font-medium rounded-[21px] mb-2 ml-2 ">
									<LuTag />
									<span>Topics</span>
								</a>
	

								{/* {(solved || _solved) && (
									<div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s'>
										<BsCheck2Circle />
									</div>
								)} */}
								{/* <div
									className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6'
									onClick={handleLike}
								>
									{liked && !updating && <AiFillLike className='text-dark-blue-s' />}
									{!liked && !updating && <AiFillLike />}
									{updating && <AiOutlineLoading3Quarters className='animate-spin' />}

									<span className='text-xs'>{currentProblem.likes}</span>
								</div>
								<div
									className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6'
									onClick={handleDislike}
								>
									{disliked && !updating && <AiFillDislike className='text-dark-blue-s' />}
									{!disliked && !updating && <AiFillDislike />}
									{updating && <AiOutlineLoading3Quarters className='animate-spin' />}

									<span className='text-xs'>{currentProblem.dislikes}</span>
								</div>
								<div
									className='cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 '
									onClick={handleStar}
								>
									{starred && !updating && <AiFillStar className='text-dark-yellow' />}
									{!starred && !updating && <TiStarOutline />}
									{updating && <AiOutlineLoading3Quarters className='animate-spin' />}
								</div> */}
							</div>
						)}

						{loading && (
							<div className='mt-3 flex space-x-2'>
								<RectangleSkeleton />
								<CircleSkeleton />
								<RectangleSkeleton />
								<RectangleSkeleton />
								<CircleSkeleton />
							</div>
						)}

						{/* Problem Statement(paragraphs) */}
						<div className='text-white text-sm'>
							<div dangerouslySetInnerHTML={{ __html: problem.description }} />
						</div>

						{/* Examples */}
						<div >
							{example.map((e, index) => (
								<div className='mt-4 mb-4' key={e.id}>
									<p className='font-medium text-white'>Example {index + 1} :</p>
									{e.img && <img src={e.img} alt='' className='mt-3' />}
									<div className='example-card'>
										<div className="ml-5">
											<strong className='text-white'>Input :  </strong> 
												<span style={{ marginLeft: '0.5rem', color: '#A8A9A9' }}>
													{formatInputText(e.inputText)}
												</span>
											<br />
											<strong className='text-white'>Output :  </strong>
												<span style={{color:'#A8A9A9'}}>{JSON.stringify(e.outputText)}</span> 
											<br />
											{e.explanation && (
												<>
													<strong className='text-white'>Explanation :</strong>
													<br /> 
													<div className="mt-1" style={{color:'#A8A9A9'}}
														dangerouslySetInnerHTML={{ __html: e.explanation }}
													/>
												</>
											)}
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Constraints */}
						<div className='text-white text-sm'>
							<h2 className='font-medium mb-2'>Constraints:</h2>
							<ul className='ml-5 list-disc space-y-3'>
								{problem.constraints && Object.entries(problem.constraints).map(([key, constraint]) => (
									<li key={key} dangerouslySetInnerHTML={{ __html: constraint }} />
								))}
							</ul>
						</div>

						<hr className='my-4 border-t border-gray-600' />

						<div id="topics" className="space-y-2">
							{/* Topics Header */}
							<div
								className="flex items-center cursor-pointer"
								onClick={toggleOpen}
							>
								<div className="flex items-center space-x-2 flex-1">
								<LuTag className="text-white" /> {/* The tag symbol */}
								<span className="text-white text-sm">Topics</span>
								</div>
								<span style={{ color: '#383838' }}>
								{isOpen ? (
									<FaChevronUp /> // Arrow pointing up when open
								) : (
									<FaChevronDown /> // Arrow pointing down when closed
								)}
								</span>
							</div>

							{/* Topics List */}
							{isOpen && (
								<div className="flex flex-wrap gap-2 mt-2">
									<div className="ml-4">
									</div>
								{topicArray && topicArray.map((topic, index) => (
									<div
									key={index}
									className="inline-block px-2.5 py-1 space-x-1 bg-gray-400 bg-opacity-[.15] text-white text-xs font-medium rounded-[21px] mt-1 mb-1"
									>
									<span>{topic}</span>
									</div>
								))}
								</div>
							)}
							</div>

						<hr className='my-4 border-t border-gray-600' />

						<div id='Dicussion' className="space-y-2">
							<div className="flex items-center space-x-2">
									<BsChat className="text-white" /> {/* The tag symbol */}
									<span className="text-white text-sm">Discussion</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProblemDescription;

function useGetCurrentProblem(problemId: string) {
	const [currentProblem, setCurrentProblem] = useState<DBProblem | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [problemDifficultyClass, setProblemDifficultyClass] = useState<string>("");

	useEffect(() => {
		// Get problem from DB
		const getCurrentProblem = async () => {
			// setLoading(true);
			// const docRef = doc(firestore, "problems", problemId);
			// const docSnap = await getDoc(docRef);
			// if (docSnap.exists()) {
			// 	const problem = docSnap.data();
			// 	setCurrentProblem({ id: docSnap.id, ...problem } as DBProblem);
			// 	// easy, medium, hard
			// 	setProblemDifficultyClass(
			// 		problem.difficulty === "Easy"
			// 			? "bg-olive text-olive"
			// 			: problem.difficulty === "Medium"
			// 			? "bg-dark-yellow text-dark-yellow"
			// 			: " bg-dark-pink text-dark-pink"
			// 	);
			// }
			//setLoading(false);
		};
		getCurrentProblem();
	}, [problemId]);

	return { currentProblem, loading, problemDifficultyClass, setCurrentProblem };
}

function useGetUsersDataOnProblem(problemId: string) {
	const [data, setData] = useState({ liked: false, disliked: false, starred: false, solved: false });
	const user = "";//useAuthState(auth);

	useEffect(() => {
		const getUsersDataOnProblem = async () => {
			// const userRef = doc(firestore, "users", user!.uid);
			// const userSnap = await getDoc(userRef);
			// if (userSnap.exists()) {
			// 	const data = userSnap.data();
			// 	const { solvedProblems, likedProblems, dislikedProblems, starredProblems } = data;
			// 	setData({
			// 		liked: likedProblems.includes(problemId), // likedProblems["two-sum","jump-game"]
			// 		disliked: dislikedProblems.includes(problemId),
			// 		starred: starredProblems.includes(problemId),
			// 		solved: solvedProblems.includes(problemId),
			// 	});
			// }
		};

		if (user) getUsersDataOnProblem();
		return () => setData({ liked: false, disliked: false, starred: false, solved: false });
	}, [problemId, user]);

	return { ...data, setData };
}
