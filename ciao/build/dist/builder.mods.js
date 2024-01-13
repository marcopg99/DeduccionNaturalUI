
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
      var PACKAGE_NAME = '/home/marco/.ciaoroot/v1.22.0-m7/build/site/ciao/build/dist/builder.mods.data';
      var REMOTE_PACKAGE_BASE = 'builder.mods.data';
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
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7", "builder", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/builder", "src", true, true);
Module['FS_createPath']("/home/marco/.ciaoroot/v1.22.0-m7/builder/src", "bundlehooks", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":733794,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,985,1968,2844,3243,3797,4384,4897,5474,6428,7710,8962,10165,11332,12717,14110,15219,16563,17827,18836,19159,19958,20889,21656,22442,22894,23492,24049,24636,25215,26254,27055,28220,29207,30361,31692,32793,33850,34745,35830,36958,38066,39281,40360,41493,42577,43513,44541,45512,46503,47518,48463,49558,50350,51001,52167,53099,54301,55117,56180,57330,58327,59363,60235,60994,62091,63042,63423,63877,64743,65303,65829,66375,67163,68231,69073,69879,70431,71005,71583,72541,73373,74340,74888,75476,76018,76600,77496,78422,79562,80741,81875,82516,83442,84262,84818,85412,85995,86512,87119,87620,88200,89090,89922,90855,92106,93179,94380,95222,96143,97338,98331,99545,100684,101819,102852,104014,104680,105861,107029,108130,109222,110335,111291,112351,113481,114831,116027,117154,118331,119467,120758,121719,122059,123062,123944,124529,125091,125658,126235,127220,128299,129464,130557,131511,132514,133838,135020,136361,137142,138405,139330,140516,140946,141796,142729,143313,143762,144264,144717,145359,145879,146423,147235,148333,149432,150422,151704,152959,153890,154920,155926,156808,157461,158425,158940,159496,160033,160586,161648,162775,163740,164686,165832,167089,167661,168405,168987,169917,171067,171945,172443,172951,173450,173968,174896,175418,175985,176530,177123,178211,179541,180644,181841,183191,184207,185419,186617,187851,188608,189424,190001,190880,191847,192917,193745,194368,194885,195442,196275,197419,198914,200287,201006,202330,203534,204807,205987,207166,207543,208173,209098,210183,210675,211186,212554,213472,214804,215229,216102,217107,218003,218458,219069,219574,220157,221022,222123,223364,224675,225818,227127,228347,229663,230898,232119,233383,234539,235846,237154,238296,239480,240822,242098,243000,243406,244317,245065,245577,246161,247158,248510,249715,251021,252197,253393,254253,255007,255748,256407,256919,257465,258271,259363,260516,261592,262831,264068,265033,266049,266509,267356,268431,269305,270528,271595,272615,273546,274451,275372,276367,277190,278233,279148,279991,280879,281934,282741,283764,284732,285435,286123,286840,287548,288642,289441,290150,290878,291612,292343,293261,294220,294952,295943,296828,297536,298249,299349,300318,301270,302115,303118,303987,304939,305819,306742,307614,308596,309517,310674,311519,312607,313280,314138,314705,315224,315787,316825,318125,319182,320170,321351,322499,323693,324846,326028,326874,327605,328613,329743,330512,331585,332715,333833,334523,335387,335958,336525,337102,338052,339006,339748,340617,341184,341689,342269,343327,344566,345412,346190,346745,347286,347848,348987,350071,351246,351824,352749,353270,353832,354365,354917,355996,357274,358348,359192,360193,360912,361471,362014,362707,363835,365220,366142,367012,367815,368401,368900,369486,370466,371784,372869,374138,375288,376388,377465,378794,379340,380321,380885,381388,381896,382485,382986,383570,384596,385996,387224,388426,389712,390899,392237,393567,394917,396083,396943,397826,398692,399263,399810,400378,401238,402084,403070,404303,405530,406740,407491,408361,409088,409676,410219,410800,411691,412503,413525,414473,415520,416434,417456,418554,419538,420578,421763,423085,424138,425325,426379,427609,428089,429181,430007,430578,431145,431722,432672,433461,434455,435410,436472,437589,438474,439542,440243,441204,441765,442510,443598,444461,445161,445682,446230,447025,448233,449555,450314,451155,451926,452406,452831,453421,453979,454525,455117,456229,457454,458460,459410,460451,461702,462812,464045,465215,466301,467483,468548,469686,470781,472061,473095,474199,474654,475602,476146,476688,477308,477828,478371,479173,480351,481553,482711,483430,484491,485233,485792,486377,486959,487921,489331,490813,491983,493023,493646,494563,495462,496102,496565,497123,497699,498251,498827,499691,500538,501524,502728,503988,505154,506200,507368,508524,509670,510916,512019,513066,514356,515440,516441,517607,518847,519300,520027,520851,521400,521932,522478,523564,524778,525563,526463,527061,527561,528138,529017,529931,530748,531666,532403,532940,533435,534037,534618,535191,535706,536287,537209,538287,539584,540810,542280,543526,544302,544990,546090,547336,548018,548704,549863,551223,552389,553726,554906,555969,556651,557316,558001,558684,559367,560040,561201,561896,562935,563904,564591,565258,565940,567140,567819,568477,569162,569847,570507,571719,572733,573394,574359,575378,576497,577790,579198,579879,580852,582181,582585,583178,584103,584751,585332,585958,586521,587047,587607,588665,590015,591413,592625,593696,595093,596500,597762,599047,599463,600230,600903,601486,601986,602576,603575,604409,605522,606336,606879,607444,608052,608570,609127,609967,610964,611970,613424,614844,616076,617396,618642,619877,621017,622073,623038,623379,624445,625323,625996,626534,627101,627676,628133,628643,629091,629732,630264,630812,631518,632593,633654,634709,635840,637167,638388,639643,640303,641597,642928,644047,645327,646068,646546,647449,648074,648623,649203,649701,650169,650730,651311,651810,652388,653364,654629,655862,657210,658336,658935,659830,660410,660927,661510,662442,663669,664829,665675,666588,667854,668467,669373,670031,670561,671108,671892,673085,674310,675423,676246,677116,677756,678260,678841,679694,680846,682025,682925,683751,684369,684877,685452,686288,687105,688208,689495,690587,691447,692373,693106,693678,694183,694768,695716,696873,698214,699601,700296,701229,702011,702601,703084,703663,704530,705327,706428,707470,708590,709586,710857,712268,713435,714671,715877,716997,718229,719583,720816,721993,723073,724054,725086,726106,727067,728254,729217,729890,731139,732110,733221],"sizes":[985,983,876,399,554,587,513,577,954,1282,1252,1203,1167,1385,1393,1109,1344,1264,1009,323,799,931,767,786,452,598,557,587,579,1039,801,1165,987,1154,1331,1101,1057,895,1085,1128,1108,1215,1079,1133,1084,936,1028,971,991,1015,945,1095,792,651,1166,932,1202,816,1063,1150,997,1036,872,759,1097,951,381,454,866,560,526,546,788,1068,842,806,552,574,578,958,832,967,548,588,542,582,896,926,1140,1179,1134,641,926,820,556,594,583,517,607,501,580,890,832,933,1251,1073,1201,842,921,1195,993,1214,1139,1135,1033,1162,666,1181,1168,1101,1092,1113,956,1060,1130,1350,1196,1127,1177,1136,1291,961,340,1003,882,585,562,567,577,985,1079,1165,1093,954,1003,1324,1182,1341,781,1263,925,1186,430,850,933,584,449,502,453,642,520,544,812,1098,1099,990,1282,1255,931,1030,1006,882,653,964,515,556,537,553,1062,1127,965,946,1146,1257,572,744,582,930,1150,878,498,508,499,518,928,522,567,545,593,1088,1330,1103,1197,1350,1016,1212,1198,1234,757,816,577,879,967,1070,828,623,517,557,833,1144,1495,1373,719,1324,1204,1273,1180,1179,377,630,925,1085,492,511,1368,918,1332,425,873,1005,896,455,611,505,583,865,1101,1241,1311,1143,1309,1220,1316,1235,1221,1264,1156,1307,1308,1142,1184,1342,1276,902,406,911,748,512,584,997,1352,1205,1306,1176,1196,860,754,741,659,512,546,806,1092,1153,1076,1239,1237,965,1016,460,847,1075,874,1223,1067,1020,931,905,921,995,823,1043,915,843,888,1055,807,1023,968,703,688,717,708,1094,799,709,728,734,731,918,959,732,991,885,708,713,1100,969,952,845,1003,869,952,880,923,872,982,921,1157,845,1088,673,858,567,519,563,1038,1300,1057,988,1181,1148,1194,1153,1182,846,731,1008,1130,769,1073,1130,1118,690,864,571,567,577,950,954,742,869,567,505,580,1058,1239,846,778,555,541,562,1139,1084,1175,578,925,521,562,533,552,1079,1278,1074,844,1001,719,559,543,693,1128,1385,922,870,803,586,499,586,980,1318,1085,1269,1150,1100,1077,1329,546,981,564,503,508,589,501,584,1026,1400,1228,1202,1286,1187,1338,1330,1350,1166,860,883,866,571,547,568,860,846,986,1233,1227,1210,751,870,727,588,543,581,891,812,1022,948,1047,914,1022,1098,984,1040,1185,1322,1053,1187,1054,1230,480,1092,826,571,567,577,950,789,994,955,1062,1117,885,1068,701,961,561,745,1088,863,700,521,548,795,1208,1322,759,841,771,480,425,590,558,546,592,1112,1225,1006,950,1041,1251,1110,1233,1170,1086,1182,1065,1138,1095,1280,1034,1104,455,948,544,542,620,520,543,802,1178,1202,1158,719,1061,742,559,585,582,962,1410,1482,1170,1040,623,917,899,640,463,558,576,552,576,864,847,986,1204,1260,1166,1046,1168,1156,1146,1246,1103,1047,1290,1084,1001,1166,1240,453,727,824,549,532,546,1086,1214,785,900,598,500,577,879,914,817,918,737,537,495,602,581,573,515,581,922,1078,1297,1226,1470,1246,776,688,1100,1246,682,686,1159,1360,1166,1337,1180,1063,682,665,685,683,683,673,1161,695,1039,969,687,667,682,1200,679,658,685,685,660,1212,1014,661,965,1019,1119,1293,1408,681,973,1329,404,593,925,648,581,626,563,526,560,1058,1350,1398,1212,1071,1397,1407,1262,1285,416,767,673,583,500,590,999,834,1113,814,543,565,608,518,557,840,997,1006,1454,1420,1232,1320,1246,1235,1140,1056,965,341,1066,878,673,538,567,575,457,510,448,641,532,548,706,1075,1061,1055,1131,1327,1221,1255,660,1294,1331,1119,1280,741,478,903,625,549,580,498,468,561,581,499,578,976,1265,1233,1348,1126,599,895,580,517,583,932,1227,1160,846,913,1266,613,906,658,530,547,784,1193,1225,1113,823,870,640,504,581,853,1152,1179,900,826,618,508,575,836,817,1103,1287,1092,860,926,733,572,505,585,948,1157,1341,1387,695,933,782,590,483,579,867,797,1101,1042,1120,996,1271,1411,1167,1236,1206,1120,1232,1354,1233,1177,1080,981,1032,1020,961,1187,963,673,1249,971,1111,573],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, false);
            Module['removeRunDependency']('datafile_/home/marco/.ciaoroot/v1.22.0-m7/build/site/ciao/build/dist/builder.mods.data');
      };
      Module['addRunDependency']('datafile_/home/marco/.ciaoroot/v1.22.0-m7/build/site/ciao/build/dist/builder.mods.data');

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
    loadPackage({"files": [{"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/bundlereg/builder.bundlecfg", "start": 0, "end": 654}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/bundlereg/builder.bundlereg", "start": 654, "end": 931}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.builder_aux.itf", "start": 931, "end": 17368}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.builder_aux.po", "start": 17368, "end": 42038}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.builder_cmds.itf", "start": 42038, "end": 60078}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.builder_cmds.po", "start": 60078, "end": 139355}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.builder_flags.itf", "start": 139355, "end": 149164}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.builder_flags.po", "start": 149164, "end": 153244}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.builder_prim.itf", "start": 153244, "end": 162405}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.builder_prim.po", "start": 162405, "end": 165423}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.builder_targets.itf", "start": 165423, "end": 177268}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.builder_targets.po", "start": 177268, "end": 188100}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.bundle_configure.itf", "start": 188100, "end": 208347}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.bundle_configure.po", "start": 208347, "end": 272938}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.bundle_fetch.itf", "start": 272938, "end": 285390}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.bundle_fetch.po", "start": 285390, "end": 314308}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.bundle_hash.itf", "start": 314308, "end": 333507}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.bundle_hash.po", "start": 333507, "end": 353695}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.bundle_scan.itf", "start": 353695, "end": 364816}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.bundle_scan.po", "start": 364816, "end": 378645}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.bundlehooks.bundlehooks_rt.itf", "start": 378645, "end": 383815}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.bundlehooks.bundlehooks_rt.po", "start": 383815, "end": 397609}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.bundlehooks.bundlehooks_tr.itf", "start": 397609, "end": 407536}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.bundlehooks.bundlehooks_tr.po", "start": 407536, "end": 428073}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.bundlehooks_holder.itf", "start": 428073, "end": 433238}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.bundlehooks_holder.po", "start": 433238, "end": 436672}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.car_maker.itf", "start": 436672, "end": 447954}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.car_maker.po", "start": 447954, "end": 488351}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.ciaoc_aux.itf", "start": 488351, "end": 503089}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.ciaoc_aux.po", "start": 503089, "end": 543552}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.ciaoc_batch_call.itf", "start": 543552, "end": 551444}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.ciaoc_batch_call.po", "start": 551444, "end": 566395}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.ciaocl_help.itf", "start": 566395, "end": 577157}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.ciaocl_help.po", "start": 577157, "end": 699785}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.ciaocl_parser.itf", "start": 699785, "end": 708913}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.ciaocl_parser.po", "start": 708913, "end": 745016}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.ciaopp_aux.itf", "start": 745016, "end": 754466}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.ciaopp_aux.po", "start": 754466, "end": 759225}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.cmake_aux.itf", "start": 759225, "end": 768365}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.cmake_aux.po", "start": 768365, "end": 773180}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.config_common.itf", "start": 773180, "end": 782343}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.config_common.po", "start": 782343, "end": 790332}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.cpx_process.itf", "start": 790332, "end": 801049}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.cpx_process.po", "start": 801049, "end": 809584}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.detcheader.itf", "start": 809584, "end": 819023}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.detcheader.po", "start": 819023, "end": 826230}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.eng_defs.itf", "start": 826230, "end": 836059}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.eng_defs.po", "start": 836059, "end": 854012}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.git_extra.itf", "start": 854012, "end": 868988}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.git_extra.po", "start": 868988, "end": 891841}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.grade_analyze.itf", "start": 891841, "end": 902340}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.grade_analyze.po", "start": 902340, "end": 914820}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.grade_bin.itf", "start": 914820, "end": 926782}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.grade_bin.po", "start": 926782, "end": 960748}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.grade_docs.itf", "start": 960748, "end": 971554}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.grade_docs.po", "start": 971554, "end": 989863}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.grade_holder.itf", "start": 989863, "end": 995022}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.grade_holder.po", "start": 995022, "end": 998438}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.info_installer.itf", "start": 998438, "end": 1007203}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.info_installer.po", "start": 1007203, "end": 1013018}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.install_aux.itf", "start": 1013018, "end": 1030153}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.install_aux.po", "start": 1030153, "end": 1067869}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.interactive_aux.itf", "start": 1067869, "end": 1080909}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.interactive_aux.po", "start": 1080909, "end": 1089736}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.lpdoc_aux.itf", "start": 1089736, "end": 1100347}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.lpdoc_aux.po", "start": 1100347, "end": 1111827}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.manifest_compiler.itf", "start": 1111827, "end": 1129985}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.manifest_compiler.po", "start": 1129985, "end": 1168729}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.messages_aux.itf", "start": 1168729, "end": 1177738}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.messages_aux.po", "start": 1177738, "end": 1183850}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.pbundle_gen_bin.itf", "start": 1183850, "end": 1193205}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.pbundle_gen_bin.po", "start": 1193205, "end": 1197834}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.pbundle_gen_mac.itf", "start": 1197834, "end": 1217810}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.pbundle_gen_mac.po", "start": 1217810, "end": 1318649}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.pbundle_gen_rpm.itf", "start": 1318649, "end": 1333651}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.pbundle_gen_rpm.po", "start": 1333651, "end": 1355078}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.pbundle_gen_src.itf", "start": 1355078, "end": 1364433}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.pbundle_gen_src.po", "start": 1364433, "end": 1368343}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.pbundle_gen_win32.itf", "start": 1368343, "end": 1384007}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.pbundle_gen_win32.po", "start": 1384007, "end": 1409481}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.pbundle_generator.itf", "start": 1409481, "end": 1435538}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.pbundle_generator.po", "start": 1435538, "end": 1464248}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.pbundle_meta.itf", "start": 1464248, "end": 1485748}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.pbundle_meta.po", "start": 1485748, "end": 1496775}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.register_in_script.itf", "start": 1496775, "end": 1506221}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.register_in_script.po", "start": 1506221, "end": 1519376}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.site_aux.itf", "start": 1519376, "end": 1529476}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.site_aux.po", "start": 1529476, "end": 1538946}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.tests_aux.itf", "start": 1538946, "end": 1547563}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.tests_aux.po", "start": 1547563, "end": 1553264}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.third_party_config.itf", "start": 1553264, "end": 1564041}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.third_party_config.po", "start": 1564041, "end": 1575728}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.third_party_custom.itf", "start": 1575728, "end": 1586058}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.third_party_custom.po", "start": 1586058, "end": 1596045}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.third_party_install.itf", "start": 1596045, "end": 1606846}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/builder.src.third_party_install.po", "start": 1606846, "end": 1654433}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/builder_doc.pl", "start": 1654433, "end": 1655403}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/bundlehooks/bundlehooks.pl", "start": 1655403, "end": 1656067}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/bundlehooks/bundlehooks_defs.pl", "start": 1656067, "end": 1659220}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/cmd_hooks.pl", "start": 1659220, "end": 1661919}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/builder/src/pbundle_gen_hookdefs.pl", "start": 1661919, "end": 1662081}], "remote_package_size": 737890});

  })();
