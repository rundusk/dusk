'use strict';

const { expect } = require('chai');
const Control = require('../lib/control');
const RoutingTable = require('../lib/routing-table');
const utils = require('../lib/utils');


describe('@class Control', function() {

  describe('@method listMethods', function() {

    it('should return all the supported methods', function(done) {
      const control = new Control({});
      control.listrpcs((err, results) => {
        expect(results).to.have.lengthOf(14);
        done();
      });
    });

  });

  describe('@method getProtocolInfo', function() {

    it('should return general information', function(done) {
      const control = new Control({
        router: new RoutingTable(
          Buffer.from(utils.getRandomKeyString(), 'hex')
        ),
        identity: Buffer.from(utils.getRandomKeyString(), 'hex'),
        contact: {
          hostname: 'localhost',
          port: 8080
        },
        onion: {socksPort: 9050 }
      });
      control.node.router.addContactByNodeId(
        utils.getRandomKeyString(),
        { hostname: 'localhost', port: 8081 }
      );
      control.getinfo((err, result) => {
        expect(typeof result.versions.software).to.equal('string');
        expect(typeof result.versions.protocol).to.equal('string');
        expect(typeof result.identity).to.equal('string');
        expect(typeof result.contact.port).to.equal('number');
        expect(typeof result.contact.hostname).to.equal('string');
        expect(Array.isArray(result.peers)).to.equal(true);
        expect(result.peers).to.have.lengthOf(1);
        done();
      });
    });

  });

});
