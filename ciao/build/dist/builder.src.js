
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
      var PACKAGE_NAME = '/home/marco/.ciaoroot/v1.22.0-m7/build/site/ciao/build/dist/builder.src.data';
      var REMOTE_PACKAGE_BASE = 'builder.src.data';
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
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7", "builder", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/builder", "dist", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/builder/dist", "ci-status", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/builder", "src", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/builder/src", "bundlehooks", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":217718,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1181,2438,3587,4736,5731,6901,7998,9157,10377,11408,12574,13745,14926,16019,17126,18193,19242,20479,21635,22707,23866,24830,25770,26577,27442,28734,29857,31098,32163,33312,34629,35790,36930,38016,39189,40371,41320,42438,43561,44612,45845,47154,48262,49241,50423,51547,52892,53996,55076,56231,57502,58763,60053,61186,62405,63560,64693,65804,67091,68381,69767,71038,72242,73313,74658,75947,77293,78593,79777,81127,82376,83585,84676,85953,87282,88459,89486,90679,91698,92686,93697,94700,95769,96581,97543,98390,99419,100371,101431,102576,103656,104902,106071,107456,108598,109900,110949,112284,113420,114582,115775,116861,117980,119268,120362,121206,122240,123156,124108,125274,126158,127129,128383,129718,130705,131858,132758,133805,134787,135776,136946,138021,138961,140156,141242,142484,143487,144528,145944,147008,148237,149474,150579,151690,152875,154010,155087,156177,157287,158699,160132,161423,162756,164193,165331,166382,167761,168978,170245,171695,172973,174401,175739,177219,178712,179942,181075,182380,183657,184951,186078,187259,188493,189647,190711,191729,192922,194013,195217,196273,197348,198551,199708,200969,202126,203421,204642,205953,207160,208441,209795,210899,212018,213274,214354,215397,216326,217130],"sizes":[1181,1257,1149,1149,995,1170,1097,1159,1220,1031,1166,1171,1181,1093,1107,1067,1049,1237,1156,1072,1159,964,940,807,865,1292,1123,1241,1065,1149,1317,1161,1140,1086,1173,1182,949,1118,1123,1051,1233,1309,1108,979,1182,1124,1345,1104,1080,1155,1271,1261,1290,1133,1219,1155,1133,1111,1287,1290,1386,1271,1204,1071,1345,1289,1346,1300,1184,1350,1249,1209,1091,1277,1329,1177,1027,1193,1019,988,1011,1003,1069,812,962,847,1029,952,1060,1145,1080,1246,1169,1385,1142,1302,1049,1335,1136,1162,1193,1086,1119,1288,1094,844,1034,916,952,1166,884,971,1254,1335,987,1153,900,1047,982,989,1170,1075,940,1195,1086,1242,1003,1041,1416,1064,1229,1237,1105,1111,1185,1135,1077,1090,1110,1412,1433,1291,1333,1437,1138,1051,1379,1217,1267,1450,1278,1428,1338,1480,1493,1230,1133,1305,1277,1294,1127,1181,1234,1154,1064,1018,1193,1091,1204,1056,1075,1203,1157,1261,1157,1295,1221,1311,1207,1281,1354,1104,1119,1256,1080,1043,929,804,588],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, false);
            Module['removeRunDependency']('datafile_/home/marco/.ciaoroot/v1.22.0-m7/build/site/ciao/build/dist/builder.src.data');
      };
      Module['addRunDependency']('datafile_/home/marco/.ciaoroot/v1.22.0-m7/build/site/ciao/build/dist/builder.src.data');

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
    loadPackage({"files": [{"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/dist/ci-status/get_ci_status.pl", "start": 0, "end": 3987}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/builder_aux.pl", "start": 3987, "end": 16505}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/builder_cmds.pl", "start": 16505, "end": 52016}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/builder_flags.pl", "start": 52016, "end": 52552}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/builder_prim.pl", "start": 52552, "end": 52862}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/builder_targets.pl", "start": 52862, "end": 57063}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/bundle_configure.pl", "start": 57063, "end": 83520}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/bundle_fetch.pl", "start": 83520, "end": 95144}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/bundle_hash.pl", "start": 95144, "end": 103920}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/bundle_scan.pl", "start": 103920, "end": 110175}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/bundlehooks/bundlehooks_rt.pl", "start": 110175, "end": 111340}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/bundlehooks/bundlehooks_tr.pl", "start": 111340, "end": 118389}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/bundlehooks_holder.pl", "start": 118389, "end": 118459}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/car_maker.pl", "start": 118459, "end": 132807}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/ciaoc_aux.pl", "start": 132807, "end": 153978}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/ciaoc_batch_call.pl", "start": 153978, "end": 159940}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/ciaocl_help.pl", "start": 159940, "end": 173895}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/ciaocl_parser.pl", "start": 173895, "end": 180932}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/ciaopp_aux.pl", "start": 180932, "end": 182000}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/cmake_aux.pl", "start": 182000, "end": 183099}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/config_common.pl", "start": 183099, "end": 186292}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/cpx_process.pl", "start": 186292, "end": 189024}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/detcheader.pl", "start": 189024, "end": 190466}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/eng_defs.pl", "start": 190466, "end": 199823}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/git_extra.pl", "start": 199823, "end": 209854}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/grade_analyze.pl", "start": 209854, "end": 212711}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/grade_bin.pl", "start": 212711, "end": 224752}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/grade_docs.pl", "start": 224752, "end": 229529}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/grade_holder.pl", "start": 229529, "end": 229594}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/info_installer.pl", "start": 229594, "end": 231636}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/install_aux.pl", "start": 231636, "end": 252896}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/interactive_aux.pl", "start": 252896, "end": 255894}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/lpdoc_aux.pl", "start": 255894, "end": 262284}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/manifest_compiler.pl", "start": 262284, "end": 280236}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/messages_aux.pl", "start": 280236, "end": 281706}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/pbundle_gen_bin.pl", "start": 281706, "end": 283020}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/pbundle_gen_mac.pl", "start": 283020, "end": 306835}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/pbundle_gen_rpm.pl", "start": 306835, "end": 326512}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/pbundle_gen_src.pl", "start": 326512, "end": 327211}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/pbundle_gen_win32.pl", "start": 327211, "end": 336821}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/pbundle_generator.pl", "start": 336821, "end": 351468}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/pbundle_meta.pl", "start": 351468, "end": 355758}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/register_in_script.pl", "start": 355758, "end": 359155}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/site_aux.pl", "start": 359155, "end": 362154}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/tests_aux.pl", "start": 362154, "end": 363202}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/third_party_config.pl", "start": 363202, "end": 366395}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/third_party_custom.pl", "start": 366395, "end": 368870}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/third_party_install.pl", "start": 368870, "end": 385945}], "remote_package_size": 221814});

  })();
