import is from 'is_js';
import Economy from '../economy';

export default money;

/**
 * Handle money commands from Economy.
 *
 * @param {String} currency_name
 */

function money(currency_name='buck') {
  let commands = {
    atm: 'wallet',
    purse: 'wallet',
    wallet(target, room, user) {
      if (!this.canBroadcast()) return;
      let targetUser = this.targetUserOrSelf(target);
      let currency = currency_name;
      Economy.get(targetUser.userid, function(amount) {
        if (amount >= 2) currency += 's';
        this.sendReplyBox(`${targetUser.name} has ${amount} ${currency}.`);
        room.update();
      }.bind(this));
    },

    givemoney(target, room, user) {
      if (!user.can('givemoney')) return;
      if (!target || target.indexOf(',') < 0) return this.parse('/help givemoney');

      let parts = target.split(',');
      this.splitTarget(parts[0]);
      let amount = Number(parts[1].trim());
      let currency = currency_name;

      if (!this.targetUser) return this.sendReply(`User ${this.targetUsername} not found.`);
      if (is.not.number(amount)) return this.sendReply('Must be a number.');
      if (is.decimal(amount)) return this.sendReply('Cannot contain a decimal.');
      if (amount < 1) return this.sendReply(`You can't give less than one ${currency}.`);
      if (amount >= 2) currency += 's';

      Economy.give(toId(this.targetUsername), amount, function(total) {
        this.sendReply(`${this.targetUsername} was given ${amount} ${currency}. This user now has ${total} ${currency}.`);
        Users.get(this.targetUsername).send(`${user.name} has given you ${amount} ${currency}. You now have ${total} ${currency}.`);
      }.bind(this));
    },

    takemoney(target, room, user) {
      if (!user.can('takemoney')) return;
      if (!target || target.indexOf(',') < 0) return this.parse('/help takemoney');

      let parts = target.split(',');
      this.splitTarget(parts[0]);
      let amount = Number(parts[1].trim());
      let currency = currency_name;

      if (!this.targetUser) return this.sendReply(`User ${this.targetUsername} not found.`);
      if (is.not.number(amount)) return this.sendReply('Must be a number.');
      if (is.decimal(amount)) return this.sendReply('Cannot contain a decimal.');
      if (amount < 1) return this.sendReply(`You can't give less than one ${currency}.`);
      if (amount >= 2) currency += 's';

      Economy.take(toId(this.targetUsername), amount, function(total) {
        this.sendReply(`${this.targetUsername} was losted ${amount} ${currency}. This user now has ${total} ${currency}.`);
        Users.get(this.targetUsername).send(`${user.name} has taken ${amount} ${currency} from you. You now have ${total} ${currency}.`);
      }.bind(this));
    }
  };

  Object.merge(CommandParser.commands, commands);
}
