
const fs = require( 'fs' );
const csvParse = require( 'csv-parse/lib/sync' );
const Iconv = require( 'iconv' ).Iconv;

const arrayUtil = require( './util/array' );

const iconv = new Iconv( 'Shift_JIS', 'UTF-8//TRANSLIT//IGNORE');

const filename = process.argv[ 2 ];
const csvData = iconv.convert( fs.readFileSync( filename ) ).toString();

const output = {};

const data = csvParse( csvData );

const exceptions = {

  term: [],
  period: [],

};

const DAYS_STR_INDEX = [ '日', '月', '火', '水', '木', '金', '土' ];

data.forEach( r => {

    const id = r[ 0 ];
    const title = r[ 1 ];

    const termStr = r[ 5 ];
    let terms = [];

    const periodStr = r[ 6 ];
    let periods = [];

    let rooms = r[ 7 ].split( /[,\s]/ );

    // NOTE: instructors cannot be splitted with \s because it matches
    // separators of First name and Family name.
    const instructors = r[ 8 ].split( /[,\n]/ );

    const overview = r[ 9 ];
    const remarks = r[ 10 ];

    termStr.split( '\n' ).forEach( ( term, i, self ) => {

      if( term.match( /^春([ABC]+)(.*)$/ ) ){

        const mod = RegExp.$1;
        const tail = RegExp.$2;

        if( mod.match( /A/ ) ) terms.push( 0 );
        if( mod.match( /B/ ) ) terms.push( 1 );
        if( mod.match( /C/ ) ) terms.push( 2 );

        // In case termStr does not delimitered collectry
        if( tail.length > 0 ) self.splice( i + 1, 0, tail );

      }else if( term.match( /^秋([ABC]+)(.*)$/ ) ){

        const mod = RegExp.$1;
        const tail = RegExp.$2;

        if( mod.match( /A/ ) ) terms.push( 3 );
        if( mod.match( /B/ ) ) terms.push( 4 );
        if( mod.match( /C/ ) ) terms.push( 5 );

        // In case termStr does not delimitered collectry
        if( tail.length > 0 ) self.splice( i + 1, 0, tail );

      }else{

        if( !exceptions.term.includes( term ) ) exceptions.term.push( term );

      }

    } );

    periodStr.split( '\n' ).forEach( period => {

      ( period.match( /([月火水木金土日・]+)([1-6,\-]+)/g ) || [] )
        .forEach( periodElm => {

          const dayStr = RegExp.$1;
          const perStr = RegExp.$2;

          const ds = ( dayStr.match( /[月火水木金土日]/g ) || [] ).map( d => DAYS_STR_INDEX.indexOf( d ) );
          const ps = [];

          let pstr = perStr;

          while( true ){

            if( pstr.match( /^,?([1-6])-([1-6]),?/ ) ){

              const s = RegExp.$1 / 1 - 1;
              const e = RegExp.$2 / 1 - 1;

              for( let i = s; i <= e && s <= e; i++ ) ps.push( i );

              pstr = pstr.replace( new RegExp( `^${RegExp.lastMatch}` ), '' );

            }else if( pstr.match( /^,?([1-6]),?/ ) ){

              const p = RegExp.$1 / 1 - 1;
              ps.push( p );

              pstr = pstr.replace( new RegExp( `^${RegExp.lastMatch}` ), '' );

            }else {

              break;

            }

          }

          ds.sort();
          ps.sort();

          periods.push( [ ds, ps ] );

        } );

    } );

    // Normalization
    // Concat consequtive period expressions
    for( let i = 0; i < periods.length; i++ ) {
      let a = periods[i];
      for( let j = i + 1; j < periods.length; j++ ) {
        let b = periods[j];
        if( arrayUtil.isEqual( a[0], b[0] ) ) {
          const union = arrayUtil.union( a[1], b[1] );
          if( arrayUtil.isContinuousN( union ) ) {
            a[1] = union;
            periods.splice( j, 1 );
          }
        }
      }
    }

    // Remove duplications
    terms = arrayUtil.removeDuplication( terms );
    periods = arrayUtil.removeDuplication( periods );
    rooms = arrayUtil.removeDuplication( rooms );

    output[ id ] = {

      title: title,
      termStr: termStr,
      terms: terms,

      periodStr: periodStr,
      periods: periods,

      rooms: rooms,
      instructors: instructors,

      overview: overview,
      remarks: remarks,

    };

  } );

process.stdout.write( JSON.stringify( output ) );
