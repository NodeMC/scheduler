/**
 * Console Command Handler
 *
 * @author Jared Allard <jared@staymarta.com>
 * @license MIT
 * @version 1
 */

const debug  = require('debug')('nodemc:scheduler:job:console')

module.exports = {
  command: function(data) {
    debug('command', 'got', data)
    return true
  }
}
