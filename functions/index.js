/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.setCustomUserClaimsOnSignup = functions.auth.user().onCreate((user) => {
  // Set custom claims
  const defaultClaims = { role: 'customer' };
  return admin.auth().setCustomUserClaims(user.uid, defaultClaims)
    .then(() => {
      console.log(`Custom claims set for user ${user.email}`);
      return null;
    })
    .catch((error) => {
      console.error(`Failed to set custom claims for ${user.email}: ${error}`);
      throw new Error(`Error setting custom claims: ${error}`);
    });
});
