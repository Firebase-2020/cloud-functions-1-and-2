import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

/* 
About `ref`
1. The reference is very similar to other database references you might be using
in your client code that also point to some location in the database.
Here (in cloud functions) the ref points to the location that is matched 
by the pattern ('/rooms/{roomId}/messages/{messageId}')
that is given in the method definition.
Use it to read/write info on that location. Or build more references to 
other locations.
2. The `ref` has admin privileges, i.e. full control over your database. So
none of the security rulls can effect the way of reading and writing. 
*/

// This function needs the boilerplate where a chat dialog gets generated...
// export  const onMessageCreate = functions.database
// // {roomId} = this is a wildcard.
// .ref('/rooms/{roomId}/messages/{messageId}').onCreate((snapshot, context) => {
//     // use the event context to get the sting values of the wildcards.
//     const roomId = context.params.roomId;
//     const messageId = context.params.messageId;

//     console.log(`New message ${messageId} in room ${roomId}`);

//     // `val` give a copy of the data as a js obj
//     const messageData = snapshot.val();
//     const text =addPizzazz(messageData);
//     return snapshot.ref.update({text: text})
    
// })


export  const onMessageUpdate = functions.database
.ref('/rooms/{roomId}/messages/{messageId}').onUpdate((change, context) => {
  const before = change.before.val();
  const after = change.after.val();
  if (before.text === after.text) {
      console.log('Text did not change');
      return null;
  }
  const text = addPizzazz(after.text);
  const timeEdited = Date.now();
  // Use the ref to write the new text back to the data base.
  return change.after.ref.update({text, timeEdited});
})


export  const onMessageCreate = functions.database
// {roomId} = this is a wildcard.
.ref('/rooms/{roomId}/messages/{messageId}').onCreate(async (snapshot, context) => {
    // use the event context to get the sting values of the wildcards.
    const roomId = context.params.roomId;
    const messageId = context.params.messageId;

    console.log(`New message ${messageId} in room ${roomId}`);

    // `val` give a copy of the data as a js obj
    const messageData = snapshot.val();
    console.log('messageData', messageData);
    
    const text = addPizzazz(messageData.text);
    await snapshot.ref.update({text: text});

    /* Build a ref to the location of the counter
    From the `snapshot.ref` go up two nodes `parent.parent`.
    Now we have a ref that points to `/rooms/{roomId}`.
    Then we use the `child` method to create a messageCount child in that ref.

    If you know from external means that an expression is not null or undefined, 
    you can use the non-null assertion operator ! to coerce away those types:
     */
    const countRef = snapshot.ref.parent!.parent!.child('messageCount')
    return countRef.transaction(count => {
        return count + 1
    })
})


export  const onMessageDelete = functions.database
// {roomId} = this is a wildcard.
.ref('/rooms/{roomId}/messages/{messageId}')
.onDelete(async (snapshot, context) => {
   
    const countRef = snapshot.ref.parent!.parent!.child('messageCount')
    return countRef.transaction(count => {
        return count - 1
    })
})


function addPizzazz(text: string): string {
    return text.replace(/\bpizza\b/g, 'PIZZAZZ');
}

