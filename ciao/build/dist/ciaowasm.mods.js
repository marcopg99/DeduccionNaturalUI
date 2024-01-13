
  var Module = typeof globalThis.__emciao !== 'undefined' ? globalThis.__emciao : {};

  if (!Module.expectedDataFileDownloads) {
    Module.expectedDataFileDownloads = 0;
  }

  Module.expectedDataFileDownloads++;
  (function() {
    // Do not attempt to redownload the virtual filesystem data when in a pthread or a Wasm Worker context.
    if (Module['ENVIRONMENT_IS_PTHREAD'] || Module['$ww']) return;
    var loadPackage = function(metadata) {

      var PACKAGE_PATH = '';
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
      } else if (typeof process === 'undefined' && typeof location !== 'undefined') {
        // web worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
      }
      var PACKAGE_NAME = '/home/marco/.ciaoroot/v1.22.0-m7/build/site/ciao/build/dist/ciaowasm.mods.data';
      var REMOTE_PACKAGE_BASE = 'ciaowasm.mods.data';
      if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
        Module['locateFile'] = Module['locateFilePackage'];
        err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
      }
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];

      function fetchRemotePackage(packageName, packageSize, callback, errback) {
        if (typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node === 'string') {
          require('fs').readFile(packageName, function(err, contents) {
            if (err) {
              errback(err);
            } else {
              callback(contents.buffer);
            }
          });
          return;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', packageName, true);
        xhr.responseType = 'arraybuffer';
        xhr.onprogress = function(event) {
          var url = packageName;
          var size = packageSize;
          if (event.total) size = event.total;
          if (event.loaded) {
            if (!xhr.addedTotal) {
              xhr.addedTotal = true;
              if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
              Module.dataFileDownloads[url] = {
                loaded: event.loaded,
                total: size
              };
            } else {
              Module.dataFileDownloads[url].loaded = event.loaded;
            }
            var total = 0;
            var loaded = 0;
            var num = 0;
            for (var download in Module.dataFileDownloads) {
            var data = Module.dataFileDownloads[download];
              total += data.total;
              loaded += data.loaded;
              num++;
            }
            total = Math.ceil(total * Module.expectedDataFileDownloads/num);
            if (Module['setStatus']) Module['setStatus'](`Downloading data... (${loaded}/${total})`);
          } else if (!Module.dataFileDownloads) {
            if (Module['setStatus']) Module['setStatus']('Downloading data...');
          }
        };
        xhr.onerror = function(event) {
          throw new Error("NetworkError for: " + packageName);
        }
        xhr.onload = function(event) {
          if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            var packageData = xhr.response;
            callback(packageData);
          } else {
            throw new Error(xhr.statusText + " : " + xhr.responseURL);
          }
        };
        xhr.send(null);
      };

      function handleError(error) {
        console.error('package error:', error);
      };

      var fetchedCallback = null;
      var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

      if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);

    function runWithFS() {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
Module['FS_createPath']("/", "home", true, true);
Module['FS_createPath']("/home", "marco", true, true);
Module['FS_createPath']("/home/marco", ".ciaoroot", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot", "v1.22.0-m7", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7", "build", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/build", "bundlereg", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/build", "cache", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7", "ciaowasm", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/ciaowasm", "js", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/ciaowasm", "lib", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/ciaowasm/lib", "foreign_js", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":50597,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,989,1320,1771,2291,2838,3679,4804,5916,7225,8333,9636,10346,11428,11850,12253,12760,13317,13865,14403,15432,16715,18135,19419,20584,21667,22568,23751,24915,26168,27530,28747,30055,31164,32258,33608,34754,35827,37126,38176,39482,40686,41824,42946,44144,45346,46512,47901,49073,50536],"sizes":[989,331,451,520,547,841,1125,1112,1309,1108,1303,710,1082,422,403,507,557,548,538,1029,1283,1420,1284,1165,1083,901,1183,1164,1253,1362,1217,1308,1109,1094,1350,1146,1073,1299,1050,1306,1204,1138,1122,1198,1202,1166,1389,1172,1463,61],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, false);
            Module['removeRunDependency']('datafile_/home/marco/.ciaoroot/v1.22.0-m7/build/site/ciao/build/dist/ciaowasm.mods.data');
      };
      Module['addRunDependency']('datafile_/home/marco/.ciaoroot/v1.22.0-m7/build/site/ciao/build/dist/ciaowasm.mods.data');

      if (!Module.preloadResults) Module.preloadResults = {};

      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }

    }
    if (Module['calledRun']) {
      runWithFS();
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }

    }
    loadPackage({"files": [{"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/bundlereg/ciaowasm.bundlecfg", "start": 0, "end": 0}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/bundlereg/ciaowasm.bundlereg", "start": 0, "end": 424}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaowasm.lib.foreign_js.foreign_js_rt.itf", "start": 424, "end": 11786}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaowasm.lib.foreign_js.foreign_js_rt.po", "start": 11786, "end": 24735}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaowasm.src.ciaowasm.itf", "start": 24735, "end": 39139}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaowasm.src.ciaowasm.po", "start": 39139, "end": 52524}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaowasm/js/ciao-prolog.js", "start": 52524, "end": 99818}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaowasm/js/post-js.js", "start": 99818, "end": 99825}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaowasm/js/pre-js.js", "start": 99825, "end": 100286}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaowasm/lib/foreign_js/foreign_js.pl", "start": 100286, "end": 100413}], "remote_package_size": 54693});

  })();
