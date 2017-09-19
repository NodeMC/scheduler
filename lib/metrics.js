/**
 * Metrics Collection
 *
 * @author Jared Allard <jared@staymarta.com
 * @license MIT
 * @version 1
 */

const sys = require('systeminformation')


class Metrics {
  /**
   * Metrics Class constructor
   * @constructor
   * @param  {String} url API endpoint to send metrics too
   * @return {Undefined}  ...........
   */
  constructor(url) {
    this.url = url
  }

  /**
   * Generate a 'metrics' report. (i.e for posting to API)
   * @return {Promise} await it
   */
  async generate() {
    const load    = await sys.currentLoad()
    const systime = await sys.time()

    const osInfo  = await sys.osInfo()
    const kernel  = `${osInfo.platform} ${osInfo.release}`

    const metric = {
      uptime: systime.uptime,
      health: 'good', // TODO: Hook up to health system.
      load: {
        current: load.currentload,
        average: load.avgload
      },
      cpu: await sys.cpu(),
      instances: [],
      kernel,
      storage: {},
      memory: await sys.mem()
    }

    // add block devices
    const blockDevices = await sys.fsSize()
    blockDevices.forEach(dev => {
      metric.storage[dev.fs] = {
        size: dev.size,
        free: dev.free,
        used: dev.used,
        type: dev.type
      }
    })

    return metric
  }

  /**
   * Manually post new metrics to the API.
   * @return {Promise} async/await it.
   * @todo learn how to document promises better.
   */
  async post() {
    // TODO: implement
  }
}


module.exports = Metrics
