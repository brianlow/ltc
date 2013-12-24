# LTC

Litecoin Block Explorer

## Setup

  * [Node.js](http://nodejs.org): Use the installer provided on the NodeJS website.
  * [Grunt](http://gruntjs.com/): Run `[sudo] npm install -g grunt-cli`
  * [Bower](http://bower.io): Run `[sudo] npm install -g bower`
  * `grunt` to auto-complite sass templates

## To Run

  * `import\litecoind` 
  * wait 60 seconds then open a new command prompt
  * `node import\import.js`
  * `node app.js`
  * [http://localhost:3000](http://localhost:3000)
  * [http://localhost:3000/08acdac54e2c07cf37fb9839f765956656a166f519485d0bd9f0f4304b0b04fb](http://localhost:3000/08acdac54e2c07cf37fb9839f765956656a166f519485d0bd9f0f4304b0b04fb)
  * [http://localhost:3000/id/fffffda4925caf689f61409597f93b1c92c6cd0a44d53e1298c739bf93ea184c](http://localhost:3000/id/fffffda4925caf689f61409597f93b1c92c6cd0a44d53e1298c739bf93ea184c)

## Development

  * `scss/_settings.scss`: Foundation configuration settings go in here
  * `scss/app.scss`: Application styles go here

## TODO

Next up
  * basic transaction view
  * basic search
  * account view
  * block chain forks
  * deployment
  * fiat price
  * local time
  * page header/footer

All
  * Transaction
  	* decode script
  	* spent vs unspent
  * Block
  	* basic formatting
  	* in/out/tx fee/block reward
  	* list of transactions in block
  * Charting
  	* difficulty
  	* tx fee vs confirmation time
  * Search
    * search by partial hash 
