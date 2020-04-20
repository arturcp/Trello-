var CreateCardRule = function(options) {
  this.id = Utils.uuid();
  this.action = "create card";
  this.minDay = options.minDay;
  this.maxDay = options.maxDay;
  this.text = options.text;
  this.status = 'ready';
};

var fn = CreateCardRule.prototype;

fn.valid = function() {
  var today = new Date().getDate();

  return (today >= this.minDay && today <= this.maxDay && this.status == 'ready');
};

fn.toParams = function() {
  return {
    id: this.id,
    action: this.action,
    minDay: this.minDay,
    maxDay: this.maxDay,
    text: this.text,
    status: this.status
  }
};
