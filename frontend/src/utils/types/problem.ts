
export type Example = {
	id: number;
	inputText: Record<string, any[]>;
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
	starterCode: string;
	topic : string;
	codeId : number;
};

export type DBProblem = {
	id: string;
	name: string;
	topic: string;
	difficulty: string;
	likes: number;
	dislikes: number;
	order: number;
	videoId?: string;
	link?: string;
};
