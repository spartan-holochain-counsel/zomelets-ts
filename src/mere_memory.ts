
import crypto				from 'crypto';

import { sha256 }			from 'js-sha256'; // approx. 9kb
import {
    HoloHash, DnaHash, AgentPubKey,
    ActionHash, EntryHash,
}					from '@spartan-hc/holo-hash';

import { Zomelet }			from './index';



export interface MereMemoryCSRInterface {
    calculate_hash (
	bytes:		Uint8Array,
    ): Promise<string>;

    save(
	bytes:		Uint8Array,
    ) : Promise<EntryHash>;
}

export type MereMemoryZomelet = Zomelet<MereMemoryCSRInterface>;


export const MereMemoryCSR : MereMemoryZomelet = {
    functions: {
	async calculate_hash ( bytes ) {
	    return sha256.hex( bytes );
	},
	async save ( bytes ) {
	    await this.functions.calculate_hash( bytes );
	    // await this.functions.invalid_func( bytes ); // Error

	    return new EntryHash(crypto.randomBytes(32));
	},
    },
};
