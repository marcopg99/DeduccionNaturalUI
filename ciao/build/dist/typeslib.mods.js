
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
      var PACKAGE_NAME = '/home/marco/.ciaoroot/v1.22.0-m7/build/site/ciao/build/dist/typeslib.mods.data';
      var REMOTE_PACKAGE_BASE = 'typeslib.mods.data';
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
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7", "typeslib", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/typeslib", "src", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":434226,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,911,1655,2254,2809,3350,3920,4973,5509,6121,6644,7217,7942,9126,9595,10073,11000,11703,12299,12891,13461,14500,15440,16252,17087,17735,18317,19291,20415,21542,22860,23913,24999,26106,26999,27504,28072,28932,29969,31026,31962,32878,33890,34862,35834,36789,37590,38436,39390,40338,41304,42247,43273,44158,44787,45446,45963,46511,47317,48176,49127,49872,50375,51485,52447,53135,54108,54955,55828,56554,56894,57380,57932,58556,59023,59522,59981,60528,61174,61689,62236,62950,63926,64711,65494,66385,67387,68252,69386,70582,71708,72529,73386,74347,75361,76406,77510,78586,79837,80889,81902,83060,84100,85287,86454,87375,88520,89580,90822,91996,93143,94327,95468,96222,97459,98637,99831,101056,102242,103495,104619,105923,107086,108283,109536,110550,111746,113023,114204,115558,116702,117864,119168,120263,121485,122718,123921,125079,126214,127414,128542,129688,130855,131985,133280,134351,135508,136625,137870,139028,140190,141335,142475,143543,144689,145778,146983,148247,149422,150453,151372,152347,153606,154803,156050,157174,158409,159558,160529,161405,162640,163927,165103,166331,167594,168745,169881,171137,172524,173872,175230,176430,177758,179136,180514,181832,183189,184370,185692,187051,188334,189638,190901,192174,193574,194715,196058,197278,198518,199640,200600,201717,202963,204133,205264,206329,207296,208461,209446,210679,211836,212982,213869,214812,215866,216826,217792,218974,220327,221607,222150,223078,224079,225155,226331,227307,228402,229439,230340,231301,232391,233268,234296,235555,236794,237910,239076,240344,241490,242702,243864,245057,246222,247453,248633,249753,250450,251525,252705,253771,254987,256347,257480,258675,259906,260266,260849,261399,262038,262500,262923,263319,263787,264235,264684,265187,265637,266112,266536,267001,267408,267845,268314,268786,269265,269745,270244,270733,271169,271556,272025,272490,272960,273414,273890,274397,274867,275297,275800,276284,276782,277275,277762,278216,278695,279149,279620,280086,280543,281046,281412,281837,282257,282718,283180,283652,284111,284562,284978,285424,285881,286338,286798,287299,287785,288240,288695,289153,290347,291377,292316,293329,294709,295643,296817,297787,298729,299474,300522,301710,302881,303890,305140,305990,307038,308083,308919,309851,310880,312167,313129,314076,315163,316233,317176,318314,319327,320334,321125,322323,323396,324392,325556,326662,327629,328834,329817,330748,332057,332945,333832,335037,336088,337124,338125,339201,340305,341193,342384,343546,344446,345065,345974,347279,348259,349174,350278,351468,352503,353566,354765,356003,357238,357968,358971,360068,361081,362107,363226,364467,365505,366400,367110,368197,369255,370265,371423,372295,373225,374279,375409,376326,377253,378305,379458,380470,381400,382517,383575,384513,385498,386475,387686,388851,390124,391397,392380,393388,394239,395182,395994,397308,398399,399569,400536,401461,402466,403294,404330,405402,406454,407706,408800,409889,410900,411858,413051,414191,415411,416446,417575,418668,419895,420948,422026,423137,424192,425124,426129,427162,428088,429240,430395,431518,432466,433510],"sizes":[911,744,599,555,541,570,1053,536,612,523,573,725,1184,469,478,927,703,596,592,570,1039,940,812,835,648,582,974,1124,1127,1318,1053,1086,1107,893,505,568,860,1037,1057,936,916,1012,972,972,955,801,846,954,948,966,943,1026,885,629,659,517,548,806,859,951,745,503,1110,962,688,973,847,873,726,340,486,552,624,467,499,459,547,646,515,547,714,976,785,783,891,1002,865,1134,1196,1126,821,857,961,1014,1045,1104,1076,1251,1052,1013,1158,1040,1187,1167,921,1145,1060,1242,1174,1147,1184,1141,754,1237,1178,1194,1225,1186,1253,1124,1304,1163,1197,1253,1014,1196,1277,1181,1354,1144,1162,1304,1095,1222,1233,1203,1158,1135,1200,1128,1146,1167,1130,1295,1071,1157,1117,1245,1158,1162,1145,1140,1068,1146,1089,1205,1264,1175,1031,919,975,1259,1197,1247,1124,1235,1149,971,876,1235,1287,1176,1228,1263,1151,1136,1256,1387,1348,1358,1200,1328,1378,1378,1318,1357,1181,1322,1359,1283,1304,1263,1273,1400,1141,1343,1220,1240,1122,960,1117,1246,1170,1131,1065,967,1165,985,1233,1157,1146,887,943,1054,960,966,1182,1353,1280,543,928,1001,1076,1176,976,1095,1037,901,961,1090,877,1028,1259,1239,1116,1166,1268,1146,1212,1162,1193,1165,1231,1180,1120,697,1075,1180,1066,1216,1360,1133,1195,1231,360,583,550,639,462,423,396,468,448,449,503,450,475,424,465,407,437,469,472,479,480,499,489,436,387,469,465,470,454,476,507,470,430,503,484,498,493,487,454,479,454,471,466,457,503,366,425,420,461,462,472,459,451,416,446,457,457,460,501,486,455,455,458,1194,1030,939,1013,1380,934,1174,970,942,745,1048,1188,1171,1009,1250,850,1048,1045,836,932,1029,1287,962,947,1087,1070,943,1138,1013,1007,791,1198,1073,996,1164,1106,967,1205,983,931,1309,888,887,1205,1051,1036,1001,1076,1104,888,1191,1162,900,619,909,1305,980,915,1104,1190,1035,1063,1199,1238,1235,730,1003,1097,1013,1026,1119,1241,1038,895,710,1087,1058,1010,1158,872,930,1054,1130,917,927,1052,1153,1012,930,1117,1058,938,985,977,1211,1165,1273,1273,983,1008,851,943,812,1314,1091,1170,967,925,1005,828,1036,1072,1052,1252,1094,1089,1011,958,1193,1140,1220,1035,1129,1093,1227,1053,1078,1111,1055,932,1005,1033,926,1152,1155,1123,948,1044,716],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, false);
            Module['removeRunDependency']('datafile_/home/marco/.ciaoroot/v1.22.0-m7/build/site/ciao/build/dist/typeslib.mods.data');
      };
      Module['addRunDependency']('datafile_/home/marco/.ciaoroot/v1.22.0-m7/build/site/ciao/build/dist/typeslib.mods.data');

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
    loadPackage({"files": [{"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/bundlereg/typeslib.bundlecfg", "start": 0, "end": 0}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/bundlereg/typeslib.bundlereg", "start": 0, "end": 242}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/typeslib.src.regtype_basic_lattice.itf", "start": 242, "end": 12320}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/typeslib.src.regtype_basic_lattice.po", "start": 12320, "end": 48350}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/typeslib.src.rnd_type_value.itf", "start": 48350, "end": 54013}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/typeslib.src.rnd_type_value.po", "start": 54013, "end": 68456}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/typeslib.src.type_errors.itf", "start": 68456, "end": 75118}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/typeslib.src.type_errors.po", "start": 75118, "end": 107491}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/typeslib.src.typedef.itf", "start": 107491, "end": 118431}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/typeslib.src.typedef.po", "start": 118431, "end": 132338}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/typeslib.src.typeslib.itf", "start": 132338, "end": 165870}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/typeslib.src.typeslib.po", "start": 165870, "end": 649182}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/typeslib/src/basic_type_operations.pl", "start": 649182, "end": 692440}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/typeslib/src/basic_type_operations_edz.pl", "start": 692440, "end": 708966}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/typeslib/src/basic_type_operations_vr.pl", "start": 708966, "end": 714240}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/typeslib/src/detunion.pl", "start": 714240, "end": 728173}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/typeslib/src/name_types.pl", "start": 728173, "end": 731211}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/typeslib/src/operations.pl", "start": 731211, "end": 738525}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/typeslib/src/ppoint.pl", "start": 738525, "end": 746489}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/typeslib/src/ppoint_vr.pl", "start": 746489, "end": 747795}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/typeslib/src/pred_to_typedef.pl", "start": 747795, "end": 762030}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/typeslib/src/regtype_rules.pl", "start": 762030, "end": 780923}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/typeslib/src/type_ops.pl", "start": 780923, "end": 781145}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/typeslib/src/type_simplification.pl", "start": 781145, "end": 853511}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/typeslib/src/type_translate.pl", "start": 853511, "end": 876271}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/typeslib/src/type_widen.pl", "start": 876271, "end": 910248}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/typeslib/src/typedef_to_pred.pl", "start": 910248, "end": 919285}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/typeslib/src/typeslib_deftypes.pl", "start": 919285, "end": 932228}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/typeslib/src/typeslib_hooks.pl", "start": 932228, "end": 932900}], "remote_package_size": 438322});

  })();
