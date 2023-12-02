import { webcrypto } from "node:crypto";
import { Web5 } from '@web5/api';
import { DidKeyMethod, utils as didUtils } from '@web5/dids'

// @ts-ignore
if (!globalThis.crypto) globalThis.crypto = webcrypto;
const { web5 } = await Web5.connect();

export const createARecord = async (did, data) => {

  const { record } = await web5.dwn.records.create({
    data: data,
    message: {
      recipient: did,
      schema: 'https://exams.org',
      dataFormat: 'application/json'
    }

  });
  return record;

}



// export const queryRecords = async (myDid) => {
//   const response = await web5.dwn.records.query({
//     from: myDid,
//     message: {
//       filter: {
//         schema: 'https://exams.org',
//         dataFormat: 'application/json',
//       },
//     },
//   });

//   response.records.forEach((record) => {
//     console.log(record.id);
//   });

// }

const testDid = 'did:key:z6MkrshRE9AFpKYwvmafQNdAh9MwGAwbHLSvbStpAYjh2bYE';
// queryRecords(testDid)
// const didDocument = await web5.did.resolve(testDid);
// console.log(didDocument.didDocument.id);

const testData = {
  date: '2024',
  did: testDid,
  airline: 'Jamil-airline',
  seatnumber: 'a-5',
  amount: '20',
  amount_in_btc: '0.006',
  payer_address: '0x9994949494949'
}

const record = createARecord(didDocument.didDocument.id, testData)

console.log(record, "RECORD STATUS");
