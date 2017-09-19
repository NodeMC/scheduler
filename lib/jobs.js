/**
 * Jobs Runner
 *
 * @author Jared Allard <jaredallard@outlook.com>
 * @license MIT
 * @version 1
 */

const debug = require('debug')('nodemc:scheduler:job')
const path  = require('path')
const fs    = require('fs-extra')

const jobsPath = path.join(__dirname, '../', 'jobs')

class Job {

  /**
   * Create a job.
   *
   * @param  {Object} raw     Raw job event.
   * @return {undefined}      Interact with the created object.
   */
  constructor(raw) {
    this.created_at = Date.now()

    const evalType  = raw.type.split('.')

    this.class      = evalType[0]
    this.method     = evalType[1]
    this.data       = raw.data

    debug('create', 'job is', `${this.class}#${this.method}`)
  }

  /**
   * Process the job.
   *
   * @return {Promise} [description]
   */
  async process() {
    const jobClassFile = path.join(jobsPath, `${this.class}.js`)
    const classExists  = await fs.exists(jobClassFile);

    // check and see if the class exists
    if(!classExists) {
      debug('process', `job class '${this.class}' not found`, jobClassFile)
      return false
    }

    debug('process', 'running class')

    let method;
    try {
      const jobClass = require(jobClassFile)
      method   = jobClass[this.method]

      if(typeof method !== 'function') throw 'method not a function'
    } catch(err) {
      debug('process', 'failed to run class', err)
      return false
    }

    if(!method) {
      debug('process', `class doesn't have the method '${this.method}'`)
      return false
    }

    return method(this.data)
  }
}

module.exports = Job
