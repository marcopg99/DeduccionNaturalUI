
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
      var PACKAGE_NAME = '/home/marco/.ciaoroot/v1.22.0-m7/build/site/ciao/build/dist/lpdoc.mods.data';
      var REMOTE_PACKAGE_BASE = 'lpdoc.mods.data';
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
        var compressedData = {"data":null,"cachedOffset":789583,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,980,1612,2182,2691,3265,4327,4991,5702,6433,7449,8034,8544,9126,10048,10941,11491,12405,13172,13956,14856,15689,16504,17306,18255,19071,19894,20773,21613,22546,23096,23846,24594,25417,26143,26918,27484,28004,28552,29373,30516,31775,32797,33791,34375,34898,35477,36395,37706,38484,39428,40220,40827,41402,41908,42479,42990,43510,44032,44578,45140,45713,46234,46815,47692,48721,49809,51270,52268,53613,54794,55973,57271,58605,59729,60970,62286,63388,64642,65960,67371,68796,70153,71503,72612,73838,74760,75946,76996,78106,79552,80676,81804,82516,83847,85050,86235,87327,88473,89635,90323,91395,92332,93361,94575,95805,97006,98206,99251,100365,101501,102943,103980,105009,106262,107301,108596,109890,111000,112053,113258,114319,115461,116690,118023,119357,120788,122012,123165,124411,125597,126871,127898,128845,130129,131438,132602,134013,135091,136473,137536,138797,139979,141099,142283,143488,144548,145660,146810,147996,149092,150515,151658,152454,153360,153994,155061,156122,157330,157920,158521,159072,159708,160533,161725,162894,163862,165159,166395,167683,168816,169925,171076,172053,173197,173547,174028,174944,175486,175976,176571,177132,177675,178279,179392,180681,181798,182347,183291,183968,184495,185056,185607,186237,186816,187314,187896,188885,189955,191466,192671,194014,195335,196160,197362,198389,199474,200463,201188,201907,202526,203267,204450,205435,206285,207448,207854,208738,209627,210291,210854,211489,212016,212590,213170,213716,214251,214807,215860,216733,217543,218115,218759,219262,219820,220668,221348,222203,223015,223825,224714,225670,226787,227826,229054,230173,231446,232627,233891,235081,236284,237363,238631,239838,240839,241566,242588,243882,245147,246456,247540,248786,249834,251085,252182,253260,254477,255568,256641,257937,259177,260279,261403,262708,263918,264965,266159,267245,268476,269695,270788,272066,273310,274491,275643,276866,277985,279037,279773,280794,281850,282721,283098,284077,284656,285173,285762,286693,287693,288698,289629,290511,291316,292386,293198,293876,294448,295059,295570,296138,296993,297946,299071,300268,301185,302029,302736,303241,304359,305404,306450,307585,308622,309649,310714,311771,313024,313890,314510,315146,315705,316206,316651,317115,317590,318070,318574,319043,319551,319992,320449,320945,321486,322452,323224,323859,324429,324969,325531,326052,326597,327153,327707,328723,329951,331069,332253,333189,334280,335390,336010,336671,337253,337881,338717,339732,340883,341954,342959,344028,344949,345944,346859,348057,349133,350231,351466,352209,353486,354737,355980,357081,358292,359419,360551,361670,362631,363805,365006,366189,367423,368583,369743,370756,372012,373194,374582,375821,376847,378073,379304,380224,381016,382375,383498,384550,385469,386837,388076,388515,389308,390164,390670,391221,391834,392342,392916,393783,394873,396147,397394,398490,399142,400605,401150,402087,402653,403168,403751,404708,405911,407321,408593,409588,410713,411907,413098,413940,414895,415609,416195,416714,417276,417762,418346,418858,419406,420225,421305,422738,423805,425147,426387,426911,427908,428621,429178,429746,430232,430830,431384,431938,432552,433595,434542,435417,436287,437017,437729,438551,439545,440310,441420,442462,443822,445052,446306,447537,448773,450051,451293,452107,453111,453833,454371,454923,455486,456010,456563,457672,458875,460172,461134,462002,462760,463309,463830,464423,464925,465507,466491,467793,468537,469628,470700,471256,471905,472569,473609,474824,475871,476912,477925,478940,479698,480419,481859,482810,483517,484492,485181,485699,486255,487086,487979,488946,489915,490722,491465,492018,492543,493128,493626,494209,495183,496142,497004,497956,498512,499117,499614,500244,500801,501354,501952,503088,504390,505449,506764,507990,509223,510398,511511,512570,513799,514942,516037,517095,518198,519115,519879,520650,521857,522709,523980,525110,526360,527635,528757,530068,531453,531930,532688,533666,534176,534717,535275,535803,536370,536885,537453,538510,539539,540480,541736,542991,544308,545657,546863,547998,548641,549559,550244,550776,551335,551909,552429,553012,553922,554950,556174,557323,558505,559698,560820,561966,562936,564152,565089,565555,566602,567456,568175,568798,569415,569960,570493,571038,571592,572088,572639,573240,573745,574313,575186,576131,577273,578078,579430,580763,581876,582944,584088,585416,586688,587826,588986,590223,591414,592514,593916,595029,596282,597349,598535,599731,600123,600728,601332,601928,602409,602969,603541,604077,604659,605167,605680,606207,606764,607273,607781,608247,608714,609176,609648,610147,610616,611152,611602,612051,612479,612935,613531,614434,614968,615592,616103,616668,617523,618669,619708,620976,621979,622663,623729,624472,625046,625654,626165,626722,627243,627787,628340,628894,629910,631050,632278,633537,634441,635108,636237,637262,638287,639496,640023,641073,642320,643000,643880,645177,646263,647535,648553,649921,651236,652494,653288,653999,654640,655486,656578,657795,659254,660323,661452,662342,663724,664949,666199,667279,668481,669532,670139,671233,672421,673606,674859,676295,677557,678808,679995,681303,682489,683557,683995,684998,685577,686095,686686,687614,688415,689084,690020,690979,691971,692750,693396,694021,694592,695267,695867,696451,697125,697913,698897,699443,700062,701104,702208,702917,703427,703916,704505,705183,706132,706823,707388,707958,708521,709102,709714,710282,710802,711383,712286,713435,714759,715902,717088,718203,719524,720775,721969,723226,724432,725597,726784,728115,728588,729159,729887,730466,731397,732295,733314,733883,734398,734973,735864,737171,738100,739204,739899,740471,740974,741550,742503,743753,745058,746445,747621,748166,749263,750293,751328,752273,753166,753832,754729,755695,756593,757045,757534,757994,758485,759113,759874,760874,761948,763127,764244,765515,766671,767888,769092,770244,771444,772871,774229,775715,776948,778379,779816,781035,782370,783572,784780,786027,787421,788405],"sizes":[980,632,570,509,574,1062,664,711,731,1016,585,510,582,922,893,550,914,767,784,900,833,815,802,949,816,823,879,840,933,550,750,748,823,726,775,566,520,548,821,1143,1259,1022,994,584,523,579,918,1311,778,944,792,607,575,506,571,511,520,522,546,562,573,521,581,877,1029,1088,1461,998,1345,1181,1179,1298,1334,1124,1241,1316,1102,1254,1318,1411,1425,1357,1350,1109,1226,922,1186,1050,1110,1446,1124,1128,712,1331,1203,1185,1092,1146,1162,688,1072,937,1029,1214,1230,1201,1200,1045,1114,1136,1442,1037,1029,1253,1039,1295,1294,1110,1053,1205,1061,1142,1229,1333,1334,1431,1224,1153,1246,1186,1274,1027,947,1284,1309,1164,1411,1078,1382,1063,1261,1182,1120,1184,1205,1060,1112,1150,1186,1096,1423,1143,796,906,634,1067,1061,1208,590,601,551,636,825,1192,1169,968,1297,1236,1288,1133,1109,1151,977,1144,350,481,916,542,490,595,561,543,604,1113,1289,1117,549,944,677,527,561,551,630,579,498,582,989,1070,1511,1205,1343,1321,825,1202,1027,1085,989,725,719,619,741,1183,985,850,1163,406,884,889,664,563,635,527,574,580,546,535,556,1053,873,810,572,644,503,558,848,680,855,812,810,889,956,1117,1039,1228,1119,1273,1181,1264,1190,1203,1079,1268,1207,1001,727,1022,1294,1265,1309,1084,1246,1048,1251,1097,1078,1217,1091,1073,1296,1240,1102,1124,1305,1210,1047,1194,1086,1231,1219,1093,1278,1244,1181,1152,1223,1119,1052,736,1021,1056,871,377,979,579,517,589,931,1000,1005,931,882,805,1070,812,678,572,611,511,568,855,953,1125,1197,917,844,707,505,1118,1045,1046,1135,1037,1027,1065,1057,1253,866,620,636,559,501,445,464,475,480,504,469,508,441,457,496,541,966,772,635,570,540,562,521,545,556,554,1016,1228,1118,1184,936,1091,1110,620,661,582,628,836,1015,1151,1071,1005,1069,921,995,915,1198,1076,1098,1235,743,1277,1251,1243,1101,1211,1127,1132,1119,961,1174,1201,1183,1234,1160,1160,1013,1256,1182,1388,1239,1026,1226,1231,920,792,1359,1123,1052,919,1368,1239,439,793,856,506,551,613,508,574,867,1090,1274,1247,1096,652,1463,545,937,566,515,583,957,1203,1410,1272,995,1125,1194,1191,842,955,714,586,519,562,486,584,512,548,819,1080,1433,1067,1342,1240,524,997,713,557,568,486,598,554,554,614,1043,947,875,870,730,712,822,994,765,1110,1042,1360,1230,1254,1231,1236,1278,1242,814,1004,722,538,552,563,524,553,1109,1203,1297,962,868,758,549,521,593,502,582,984,1302,744,1091,1072,556,649,664,1040,1215,1047,1041,1013,1015,758,721,1440,951,707,975,689,518,556,831,893,967,969,807,743,553,525,585,498,583,974,959,862,952,556,605,497,630,557,553,598,1136,1302,1059,1315,1226,1233,1175,1113,1059,1229,1143,1095,1058,1103,917,764,771,1207,852,1271,1130,1250,1275,1122,1311,1385,477,758,978,510,541,558,528,567,515,568,1057,1029,941,1256,1255,1317,1349,1206,1135,643,918,685,532,559,574,520,583,910,1028,1224,1149,1182,1193,1122,1146,970,1216,937,466,1047,854,719,623,617,545,533,545,554,496,551,601,505,568,873,945,1142,805,1352,1333,1113,1068,1144,1328,1272,1138,1160,1237,1191,1100,1402,1113,1253,1067,1186,1196,392,605,604,596,481,560,572,536,582,508,513,527,557,509,508,466,467,462,472,499,469,536,450,449,428,456,596,903,534,624,511,565,855,1146,1039,1268,1003,684,1066,743,574,608,511,557,521,544,553,554,1016,1140,1228,1259,904,667,1129,1025,1025,1209,527,1050,1247,680,880,1297,1086,1272,1018,1368,1315,1258,794,711,641,846,1092,1217,1459,1069,1129,890,1382,1225,1250,1080,1202,1051,607,1094,1188,1185,1253,1436,1262,1251,1187,1308,1186,1068,438,1003,579,518,591,928,801,669,936,959,992,779,646,625,571,675,600,584,674,788,984,546,619,1042,1104,709,510,489,589,678,949,691,565,570,563,581,612,568,520,581,903,1149,1324,1143,1186,1115,1321,1251,1194,1257,1206,1165,1187,1331,473,571,728,579,931,898,1019,569,515,575,891,1307,929,1104,695,572,503,576,953,1250,1305,1387,1176,545,1097,1030,1035,945,893,666,897,966,898,452,489,460,491,628,761,1000,1074,1179,1117,1271,1156,1217,1204,1152,1200,1427,1358,1486,1233,1431,1437,1219,1335,1202,1208,1247,1394,984,1178],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, false);
            Module['removeRunDependency']('datafile_/home/marco/.ciaoroot/v1.22.0-m7/build/site/ciao/build/dist/lpdoc.mods.data');
      };
      Module['addRunDependency']('datafile_/home/marco/.ciaoroot/v1.22.0-m7/build/site/ciao/build/dist/lpdoc.mods.data');

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
    loadPackage({"files": [{"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/bundlereg/lpdoc.bundlecfg", "start": 0, "end": 0}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/bundlereg/lpdoc.bundlereg", "start": 0, "end": 424}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.lib.doccfg.doccfg_doc.itf", "start": 424, "end": 10585}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.lib.doccfg.doccfg_doc.po", "start": 10585, "end": 18927}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.lib.doccfg.doccfg_props.itf", "start": 18927, "end": 27595}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.lib.doccfg.doccfg_props.po", "start": 27595, "end": 69553}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.lib.doccfg.doccfg_tr.itf", "start": 69553, "end": 79441}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.lib.doccfg.doccfg_tr.po", "start": 79441, "end": 86515}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.lib.lpdoc_http.lpdoc_http_rt.itf", "start": 86515, "end": 95108}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.lib.lpdoc_http.lpdoc_http_rt.po", "start": 95108, "end": 99524}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc.itf", "start": 99524, "end": 130506}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc.po", "start": 130506, "end": 360437}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_aux.itf", "start": 360437, "end": 374770}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_aux.po", "start": 374770, "end": 382919}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_bibrefs.itf", "start": 382919, "end": 402371}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_bibrefs.po", "start": 402371, "end": 443172}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_doctree.itf", "start": 443172, "end": 465280}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_doctree.po", "start": 465280, "end": 598473}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_errors.itf", "start": 598473, "end": 607153}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_errors.po", "start": 607153, "end": 618818}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_filesystem.itf", "start": 618818, "end": 634407}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_filesystem.po", "start": 634407, "end": 700238}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_html.itf", "start": 700238, "end": 721222}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_html.po", "start": 721222, "end": 838749}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_html_assets.itf", "start": 838749, "end": 853474}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_html_assets.po", "start": 853474, "end": 868268}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_html_template.itf", "start": 868268, "end": 877316}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_html_template.po", "start": 877316, "end": 895628}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_images.itf", "start": 895628, "end": 915174}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_images.po", "start": 915174, "end": 928321}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_index.itf", "start": 928321, "end": 946183}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_index.po", "start": 946183, "end": 985801}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_lookup.itf", "start": 985801, "end": 999703}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_lookup.po", "start": 999703, "end": 1008555}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_man.itf", "start": 1008555, "end": 1022584}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_man.po", "start": 1022584, "end": 1061365}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_messages.itf", "start": 1061365, "end": 1070519}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_messages.po", "start": 1070519, "end": 1078639}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_nil.itf", "start": 1078639, "end": 1092176}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_nil.po", "start": 1092176, "end": 1096639}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_parse.itf", "start": 1096639, "end": 1114152}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_parse.po", "start": 1114152, "end": 1170758}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_refsdb.itf", "start": 1170758, "end": 1188260}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_refsdb.po", "start": 1188260, "end": 1207996}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_settings.itf", "start": 1207996, "end": 1223853}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_settings.po", "start": 1223853, "end": 1247579}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_state.itf", "start": 1247579, "end": 1277466}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_state.po", "start": 1277466, "end": 1375970}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_structure.itf", "start": 1375970, "end": 1388024}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_structure.po", "start": 1388024, "end": 1398961}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_texinfo.itf", "start": 1398961, "end": 1419533}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.autodoc_texinfo.po", "start": 1419533, "end": 1524178}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.comments.itf", "start": 1524178, "end": 1532830}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.comments.po", "start": 1532830, "end": 1563310}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.doccfg_holder.itf", "start": 1563310, "end": 1568678}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.doccfg_holder.po", "start": 1568678, "end": 1582432}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.docmaker.itf", "start": 1582432, "end": 1605022}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.docmaker.po", "start": 1605022, "end": 1636126}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.docmod_holder.itf", "start": 1636126, "end": 1641286}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.docmod_holder.po", "start": 1641286, "end": 1644705}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.lpdoc_help.itf", "start": 1644705, "end": 1653892}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.lpdoc_help.po", "start": 1653892, "end": 1659157}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.lpdoc_single_mod.itf", "start": 1659157, "end": 1669977}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/build/cache/lpdoc.src.lpdoc_single_mod.po", "start": 1669977, "end": 1681399}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/etc/lpdoc.css", "start": 1681399, "end": 1720667}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/etc/lpdoc.js", "start": 1720667, "end": 1737268}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/examples/example_file.pl", "start": 1737268, "end": 1740625}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/examples/factorial_peano_iso_source.pl", "start": 1740625, "end": 1740842}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/examples/foo.pl", "start": 1740842, "end": 1740849}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/examples/lpdoc_examples.pl", "start": 1740849, "end": 1742048}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/examples/tmp.pl", "start": 1742048, "end": 1747204}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/lib/doc_module.pl", "start": 1747204, "end": 1747500}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/lib/doccfg/doccfg.pl", "start": 1747500, "end": 1748198}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/lib/doccfg/doccfg_defs.pl", "start": 1748198, "end": 1760135}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/lib/lpdoc_http/lpdoc_http.pl", "start": 1760135, "end": 1761183}, {"filename": "/home/marco/.ciaoroot/v1.22.0-m7/lpdoc/src/version_auto.pl", "start": 1761183, "end": 1761271}], "remote_package_size": 793679});

  })();
