/**
 * NodeMC Server Daemon
 *
 * This handles all aspects of interacting <em>with</em> a server. This includes;
 * starting/stopping/command execution and more. It's job is to keep a server
 * in a healthy state at all times.
 *
 * @todo Decide wether this runs in a container, or not.
 * @author Jared Allard <jared@staymarta.com>
 * @license MIT
 * @version 1
 */

const debug     = require('debug')('nodemc:scheduler:server')
const dockerode = require('dockerode')
