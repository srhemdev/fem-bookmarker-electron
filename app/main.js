// A main process can have multiple browser renderers
// See you can have multiple processes attached to
//main.


const {app, BrowserWindow} = require('electron')


let mainWindow = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 300,
        height: 600,
        show: false
    });
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    //Load the current dir that ur in and then load this index html file
    mainWindow.loadURL(`file://${__dirname}/index.html`)
    /**
     * Devtron
     */

    require('devtron').install()
})

