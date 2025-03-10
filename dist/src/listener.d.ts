import type { Connection } from '@libp2p/interface-connection';
import type { Upgrader, Listener } from '@libp2p/interface-transport';
interface Context {
    handler?: (conn: Connection) => void;
    upgrader: Upgrader;
    socketInactivityTimeout?: number;
    socketCloseTimeout?: number;
    publicIp?: string;
}
/**
 * Create listener
 */
export declare function createListener(context: Context): Listener;
export {};
//# sourceMappingURL=listener.d.ts.map