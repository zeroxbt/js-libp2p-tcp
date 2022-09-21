import { expect } from 'aegir/chai';
import { TCP } from '../src/index.js';
import { multiaddr } from '@multiformats/multiaddr';
import { mockUpgrader } from '@libp2p/interface-mocks';
describe('valid localAddr and remoteAddr', () => {
    let tcp;
    let upgrader;
    beforeEach(() => {
        tcp = new TCP();
        upgrader = mockUpgrader();
    });
    const ma = multiaddr('/ip4/127.0.0.1/tcp/0');
    it('should resolve port 0', async () => {
        // Create a Promise that resolves when a connection is handled
        let handled;
        const handlerPromise = new Promise(resolve => { handled = resolve; });
        const handler = (conn) => handled(conn);
        // Create a listener with the handler
        const listener = tcp.createListener({
            handler,
            upgrader
        });
        // Listen on the multi-address
        await listener.listen(ma);
        const localAddrs = listener.getAddrs();
        expect(localAddrs.length).to.equal(1);
        // Dial to that address
        await tcp.dial(localAddrs[0], {
            upgrader
        });
        // Wait for the incoming dial to be handled
        await handlerPromise;
        // Close the listener
        await listener.close();
    });
    it('should handle multiple simultaneous closes', async () => {
        // Create a Promise that resolves when a connection is handled
        let handled;
        const handlerPromise = new Promise(resolve => { handled = resolve; });
        const handler = (conn) => handled(conn);
        // Create a listener with the handler
        const listener = tcp.createListener({
            handler,
            upgrader
        });
        // Listen on the multi-address
        await listener.listen(ma);
        const localAddrs = listener.getAddrs();
        expect(localAddrs.length).to.equal(1);
        // Dial to that address
        const dialerConn = await tcp.dial(localAddrs[0], {
            upgrader
        });
        // Wait for the incoming dial to be handled
        await handlerPromise;
        // Close the dialer with two simultaneous calls to `close`
        await Promise.race([
            new Promise((resolve, reject) => setTimeout(() => reject(new Error('Timed out waiting for connection close')), 500)),
            await Promise.all([
                dialerConn.close(),
                dialerConn.close()
            ])
        ]);
        await listener.close();
    });
});
//# sourceMappingURL=connection.spec.js.map