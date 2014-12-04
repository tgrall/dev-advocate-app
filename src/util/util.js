'use strict';

var ObjectID = require('mongodb').ObjectID;

var Util = function() {

//TODO : review this object

  /*
   * Convert string to slug
   */
  function convertToSlug(text)
  {
      return text
          .toLowerCase()
          .replace(/ /g,'-')
          .replace(/[^\w-]+/g,'')
          ;
  }


  function getNewObjectId() {
    return new ObjectID();
  }

  function getObjectId(id) {
    return new ObjectID(id);
  }


  return {
      convertToSlug: convertToSlug,
      getNewObjectId : getNewObjectId,
      getObjectId : getObjectId
  };


}

module.exports = Util;
