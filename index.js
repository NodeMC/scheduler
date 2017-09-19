/**
 * NodeMC Scheduler
 *
 * @author Jared Allard <jared@staymarta.com>
 * @license MIT
 * @version 1
 */

'use strict'

const kue = require('kue')
const debug = require('debug')('nodemc:scheduler')

const Metrics = require('./lib/metrics.js')
const metrics = new Metrics(null)

const Job     = require('./lib/jobs.js')

debug('started at', Date.now())


const queue = kue.createQueue()
debug('queue', 'created listener for Kue')

// TODO return a reason why it fails
queue.process('minecraft', async (kueJob, done) => {
  debug('process', kueJob.data)
  const job = new Job(kueJob.data)

  const success = await job.process()
  if(!success) {
    debug('process', 'job failed to process')
    return done(new Error('Failed to process job.'))
  }

  return done()
})

// trigger the event

debug('event', 'sending an event in 1 second (debug)')
setTimeout(() => {
  debug('event', 'send fake event')
  queue.create('minecraft', {
    type: 'console.command',
    data: [
      'say',
      'hello world'
    ]
  }).save()
}, 1000)

// TODO implement a 'heartbeat' that posts information about the scheduler every
// couple of hours or so.
setInterval(async () => {
  // debug('metrics', 'generated at', Date.now())
  const metric = await metrics.generate()
}, 1000)
