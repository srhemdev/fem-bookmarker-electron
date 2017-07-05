/**
 * Use your os to read files from your
 * home dir.. just a how to run eg
 */

// const os = require('os');
// const fs = require('fs')
//
// const files = fs.readdirSync(os.homedir());
//
// //getting files in my home dir
// console.log(files)
//
//
// files.forEach( name => {
//     const filename = document.createElement('li')
//     filename.textContent = name;
//     document.body.appendChild(filename)
// })

/**
 * if you are writing in the main process
 you need to start process each time
 if you are writing in renderer you can
 just refresh the page
 */


/**
 * Electron is a browser without a back button
 if you have links on a page and click it
 you dont know how to get back because basically
 electron doesnt have back button
 in this case we have a module called as shell
 which may tell you what  users default browser is
 and then maybe there is some way you can hack and
 get access to users back button
 shell is available both in main and renderer process
 */



const {shell, remote} = require('electron')

//remote can be used to send messages back and forth
//from main to renderer process

const systemPreferences = remote.systemPreferences;


const newLinkUrl = document.querySelector('#new-link-url')
const newLinkSubmit = document.querySelector('.new-link-form--submit')
const newLinkForm = document.querySelector('.new-link-form')
const linkTemplate = document.querySelector('#link-template')
const linksSection = document.querySelector('.links')

linksSection.addEventListener('click', (event) => {
    if(event.target.href) {
        event.preventDefault();
        shell.openExternal(event.target.href)
    }
})

const parser = new DOMParser()
const parseResponse = (text) => parser.parseFromString(text, 'text/html')
const findTitle = (nodes) => nodes.querySelector('title').textContent

const addToPage = ({title, url}) => {
    console.log(title, url)
    const newLink = linkTemplate.content.cloneNode(true)
    const titleElement = newLink.querySelector('.link--title')
    const urlElement = newLink.querySelector('.link--url')

    titleElement.textContent = title;
    urlElement.href = url;
    urlElement.textContent = url;

    linksSection.appendChild(newLink)
    return {title, url};
}

newLinkUrl.addEventListener('keyup', () => {
    newLinkSubmit.disabled = !newLinkUrl.validity.valid
})

newLinkForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const url = newLinkUrl.value;
    console.log(url,"url")
    fetch(url)
        .then(response => response.text())
        .then(parseResponse)
        .then(findTitle)
        .then((title) => ({title, url}))
        .then(addToPage)
        .then(title => console.log(title))
        .catch(error => console.log(error));

})

// remote can ask the operating system using IPC
// (Inter process communication) if my app is in dark mode
window.addEventListener('load', () => {
    if(systemPreferences.isDarkMode()) {
        document.querySelector('link').href = 'styles-dark.css'
    }
})