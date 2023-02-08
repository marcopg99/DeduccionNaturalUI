
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
      var PACKAGE_NAME = '/home/marcopg99/.ciaoroot/v1.22.0-m1/build/site/ciao/build/dist/lpdoc.mods.data';
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
Module['FS_createPath']("/home/marcopg99/.ciaoroot/v1.22.0-m1", "lpdoc", true, true);
Module['FS_createPath']("/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc", "etc", true, true);
Module['FS_createPath']("/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc", "examples", true, true);
Module['FS_createPath']("/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc", "lib", true, true);
Module['FS_createPath']("/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/lib", "doccfg", true, true);
Module['FS_createPath']("/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/lib", "lpdoc_http", true, true);
Module['FS_createPath']("/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc", "src", true, true);

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        var compressedData = {"data":null,"cachedOffset":1068273,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,879,1462,1961,2550,3454,4089,4652,5157,5736,6787,7466,8174,8920,9933,10513,11029,11618,12531,13419,13959,14882,15659,16434,17327,18164,18972,19789,20708,21530,22355,23234,24079,25012,25560,26314,27075,27875,28603,29388,29960,30479,31026,31842,32990,34259,35287,36276,36855,37372,37958,38882,40204,40982,41933,42720,43326,43899,44404,44969,45479,46007,46531,47070,47630,48217,48723,49317,50240,51268,52388,53834,54814,56185,57336,58513,59787,61138,62294,63560,64819,65958,67221,68492,69886,71319,72655,73993,75072,76306,77211,78296,79467,80644,81996,83165,84296,85067,86428,87603,88727,89809,90930,91998,92689,93771,94727,95838,97069,98247,99455,100628,101670,102819,103824,105325,106418,107322,108641,109662,110956,112164,113235,114412,115669,116750,117931,119226,120575,121890,123352,124479,125604,126818,128076,129319,130270,131370,132618,133941,135129,136511,137549,138927,139963,141244,142447,143562,144720,145868,146936,148143,149304,150429,151637,153067,154197,155033,155807,156538,157602,158678,159869,160406,161078,161674,162254,163210,164368,165505,166537,167790,169037,170385,171488,172643,173833,174915,175944,176290,176886,177778,178316,178792,179411,179921,180473,181282,182472,183726,184801,185426,186380,186980,187524,188046,188586,189257,189820,190326,190905,191965,193037,194586,195798,197018,198363,199365,200568,201696,202814,203738,204471,205246,205856,206707,207835,208653,209461,210576,210993,212021,212847,213507,214037,214682,215142,215729,216356,216866,217413,218154,219114,219986,220637,221192,221778,222267,222997,223703,224522,225280,226064,226911,227731,228841,229959,230908,232246,233431,234693,235837,237139,238412,239440,240539,241853,242866,243696,244515,245625,246848,248208,249433,250637,251711,252857,254148,255339,256524,257618,258743,259859,261089,262274,263319,264503,265809,266972,268072,269265,270372,271593,272782,273994,275236,276440,277641,278610,279879,281019,281941,282812,283807,284902,285406,285976,286782,287345,287860,288425,289474,290514,291399,292426,293189,294034,294958,295808,296392,296892,297484,297972,298546,299521,300564,301801,302670,303568,304358,304974,305745,306765,307818,309020,310149,311105,312153,313166,314360,315685,316088,316856,317461,318005,318403,318859,319342,319813,320318,320794,321357,321808,322253,322720,323190,324115,325060,325661,326204,326766,327386,327882,328460,328953,329533,330508,331613,332765,333885,334685,335925,337188,338000,338673,339290,339848,340655,341628,342694,343680,344831,345748,346876,347611,348647,349561,350871,351880,353271,354051,355224,356620,357758,359019,360102,361238,362358,363485,364471,365565,366758,368037,369129,370276,371520,372242,373422,374687,376034,377245,378175,379577,380804,381951,382671,383624,384967,386125,387154,388121,389340,390209,390589,391620,392325,392908,393468,394063,394561,395143,396162,397384,398536,399862,400795,401943,402903,403707,404502,405059,405606,406197,407329,408647,409963,411200,412136,413347,414567,415858,416416,417391,417942,418534,419111,419572,420110,420706,421187,421765,422754,424134,425357,426566,427794,428938,429553,430474,431031,431577,432171,432709,433293,433819,434402,435352,436420,437281,438193,439018,440009,440537,441561,442305,443412,444506,445759,447000,448284,449502,450602,451979,453174,454488,455101,455991,456482,457022,457607,458110,458691,459565,460606,461859,463230,463767,464714,465271,465786,466361,466881,467427,468236,469315,470517,471119,472254,472996,473597,474206,475049,476269,477504,478470,479488,480624,481436,482162,483281,484385,485438,486132,487014,487592,488088,488670,489662,490443,491444,492167,493128,493693,494199,494775,495294,495842,496659,497675,498398,499357,500078,500605,501189,501757,502329,502835,503422,504376,505509,506726,507953,509211,510425,511655,512787,513946,515079,516233,517301,518450,519526,520517,521269,522031,522803,523941,525146,526362,527532,528856,530098,531306,532634,533341,533999,534946,535486,536046,536596,537127,537717,538215,538794,539808,540831,541718,542972,544215,545528,546963,548132,549325,549923,550892,551568,552098,552694,553296,553798,554382,555273,556283,557459,558560,559773,560992,562120,563243,564251,565410,566414,566936,567945,568818,569515,570143,570763,571302,571858,572412,572969,573470,574029,574598,575113,575688,576576,577509,578658,579493,580860,582197,583317,584410,585550,586881,588164,589330,590504,591742,592929,594025,595410,596526,597741,598796,599964,601161,601546,602148,602743,603336,603849,604399,604950,605485,606064,606573,607108,607612,608159,608676,609200,609674,610146,610610,611094,611587,612071,612580,613017,613467,613903,614365,615064,615973,616535,617123,617634,618205,619101,620253,621365,622584,623658,624253,625219,625953,626537,627162,627707,628233,628802,629330,629877,630612,631550,632676,633801,635084,635860,636753,637824,638742,639841,641022,641620,642686,643875,644632,645600,646765,647850,649092,650202,651521,652717,653996,654711,655438,656149,657091,658231,659451,660883,661886,662891,663753,665158,666376,667620,668699,669899,670949,671555,672680,673940,675035,676349,677657,678947,680137,681400,682621,683764,684211,685158,685741,686245,686823,687687,688539,689213,690137,691098,692093,692929,693565,694294,694881,695536,696151,696719,697363,698144,699127,699668,700255,701310,702437,703135,703629,704117,704680,705351,706286,706978,707545,708122,708681,709261,709888,710467,710983,711573,712509,713674,714979,716119,717317,718483,719778,721008,722238,723480,724687,725855,727020,728347,728798,729417,730155,730739,731690,732586,733522,734117,734598,735175,736163,737400,738229,739184,739724,740272,740821,741540,742621,743889,745285,746500,747316,748504,749629,750807,752245,753401,754534,755656,757061,758128,759130,760136,761084,761953,762565,763504,764345,764756,765230,765711,766257,767012,768012,769082,770261,771378,772899,774190,775491,776828,778252,779751,781100,782574,783841,785183,786462,787582,788791,790168,791391,792477,793688,794815,795973,797024,798335,799541,800720,801760,803103,804400,805527,806833,808013,809326,810604,811767,812884,814151,815175,816355,817489,818668,819649,820812,821893,823148,824429,825674,826862,828122,829271,830338,831528,832589,833705,834981,836197,837332,838669,839949,841198,842358,843490,844507,845797,846938,848086,848898,850030,851174,852629,853923,855066,856200,857700,859153,860670,862225,863501,864735,866015,867315,868586,869371,870322,871227,872372,873393,874420,875682,876933,877806,878928,880098,881124,882206,883336,884548,885381,886547,887795,889002,890137,891344,892313,893291,894573,895865,897184,898405,899543,900773,902012,903090,904335,905417,906756,908013,909079,910009,911016,912021,913242,914482,915534,916726,917688,918604,919292,920241,921130,922109,923266,924364,925444,926548,927741,928814,929966,931358,932448,933663,934955,936336,937594,938983,940277,941387,942588,943803,944900,946262,947487,948731,949890,951053,952467,953879,955038,956322,957504,958326,958950,960071,961045,962376,963558,964603,965756,966800,967921,969108,970192,971406,972589,973659,974787,975890,977080,978127,979562,980984,982428,983461,984725,985907,987136,988417,989455,990385,991614,992833,993786,994964,996066,997264,998573,999891,1001112,1002381,1003610,1004851,1006098,1007189,1008435,1009417,1010410,1011593,1012814,1013532,1014772,1015953,1017155,1018240,1019515,1020474,1021726,1022604,1023869,1025209,1026477,1027485,1028952,1030266,1031539,1032718,1033882,1034984,1036066,1037357,1038717,1040207,1041332,1042275,1043638,1045012,1045969,1046928,1048252,1049118,1050378,1051454,1052700,1053811,1054472,1055036,1055681,1056845,1058200,1059446,1060671,1061767,1062714,1063996,1065200,1066238,1067364],"sizes":[879,583,499,589,904,635,563,505,579,1051,679,708,746,1013,580,516,589,913,888,540,923,777,775,893,837,808,817,919,822,825,879,845,933,548,754,761,800,728,785,572,519,547,816,1148,1269,1028,989,579,517,586,924,1322,778,951,787,606,573,505,565,510,528,524,539,560,587,506,594,923,1028,1120,1446,980,1371,1151,1177,1274,1351,1156,1266,1259,1139,1263,1271,1394,1433,1336,1338,1079,1234,905,1085,1171,1177,1352,1169,1131,771,1361,1175,1124,1082,1121,1068,691,1082,956,1111,1231,1178,1208,1173,1042,1149,1005,1501,1093,904,1319,1021,1294,1208,1071,1177,1257,1081,1181,1295,1349,1315,1462,1127,1125,1214,1258,1243,951,1100,1248,1323,1188,1382,1038,1378,1036,1281,1203,1115,1158,1148,1068,1207,1161,1125,1208,1430,1130,836,774,731,1064,1076,1191,537,672,596,580,956,1158,1137,1032,1253,1247,1348,1103,1155,1190,1082,1029,346,596,892,538,476,619,510,552,809,1190,1254,1075,625,954,600,544,522,540,671,563,506,579,1060,1072,1549,1212,1220,1345,1002,1203,1128,1118,924,733,775,610,851,1128,818,808,1115,417,1028,826,660,530,645,460,587,627,510,547,741,960,872,651,555,586,489,730,706,819,758,784,847,820,1110,1118,949,1338,1185,1262,1144,1302,1273,1028,1099,1314,1013,830,819,1110,1223,1360,1225,1204,1074,1146,1291,1191,1185,1094,1125,1116,1230,1185,1045,1184,1306,1163,1100,1193,1107,1221,1189,1212,1242,1204,1201,969,1269,1140,922,871,995,1095,504,570,806,563,515,565,1049,1040,885,1027,763,845,924,850,584,500,592,488,574,975,1043,1237,869,898,790,616,771,1020,1053,1202,1129,956,1048,1013,1194,1325,403,768,605,544,398,456,483,471,505,476,563,451,445,467,470,925,945,601,543,562,620,496,578,493,580,975,1105,1152,1120,800,1240,1263,812,673,617,558,807,973,1066,986,1151,917,1128,735,1036,914,1310,1009,1391,780,1173,1396,1138,1261,1083,1136,1120,1127,986,1094,1193,1279,1092,1147,1244,722,1180,1265,1347,1211,930,1402,1227,1147,720,953,1343,1158,1029,967,1219,869,380,1031,705,583,560,595,498,582,1019,1222,1152,1326,933,1148,960,804,795,557,547,591,1132,1318,1316,1237,936,1211,1220,1291,558,975,551,592,577,461,538,596,481,578,989,1380,1223,1209,1228,1144,615,921,557,546,594,538,584,526,583,950,1068,861,912,825,991,528,1024,744,1107,1094,1253,1241,1284,1218,1100,1377,1195,1314,613,890,491,540,585,503,581,874,1041,1253,1371,537,947,557,515,575,520,546,809,1079,1202,602,1135,742,601,609,843,1220,1235,966,1018,1136,812,726,1119,1104,1053,694,882,578,496,582,992,781,1001,723,961,565,506,576,519,548,817,1016,723,959,721,527,584,568,572,506,587,954,1133,1217,1227,1258,1214,1230,1132,1159,1133,1154,1068,1149,1076,991,752,762,772,1138,1205,1216,1170,1324,1242,1208,1328,707,658,947,540,560,550,531,590,498,579,1014,1023,887,1254,1243,1313,1435,1169,1193,598,969,676,530,596,602,502,584,891,1010,1176,1101,1213,1219,1128,1123,1008,1159,1004,522,1009,873,697,628,620,539,556,554,557,501,559,569,515,575,888,933,1149,835,1367,1337,1120,1093,1140,1331,1283,1166,1174,1238,1187,1096,1385,1116,1215,1055,1168,1197,385,602,595,593,513,550,551,535,579,509,535,504,547,517,524,474,472,464,484,493,484,509,437,450,436,462,699,909,562,588,511,571,896,1152,1112,1219,1074,595,966,734,584,625,545,526,569,528,547,735,938,1126,1125,1283,776,893,1071,918,1099,1181,598,1066,1189,757,968,1165,1085,1242,1110,1319,1196,1279,715,727,711,942,1140,1220,1432,1003,1005,862,1405,1218,1244,1079,1200,1050,606,1125,1260,1095,1314,1308,1290,1190,1263,1221,1143,447,947,583,504,578,864,852,674,924,961,995,836,636,729,587,655,615,568,644,781,983,541,587,1055,1127,698,494,488,563,671,935,692,567,577,559,580,627,579,516,590,936,1165,1305,1140,1198,1166,1295,1230,1230,1242,1207,1168,1165,1327,451,619,738,584,951,896,936,595,481,577,988,1237,829,955,540,548,549,719,1081,1268,1396,1215,816,1188,1125,1178,1438,1156,1133,1122,1405,1067,1002,1006,948,869,612,939,841,411,474,481,546,755,1000,1070,1179,1117,1521,1291,1301,1337,1424,1499,1349,1474,1267,1342,1279,1120,1209,1377,1223,1086,1211,1127,1158,1051,1311,1206,1179,1040,1343,1297,1127,1306,1180,1313,1278,1163,1117,1267,1024,1180,1134,1179,981,1163,1081,1255,1281,1245,1188,1260,1149,1067,1190,1061,1116,1276,1216,1135,1337,1280,1249,1160,1132,1017,1290,1141,1148,812,1132,1144,1455,1294,1143,1134,1500,1453,1517,1555,1276,1234,1280,1300,1271,785,951,905,1145,1021,1027,1262,1251,873,1122,1170,1026,1082,1130,1212,833,1166,1248,1207,1135,1207,969,978,1282,1292,1319,1221,1138,1230,1239,1078,1245,1082,1339,1257,1066,930,1007,1005,1221,1240,1052,1192,962,916,688,949,889,979,1157,1098,1080,1104,1193,1073,1152,1392,1090,1215,1292,1381,1258,1389,1294,1110,1201,1215,1097,1362,1225,1244,1159,1163,1414,1412,1159,1284,1182,822,624,1121,974,1331,1182,1045,1153,1044,1121,1187,1084,1214,1183,1070,1128,1103,1190,1047,1435,1422,1444,1033,1264,1182,1229,1281,1038,930,1229,1219,953,1178,1102,1198,1309,1318,1221,1269,1229,1241,1247,1091,1246,982,993,1183,1221,718,1240,1181,1202,1085,1275,959,1252,878,1265,1340,1268,1008,1467,1314,1273,1179,1164,1102,1082,1291,1360,1490,1125,943,1363,1374,957,959,1324,866,1260,1076,1246,1111,661,564,645,1164,1355,1246,1225,1096,947,1282,1204,1038,1126,909],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
            compressedData['data'] = byteArray;
            assert(typeof Module['LZ4'] === 'object', 'LZ4 not present - was your app build with -sLZ4?');
            Module['LZ4'].loadPackage({ 'metadata': metadata, 'compressedData': compressedData }, false);
            Module['removeRunDependency']('datafile_/home/marcopg99/.ciaoroot/v1.22.0-m1/build/site/ciao/build/dist/lpdoc.mods.data');
      };
      Module['addRunDependency']('datafile_/home/marcopg99/.ciaoroot/v1.22.0-m1/build/site/ciao/build/dist/lpdoc.mods.data');

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
    loadPackage({"files": [{"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/bundlereg/lpdoc.bundlecfg", "start": 0, "end": 0}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/bundlereg/lpdoc.bundlereg", "start": 0, "end": 440}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.examples.lpdoc_examples.itf", "start": 440, "end": 8634}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.lib.doccfg.doccfg_doc.itf", "start": 8634, "end": 18795}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.lib.doccfg.doccfg_doc.po", "start": 18795, "end": 27137}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.lib.doccfg.doccfg_props.itf", "start": 27137, "end": 35805}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.lib.doccfg.doccfg_props.po", "start": 35805, "end": 77763}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.lib.doccfg.doccfg_tr.itf", "start": 77763, "end": 87651}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.lib.doccfg.doccfg_tr.po", "start": 87651, "end": 94725}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.lib.lpdoc_http.lpdoc_http_rt.itf", "start": 94725, "end": 103318}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.lib.lpdoc_http.lpdoc_http_rt.po", "start": 103318, "end": 107734}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc.itf", "start": 107734, "end": 138600}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc.po", "start": 138600, "end": 368343}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_aux.itf", "start": 368343, "end": 382623}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_aux.po", "start": 382623, "end": 390772}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_bibrefs.itf", "start": 390772, "end": 410171}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_bibrefs.po", "start": 410171, "end": 450972}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_doctree.itf", "start": 450972, "end": 472964}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_doctree.po", "start": 472964, "end": 606007}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_errors.itf", "start": 606007, "end": 614687}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_errors.po", "start": 614687, "end": 626352}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_filesystem.itf", "start": 626352, "end": 641856}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_filesystem.po", "start": 641856, "end": 707204}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_html.itf", "start": 707204, "end": 728072}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_html.po", "start": 728072, "end": 846233}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_html_assets.itf", "start": 846233, "end": 860842}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_html_assets.po", "start": 860842, "end": 875640}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_html_template.itf", "start": 875640, "end": 884688}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_html_template.po", "start": 884688, "end": 903000}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_images.itf", "start": 903000, "end": 922430}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_images.po", "start": 922430, "end": 935577}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_index.itf", "start": 935577, "end": 953376}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_index.po", "start": 953376, "end": 992994}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_lookup.itf", "start": 992994, "end": 1006896}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_lookup.po", "start": 1006896, "end": 1015748}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_man.itf", "start": 1015748, "end": 1029777}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_man.po", "start": 1029777, "end": 1068558}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_messages.itf", "start": 1068558, "end": 1077712}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_messages.po", "start": 1077712, "end": 1085832}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_nil.itf", "start": 1085832, "end": 1099369}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_nil.po", "start": 1099369, "end": 1103832}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_parse.itf", "start": 1103832, "end": 1121292}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_parse.po", "start": 1121292, "end": 1177207}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_refsdb.itf", "start": 1177207, "end": 1194646}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_refsdb.po", "start": 1194646, "end": 1214382}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_settings.itf", "start": 1214382, "end": 1230215}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_settings.po", "start": 1230215, "end": 1253780}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_state.itf", "start": 1253780, "end": 1283551}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_state.po", "start": 1283551, "end": 1381863}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_structure.itf", "start": 1381863, "end": 1393864}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_structure.po", "start": 1393864, "end": 1404801}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_texinfo.itf", "start": 1404801, "end": 1425257}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.autodoc_texinfo.po", "start": 1425257, "end": 1528492}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.comments.itf", "start": 1528492, "end": 1537144}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.comments.po", "start": 1537144, "end": 1567449}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.doccfg_holder.itf", "start": 1567449, "end": 1572817}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.doccfg_holder.po", "start": 1572817, "end": 1586571}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.docmaker.itf", "start": 1586571, "end": 1609045}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.docmaker.po", "start": 1609045, "end": 1640149}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.docmod_holder.itf", "start": 1640149, "end": 1645309}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.docmod_holder.po", "start": 1645309, "end": 1648728}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.lpdoc_help.itf", "start": 1648728, "end": 1657473}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.lpdoc_help.po", "start": 1657473, "end": 1662625}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.lpdoc_single_mod.itf", "start": 1662625, "end": 1673003}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/build/cache/lpdoc.src.lpdoc_single_mod.po", "start": 1673003, "end": 1684308}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/etc/SETTINGS_DEFAULT.pl", "start": 1684308, "end": 1685160}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/etc/lpdoc-aux.js", "start": 1685160, "end": 1699711}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/etc/lpdoc.css", "start": 1699711, "end": 1735004}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/examples/bar.pl", "start": 1735004, "end": 1735038}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/examples/example_file.pl", "start": 1735038, "end": 1738395}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/examples/example_module.pl", "start": 1738395, "end": 1744382}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/examples/foo.pl", "start": 1744382, "end": 1744389}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/examples/lpdoc_examples.pl", "start": 1744389, "end": 1745588}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/examples/test_math.pl", "start": 1745588, "end": 1748911}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/examples/tmp.pl", "start": 1748911, "end": 1754067}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/lib/doc_module.pl", "start": 1754067, "end": 1754363}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/lib/doccfg/doccfg.pl", "start": 1754363, "end": 1755061}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/lib/doccfg/doccfg_defs.pl", "start": 1755061, "end": 1766998}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/lib/doccfg/doccfg_doc.pl", "start": 1766998, "end": 1767834}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/lib/doccfg/doccfg_props.pl", "start": 1767834, "end": 1776316}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/lib/doccfg/doccfg_tr.pl", "start": 1776316, "end": 1777855}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/lib/lpdoc_http/lpdoc_http.pl", "start": 1777855, "end": 1778903}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/lib/lpdoc_http/lpdoc_http_rt.pl", "start": 1778903, "end": 1779762}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/src/autodoc.pl", "start": 1779762, "end": 1886349}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/src/autodoc_aux.pl", "start": 1886349, "end": 1889500}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/src/autodoc_bibrefs.pl", "start": 1889500, "end": 1902674}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/src/autodoc_doctree.pl", "start": 1902674, "end": 1963722}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/src/autodoc_errors.pl", "start": 1963722, "end": 1964919}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/src/autodoc_filesystem.pl", "start": 1964919, "end": 1983329}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/src/autodoc_html.pl", "start": 1983329, "end": 2020296}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/src/autodoc_html_assets.pl", "start": 2020296, "end": 2024679}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/src/autodoc_html_template.pl", "start": 2024679, "end": 2030824}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/src/autodoc_images.pl", "start": 2030824, "end": 2037079}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/src/autodoc_index.pl", "start": 2037079, "end": 2050353}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/src/autodoc_lookup.pl", "start": 2050353, "end": 2054487}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/src/autodoc_man.pl", "start": 2054487, "end": 2065349}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/src/autodoc_messages.pl", "start": 2065349, "end": 2071949}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/src/autodoc_nil.pl", "start": 2071949, "end": 2073295}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/src/autodoc_parse.pl", "start": 2073295, "end": 2092009}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/src/autodoc_refsdb.pl", "start": 2092009, "end": 2100823}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/src/autodoc_settings.pl", "start": 2100823, "end": 2110106}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/src/autodoc_state.pl", "start": 2110106, "end": 2135141}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/src/autodoc_structure.pl", "start": 2135141, "end": 2138267}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/src/autodoc_texinfo.pl", "start": 2138267, "end": 2181019}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/src/comments.pl", "start": 2181019, "end": 2232604}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/src/doccfg_holder.pl", "start": 2232604, "end": 2233093}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/src/docmaker.pl", "start": 2233093, "end": 2246291}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/src/docmod_holder.pl", "start": 2246291, "end": 2246353}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/src/lpdoc_help.pl", "start": 2246353, "end": 2247843}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/src/lpdoc_single_mod.pl", "start": 2247843, "end": 2254175}, {"filename": "/home/marcopg99/.ciaoroot/v1.22.0-m1/lpdoc/src/version_auto.pl", "start": 2254175, "end": 2254263}], "remote_package_size": 1072369});

  })();