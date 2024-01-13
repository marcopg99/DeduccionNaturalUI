
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
      var PACKAGE_NAME = '/home/marco/.ciaoroot/v1.22.0-m7/build/site/ciao/build/dist/website.mods.data';
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
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7", "website", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/website", "catalog_ui", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/website", "skel", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/website/skel", "css", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/website", "src", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":73269,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1024,1719,2092,2526,3033,3545,4124,4635,5226,6151,7228,8446,9451,10581,11632,12353,13555,14797,15853,17039,17472,18443,19072,19474,19899,20408,20987,21505,22096,23065,24240,25573,26995,28175,29408,30309,31292,32622,33901,35078,35745,36590,37190,37692,38278,39147,40386,41761,42445,43914,45280,46681,48142,49450,50795,52212,53379,54684,56067,57507,58896,60369,61843,63195,64513,66097,67312,68552,69795,70877,71850,72767],"sizes":[1024,695,373,434,507,512,579,511,591,925,1077,1218,1005,1130,1051,721,1202,1242,1056,1186,433,971,629,402,425,509,579,518,591,969,1175,1333,1422,1180,1233,901,983,1330,1279,1177,667,845,600,502,586,869,1239,1375,684,1469,1366,1401,1461,1308,1345,1417,1167,1305,1383,1440,1389,1473,1474,1352,1318,1584,1215,1240,1243,1082,973,917,502],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, false);
            Module['removeRunDependency']('datafile_/home/marco/.ciaoroot/v1.22.0-m7/build/site/ciao/build/dist/website.mods.data');
      };
      Module['addRunDependency']('datafile_/home/marco/.ciaoroot/v1.22.0-m7/build/site/ciao/build/dist/website.mods.data');

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
    loadPackage({"files": [{"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/bundlereg/website.bundlecfg", "start": 0, "end": 0}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/bundlereg/website.bundlereg", "start": 0, "end": 458}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/website.catalog_ui.bundle_extra_info.itf", "start": 458, "end": 19571}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/website.catalog_ui.bundle_extra_info.po", "start": 19571, "end": 43053}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/website.catalog_ui.bundles_dyn.itf", "start": 43053, "end": 60513}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/website.catalog_ui.bundles_dyn.po", "start": 60513, "end": 83434}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/website.catalog_ui.render_lpdoc.itf", "start": 83434, "end": 93528}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/website.catalog_ui.render_lpdoc.po", "start": 93528, "end": 100084}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/website/catalog_ui/cached_catalog.pl", "start": 100084, "end": 135483}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/website/skel/css/normalize.css", "start": 135483, "end": 143202}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/website/skel/css/website.css", "start": 143202, "end": 148304}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/website/src/website_config_auto.pl", "start": 148304, "end": 148346}], "remote_package_size": 77365});

  })();
