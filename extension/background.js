// Schedulrr Background Service Worker (Manifest V3)

chrome.runtime.onInstalled.addListener(() => {
  console.log("Schedulrr Quick Booking extension installed successfully! 🎉");
});

// Listener for basic keyboard commands or action items if configured
chrome.action.onClicked.addListener((tab) => {
  console.log("Schedulrr Extension icon clicked on tab: ", tab.id);
});
