var Rules = {
  _rules: [
    new CreateCardRule({ minDay: 1, maxDay: 5, text: 'Pagar Vivo fibra' }),
    new CreateCardRule({ minDay: 1, maxDay: 5, text: 'Pagar Net' }),
    new CreateCardRule({ minDay: 1, maxDay: 5, text: 'Pagar cartão de crédito do Nubank' }),
    new CreateCardRule({ minDay: 4, maxDay: 8, text: 'Pagar conta da Enel' }),
    new CreateCardRule({ minDay: 7, maxDay: 11, text: 'Pagar cartão de crédito do Itaú' }),
    new CreateCardRule({ minDay: 23, maxDay: 27, text: 'Pagar condomínio' })
  ],

  apply: function(tabId) {
    this._rules.forEach(function(rule) {
      if (rule.valid()) {
        console.log('Changing status of rule ' + rule.id + ' from ready to processing');
        rule.status = 'processing';
        var params = Object.assign({}, rule.toParams(), { tabId: tabId });
        chrome.tabs.sendMessage(tabId, params);
      } else {
        console.log('Not going to apply rule ' + rule.id + '. Status ' + rule.status);
      }
    });
  },

  find: function(id) {
    for (var i = 0; i < this._rules.length; i++) {
      if (this._rules[i].id == id) {
        return this._rules[i];
      }
    }
  }
}
