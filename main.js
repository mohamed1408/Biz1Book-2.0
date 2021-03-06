const { app, BrowserWindow, Menu } = require('electron')

const url = require("url");
const path = require("path");
const electron = require('electron');
// const { PosPrinter } = require("electron-pos-printer");
// const database = require('./database')
// const find = require('local-devices');
// const ip = require('ip');

let mainWindow
function redirect() {
    mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
  }
  
function createWindow() {
    mainWindow = new BrowserWindow({
        // backgroundColor: ' rgb(27, 69, 160)',
        titleBarStyle: "hiddenInset",
        width: 800,
        height: 600,
        icon: __dirname + `/dist/favicon.png`,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, `/dist/index.html`),
            protocol: "file:",
            slashes: true
        })
    );
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null
    });

    //   Hide Menu Bar Electron
    mainWindow.setMenu(null)

    var menu = Menu.buildFromTemplate([
        {
            label: 'Biz1Book POS',
            submenu: [
                {
                    label: 'Reload',
                    click() { redirect(); }
                },
                { role: 'toggledevtools' },
                { role: 'togglefullscreen' },
                { role: 'close' },
            ]
        }
    ])
    Menu.setApplicationMenu(menu);

}
// function toggleFullscreen() {
//     if (mainWindow.isFullScreen()) {
//         mainWindow.setFullScreen(false);
//     } else {
//         mainWindow.setFullScreen(true);
//     }
// }

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})


//////////////////////////////////////PRINT/////////////////////////////////////////////////////////////
global.GetPrinters = function () {
    return mainWindow.webContents.getPrinters()
}
// global.scanlan = function () {
//   return find();
// }
// global.startserver = function (){
//   return database.startserver();
// }
// global.database = function (){
//   return database.app
// }
global.Print = function (template, printer) {
    console.log(printer);
    const options = {
        preview: false,                                 // Preview in window or print
        width: '300px',                                 //  width of content body
        margin: '0 0 0 0',                              // margin of content body
        copies: 1,                                      // Number of copies to print
        printerName: printer,         // printerName: string, check it at webContent.getPrinters()
        timeOutPerLine: 400,
        silent: true
    }

    const data = [
        {
            type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image'
            value: `${template}`,
            style: ``,
            css: {}
        }
    ]

    PosPrinter.print(data, options)
        .then(() => { })
        .catch((error) => {
            console.error(error);
        });
}
