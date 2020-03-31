import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

/* 
ref
1. The reference is very similar to other database references you might be using
in your client code that also point to some location in the database.
Here (in cloud functions) the ref points to the location that is mached 
by the pattern ('/rooms/{roomId}/messages/{messageId}')
that is given in the method definition.
Use it to read/write info on that location. Or build more references to 
other locations.
2. The `ref` has admin privileges, i.e. full control over your database. So
none of the security rulls can effect the way of reading and writing. 
*/

// This function needs the boilerplate where a chat dialog gets generated...
export  const onMessageCreate = functions.database
// {roomId} = this is a wildcard.
.ref('/rooms/{roomId}/messages/{messageId}').onCreate((snapshot, context) => {
    // use the event context to get the sting values of the wildcards.
    const roomId = context.params.roomId;
    const messageId = context.params.messageId;

    console.log(`New message ${messageId} in room ${roomId}`);

    // `val` give a copy of the data as a js obj
    const messageData = snapshot.val();
    const text =addPizzazz(messageData);
    return snapshot.ref.update({text: text})
    
})

function addPizzazz(text: string): string {
    return text.replace(/\bpizza\b/g, 'PIZZAZZ')
}
