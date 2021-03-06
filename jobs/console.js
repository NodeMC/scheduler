/**
 * Console Command Handler
 *
 * @author Jared Allard <jared@staymarta.com>
 * @license MIT
 * @version 1
 */

const debug  = require('debug')('nodemc:scheduler:job:console')

module.exports = {

  /**
   * Process a command.
   *
   * @param  {Array} data  Array of command, i.e ['say', 'something important']
   * @return {Boolean}     Success status.
   */
  command: function(data) {
    debug('command', 'got', data)
    return true
  }
}
