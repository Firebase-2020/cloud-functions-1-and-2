import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// This is an https kind of function which lets you respond on web requests.
// "request, response" : come from a Node module called "Express"
// In the body of this func we send a string back to the client.
// export const helloWorld = functions.https.onRequest((request, response) => {
//     console.log('Hello');
//  response.send("Hello Firebase!");
// });

export const getBostonAreaWeather = functions.https.onRequest(async (request, response) => {
	try {
		const areaSnapShot = await admin.firestore().doc('areas/greater-boston').get();

		const cities = areaSnapShot.data().cities; // .data()!.cities; "!" not needed!
		console.log('cities', cities);

		const promises = [];
		for (const city in cities) {
			console.log('city', city);

			const p = admin.firestore().doc(`cities-weather/${city}`).get();
			console.log('p', p);

			promises.push(p);
		}
		const citySnapshots = await Promise.all(promises);
		const results = [];
		citySnapshots.forEach((citySnap) => {
			const data = citySnap.data();
			data.city = citySnap.id;
			results.push(data);
		});
		response.send(results);
	} catch (error) {
		console.log(error);
		response.status(500).send(error);
	}
});

// This function fires when a change happens
// in the weather-cities... document
export const onBostonWeatherUpdate = 
functions.firestore.document('cities-weather/boston-ma-us').onUpdate((change) => {
	// the change parameter has two properties
	// "for" and "after"
	// data(): converts the document to a js obj.
	const after = change.after.data();
	// This is a fs message payload
	const payload = {
		data: {
			temp: String(after!.temp), // fs wants all values to be strings
			conditions: after!.conditions
		}
	};
	// Use the admin sdk to send this data payload to a topic called
	// "weather_boston-ma-us".
	// Now every installation of my app will receive these notifications
	// if it uses the fs sdk to subscribe to this topic.
	// You need to "return" the sendToTopic() because it returns a promise
	// So this onBostonWeatherUpdate func is not finished,
	// until this promise if fullfilled or rejected.
	return (
		admin
			.messaging()
			.sendToTopic('weather_boston-ma-us', payload)
			// Not needed to catch() if all you want is to log the error
			// because CloudFuncs will log the error...
			.catch((error) => console.log('FCM failed', error))
	);
});

// In this function we'll return the content of a document,
// from my Firebase database, to the client,
// kind of a simple 'web api'.
export const getBostonWeather = functions.https.onRequest(async (request, response) => {
	// get() returns a promise
	try {
		const snapshot = await admin.firestore().doc('cities-weather/boston-ma-us').get();

		// take the snapshop that get() returns
		// and convert it to a js obj.
		const data = snapshot.data();

		// The 'response' obj knows how to convert the obj
		// to a json format
		response.send(data); // this call to send the response terminates the func.
	} catch (error) {
		console.log(error);

		// Send an HTTP error response to the client
		// Or maybe you may want to send a custom response
		// and not the error, since it could include info
		// you don't want to share with the client
		response.status(500).send(error);
	}
});
