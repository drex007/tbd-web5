/*
Needs globalThis.crypto polyfill.
This is *not* the crypto you're thinking of.
It's the original crypto...CRYPTOGRAPHY.
*/
import { webcrypto } from "node:crypto";
import { Web5 } from '@web5/api';

// @ts-ignore
if (!globalThis.crypto) globalThis.crypto = webcrypto;
const { web5, did: myDid } = await Web5.connect();

console.log(myDid);


const { record } = await web5.dwn.records.create({

  data: "Hello World!",
  message: {
    recipient: myDid,
    dataFormat: "text/plain",
  },
});

console.log(record, "REC");

const { status } = await record.send(myDid);

console.log(status, "STAT");