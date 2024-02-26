
export type FunctionType = ((args: any) => Promise<any>);

export type FunctionsMap = {
    [key: string]: FunctionType;
};

export interface ZomeletInterface {
    functions		: FunctionsMap;
    dependencies       ?: any;
    transformers       ?: any;
};

export type CellZomeletInterface = {
    [key: string]:	ZomeletInterface;
};

export type PeerZomes<Zomelets> = {
    [K in keyof Zomelets]: Zomelets[K] extends ZomeletInterface
	? Zomelets[K]["functions"]
	: {};
}

export type PeerCells<CellZomelets> = {
    [Role in keyof CellZomelets]: CellZomelets[Role] extends CellZomeletInterface
	? PeerZomes<CellZomelets[Role]>
	: {};
}

export interface CallContext<Functions, Dependencies> {
    functions		: Functions;
    zomes		: Dependencies extends { zomes: infer PeerZomelets }
	? PeerZomes<PeerZomelets>
	: {};
    cells		: Dependencies extends { cells: infer PeerCellZomelets }
	? PeerCells<PeerCellZomelets>
	: {};
}

export type ZomeletFunctions<F,D> = F & ThisType<CallContext<F,D>>;

// export type ZomeletDependency<Z = {}, C = {}> = {
//     zomes	       ?: Z;
//     cells	       ?: C;
// };

export type Zomelet<F, D = {}> = ZomeletInterface & {
    functions		: ZomeletFunctions<F, D>;
    dependencies       ?: D;
    transformers       ?: any;
};
