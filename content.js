chrome.runtime.onMessage.addListener(
  function(rule, sender, sendResponse) {
    console.log('Message arrived: ' + rule.action + ' with status ' + rule.status);
    if (rule.action === "create card") {
      Board.addCard(rule, rule.tabId);
    }
  }
);
