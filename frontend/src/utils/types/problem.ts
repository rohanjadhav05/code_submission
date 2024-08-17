export type Example = {
	id: number;
	inputText: string;
	outputText: string;
	explanation?: string;
	img?: string;
};

// local problem data
export type Problem = {
	id: string;
	name: string;
	description: string;
	difficulty:string,
	examples: Example[];
	constraints: Record<string, string>;
	order: number;
	starterCode: Record<string, string>;
	handlerFunction: ((fn: any) => boolean) | string;
	starterFunctionName: string;
	topic : string;
};

export type DBProblem = {
	id: string;
	title: string;
	category: string;
	difficulty: string;
	likes: number;
	dislikes: number;
	order: number;
	videoId?: string;
	link?: string;
};
