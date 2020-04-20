chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name == 'Create cards') {
    var query = { active: true, currentWindow: true };
    chrome.tabs.query(query, function(tabs) {
      var currentTab = tabs[0];
      if (currentTab) {
        Rules.apply(currentTab.id);
      }
    });
  }
});

// https://developer.chrome.com/extensions/alarms
// Set an alarm to run every 60 minutes
// var minutes = 60;
var minutes = 1;
chrome.alarms.create('Create cards', { periodInMinutes: minutes });

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.active) {
    console.log('Applying rules');
    console.log(Rules._rules);
    Rules.apply(tabId);
  }
});

chrome.runtime.onMessage.addListener(function(request, sender) {
  console.log('Message received on background: ' + request.action);
  if (request.action == "card created" || request.action == "card creation failed") {
    var rule = Rules.find(request.id);
    if (rule) {
      console.log('Changing status of rule ' + rule.id + ': from ' + rule.status + ' to ready');
      rule.status = 'ready';
    }
  }
});
