const debug = require("debug")("transducer:gc");

const { exec } = require("child_process");
const { generateFile } = require("./generate-data");
const { loop } = require("../util");
const { save, saveLastMeasured, getLastMeasured } = require("./persistance");

const CLASSIC = "classic";
const TRANSDUCER = "transducer";

const runCommand = (n, alg) => {
  const command = `node --trace-gc ${__dirname}/${alg}.js`;

  debug(`Run: ${command}`);

  return new Promise((resolve, reject) => {
    exec(
      command,
      {
        maxBuffer: Number.MAX_SAFE_INTEGER,
        env: {
          ...process.env,
          N: n,
        },
      },
      (err, stdout, stderr) => {
        if (stderr) {
          reject(stderr);
        } else {
          resolve(stdout);
        }
      }
    );
  });
};

const runAndSave = async (n, alg) => {
  const output = await runCommand(n, alg);
  await save(n, alg, output);
};

const collectGcOutput = async n => {
  await generateFile(n);
  await runAndSave(n, CLASSIC);
  await runAndSave(n, TRANSDUCER);
  await saveLastMeasured(n);
};

const run = async () => {
  const from = (await getLastMeasured()) + 1 || 0;
  const to = 1000000;

  await loop(collectGcOutput)(from, to);
};

run();
