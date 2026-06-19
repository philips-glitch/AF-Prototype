/* Sample data for ASSIST FORWARD prototype — drawn from product screenshots */
window.AF_DATA = (function(){

  const vehicles = [
    {id:"V-187", maker:"トヨタ", model:"ヴェルファイア", grade:"Z プレミア", year:"R8", price:7000000, store:"---", days:0, end:"令和8年12月24日", status:"published", reg:"R8", color:"黒", mileage:"15,000 KM", inspect:4.5, ext:"B/4"},
    {id:"V-184", maker:"ホンダ", model:"フリードスパイク", grade:"G", year:"R8", price:198000, store:"---", days:1, end:"2026/04/09", status:"published", reg:"R8"},
    {id:"V-180", maker:"ダイハツ", model:"タント", grade:"X", year:"R8", price:398000, store:"---", days:1, end:"2026/05/12", status:"published", reg:"R8"},
    {id:"V-175", maker:"スズキ", model:"ワゴンR", grade:"FX", year:"R8", price:128000, store:"三重県", days:3, end:"2026/05/20", status:"published", reg:"R8"},
    {id:"V-173", maker:"トヨタ", model:"シエンタ ハイブリッド", grade:"G", year:"R8", price:2890000, store:"---", days:3, end:"2026/06/01", status:"published", reg:"R8"},
    {id:"V-170", maker:"トヨタ", model:"ハイエースワゴン", grade:"GL", year:"R7", price:4690000, store:"---", days:4, end:"2026/06/04", status:"published", reg:"R7"},
    {id:"V-162", maker:"トヨタ", model:"ハイラックス", grade:"Z", year:"R7", price:5380000, store:"鈴鹿中央通り店", days:6, end:"2026/10/15", status:"draft", reg:"R7"},
    {id:"V-158", maker:"トヨタ", model:"クラウン ハイブリッド", grade:"RS", year:"R6", price:4880000, store:"アップル本店", days:8, end:"2026/04/09", status:"draft", reg:"R6"}
  ];

  const negotiations = [
    {date:"2026/06/01 16:44", veh:"トヨタ クラウン ハイブリッド", vid:"V-158", end:"2026/04/09", endLate:true, seller:"アップル本店", buyer:"黒埼インター店", msgs:1},
    {date:"-", veh:"トヨタ ハイラックス", vid:"V-162", end:"2026/10/15", seller:"鈴鹿中央通り店", buyer:"アップル本店", msgs:0},
    {date:"2026/06/01 16:17", veh:"トヨタ ハイラックス", vid:"V-162", end:"2026/10/15", seller:"鈴鹿中央通り店", buyer:"流山あおぞら店", msgs:2},
    {date:"-", veh:"トヨタ アクア", vid:"V-161", end:"2026/10/13", seller:"黒埼インター店", buyer:"藤沢辻堂店", msgs:0},
    {date:"2026/05/25 17:15", veh:"ホンダ N-ONE", vid:"V-150", end:"2024/08/04", endLate:true, seller:"アップルインターアップルインター", buyer:"流山あおぞら店", msgs:1},
    {date:"-", veh:"トヨタ ライズ", vid:"019D7B9E", end:"2027/07/17", seller:"四日市ときわ店", buyer:"鈴鹿中央通り店", msgs:0}
  ];

  const customers = [
    {name:"テストアルファード", id:"CID-00152", tel:"1111", mail:"-", store:"藤沢辻堂店", sync:"2026/6/9"},
    {name:"テストアルファード", id:"CID-00151", tel:"1111", mail:"-", store:"藤沢辻堂店", sync:"2026/6/9"},
    {name:"テスト", id:"CID-00150", tel:"09000000000", mail:"-", store:"藤沢辻堂店", sync:"2026/6/9"},
    {name:"テストスパイク", id:"CID-00149", tel:"11111111", mail:"-", store:"藤沢辻堂店", sync:"2026/6/8"},
    {name:"あかさたな", id:"CID-00148", tel:"09055683683", mail:"-", store:"流山あおぞら店", sync:"2026/6/8"},
    {name:"テスト 太郎", id:"CID-00147", tel:"090-1234-5678", mail:"info@apple-assist.com", line:"@-", store:"流山あおぞら店", sync:"2026/6/8"},
    {name:"テスト", id:"CID-00146", tel:"09055683683", mail:"info@apple-assist.com", line:"@-", store:"流山あおぞら店", sync:"2026/6/8"},
    {name:"山田 健一", id:"CID-00145", tel:"080-9988-7766", mail:"yamada@example.jp", store:"四日市南店", sync:"2026/6/7"}
  ];

  const stores = [
    {name:"浜松小豆餅店", id:"S-0012", type:"直営", region:"静岡県", tel:"053-437-7711", mail:"h-azukimochi@applenet.co.jp"},
    {name:"流山あおぞら店", id:"S-0011", type:"直営", region:"千葉県", tel:"04-71576670", mail:"nagareyama@applenet.co.jp"},
    {name:"四日市南店", id:"S-0010", type:"直営", region:"三重県", tel:"059-347-3520", mail:"yokkaichi-minami@applenet.co.jp"},
    {name:"アップルインターアップルインター", id:"S-0009", type:"加盟店", region:"北海道", tel:"0852822", mail:"info@apple-assist.com"},
    {name:"黒埼インター店", id:"S-0008", type:"直営", region:"新潟県", tel:"025-233-5553", mail:"kurosaki@applenet.co.jp"},
    {name:"LGQ STORE", id:"S-0007", type:"直営", region:"愛知県", tel:"85151551", mail:"logique@gmail.co.id"},
    {name:"LOGIQUE1号店", id:"S-0006", type:"加盟店", region:"宮崎県", tel:"000000000", mail:"otoiawase@logique.co.id"},
    {name:"鈴鹿中央通り店", id:"S-0005", type:"直営", region:"三重県", tel:"0593815522", mail:"suzuka@applenet.co.jp"}
  ];

  const storeUsers = [
    {name:"服部 真也", handle:"@_hattori", store:"四日市南店", last:"2026/06/09 15:32", hue:28},
    {name:"阿部 涼太", handle:"@_aberyou", store:"鈴鹿中央通り店", last:"-", hue:355},
    {name:"樹木 優太", handle:"@_uzki", store:"鈴鹿中央通り店", last:"2026/06/04 17:09", hue:200},
    {name:"平木 健太郎", handle:"@_hiraki", store:"鈴鹿中央通り店", last:"2026/06/06 12:56", hue:265},
    {name:"大原", handle:"@m_oohara", store:"流山あおぞら店", last:"2026/06/08 17:48", hue:150},
    {name:"島津", handle:"@k_shimazu", store:"流山あおぞら店", last:"2026/06/08 18:27", hue:48},
    {name:"髙木 幹也", handle:"@_takagi", store:"藤沢辻堂店", last:"2026/06/02 17:05", hue:18},
    {name:"長橋 優星", handle:"@y_nagahashi", store:"藤沢辻堂店", last:"2026/06/09 11:11", hue:300}
  ];

  const adminUsers = [
    {name:"OPERATION ADMIN", handle:"@operationadmin", role:"OPERATIONS ADMINISTRATOR", mail:"operationadmin@assist-forward.com", last:"2026/05/12 16:05"},
    {name:"REGIONAL ADMIN", handle:"@regionaladmin", role:"REGIONAL ADMINISTRATOR", mail:"regionaladmin@assist-forward.com", last:"2026/05/12 16:05"},
    {name:"SUPER ADMIN", handle:"@superadmin", role:"HEADQUARTERS ADMINISTRATOR", mail:"superadmin@assist-forward.com", last:"2026/06/10 11:35"}
  ];

  const masterReview = [
    {spec:"20302", cls:"5007", maker:"スバル", model:"レヴォーグ", grade:"STI スポーツ R EX", date:"2026/06/08 17:51", by:"019e87a6-aadf-7f6c-a79a-4...", veh:"V-183", vin:"VNH-002378"},
    {spec:"17698", cls:"0007", maker:"トヨタ", model:"ヴォクシー ハイブリッド", grade:"ハイブリッド", date:"2026/06/06 08:43", by:"019e5e66-df5-7c1c-a949-4...", veh:"V-171", vin:"ZWR80-0396528"},
    {spec:"18787", cls:"0006", maker:"スズキ", model:"ジムニーシエラ", grade:"JC", date:"2026/05/27 16:07", by:"019e68a7-d731-7dd1-9527-...", veh:"V-154", vin:"JB74W-195698"},
    {spec:"19841", cls:"0056", maker:"いすゞ", model:"エルフ", grade:"100 1.15T Wキャブ フルスーパーロー", date:"2026/05/07 22:00", by:"019d703b-e1a5-7fd1-bc29-...", veh:"", vin:"TRJ150-0143926"},
    {spec:"20755", cls:"0002", maker:"トヨタ", model:"クラウンスポーツ", grade:"Z", date:"2026/05/07 14:07", by:"019db83d-91e3-7fcc-928f-2...", veh:"", vin:"AZSH36-4006524"},
    {spec:"19114", cls:"0215", maker:"三菱", model:"デリカ D:5", grade:"@ナビ", date:"2026/05/06 15:21", by:"019d9533-dec1-72af-9a8e-c...", veh:"", vin:"CV1W-4000335"},
    {spec:"20531", cls:"0007", maker:"レクサス", model:"レクサス RX350h", grade:"+スタイル クール ターボ ホンダセンシング", date:"2026/05/06 15:02", by:"019d9533-dec1-72af-9a8e-c...", veh:"", vin:"AALH10-1001945"},
    {spec:"20531", cls:"0007", maker:"レクサス", model:"レクサス RX350h", grade:"VERSION L", date:"2026/05/06 13:39", by:"019d703b-e1a5-7fd1-bc29-...", veh:"", vin:"AALH10-1001945"},
    {spec:"20531", cls:"0007", maker:"レクサス", model:"レクサス RX350h", grade:"X", date:"2026/05/06 09:59", by:"019d703b-e1a5-7fd1-bc29-...", veh:"", vin:"AALH10-1001945"}
  ];

  const afInspect = [
    {plate:"B 1233 XY", veh:"BMW BMW 120i", vyear:"2025", body:"セダン", pass:1, fail:0, na:3, un:36, status:"完了", date:"2026/06/05"},
    {plate:"X 7782 QW", veh:"クライスラー クライスラー グランドボイジャー3300N", vyear:"", body:"ミニバン", pass:1, fail:0, na:2, un:37, status:"完了", date:"2026/05/15"},
    {plate:"湘南 300 あ 12-34", veh:"トヨタ ヴェルファイア", vyear:"2024", body:"ミニバン", pass:28, fail:2, na:4, un:6, status:"完了", date:"2026/06/01"},
    {plate:"三重 500 さ 56-78", veh:"スズキ ワゴンR", vyear:"2021", body:"軽自動車", pass:31, fail:1, na:3, un:5, status:"処理中", date:"2026/06/03"},
    {plate:"千葉 330 か 90-12", veh:"ホンダ フリードスパイク", vyear:"2019", body:"ミニバン", pass:24, fail:4, na:5, un:7, status:"保留中", date:"2026/06/06"}
  ];

  const storeSearch = [
    {id:"V-238", maker:"日産", model:"フーガ ハイブリッド", reg:"R8", price:1200000, status:"商談中"},
    {id:"V-237", maker:"ホンダ", model:"N BOX", reg:"R10", price:1090000, status:"商談中"},
    {id:"V-236", maker:"ホンダ", model:"N BOX", reg:"R8", price:830000, status:"商談中"},
    {id:"V-235", maker:"ホンダ", model:"N-ONE", reg:"R8", price:1830000, status:"商談中"},
    {id:"V-234", maker:"トヨタ", model:"アクア", reg:"R8", price:300000, status:"商談中"},
    {id:"V-233", maker:"スズキ", model:"ハスラー", reg:"R8", price:700000, status:"商談中"},
    {id:"V-231", maker:"ダイハツ", model:"ロッキー", reg:"R7", price:1680000, status:"掲載中"},
    {id:"V-229", maker:"トヨタ", model:"ヤリス クロス", reg:"R7", price:2280000, status:"掲載中"}
  ];

  const storeListings = [
    {id:"V-198", maker:"", model:"テスト", loc:"東京都", price:0, days:4, end:"0", state:"draft", noimg:true},
    {id:"V-189", maker:"日産", model:"フーガ", loc:"", price:250000, days:5, end:"40", state:"live"},
    {id:"V-177", maker:"TEST", model:"ヴィッツ", loc:"東京都", price:0, days:8, end:"0", state:"draft", noimg:true},
    {id:"V-176", maker:"BMW", model:"BMW 4シリーズ", loc:"", price:3850000, days:10, end:"expired", state:"live"},
    {id:"V-158", maker:"トヨタ", model:"クラウン ハイブリッド", loc:"", price:400000, days:12, end:"3", state:"live"},
    {id:"V-154", maker:"スズキ", model:"ジムニーシエラ", loc:"", price:2600000, days:2, end:"58", state:"live"}
  ];

  const storeActivity = [
    {id:"V-189", name:"日産 フーガ", price:"¥25万円", inq:0},
    {id:"V-176", name:"BMW BMW 4シリーズ", price:"¥385万円", inq:0},
    {id:"V-158", name:"トヨタ クラウン ハイブリッド", price:"¥40万円", inq:0},
    {id:"V-154", name:"スズキ ジムニーシエラ", price:"¥260万円", inq:0}
  ];

  const storeDeals = [
    {id:"V-158", name:"トヨタ クラウン ハイブリッド", store:"黒埼インター店", date:"2026/06/01 16:44", msg:"興味あります", end:"2026/04/09", price:400000, status:"商談中"}
  ];

  const storeStaff = [
    {name:"store staff1", handle:"@store_staff1", last:"2026/05/15 09:39", hue:24}
  ];

  return {vehicles, negotiations, customers, stores, storeUsers, adminUsers, masterReview, afInspect,
          storeSearch, storeListings, storeActivity, storeDeals, storeStaff};
})();
