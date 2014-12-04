

var util = angular.module('activity.utils', []);




function getItemById( key_name , key_value, items ) {
  for ( i in items ) {
    if ( items[i][key_name] == key_value  ) {
      return items[i];
    }

  }
}
