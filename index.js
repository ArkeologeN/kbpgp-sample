(function() {
    "use strict";

    var kbpgp = require('kbpgp'),
        fs = require('fs'),
        buffer = fs.readFileSync('Witness_Technical_document_v1.0.pdf');

    console.log('>> Getting started..');
    kbpgp.KeyManager.generate_rsa({userid: "Hamza Waqas <hamzawaqas@live.com>"}, function(err, hamza) {
        hamza.sign({}, function(err) {
            hamza.export_pgp_private({
                passphrase: 'admin123'
            }, function(err, priv) {
                console.log('>> Key has been generated for `hamza`..');
                var params = {
                    msg: buffer,
                    sign_with: hamza
                };

                fs.writeFileSync('hamza_key', priv);

                kbpgp.box(params, function(err, result_string, result_buffer) {
                    fs.writeFileSync('Witness_Technical_document_v1.0.encrypted.pdf', result_buffer);
                    console.log('>> Encrypted Version has been generated successfully!');
                });
            });

            hamza.export_pgp_public({}, function(err, pgp_public) {
                fs.writeFileSync('hamza_key.pub', pgp_public);
            });
       });
    });
})();