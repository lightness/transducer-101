const Benchmark = require("benchmark");
const classic = require("../2-ways/classic");
const transducers = require("../2-ways/transducer");
const { createArray } = require("../util");

const CLASSIC = "classic";
const TRANSDUCER = "transducer";

function measure(n) {
  return new Promise(resolve => {
    const arr = createArray(n);
    const suite = new Benchmark.Suite();

    suite
      .add(CLASSIC, function() {
        classic(arr);
      })
      .add(TRANSDUCER, function() {
        transducers(arr);
      })
      .on("complete", function() {
        resolve(
          this.reduce((acc, cur) => ({ ...acc, [cur.name]: cur.hz }), {})
        );
      })
      .run({ async: true });
  });
}

module.exports = measure;
