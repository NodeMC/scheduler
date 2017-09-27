/**
 * NodeMC Scheduler
 *
 * This component is a a/synchronous service. It has the ability to process jobs,
 * but also distrubute things synchronously, as needed. This is for things like
 * file transfers.
 *
 * @author Jared Allard <jared@staymarta.com>
 * @license MIT
 * @version 1
 */

'use strict'

const kue = require('kue')
const debug = require('debug')('nodemc:scheduler')

const Metrics = require('./lib/metrics.js')
const Job     = require('./lib/jobs.js')

const metrics = new Metrics(null)

debug('started at', Date.now())

const queue = kue.createQueue()
debug('queue', 'created listener for Kue')

// TODO Only accept jobs for our server
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
let started             = Date.now()
let generated_metrics = 0;
setInterval(async () => {
  // debug('metrics', 'generated at', Date.now())
  const metric = await metrics.generate()
  queue.create('metric', metric).save()

  generated_metrics++

  const now       = Date.now()
  const time_diff = now - started

  if(time_diff > 10000) {
    started       = Date.now()
    debug('status', `generated ${generated_metrics}.`)
  }

}, 1000)
