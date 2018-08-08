const electron = require("electron");
const fs = require('fs');

electron.app.on('ready', function () {
    electron.dialog.showMessageBox({
        type: 'question',
        message: 'Click OK to select the test file save path.\n' +
            'Make sure at least 4.1GB space available.',
        buttons: ['OK', 'Cancel']
    }, function (button) {
        if (button === 0)
            electron.dialog.showSaveDialog(test);
        else
            electron.app.quit();
    });
});

function test(filename) {
    if (filename) {
        let str = "This is a test.";

        let buf = Buffer.from(str, "utf8");
        let fd = fs.openSync(filename, 'w');
        fs.writeSync(fd, buf, 0, buf.length, 0x100000000);
        fs.closeSync(fd);
        console.log("String written: ", str);

        fd = fs.openSync(filename, 'r');
        fs.readSync(fd, buf, 0, buf.length, 0x100000000);
        fs.closeSync(fd);

        console.log("String read: ", buf.toString('utf8'));
    }
    electron.app.quit();
}
