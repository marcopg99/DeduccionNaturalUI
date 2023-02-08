
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
      var PACKAGE_NAME = '/home/marcopg99/.ciaoroot/v1.22.0-m1/build/site/ciao/build/dist/website.mods.data';
      var REMOTE_PACKAGE_BASE = 'website.mods.data';
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
Module['FS_createPath']("/home/marcopg99/.ciaoroot/v1.22.0-m1", "website", true, true);
Module['FS_createPath']("/home/marcopg99/.ciaoroot/v1.22.0-m1/website", "catalog_ui", true, true);
Module['FS_createPath']("/home/marcopg99/.ciaoroot/v1.22.0-m1/website", "skel", true, true);
Module['FS_createPath']("/home/marcopg99/.ciaoroot/v1.22.0-m1/website/skel", "css", true, true);
Module['FS_createPath']("/home/marcopg99/.ciaoroot/v1.22.0-m1/website", "src", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":83377,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1025,1732,2106,2534,3048,3555,4134,4654,5244,6166,7249,8469,9475,10611,11661,12390,13577,14826,15889,17077,17512,18484,19113,19516,19944,20451,21027,21551,22144,23107,24277,25607,27017,28192,29417,30314,31301,32621,33894,35068,35730,36575,37164,37669,38250,39120,40355,41738,42472,43485,44622,45758,46837,48080,49300,50447,51553,52964,54365,55682,57119,58565,59872,61134,62493,63705,65095,66411,67768,69093,70438,71872,73289,74822,76090,77275,78480,79493,80582,81450,82687],"sizes":[1025,707,374,428,514,507,579,520,590,922,1083,1220,1006,1136,1050,729,1187,1249,1063,1188,435,972,629,403,428,507,576,524,593,963,1170,1330,1410,1175,1225,897,987,1320,1273,1174,662,845,589,505,581,870,1235,1383,734,1013,1137,1136,1079,1243,1220,1147,1106,1411,1401,1317,1437,1446,1307,1262,1359,1212,1390,1316,1357,1325,1345,1434,1417,1533,1268,1185,1205,1013,1089,868,1237,690],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, false);
            Module['removeRunDependency']('datafile_/home/marcopg99/.ciaoroot/v1.22.0-m1/build/site/ciao/build/dist/website.mods.data');
      };
      Module['addRunDependency']('datafile_/home/marcopg99/.ciaoroot/v1.22.0-m1/build/site/ciao/build/dist/website.mods.data');

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
    loadPackage({"files": [{"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/bundlereg/website.bundlecfg", "start": 0, "end": 0}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/bundlereg/website.bundlereg", "start": 0, "end": 470}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/website.catalog_ui.bundle_extra_info.itf", "start": 470, "end": 19583}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/website.catalog_ui.bundle_extra_info.po", "start": 19583, "end": 43065}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/website.catalog_ui.bundles_dyn.itf", "start": 43065, "end": 60525}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/website.catalog_ui.bundles_dyn.po", "start": 60525, "end": 83446}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/website.catalog_ui.render_lpdoc.itf", "start": 83446, "end": 93540}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/website.catalog_ui.render_lpdoc.po", "start": 93540, "end": 100096}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/website/catalog_ui/bundle_extra_info.pl", "start": 100096, "end": 110318}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/website/catalog_ui/bundles_dyn.pl", "start": 110318, "end": 117438}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/website/catalog_ui/cached_catalog.pl", "start": 117438, "end": 150429}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/website/catalog_ui/render_lpdoc.pl", "start": 150429, "end": 152043}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/website/skel/css/normalize.css", "start": 152043, "end": 159762}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/website/skel/css/website.css", "start": 159762, "end": 164864}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/website/src/SITE.pl", "start": 164864, "end": 166827}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/website/src/website_config_auto.pl", "start": 166827, "end": 166869}], "remote_package_size": 87473});

  })();
