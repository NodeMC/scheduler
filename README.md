# NodeMC scheduler

You're probably looking for [NodeMC CORE](https://github.com/NodeMC/CORE).

This component handles communication between different nodes, as well as keeping
each node healthy and unburdened with load.

## Requirements

  * [Docker](https://docker.com)
  * [Node.js](https://nodejs.org)
  * [Redis](https://redis.io)

## Running

```js
yarn

NODEMC_API="yourapiendpoint" NODEMC_SCHEDULER_TOKEN="apitoken" node index.js
```

... That's it! The scheduler will register itself with the server and delegate
tasks on this machine.
