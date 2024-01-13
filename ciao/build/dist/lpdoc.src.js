
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
      var PACKAGE_NAME = '/home/marco/.ciaoroot/v1.22.0-m7/build/site/ciao/build/dist/lpdoc.src.data';
      var REMOTE_PACKAGE_BASE = 'lpdoc.src.data';
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
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7", "lpdoc", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/lpdoc", "etc", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/lpdoc", "examples", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/lpdoc", "lib", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/lib", "doccfg", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/lib", "lpdoc_http", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/lpdoc", "src", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":282288,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1473,2806,4055,5652,6986,8250,9242,10499,11525,12790,14173,15161,16373,17768,18897,20185,21428,22572,23897,25064,26310,27398,28665,29679,30765,31963,32984,34086,35069,36221,37517,38729,39959,41141,42351,43454,44559,45764,46710,47820,49120,50330,51528,52845,54102,55153,56360,57374,58572,59812,60879,62079,62851,63929,65269,66736,67888,68996,70247,71703,73185,74704,76228,77315,78490,79767,81159,82171,83074,83952,85027,86042,86986,88098,89367,90590,91506,92613,93875,94818,95926,97088,98161,99136,100278,101591,102710,103889,105031,106015,107113,108487,109818,111042,112202,113454,114698,115844,116856,118176,119225,120511,121821,122956,123890,124867,125918,127148,128333,129436,130554,131490,132378,133142,133942,134777,135836,137048,138161,139249,140463,141631,142698,143908,145229,146279,147551,148931,150303,151588,152955,154282,155392,156570,157810,158893,160242,161498,162681,163865,165126,166501,167873,169012,170288,171419,172218,172904,173979,174980,176280,177495,178484,179585,180605,181777,182909,184042,185209,186340,187395,188482,189574,190744,191829,193218,194649,196089,197135,198368,199557,200790,202074,203129,204067,205320,206536,207499,208699,209812,211020,212280,213623,214850,216144,217373,218593,219841,220958,222236,223206,224195,225382,226631,227361,228608,229779,230987,232118,233402,234364,235564,236406,237581,238924,240039,241171,242405,243795,245001,246227,247369,248424,249443,250679,252021,253281,254555,255487,256719,258038,259315,260270,261478,262610,263519,264720,265869,266960,267816,268471,269081,270019,271299,272595,273741,275029,275911,276976,278361,279615,280717,281821],"sizes":[1473,1333,1249,1597,1334,1264,992,1257,1026,1265,1383,988,1212,1395,1129,1288,1243,1144,1325,1167,1246,1088,1267,1014,1086,1198,1021,1102,983,1152,1296,1212,1230,1182,1210,1103,1105,1205,946,1110,1300,1210,1198,1317,1257,1051,1207,1014,1198,1240,1067,1200,772,1078,1340,1467,1152,1108,1251,1456,1482,1519,1524,1087,1175,1277,1392,1012,903,878,1075,1015,944,1112,1269,1223,916,1107,1262,943,1108,1162,1073,975,1142,1313,1119,1179,1142,984,1098,1374,1331,1224,1160,1252,1244,1146,1012,1320,1049,1286,1310,1135,934,977,1051,1230,1185,1103,1118,936,888,764,800,835,1059,1212,1113,1088,1214,1168,1067,1210,1321,1050,1272,1380,1372,1285,1367,1327,1110,1178,1240,1083,1349,1256,1183,1184,1261,1375,1372,1139,1276,1131,799,686,1075,1001,1300,1215,989,1101,1020,1172,1132,1133,1167,1131,1055,1087,1092,1170,1085,1389,1431,1440,1046,1233,1189,1233,1284,1055,938,1253,1216,963,1200,1113,1208,1260,1343,1227,1294,1229,1220,1248,1117,1278,970,989,1187,1249,730,1247,1171,1208,1131,1284,962,1200,842,1175,1343,1115,1132,1234,1390,1206,1226,1142,1055,1019,1236,1342,1260,1274,932,1232,1319,1277,955,1208,1132,909,1201,1149,1091,856,655,610,938,1280,1296,1146,1288,882,1065,1385,1254,1102,1104,467],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, false);
            Module['removeRunDependency']('datafile_/home/marco/.ciaoroot/v1.22.0-m7/build/site/ciao/build/dist/lpdoc.src.data');
      };
      Module['addRunDependency']('datafile_/home/marco/.ciaoroot/v1.22.0-m7/build/site/ciao/build/dist/lpdoc.src.data');

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
    loadPackage({"files": [{"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/etc/SETTINGS_DEFAULT.pl", "start": 0, "end": 862}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/examples/bar.pl", "start": 862, "end": 896}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/examples/example_module.pl", "start": 896, "end": 6883}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/examples/test_math.pl", "start": 6883, "end": 10206}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/lib/doccfg/doccfg_doc.pl", "start": 10206, "end": 11042}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/lib/doccfg/doccfg_props.pl", "start": 11042, "end": 19524}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/lib/doccfg/doccfg_tr.pl", "start": 19524, "end": 21063}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/lib/lpdoc_http/lpdoc_http_rt.pl", "start": 21063, "end": 21922}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/src/autodoc.pl", "start": 21922, "end": 128645}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/src/autodoc_aux.pl", "start": 128645, "end": 131796}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/src/autodoc_bibrefs.pl", "start": 131796, "end": 144970}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/src/autodoc_doctree.pl", "start": 144970, "end": 206051}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/src/autodoc_errors.pl", "start": 206051, "end": 207248}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/src/autodoc_filesystem.pl", "start": 207248, "end": 225790}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/src/autodoc_html.pl", "start": 225790, "end": 262877}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/src/autodoc_html_assets.pl", "start": 262877, "end": 267256}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/src/autodoc_html_template.pl", "start": 267256, "end": 273401}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/src/autodoc_images.pl", "start": 273401, "end": 279656}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/src/autodoc_index.pl", "start": 279656, "end": 292930}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/src/autodoc_lookup.pl", "start": 292930, "end": 297064}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/src/autodoc_man.pl", "start": 297064, "end": 307926}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/src/autodoc_messages.pl", "start": 307926, "end": 314526}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/src/autodoc_nil.pl", "start": 314526, "end": 315872}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/src/autodoc_parse.pl", "start": 315872, "end": 334880}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/src/autodoc_refsdb.pl", "start": 334880, "end": 343694}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/src/autodoc_settings.pl", "start": 343694, "end": 353052}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/src/autodoc_state.pl", "start": 353052, "end": 378087}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/src/autodoc_structure.pl", "start": 378087, "end": 381213}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/src/autodoc_texinfo.pl", "start": 381213, "end": 424572}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/src/comments.pl", "start": 424572, "end": 476772}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/src/doccfg_holder.pl", "start": 476772, "end": 477261}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/src/docmaker.pl", "start": 477261, "end": 490459}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/src/docmod_holder.pl", "start": 490459, "end": 490521}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/src/lpdoc_help.pl", "start": 490521, "end": 492018}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/src/lpdoc_single_mod.pl", "start": 492018, "end": 498357}], "remote_package_size": 286384});

  })();
