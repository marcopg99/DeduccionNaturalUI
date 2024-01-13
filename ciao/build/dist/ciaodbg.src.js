
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
      var PACKAGE_NAME = '/home/marco/.ciaoroot/v1.22.0-m7/build/site/ciao/build/dist/ciaodbg.src.data';
      var REMOTE_PACKAGE_BASE = 'ciaodbg.src.data';
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
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7", "ciaodbg", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg", "lib", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib", "byrdbox", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib", "debugpred", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib", "graphic_trace", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib", "hashtable", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib", "profilercc", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc", "examples", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib", "regrtest", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/regrtest", "examples", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib", "regrtestdecls", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib", "stats", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib", "tracing", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib", "unittest", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/unittest", "examples", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":164235,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1347,2418,3468,4723,5816,6795,7496,8489,9341,10408,11631,13029,14191,15684,16760,18022,19209,20130,21303,22470,23724,24855,26005,27271,28579,29490,30417,31917,32777,33788,34742,35671,36538,37711,38838,39897,40993,41947,42865,44165,45301,46386,47676,48874,50060,50973,52286,53444,54456,55693,56787,57949,59108,59883,60766,61647,62497,63340,64198,65176,66249,67074,67785,68787,69938,71005,72189,72787,73716,74836,75853,76724,77666,78753,80045,80987,81477,82073,83394,84607,85713,87025,88242,89340,90697,92082,93094,94099,95061,96244,97414,98241,99268,100404,101560,103001,104175,105565,106824,107999,109378,110642,111737,112824,113700,114750,115660,116501,117744,118746,119908,121230,122352,123588,124677,126019,127441,128521,129723,130751,132103,133201,134152,134942,135704,136913,138124,139120,140331,141467,142352,143263,144251,145638,146971,148132,149210,149991,151123,152179,153393,154452,155838,156896,157780,158826,160086,161095,161805,162803,163978],"sizes":[1347,1071,1050,1255,1093,979,701,993,852,1067,1223,1398,1162,1493,1076,1262,1187,921,1173,1167,1254,1131,1150,1266,1308,911,927,1500,860,1011,954,929,867,1173,1127,1059,1096,954,918,1300,1136,1085,1290,1198,1186,913,1313,1158,1012,1237,1094,1162,1159,775,883,881,850,843,858,978,1073,825,711,1002,1151,1067,1184,598,929,1120,1017,871,942,1087,1292,942,490,596,1321,1213,1106,1312,1217,1098,1357,1385,1012,1005,962,1183,1170,827,1027,1136,1156,1441,1174,1390,1259,1175,1379,1264,1095,1087,876,1050,910,841,1243,1002,1162,1322,1122,1236,1089,1342,1422,1080,1202,1028,1352,1098,951,790,762,1209,1211,996,1211,1136,885,911,988,1387,1333,1161,1078,781,1132,1056,1214,1059,1386,1058,884,1046,1260,1009,710,998,1175,257],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, false);
            Module['removeRunDependency']('datafile_/home/marco/.ciaoroot/v1.22.0-m7/build/site/ciao/build/dist/ciaodbg.src.data');
      };
      Module['addRunDependency']('datafile_/home/marco/.ciaoroot/v1.22.0-m7/build/site/ciao/build/dist/ciaodbg.src.data');

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
    loadPackage({"files": [{"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/byrdbox/byrd.pl", "start": 0, "end": 3675}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/byrdbox/byrdbox_expand.pl", "start": 3675, "end": 4393}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/debugpred/debugpred_test.pl", "start": 4393, "end": 4651}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/debugpred/debugpred_tr.pl", "start": 4651, "end": 6823}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/graphic_trace/graphic_trace.pl", "start": 6823, "end": 9642}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/hashtable/hashtable.pl", "start": 9642, "end": 11949}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/all_test.pl", "start": 11949, "end": 14200}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/bignums.pl", "start": 14200, "end": 14911}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/bignums_test.pl", "start": 14911, "end": 15321}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/color_map.pl", "start": 15321, "end": 15888}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/color_map_test.pl", "start": 15888, "end": 16362}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/de2.pl", "start": 16362, "end": 16647}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/de3.pl", "start": 16647, "end": 16994}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/de4.pl", "start": 16994, "end": 17377}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/dummy.pl", "start": 17377, "end": 17915}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/dummy2.pl", "start": 17915, "end": 18842}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/dummy3.pl", "start": 18842, "end": 19319}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/dummy4.pl", "start": 19319, "end": 19635}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/dynamic_example.pl", "start": 19635, "end": 20318}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/dynamic_example2.pl", "start": 20318, "end": 20992}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/example2_cc.pl", "start": 20992, "end": 21743}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/example_cc.pl", "start": 21743, "end": 22294}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/flat.pl", "start": 22294, "end": 22808}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/flat_test.pl", "start": 22808, "end": 23232}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/guardians.pl", "start": 23232, "end": 25805}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/guardians_test.pl", "start": 25805, "end": 26237}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/hanoi.pl", "start": 26237, "end": 26785}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/hanoi_test.pl", "start": 26785, "end": 27250}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/jugs.pl", "start": 27250, "end": 31556}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/jugs_test.pl", "start": 31556, "end": 31966}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/knights.pl", "start": 31966, "end": 35520}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/knights_test.pl", "start": 35520, "end": 35924}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/main_arg.pl", "start": 35924, "end": 36290}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/module1.pl", "start": 36290, "end": 36330}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/module2.pl", "start": 36330, "end": 36385}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/module3.pl", "start": 36385, "end": 36552}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/module_test.pl", "start": 36552, "end": 37153}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/mqu.pl", "start": 37153, "end": 38769}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/mqu_ov_test.pl", "start": 38769, "end": 40425}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/mqu_test.pl", "start": 40425, "end": 40857}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/nested_prof.pl", "start": 40857, "end": 41184}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/prof_lpdoc.pl", "start": 41184, "end": 41904}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/profcuts.pl", "start": 41904, "end": 42286}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/profex3.pl", "start": 42286, "end": 43456}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/qsort.pl", "start": 43456, "end": 43899}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/qsort_test.pl", "start": 43899, "end": 44335}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/schedule.pl", "start": 44335, "end": 45557}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/schedule_test.pl", "start": 45557, "end": 45979}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/school.pl", "start": 45979, "end": 47551}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/size.pl", "start": 47551, "end": 48473}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/size_test.pl", "start": 48473, "end": 48863}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/subst_exp.pl", "start": 48863, "end": 49671}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/subst_exp_test.pl", "start": 49671, "end": 50223}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/sudoku.pl", "start": 50223, "end": 54583}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/sudoku_test.pl", "start": 54583, "end": 55023}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/witt.pl", "start": 55023, "end": 81281}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/wumpus.pl", "start": 81281, "end": 86122}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/wumpus_test.pl", "start": 86122, "end": 86541}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/zebra_argnames.pl", "start": 86541, "end": 89041}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/zebra_argnames_test.pl", "start": 89041, "end": 89471}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/graph_to_tex.pl", "start": 89471, "end": 96134}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/profiler_auto_conf.pl", "start": 96134, "end": 107987}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/profiler_base.pl", "start": 107987, "end": 123443}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/profiler_c.pl", "start": 123443, "end": 129658}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/profiler_cc.pl", "start": 129658, "end": 131712}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/profiler_extra.pl", "start": 131712, "end": 133586}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/profiler_rt.pl", "start": 133586, "end": 135186}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/profiler_tr.pl", "start": 135186, "end": 143472}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/profiler_type.pl", "start": 143472, "end": 150776}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/profiler_utils.pl", "start": 150776, "end": 153832}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/profiler_utils_base.pl", "start": 153832, "end": 154565}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/profiler_utils_native.pl", "start": 154565, "end": 159342}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/regrtest/examples/example1.pl", "start": 159342, "end": 159554}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/regrtest/examples/example2.pl", "start": 159554, "end": 159810}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/regrtest/regrtest.pl", "start": 159810, "end": 164987}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/regrtest/regrtest_aux.pl", "start": 164987, "end": 166634}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/regrtestdecls/regrtestdecls_tr.pl", "start": 166634, "end": 168722}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/stats/stats.pl", "start": 168722, "end": 171613}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/tracing/traces.pl", "start": 171613, "end": 174488}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/tracing/tracing_expand.pl", "start": 174488, "end": 175303}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/unittest/examples/ceval1.pl", "start": 175303, "end": 177069}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/unittest/examples/ceval2.pl", "start": 177069, "end": 178884}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/unittest/examples/civil_registry.pl", "start": 178884, "end": 182004}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/unittest/examples/length.pl", "start": 182004, "end": 182815}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/unittest/examples/qsort.pl", "start": 182815, "end": 184546}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/unittest/examples/relationships.pl", "start": 184546, "end": 185751}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/unittest/examples/test_examples.pl", "start": 185751, "end": 191969}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/unittest/examples/test_timeout.pl", "start": 191969, "end": 193643}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/unittest/unittest.pl", "start": 193643, "end": 242196}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/unittest/unittest_base.pl", "start": 242196, "end": 246015}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/unittest/unittest_db.pl", "start": 246015, "end": 255911}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/unittest/unittest_examples.pl", "start": 255911, "end": 256690}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/unittest/unittest_filters.pl", "start": 256690, "end": 257844}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/unittest/unittest_props.pl", "start": 257844, "end": 262635}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/unittest/unittest_regression.pl", "start": 262635, "end": 273243}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/unittest/unittest_runner.pl", "start": 273243, "end": 278375}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/unittest/unittest_runner_aux.pl", "start": 278375, "end": 290377}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/unittest/unittest_statistics.pl", "start": 290377, "end": 298972}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/unittest/unittest_summaries.pl", "start": 298972, "end": 309015}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/unittest/unittest_utils.pl", "start": 309015, "end": 309581}], "remote_package_size": 168331});

  })();
