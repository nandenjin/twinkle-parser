const assert = require( 'assert' ).strict;

function isEqual( a, b ) {
  try{
    assert.deepStrictEqual( a, b );
    return true;
  }catch(e) {
    return false;
  }
}
module.exports.isEqual = isEqual;

function indexOfWithAssert( array, needle ) {
  for( let i = 0; i < array.length; i++ ){
    if( isEqual( array[i], needle ) ) return i;
  }
  return -1;
}
module.exports.indexOfWithAssert = indexOfWithAssert;

function removeDuplication( array ) {
  return array.filter( ( x, i, self ) => indexOfWithAssert( self, x ) === i );
}
module.exports.removeDuplication = removeDuplication;

function isContinuousN( array ) {
  return array.every( ( x, i, self ) => {
    if( i === 0 ) return true;
    if( self[i] - self[i-1] === 1 ) return true;
    else return false;
  } );
}
module.exports.isContinuousN = isContinuousN;

function union( a, b ) {
  return removeDuplication( a.concat(b) );
}
module.exports.union = union;
