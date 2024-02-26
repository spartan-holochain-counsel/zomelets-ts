
import {
    HoloHash, DnaHash, AgentPubKey,
    ActionHash, EntryHash,
}					from '@spartan-hc/holo-hash';
import { Zomelet }			from './index';
import {
    MereMemoryZomelet,
    MereMemoryCSR,
}					from './mere_memory';



export interface ZomeHubCSRInterface {
    create_integrity(
	bytes:		Uint8Array,
    ) : Promise<EntryHash>;
}

export type ZomeHubCSRDependencies = {
    zomes: {
	mere_memory:	MereMemoryZomelet;
    },
};

export type ZomeHubZomelet = Zomelet<ZomeHubCSRInterface, ZomeHubCSRDependencies>;

export const ZomeHubCSR : ZomeHubZomelet = {
    functions: {
	async create_integrity ( bytes ) {
	    return await this.zomes.mere_memory.save( bytes );
	},
    },
    dependencies: {
	zomes: {
	    mere_memory: MereMemoryCSR,
	},
    },
};
