
  var Module = typeof Module !== 'undefined' ? Module : {};

  if (!Module.expectedDataFileDownloads) {
    Module.expectedDataFileDownloads = 0;
  }

  Module.expectedDataFileDownloads++;
  (function() {
    // When running as a pthread, FS operations are proxied to the main thread, so we don't need to
    // fetch the .data bundle on the worker
    if (Module['ENVIRONMENT_IS_PTHREAD']) return;
    var loadPackage = function(metadata) {

      var PACKAGE_PATH = '';
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
      } else if (typeof process === 'undefined' && typeof location !== 'undefined') {
        // web worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
      }
      var PACKAGE_NAME = '/home/marcopg99/.ciaoroot/v1.22.0-m1/build/site/ciao/build/dist/ciaowasm.mods.data';
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
            if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
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
Module['FS_createPath']("/home", "marcopg99", true, true);
Module['FS_createPath']("/home/marcopg99", ".ciaoroot", true, true);
Module['FS_createPath']("/home/marcopg99/.ciaoroot", "v1.22.0-m1", true, true);
Module['FS_createPath']("/home/marcopg99/.ciaoroot/v1.22.0-m1", "build", true, true);
Module['FS_createPath']("/home/marcopg99/.ciaoroot/v1.22.0-m1/build", "bundlereg", true, true);
Module['FS_createPath']("/home/marcopg99/.ciaoroot/v1.22.0-m1/build", "cache", true, true);
Module['FS_createPath']("/home/marcopg99/.ciaoroot/v1.22.0-m1", "ciaowasm", true, true);
Module['FS_createPath']("/home/marcopg99/.ciaoroot/v1.22.0-m1/ciaowasm", "js", true, true);
Module['FS_createPath']("/home/marcopg99/.ciaoroot/v1.22.0-m1/ciaowasm", "lib", true, true);
Module['FS_createPath']("/home/marcopg99/.ciaoroot/v1.22.0-m1/ciaowasm/lib", "foreign_js", true, true);
Module['FS_createPath']("/home/marcopg99/.ciaoroot/v1.22.0-m1/ciaowasm", "src", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":38017,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,989,1319,1768,2284,2828,3671,4802,5910,7225,8340,9648,10364,11442,11842,12259,12774,13337,13880,14478,15641,16884,18220,19444,20084,21220,22496,23481,24437,25709,26943,28052,29353,30481,31731,32953,34284,35738,37032],"sizes":[989,330,449,516,544,843,1131,1108,1315,1115,1308,716,1078,400,417,515,563,543,598,1163,1243,1336,1224,640,1136,1276,985,956,1272,1234,1109,1301,1128,1250,1222,1331,1454,1294,985],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, false);
            Module['removeRunDependency']('datafile_/home/marcopg99/.ciaoroot/v1.22.0-m1/build/site/ciao/build/dist/ciaowasm.mods.data');
      };
      Module['addRunDependency']('datafile_/home/marcopg99/.ciaoroot/v1.22.0-m1/build/site/ciao/build/dist/ciaowasm.mods.data');

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
    loadPackage({"files": [{"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/bundlereg/ciaowasm.bundlecfg", "start": 0, "end": 0}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/bundlereg/ciaowasm.bundlereg", "start": 0, "end": 440}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/ciaowasm.lib.foreign_js.foreign_js_rt.itf", "start": 440, "end": 11802}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/ciaowasm.lib.foreign_js.foreign_js_rt.po", "start": 11802, "end": 24752}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/ciaowasm.src.ciaowasm.itf", "start": 24752, "end": 38866}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/ciaowasm.src.ciaowasm.po", "start": 38866, "end": 48956}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/ciaowasm/js/ciao-async.js", "start": 48956, "end": 60074}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/ciaowasm/js/ciao-eng.js", "start": 60074, "end": 66946}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/ciaowasm/js/ciao-worker.js", "start": 66946, "end": 71141}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/ciaowasm/js/post-js.js", "start": 71141, "end": 71148}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/ciaowasm/js/pre-js.js", "start": 71148, "end": 71576}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/ciaowasm/lib/foreign_js/foreign_js.pl", "start": 71576, "end": 71703}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/ciaowasm/lib/foreign_js/foreign_js_rt.pl", "start": 71703, "end": 74659}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/ciaowasm/src/ciaoengwasm.pl", "start": 74659, "end": 75114}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/ciaowasm/src/ciaowasm.pl", "start": 75114, "end": 79478}], "remote_package_size": 42113});

  })();
