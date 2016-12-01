// event listeners
chrome.browserAction.onClicked.addListener(actionClicked);

// toolbar button clicked
function actionClicked(tab) {
  chrome.storage.sync.get(['deployment'], function(settings) {
    var
      deployment = settings['deployment']
    ;
    if(deployment) {
      chrome.tabs.create({ url: 'https://' + deployment + '.qualia.io' });
    }
    else {
      chrome.history.search({
        text: '.qualia.io/home'
      }, function(matches){
        deployment = matches[0].url.split('//')[1].split('.')[0];
        chrome.tabs.create({ url: 'https://' + deployment + '.qualia.io' });
      });
    }
  });
}

chrome.extension.onMessage.addListener(messageReceived);
function messageReceived(request, sender, sendResponse) {

}
