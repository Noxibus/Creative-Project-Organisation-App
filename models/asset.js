/* eslint-disable no-unused-vars */
//blueprint for an image asset object

export class Asset {
  constructor(title, imageUri, dateAdded, addedBy) {
    this.title = title;
    this.imageUri = imageUri;
    this.dateAdded = dateAdded;
    //TODO: ADD DATE ADDED FIELD
    //TODO: ADD ADDEDBY
    this.addedBy = addedBy; //user
    //TODO: LINK THIS ID WITH FIREBASE ID
    this.id = new Date().toString() + Math.random().toString();
  }
}
