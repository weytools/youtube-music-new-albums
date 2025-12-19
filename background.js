chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "",
    });
});


// const newReleaseURL = 'https://music.youtube.com/new_releases/albums'

// chrome.action.onClicked.addListener(async (tab) => {
//     const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
//     const nextState = prevState === 'ON' ? 'OFF' : 'ON';
//     // Set the action badge to the next state
//     await chrome.action.setBadgeText({
//         tabId: tab.id,
//         text: nextState,
//     });
// })


const newReleaseURL = 'https://music.youtube.com/new_releases/albums'

chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(newReleaseURL)) {
        // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
        const prevState = await chrome.action.getBadgeText({ tabId: tab.id });

        await chrome.action.setBadgeBackgroundColor({ color: '#00FF00', tabId: tab.id });
        // Next state will always be the opposite
        const nextState = prevState === 'ON' ? '' : 'ON';

        // Set the action badge to the next state

        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState == 'ON' ? nextState : '',
        });

        if (nextState === "ON") {
            // Insert the CSS file when the user turns the extension on
            await chrome.scripting.insertCSS({
                files: ["new-releases.css"],
                target: { tabId: tab.id },
            });
            chrome.scripting
                .executeScript({
                    target: { tabId: tab.id },
                    files: ["run-highlighter.js"],
                })
                .then(() => console.log("script injected"));
        } else if (nextState === "") {
            // Remove the CSS file when the user turns the extension off
            await chrome.scripting.removeCSS({
                files: ["new-releases.css"],
                target: { tabId: tab.id },
            });
        }
    }
});