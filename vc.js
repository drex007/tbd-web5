import { VerifiableCredential } from "@web5/credentials";
import { DidKeyMethod } from "@web5/dids";
import { Ed25519, Jose } from '@web5/crypto';


//Create a Did for Issuer and Subjects
const tSwiftsDid = await DidKeyMethod.create();
const subjectDid = await DidKeyMethod.create();

console.log(tSwiftsDid.did, subjectDid.did);
//Create verifiable Credentials


class TSwiftTicket {
  constructor(seat, date) {
    this.seat = seat;
    this.date = date;

  }

}

const swifObj = new TSwiftTicket('a-2', '2024-11-2')

console.log(swifObj);


const vc = new VerifiableCredential({
  type: "TSwiftTicket",
  issuer: tSwiftsDid.did,
  subject: subjectDid.did,
  data: new TSwiftTicket("a-1", "2023-04-01")
})

// 



// // const issuer = await DidKeyMethod.create();
const privateKey = (await Jose.jwkToKey({ key: tSwiftsDid.keySet.verificationMethodKeys[0].privateKeyJwk })).keyMaterial;

// // Sign credential

const signOptions = {
  issuerDid: tSwiftsDid.did,
  subjectDid: subjectDid.did,
  kid: `${tSwiftsDid.did}#${tSwiftsDid.did.split(':')[2]}`,
  signer: async (data) => await Ed25519.sign({ data, key: privateKey })
};

const vcJwt = vc.sign(signOptions)

console.log(vcJwt, "SIGNED OPT");



