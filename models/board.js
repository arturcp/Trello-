var Board = {
  addCard: function(rule, tabId) {
    console.log('[' + rule.id + '] ' + rule.text);
    var columns = document.querySelectorAll('.js-list'),
        self = this;

    var card = this._findCardByText(rule.text);
    if (card.length == 0) {
      this._openComposer(columns[0]);

      setTimeout(function() {
        self._saveCard(columns[0], rule);
      }, 1000);
    } else {
      this._sendMessage('card creation failed', rule.id);
    }
  },

  _findCardByText: function(text) {
    return Utils.contains(document.querySelectorAll('.js-card-name'), text);
  },

  _openComposer: function(column) {
    column.querySelector('.open-card-composer').click();
  },

  _saveCard: function(column, rule) {
    var textArea = column.querySelector('.list-card-composer-textarea'),
        button = column.querySelector('.js-add-card');

    if (textArea) {
      textArea.value = rule.text;
      button.click();
      this._sendMessage('card created', rule.id);
    } else {
      this._sendMessage('card creation failed', rule.id);
    }
  },

  _sendMessage: function(action, ruleId) {
    console.log('Sending message to background: ' + action);
    chrome.runtime.sendMessage({ action: action, id: ruleId });
  }
}
