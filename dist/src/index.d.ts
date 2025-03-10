/// <reference types="node" />
import net from 'net';
import { CreateListenerOptions, DialOptions, symbol, Transport } from '@libp2p/interface-transport';
import type { Multiaddr } from '@multiformats/multiaddr';
import type { AbortOptions } from '@libp2p/interfaces';
import type { Connection } from '@libp2p/interface-connection';
export interface TCPOptions {
    /**
     * An optional number in ms that is used as an inactivity timeout after which the socket will be closed
     */
    inboundSocketInactivityTimeout?: number;
    /**
     * An optional number in ms that is used as an inactivity timeout after which the socket will be closed
     */
    outboundSocketInactivityTimeout?: number;
    /**
     * When closing a socket, wait this long for it to close gracefully before it is closed more forcibly
     */
    socketCloseTimeout?: number;
    /**
     * Allow the user to specify node's public ip in the config
     */
    publicIp?: string;
}
export declare class TCP implements Transport {
    private readonly opts;
    constructor(options?: TCPOptions);
    get [symbol](): true;
    get [Symbol.toStringTag](): string;
    dial(ma: Multiaddr, options: DialOptions): Promise<Connection>;
    _connect(ma: Multiaddr, options?: AbortOptions): Promise<net.Socket>;
    /**
     * Creates a TCP listener. The provided `handler` function will be called
     * anytime a new incoming Connection has been successfully upgraded via
     * `upgrader.upgradeInbound`.
     */
    createListener(options: CreateListenerOptions): import("@libp2p/interface-transport").Listener;
    /**
     * Takes a list of `Multiaddr`s and returns only valid TCP addresses
     */
    filter(multiaddrs: Multiaddr[]): Multiaddr[];
}
//# sourceMappingURL=index.d.ts.map