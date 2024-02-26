
import {
    HoloHash, DnaHash, AgentPubKey,
    ActionHash, EntryHash,
}					from '@spartan-hc/holo-hash';
import { Zomelet }			from './index';
import {
    ZomeHubZomelet,
    ZomeHubCSR,
}					from './zomehub';



interface DnaHubCSRInterface {
    create_dna(
	bytes:		Uint8Array,
    ) : Promise<EntryHash>;
}

type DnaHubCSRDependencies = {
    cells: {
	zomehub: {
	    zomehub_csr:	ZomeHubZomelet,
	},
    },
};

type DnaHubZomelet = Zomelet<DnaHubCSRInterface, DnaHubCSRDependencies>;

const DnaHubCSR : DnaHubZomelet = {
    functions: {
	async create_dna ( bytes ) {
	    // await this.zomes.mere_memory.save( bytes ); // Error
	    // await this.cells.dnahub.dnahub_csr.create_dna( bytes ); // Error
	    // await this.cells.zomehub.zomehub.create_integrity( bytes );
	    // await this.cells.zomehub.zomehub_csr.create_integrity( "something")

	    return await this.cells.zomehub.zomehub_csr.create_integrity( bytes );
	},
    },
    dependencies: {
	cells: {
	    zomehub: {
		zomehub_csr:	ZomeHubCSR,
	    },
	},
    },
};
