
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
      var PACKAGE_NAME = '/home/marco/.ciaoroot/v1.22.0-m7/build/site/ciao/build/dist/ciaodbg.mods.data';
      var REMOTE_PACKAGE_BASE = 'ciaodbg.mods.data';
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
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7", "ciaodbg", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg", "lib", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib", "benchmark", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib", "byrdbox", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib", "debugpred", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib", "profilercc", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc", "examples", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib", "regrtestdecls", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib", "tracing", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib", "unittest", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":465079,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,962,1495,2039,2578,3136,4174,5422,6462,7287,7929,8412,8929,9409,9910,10424,10992,11480,12167,12743,13282,14372,15772,16668,17366,17902,18492,19537,20412,21113,21727,22222,22799,23679,24788,25915,27065,27898,28591,29205,29700,30277,31157,32215,33280,34411,35224,35973,36244,36811,37354,37894,38454,39100,39708,40308,40892,41613,42258,43321,44196,45044,45607,46174,46751,47730,48984,50375,51197,52252,53517,54682,55400,56420,57314,57853,58424,58946,59540,59963,60381,60762,61092,61547,62034,62313,62834,63286,63792,64251,64822,65346,65928,66720,67324,67958,68538,69101,69848,70609,71681,72764,74160,75697,77015,78474,79712,80992,82267,83512,84793,86028,87230,87646,88144,88841,89299,89772,90286,90764,91260,91737,92214,92752,93177,93696,94195,94778,95232,95636,96077,96495,97015,97475,97918,98365,98823,99287,99768,100256,100765,101230,101677,102053,102761,103567,104082,104524,105101,105615,106193,107098,108026,108844,109603,110356,111481,112699,113701,114928,116228,117514,118226,119114,119387,119868,120326,120830,121285,121893,122395,122983,123738,124354,125003,125559,126100,126897,127655,128773,129515,130226,130633,131123,131640,132108,132654,133188,133744,134449,135512,136696,137554,138164,138614,139073,139536,139998,140481,140961,141446,141948,142443,143013,143556,144291,144827,145383,146005,146825,147357,147912,148464,149141,150282,151245,152394,153080,153558,154063,154547,155034,155543,156029,156551,157353,157901,158355,158836,159305,159878,160384,160966,161842,162995,163857,164879,165450,165946,166554,167089,167644,168197,168829,169797,171005,172301,173156,174023,175274,176360,177505,178904,179655,180568,181203,181712,182275,183104,184147,185244,185880,186859,187491,188531,189565,190545,191370,191740,192249,192786,193258,193777,194283,194741,195276,195835,196381,196973,198038,199403,200439,200947,201738,202266,202751,203247,203751,204228,204635,205121,205626,206073,206561,207053,207523,208005,208487,208981,209536,210140,210863,211338,211844,212309,212888,213405,213999,214921,216036,216761,217411,217894,218408,218872,219435,219963,220510,221131,222162,223097,224002,224891,225968,226870,227421,227940,228499,229041,229625,230763,232109,232865,233520,234095,234651,235192,235880,237031,238371,239733,241032,241630,242151,242567,243034,243550,244020,244523,245010,245571,246065,246841,247433,247986,248526,249095,250194,251506,252102,252597,253094,253582,254061,254579,255058,255603,256394,256935,257611,258753,259785,260544,261501,262332,263178,263757,264320,264881,265360,265874,266341,266927,267480,268027,268577,269600,270759,272266,273631,274576,275323,276661,277530,278457,279349,280574,281857,283006,284314,285640,286967,288120,289323,290576,291882,293173,294518,295746,297029,298456,299673,300777,302160,303591,304942,306160,307180,308092,309063,309359,309801,310456,311151,311767,312418,312910,313434,313927,314427,314890,315338,315779,316208,316665,317128,317606,318098,318546,319061,319562,319946,320413,320874,321340,322377,322897,323487,323985,324564,325549,326834,328024,329217,329741,330605,331262,331713,332281,332871,333876,335174,336472,337687,338599,339716,340647,341696,342377,342905,343326,343801,344286,344793,345292,345806,346228,346663,347499,348072,348578,349161,350099,350921,351612,352185,353142,354089,355187,355813,356325,356896,357734,358877,359923,360992,361662,362300,362796,363283,363780,364299,364764,365261,365881,366835,367287,367856,368402,369079,370046,371434,372708,373843,374915,376303,377495,378607,379638,380861,382137,382996,383633,384280,384772,385276,385743,386246,386722,387285,387714,388179,389108,389837,390366,390955,391956,393217,394562,395860,397115,397716,398694,399280,399865,400375,400957,401890,402836,404094,405189,406522,407901,409284,410063,411106,412384,413602,414718,415887,416768,417419,418020,418755,419217,419679,420160,420621,421109,421606,422155,422645,423040,423422,424355,424934,425432,426014,426981,428276,429355,430217,431020,432510,433135,433980,434449,434938,435402,435980,436498,437080,437998,439225,440278,441363,442208,443505,444734,445925,446437,447331,447917,448468,449002,449547,450618,451697,452435,452945,453410,453897,454395,454902,455396,455926,457230,458438,459454,460505,461570,463052,464236],"sizes":[962,533,544,539,558,1038,1248,1040,825,642,483,517,480,501,514,568,488,687,576,539,1090,1400,896,698,536,590,1045,875,701,614,495,577,880,1109,1127,1150,833,693,614,495,577,880,1058,1065,1131,813,749,271,567,543,540,560,646,608,600,584,721,645,1063,875,848,563,567,577,979,1254,1391,822,1055,1265,1165,718,1020,894,539,571,522,594,423,418,381,330,455,487,279,521,452,506,459,571,524,582,792,604,634,580,563,747,761,1072,1083,1396,1537,1318,1459,1238,1280,1275,1245,1281,1235,1202,416,498,697,458,473,514,478,496,477,477,538,425,519,499,583,454,404,441,418,520,460,443,447,458,464,481,488,509,465,447,376,708,806,515,442,577,514,578,905,928,818,759,753,1125,1218,1002,1227,1300,1286,712,888,273,481,458,504,455,608,502,588,755,616,649,556,541,797,758,1118,742,711,407,490,517,468,546,534,556,705,1063,1184,858,610,450,459,463,462,483,480,485,502,495,570,543,735,536,556,622,820,532,555,552,677,1141,963,1149,686,478,505,484,487,509,486,522,802,548,454,481,469,573,506,582,876,1153,862,1022,571,496,608,535,555,553,632,968,1208,1296,855,867,1251,1086,1145,1399,751,913,635,509,563,829,1043,1097,636,979,632,1040,1034,980,825,370,509,537,472,519,506,458,535,559,546,592,1065,1365,1036,508,791,528,485,496,504,477,407,486,505,447,488,492,470,482,482,494,555,604,723,475,506,465,579,517,594,922,1115,725,650,483,514,464,563,528,547,621,1031,935,905,889,1077,902,551,519,559,542,584,1138,1346,756,655,575,556,541,688,1151,1340,1362,1299,598,521,416,467,516,470,503,487,561,494,776,592,553,540,569,1099,1312,596,495,497,488,479,518,479,545,791,541,676,1142,1032,759,957,831,846,579,563,561,479,514,467,586,553,547,550,1023,1159,1507,1365,945,747,1338,869,927,892,1225,1283,1149,1308,1326,1327,1153,1203,1253,1306,1291,1345,1228,1283,1427,1217,1104,1383,1431,1351,1218,1020,912,971,296,442,655,695,616,651,492,524,493,500,463,448,441,429,457,463,478,492,448,515,501,384,467,461,466,1037,520,590,498,579,985,1285,1190,1193,524,864,657,451,568,590,1005,1298,1298,1215,912,1117,931,1049,681,528,421,475,485,507,499,514,422,435,836,573,506,583,938,822,691,573,957,947,1098,626,512,571,838,1143,1046,1069,670,638,496,487,497,519,465,497,620,954,452,569,546,677,967,1388,1274,1135,1072,1388,1192,1112,1031,1223,1276,859,637,647,492,504,467,503,476,563,429,465,929,729,529,589,1001,1261,1345,1298,1255,601,978,586,585,510,582,933,946,1258,1095,1333,1379,1383,779,1043,1278,1218,1116,1169,881,651,601,735,462,462,481,461,488,497,549,490,395,382,933,579,498,582,967,1295,1079,862,803,1490,625,845,469,489,464,578,518,582,918,1227,1053,1085,845,1297,1229,1191,512,894,586,551,534,545,1071,1079,738,510,465,487,498,507,494,530,1304,1208,1016,1051,1065,1482,1184,843],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, false);
            Module['removeRunDependency']('datafile_/home/marco/.ciaoroot/v1.22.0-m7/build/site/ciao/build/dist/ciaodbg.mods.data');
      };
      Module['addRunDependency']('datafile_/home/marco/.ciaoroot/v1.22.0-m7/build/site/ciao/build/dist/ciaodbg.mods.data');

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
    loadPackage({"files": [{"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/bundlereg/ciaodbg.bundlecfg", "start": 0, "end": 0}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/bundlereg/ciaodbg.bundlereg", "start": 0, "end": 277}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.byrdbox.byrd.itf", "start": 277, "end": 10353}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.byrdbox.byrd.po", "start": 10353, "end": 34686}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.byrdbox.byrdbox_expand.itf", "start": 34686, "end": 41126}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.byrdbox.byrdbox_expand.po", "start": 41126, "end": 46529}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.debugpred.debugpred_test.itf", "start": 46529, "end": 53620}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.debugpred.debugpred_test.po", "start": 53620, "end": 56976}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.debugpred.debugpred_tr.itf", "start": 56976, "end": 66806}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.debugpred.debugpred_tr.po", "start": 66806, "end": 75278}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.graphic_trace.graphic_trace.itf", "start": 75278, "end": 85238}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.graphic_trace.graphic_trace.po", "start": 85238, "end": 94000}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.hashtable.hashtable.itf", "start": 94000, "end": 119361}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.hashtable.hashtable.po", "start": 119361, "end": 122677}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.profilercc.graph_to_tex.itf", "start": 122677, "end": 131713}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.profilercc.graph_to_tex.po", "start": 131713, "end": 147792}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.profilercc.profiler_auto_conf.itf", "start": 147792, "end": 202607}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.profilercc.profiler_auto_conf.po", "start": 202607, "end": 294143}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.profilercc.profiler_base.itf", "start": 294143, "end": 308326}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.profilercc.profiler_base.po", "start": 308326, "end": 331131}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.profilercc.profiler_c.itf", "start": 331131, "end": 364630}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.profilercc.profiler_c.po", "start": 364630, "end": 368301}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.profilercc.profiler_cc.itf", "start": 368301, "end": 386932}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.profilercc.profiler_cc.po", "start": 386932, "end": 417493}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.profilercc.profiler_doc.itf", "start": 417493, "end": 425689}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.profilercc.profiler_extra.itf", "start": 425689, "end": 436110}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.profilercc.profiler_extra.po", "start": 436110, "end": 459500}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.profilercc.profiler_rt.itf", "start": 459500, "end": 476471}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.profilercc.profiler_rt.po", "start": 476471, "end": 481736}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.profilercc.profiler_tr.itf", "start": 481736, "end": 497632}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.profilercc.profiler_tr.po", "start": 497632, "end": 518708}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.profilercc.profiler_type.itf", "start": 518708, "end": 527769}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.profilercc.profiler_type.po", "start": 527769, "end": 544596}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.profilercc.profiler_utils.itf", "start": 544596, "end": 569536}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.profilercc.profiler_utils.po", "start": 569536, "end": 613931}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.profilercc.profiler_utils_base.itf", "start": 613931, "end": 629904}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.profilercc.profiler_utils_base.po", "start": 629904, "end": 634174}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.profilercc.profiler_utils_native.itf", "start": 634174, "end": 651598}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.profilercc.profiler_utils_native.po", "start": 651598, "end": 662450}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.regrtestdecls.regrtestdecls_tr.itf", "start": 662450, "end": 673820}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.regrtestdecls.regrtestdecls_tr.po", "start": 673820, "end": 679218}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.stats.stats.itf", "start": 679218, "end": 690030}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.stats.stats.po", "start": 690030, "end": 718686}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.tracing.traces.itf", "start": 718686, "end": 729141}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.tracing.traces.po", "start": 729141, "end": 750513}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.tracing.tracing_expand.itf", "start": 750513, "end": 755543}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.tracing.tracing_expand.po", "start": 755543, "end": 761081}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.unittest.unittest.itf", "start": 761081, "end": 789005}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.unittest.unittest.po", "start": 789005, "end": 909422}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.unittest.unittest_base.itf", "start": 909422, "end": 920104}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.unittest.unittest_base.po", "start": 920104, "end": 929614}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.unittest.unittest_db.itf", "start": 929614, "end": 940504}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.unittest.unittest_db.po", "start": 940504, "end": 977770}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.unittest.unittest_examples.itf", "start": 977770, "end": 985908}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.unittest.unittest_examples.po", "start": 985908, "end": 988964}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.unittest.unittest_filters.itf", "start": 988964, "end": 993908}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.unittest.unittest_filters.po", "start": 993908, "end": 997640}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.unittest.unittest_props.itf", "start": 997640, "end": 1006999}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.unittest.unittest_props.po", "start": 1006999, "end": 1031629}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.unittest.unittest_regression.itf", "start": 1031629, "end": 1042303}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.unittest.unittest_regression.po", "start": 1042303, "end": 1087908}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.unittest.unittest_runner.itf", "start": 1087908, "end": 1096137}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.unittest.unittest_runner.po", "start": 1096137, "end": 1107496}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.unittest.unittest_runner_aux.itf", "start": 1107496, "end": 1119247}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.unittest.unittest_runner_aux.po", "start": 1119247, "end": 1173595}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.unittest.unittest_statistics.itf", "start": 1173595, "end": 1182225}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.unittest.unittest_statistics.po", "start": 1182225, "end": 1195598}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.unittest.unittest_summaries.itf", "start": 1195598, "end": 1211434}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.unittest.unittest_summaries.po", "start": 1211434, "end": 1228876}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.unittest.unittest_utils.itf", "start": 1228876, "end": 1239203}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/ciaodbg.lib.unittest.unittest_utils.po", "start": 1239203, "end": 1259815}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/benchmark/benchmark.pl", "start": 1259815, "end": 1261086}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/byrdbox/byrdbox.pl", "start": 1261086, "end": 1261410}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/debugpred/debugpred.pl", "start": 1261410, "end": 1261898}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/examples/robot.pl", "start": 1261898, "end": 1270072}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/profiler_cc_cc_auto.pl", "start": 1270072, "end": 1270072}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/profiler_decl.pl", "start": 1270072, "end": 1270149}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/profiler_doc.pl", "start": 1270149, "end": 1273342}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/profilercc.pl", "start": 1273342, "end": 1274075}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/profilercc/profilercc_decl_auto.pl", "start": 1274075, "end": 1274279}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/regrtestdecls/regrtestdecls.pl", "start": 1274279, "end": 1274502}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/tracing/tracing.pl", "start": 1274502, "end": 1274859}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/ciaodbg/lib/unittest/unittest_wrapper.pl", "start": 1274859, "end": 1275248}], "remote_package_size": 469175});

  })();
