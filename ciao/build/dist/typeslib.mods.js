
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
      var PACKAGE_NAME = '/home/marcopg99/.ciaoroot/v1.22.0-m1/build/site/ciao/build/dist/typeslib.mods.data';
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
Module['FS_createPath']("/home/marcopg99/.ciaoroot/v1.22.0-m1", "typeslib", true, true);
Module['FS_createPath']("/home/marcopg99/.ciaoroot/v1.22.0-m1/typeslib", "src", true, true);
Module['FS_createPath']("/home/marcopg99/.ciaoroot/v1.22.0-m1/typeslib", "tests", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":471160,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,912,1660,2255,2812,3354,3915,4977,5515,6121,6637,7219,7921,9101,9568,10043,10978,11669,12263,12846,13416,14451,15388,16192,17019,17673,18259,19223,20344,21474,22792,23840,24913,26019,26911,27417,27988,28850,29889,30946,31876,32792,33804,34778,35752,36703,37500,38354,39309,40257,41216,42165,43191,44075,44706,45357,45878,46426,47233,48087,49043,49795,50298,51413,52388,53076,54059,54900,55777,56496,56840,57318,57857,58472,58956,59464,59918,60463,61103,61625,62169,62906,63912,64644,65420,66382,67381,68260,69401,70579,71737,72566,73539,74499,75480,76498,77550,78650,79875,80889,81945,83078,84074,85276,86447,87285,88463,89572,90766,91947,93119,94307,95489,96255,97494,98652,99842,101106,102217,103474,104582,105919,107027,108188,109449,110504,111699,112910,114222,115330,116513,117813,119024,120250,121383,122600,123810,124916,126156,127295,128493,129625,130767,131947,133088,134296,135413,136586,137817,139007,140211,141358,142352,143520,144626,145825,147063,148220,149361,150140,151199,152473,153599,154787,155993,157197,158288,159282,160183,161391,162644,163892,165100,166286,167376,168520,169814,171107,172495,173844,174993,176374,177709,179111,180488,181853,182988,184362,185672,187051,188287,189494,190776,192132,193382,194636,195905,197111,198345,199301,200389,201633,202854,203969,205054,206064,207161,208176,209286,210540,211630,212503,213478,214498,215429,216441,217634,218939,220237,220946,221950,222864,223981,225211,226204,227337,228394,229375,230254,231411,232293,233191,234401,235614,236724,237891,239174,240343,241540,242703,243944,245103,246338,247524,248659,249375,250338,251556,252536,253840,255136,256320,257465,258625,259166,259662,260282,260899,261396,261829,262218,262680,263146,263592,264071,264503,264991,265405,265863,266289,266731,267198,267682,268167,268642,269107,269638,270101,270515,270971,271432,271912,272332,272832,273334,273805,274258,274731,275240,275739,276214,276732,277190,277661,278116,278594,279069,279504,279994,280363,280789,281219,281667,282135,282605,283073,283503,283949,284380,284838,285287,285764,286272,286758,287192,287652,288172,289347,290375,291289,292339,293671,294637,295796,296752,297721,298482,299523,300699,301884,302885,304171,305019,306065,307109,307945,308899,309897,311191,312122,313021,314139,315237,316144,317304,318296,319259,320049,321277,322330,323329,324509,325592,326560,327786,328749,329660,330950,331816,332662,333891,334914,335926,336898,337983,339084,339954,341108,342282,343186,343816,344718,345827,346769,347636,348867,349433,349975,350701,351784,352518,352961,353420,354423,355418,356483,357724,358815,359614,360698,361776,362715,363907,365020,366235,367278,368141,369385,370439,371562,372250,373189,374356,375327,376432,377613,378755,379619,380346,381207,382132,383227,384313,385338,386275,387215,388383,389207,390204,391218,392260,393311,394306,395323,396553,397447,398442,399555,400711,401802,403094,404254,405350,406372,407408,408220,409090,410230,411447,412472,413566,414566,415523,416502,417415,418620,419533,420824,421946,423026,424075,424930,426174,427306,428473,429460,430648,431596,432809,433929,434966,435939,437015,438006,439160,440121,441166,442105,443281,444831,445806,446728,447720,448611,449468,450349,451418,452518,453738,454866,455909,457120,458142,459068,460192,461383,462578,463767,464690,465825,466961,468032,469031,470122],"sizes":[912,748,595,557,542,561,1062,538,606,516,582,702,1180,467,475,935,691,594,583,570,1035,937,804,827,654,586,964,1121,1130,1318,1048,1073,1106,892,506,571,862,1039,1057,930,916,1012,974,974,951,797,854,955,948,959,949,1026,884,631,651,521,548,807,854,956,752,503,1115,975,688,983,841,877,719,344,478,539,615,484,508,454,545,640,522,544,737,1006,732,776,962,999,879,1141,1178,1158,829,973,960,981,1018,1052,1100,1225,1014,1056,1133,996,1202,1171,838,1178,1109,1194,1181,1172,1188,1182,766,1239,1158,1190,1264,1111,1257,1108,1337,1108,1161,1261,1055,1195,1211,1312,1108,1183,1300,1211,1226,1133,1217,1210,1106,1240,1139,1198,1132,1142,1180,1141,1208,1117,1173,1231,1190,1204,1147,994,1168,1106,1199,1238,1157,1141,779,1059,1274,1126,1188,1206,1204,1091,994,901,1208,1253,1248,1208,1186,1090,1144,1294,1293,1388,1349,1149,1381,1335,1402,1377,1365,1135,1374,1310,1379,1236,1207,1282,1356,1250,1254,1269,1206,1234,956,1088,1244,1221,1115,1085,1010,1097,1015,1110,1254,1090,873,975,1020,931,1012,1193,1305,1298,709,1004,914,1117,1230,993,1133,1057,981,879,1157,882,898,1210,1213,1110,1167,1283,1169,1197,1163,1241,1159,1235,1186,1135,716,963,1218,980,1304,1296,1184,1145,1160,541,496,620,617,497,433,389,462,466,446,479,432,488,414,458,426,442,467,484,485,475,465,531,463,414,456,461,480,420,500,502,471,453,473,509,499,475,518,458,471,455,478,475,435,490,369,426,430,448,468,470,468,430,446,431,458,449,477,508,486,434,460,520,1175,1028,914,1050,1332,966,1159,956,969,761,1041,1176,1185,1001,1286,848,1046,1044,836,954,998,1294,931,899,1118,1098,907,1160,992,963,790,1228,1053,999,1180,1083,968,1226,963,911,1290,866,846,1229,1023,1012,972,1085,1101,870,1154,1174,904,630,902,1109,942,867,1231,566,542,726,1083,734,443,459,1003,995,1065,1241,1091,799,1084,1078,939,1192,1113,1215,1043,863,1244,1054,1123,688,939,1167,971,1105,1181,1142,864,727,861,925,1095,1086,1025,937,940,1168,824,997,1014,1042,1051,995,1017,1230,894,995,1113,1156,1091,1292,1160,1096,1022,1036,812,870,1140,1217,1025,1094,1000,957,979,913,1205,913,1291,1122,1080,1049,855,1244,1132,1167,987,1188,948,1213,1120,1037,973,1076,991,1154,961,1045,939,1176,1550,975,922,992,891,857,881,1069,1100,1220,1128,1043,1211,1022,926,1124,1191,1195,1189,923,1135,1136,1071,999,1091,1038],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, false);
            Module['removeRunDependency']('datafile_/home/marcopg99/.ciaoroot/v1.22.0-m1/build/site/ciao/build/dist/typeslib.mods.data');
      };
      Module['addRunDependency']('datafile_/home/marcopg99/.ciaoroot/v1.22.0-m1/build/site/ciao/build/dist/typeslib.mods.data');

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
    loadPackage({"files": [{"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/bundlereg/typeslib.bundlecfg", "start": 0, "end": 0}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/bundlereg/typeslib.bundlereg", "start": 0, "end": 250}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/typeslib.src.regtype_basic_lattice.itf", "start": 250, "end": 12328}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/typeslib.src.regtype_basic_lattice.po", "start": 12328, "end": 48358}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/typeslib.src.rnd_type_value.itf", "start": 48358, "end": 54021}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/typeslib.src.rnd_type_value.po", "start": 54021, "end": 68464}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/typeslib.src.type_errors.itf", "start": 68464, "end": 75126}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/typeslib.src.type_errors.po", "start": 75126, "end": 107499}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/typeslib.src.typedef.itf", "start": 107499, "end": 118439}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/typeslib.src.typedef.po", "start": 118439, "end": 132346}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/typeslib.src.typeslib.itf", "start": 132346, "end": 165841}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/typeslib.src.typeslib.po", "start": 165841, "end": 647067}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/typeslib/src/basic_type_operations.pl", "start": 647067, "end": 690325}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/typeslib/src/basic_type_operations_edz.pl", "start": 690325, "end": 706851}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/typeslib/src/basic_type_operations_vr.pl", "start": 706851, "end": 712125}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/typeslib/src/detunion.pl", "start": 712125, "end": 726058}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/typeslib/src/name_types.pl", "start": 726058, "end": 729096}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/typeslib/src/operations.pl", "start": 729096, "end": 736410}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/typeslib/src/ppoint.pl", "start": 736410, "end": 744374}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/typeslib/src/ppoint_vr.pl", "start": 744374, "end": 745680}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/typeslib/src/pred_to_typedef.pl", "start": 745680, "end": 759915}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/typeslib/src/regtype_basic_lattice.pl", "start": 759915, "end": 787947}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/typeslib/src/regtype_rules.pl", "start": 787947, "end": 806840}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/typeslib/src/rnd_type_value.pl", "start": 806840, "end": 811492}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/typeslib/src/type_errors.pl", "start": 811492, "end": 815030}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/typeslib/src/type_ops.pl", "start": 815030, "end": 815252}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/typeslib/src/type_simplification.pl", "start": 815252, "end": 886897}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/typeslib/src/type_translate.pl", "start": 886897, "end": 909647}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/typeslib/src/type_widen.pl", "start": 909647, "end": 943624}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/typeslib/src/typedef.pl", "start": 943624, "end": 947861}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/typeslib/src/typedef_to_pred.pl", "start": 947861, "end": 956898}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/typeslib/src/typeslib.pl", "start": 956898, "end": 996731}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/typeslib/src/typeslib_deftypes.pl", "start": 996731, "end": 1009674}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/typeslib/src/typeslib_hooks.pl", "start": 1009674, "end": 1010230}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/typeslib/tests/test1.pl", "start": 1010230, "end": 1011684}], "remote_package_size": 475256});

  })();
