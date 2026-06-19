/* ASSIST FORWARD — bilingual (JA → EN) runtime translation layer.
   Walks text nodes / placeholders / readonly values under <body> and swaps
   Japanese for English using DICT. Survives React re-renders via MutationObserver.
   Emails (contain "@") and pure numbers are never matched. */
(function(){
  const DICT = {
    /* shell / brand / topbar */
    "ネットワーク内流通＆委託販売管理":"In-Network Distribution & Consignment Sales",
    "ネットワーク内流通 ＆ 委託販売管理":"In-Network Distribution & Consignment Sales",
    "ログアウト":"Log out", "接続済み":"Connected", "本部":"HQ",
    "アップル本部":"Apple HQ", "アップル本店":"Apple Main Store",
    "アップル本店 — 1名のスタッフ":"Apple Main Store — 1 staff",
    "システム管理":"System Administration", "概要":"Overview",
    "仕入れ（買い）業務":"Procurement (Buy)", "出品（売り）業務":"Listing (Sell)",
    "契約業務":"Contracts", "電子契約":"E-Contracts", "店舗スタッフ管理":"Store Staff",
    "日本語":"Japanese",

    /* nav */
    "ダッシュボード":"Dashboard", "車両一覧":"Vehicles", "応札・商談管理":"Bids & Negotiations",
    "顧客管理":"Customers", "店舗マスタ管理":"Store Master", "店舗ユーザー管理":"Store Users",
    "アドミンユーザー":"Admin Users", "マスタデータレビュー":"Master Data Review",
    "AFインスペクト":"AF Inspect", "電子契約管理":"E-Contract Management",
    "車両検索":"Vehicle Search", "お気に入り":"Favorites", "問合せ履歴":"Inquiries",
    "出品管理":"My Listings", "商談履歴":"Deal History",

    /* login */
    "ログイン":"Log in", "店舗コード":"Store Code", "ユーザー名":"Username",
    "パスワード":"Password", "例: S-XXXX":"e.g. S-XXXX",
    "本部 (HQ)":"HQ", "加盟店 (STORE)":"Franchise (STORE)", "プライバシーポリシー":"Privacy Policy",

    /* HQ dashboard */
    "本部ダッシュボード":"HQ Dashboard", "ネットワーク内 全体稼働状況":"Network-wide activity overview",
    "総出品台数":"Total Listings", "進行中の商談":"Active Negotiations",
    "今月の流通総額":"This Month's Volume", "成約率":"Close Rate",
    "平均成約価格トレンド":"Average Sale Price Trend",

    /* vehicle list */
    "ネットワーク車両全件管理":"All Network Vehicles", "型式番号":"Model code",
    "キーワード（車名・ID）で検索...":"Search by name or ID...",
    "新着順":"Newest", "掲載期間":"Listing period", "すべて表示":"Show all",
    "所在地":"Location", "都道府県すべて":"All prefectures", "メーカー":"Maker",
    "メーカーすべて":"All makers", "出品店舗":"Listing store", "店舗すべて":"All stores",
    "商談ステータス":"Deal status", "状態すべて":"All statuses", "写真":"Photo",
    "出品価格":"List Price", "掲載日数 / 終了まで":"Days listed / remaining",
    "通知":"Alerts", "状態":"Status", "ステータス":"Status", "車両":"Vehicle",
    "操作":"Actions", "詳細":"Details",
    "掲載中":"Listed", "商談中":"In talks", "成約":"Sold", "掲載終了":"Listing end",
    "経過:":"Elapsed:", "詳細を表示":"View details",

    /* vehicle detail */
    "車両詳細":"Vehicle Detail", "展開図を表示":"View diagram", "車両概要":"Overview",
    "査定 / 出品情報詳細":"Appraisal / Listing", "顧客(OWNER)管理":"Owner",
    "AI検査レポート":"AI Report", "AI 検査レポート":"AI Inspection Report",
    "車両基本情報":"Basic Vehicle Info", "モデル":"Model", "グレード":"Grade",
    "年式":"Year", "カラー":"Color", "色":"Color", "走行距離":"Mileage",
    "修理歴":"Repair history", "なし":"None", "あり":"Yes", "掲載終了日時":"Listing end",
    "プロ検査・評価":"Pro Inspection & Rating", "内装/外装":"Int/Ext", "臭い":"Odor",
    "車検証 抜粋詳細":"Inspection Certificate Details", "初度登録年月":"First registration",
    "車検満了日":"Inspection expiry", "型式":"Model code", "型式指定番号":"Type designation no.",
    "類別区分番号":"Category no.", "乗車定員":"Seating capacity", "車台番号":"Chassis no.",
    "排気量":"Displacement", "原動機の型式":"Engine model", "車両PR・備考":"Vehicle PR / Notes",
    "特記事項はありません。":"No special notes.", "取扱説明書":"Owner's manual",
    "保証書・整備手帳":"Warranty / service book", "スペアキー":"Spare key",
    "サンルーフ":"Sunroof", "革シート":"Leather seats", "カーナビ":"Car navigation",
    "ナビ":"Navigation", "後席モニター":"Rear monitor", "衝突安全装置":"Collision safety",
    "緊急通報装置":"Emergency call system", "エアロ":"Aero kit", "エアロパーツ":"Aero parts",
    "安全装備":"Safety equipment", "新しいタブで開きます":"Opens in a new tab",
    "インタラクティブ3Dレポートを開く":"Open interactive 3D report",
    "USS点":"USS pts", "基本写真":"Basic Photos", "AI詳細撮影":"AI Detail Shots",
    "追加登録":"Additional", "アクセスエボリューションエアロ　トラスト車高調　ZEESマフラー":"Access Evolution aero · Trust coilovers · ZEES muffler",

    /* assessment tab */
    "査定記録・履歴の蓄積":"Appraisal Records & History", "最終更新":"Last updated",
    "最終更新 2026/6/9 17:45":"Last updated 2026/6/9 17:45",
    "新規 最終査定額を記録":"Record new final appraisal", "査定日時":"Date",
    "査定者":"Appraiser", "最終査定額":"Final appraisal", "APPLE査定":"APPLE Appraisal",
    "出品情報を更新":"Update Listing", "出品価格（税込）":"List price (incl. tax)",
    "収益分析":"Profit Analysis", "差額査定額":"Appraised amount", "現在出品価格":"Current list price",
    "想定収益見込":"Estimated profit", "AF AI査定":"AF AI Appraisal",
    "オークション相場参照":"Auction market ref.", "推定出品金レンジ":"Estimated price range",
    "市場相場参照":"Market Reference", "比較リストを表示":"Show comparison list",
    "下限値":"Lower", "上限値":"Upper", "出回り年式":"Common years",
    "2020–2024 ・ 0.8–3.5万km ・ excellent":"2020–2024 · 8k–35k km · excellent",
    "インタラクティブ・レポート":"Interactive Report", "AI判定リファレンス":"AI Judgment Reference",
    "AI判定ロジック結果":"AI judgment result",

    /* negotiation / chat */
    "全店舗間の商談ステータスとメッセージのモニタリングを行います。":"Monitor deal status and messages across all stores.",
    "車両名、出品店舗、商談申込店で検索...":"Search by vehicle, listing store, or applicant store...",
    "メッセージ新着順":"Latest message", "最新メッセージ":"Latest message",
    "車両情報 / 掲載終了":"Vehicle / Listing end", "商談申込店":"Applicant store",
    "メッセージ数":"Messages", "メッセージを閲覧":"View messages", "終了:":"Ends:",
    "本部モニタリングモード ・ CONV-ID: BD7F50E5":"HQ Monitoring Mode · CONV-ID: BD7F50E5",
    "出品店 (売リ手): 019400AA...":"Seller (listing): 019400AA...",
    "商談申込店 (買い手): 019D7BC2...":"Buyer (applicant): 019D7BC2...",
    "オンライン":"Online", "興味あります":"I'm interested", "販売者":"Seller",
    "閲覧のみ - 管理者はこの会話に参加できません":"View only — admins cannot join this chat",
    "6月1日月曜日":"Monday, June 1",

    /* customers */
    "顧客管理":"Customers",
    "車両の委託者（一般顧客）の情報を一元管理します。":"Centrally manage vehicle consignors (end customers).",
    "新規顧客登録":"Add Customer", "顧客名、ID、連絡先、LINE IDで検索...":"Search by name, ID, contact, or LINE ID...",
    "氏名 / 顧客ID":"Name / Customer ID", "連絡先 / LINE":"Contact / LINE",
    "担当店舗":"Store", "最終同期":"Last sync",

    /* stores */
    "店舗マスタ管理":"Store Master",
    "ネットワークに加盟している店舗情報の閲覧・編集を行います。":"View and edit franchise store information.",
    "新規店舗登録":"Add Store", "店舗名、住所、電話番号で検索...":"Search by store name, address, or phone...",
    "店舗情報 / ID":"Store / ID", "種別":"Type", "連絡先":"Contact",
    "直営":"Direct", "加盟店":"Franchise",

    /* store users / admin */
    "各店舗に紐づくスタッフのアカウント管理を行います。":"Manage staff accounts linked to each store.",
    "新規ユーザー登録":"Add User", "ID、氏名、または店舗名で検索...":"Search by ID, name, or store...",
    "ユーザー名 / ID":"Username / ID", "所属店舗":"Store", "最終ログイン":"Last login",
    "編集":"Edit", "アドミンユーザー管理":"Admin User Management",
    "本部システム管理権限を持つユーザーの管理を行います。":"Manage users with HQ system admin privileges.",
    "新規管理者登録":"Add Admin", "名前 / ID":"Name / ID", "権限レベル":"Role",
    "メールアドレス":"Email", "全 3 名 | ページ 1 / 1":"3 users | Page 1 / 1",
    "全1件中 1/1ページ":"1 of 1 | Page 1/1",
    /* form modals */
    "ユーザーアカウント 登録・編集":"User Account · Register / Edit",
    "店舗情報の登録・編集":"Store Info · Register / Edit",
    "表示名":"Display name", "ユーザーID":"User ID", "アップル太郎":"Apple Taro",
    "パスワード確認":"Confirm password", "もう一度入力":"Re-enter",
    "8文字以上、大文字・小文字・数字・記号を含む":"8+ chars, incl. upper/lowercase, number & symbol",
    "権限ロール":"Permission role", "選択してください":"Please select",
    "注: 管理者アカウントには全店舗のデータ閲覧権限が付与されます。":"Note: Admin accounts are granted view access to all store data.",
    "所属店舗":"Assigned store", "注: ユーザーIDはシステム内で重複できません。":"Note: User IDs must be unique within the system.",
    "店舗名":"Store name", "運営会社":"Operating company", "アップル〇〇店":"Apple ○○ Store",
    "株式会社〇〇":"○○ Co., Ltd.", "電話番号":"Phone", "保存する":"Save",
    "アバターを再生成":"Regenerate avatar",
    "注: 登録された店舗メールアドレスは、システム通知や委託販売のアラート送信に使用されます。":"Note: The registered store email is used for system notifications and consignment-sale alerts.",
    /* staff form + profile menu */
    "新規スタッフ登録":"Register New Staff", "スタッフを登録":"Register Staff",
    "ユーザー名（ID）":"Username (ID)", "例：田中 花子":"e.g. Tanaka Hanako",
    "例：tanaka01":"e.g. tanaka01", "プロフィール詳細":"Profile Details",
    "アカウント詳細":"Account Details", "アカウントID":"Account ID",
    "所属店舗 ID":"Store ID", "アップルインターアップルインター":"Apple Inter Apple Inter",
    "本部 (HQ)":"HQ",
    "システム利用開始: 2026/04/16":"Member since: 2026/04/16",
    "システム利用開始: 2025/11/01":"Member since: 2025/11/01",
    "システム利用開始:":"Member since:", "システム利用開始":"Member since",

    /* master review */
    "ユーザーから申請された車両グレードをマスタ登録前に審査します。":"Review user-submitted vehicle grades before master registration.",
    "申請中":"Pending", "承認済み":"Approved", "却下":"Rejected",
    "型式指定 / 類別区分":"Type / Category", "メーカー / 車種":"Maker / Model",
    "申請グレード":"Submitted grade", "申請日時":"Submitted", "登録車両":"Vehicle", "申請者:":"By:",

    /* AF inspect */
    "AFインスペクトモバイルアプリからの車両検査データ":"Vehicle inspection data from the AF Inspect mobile app",
    "検査総数":"Total Inspections", "今月の完了数":"Completed This Month",
    "保留中・処理中":"Pending / Processing", "平均合格率":"Avg. Pass Rate",
    "日別検査数":"Inspections by Day", "過去30日":"Last 30 days", "ステータス内訳":"Status Breakdown",
    "全検査":"All", "保留中":"On hold", "処理中":"Processing", "完了":"Done",
    "ナンバー・メーカー・モデルで検索":"Search by plate, maker, or model",
    "すべてのステータス":"All statuses", "ボディタイプ":"Body type",
    "すべてのボディタイプ":"All body types", "開始日":"Start date", "終了日":"End date",
    "ナンバー":"Plate", "ボディ":"Body", "ポイント（合/不/判/未）":"Points (Pass/Fail/NA/None)",
    "登録日":"Date", "合格 不合格 判別不能 未撮影":"Pass · Fail · N/A · Not shot",
    "セダン":"Sedan", "ミニバン":"Minivan", "軽自動車":"Kei car",

    /* store dashboard */
    "加盟店ダッシュボード":"Franchise Dashboard",
    "ようこそ、SELLER STAFF 1 様 (アップル本店)":"Welcome, Seller Staff 1 (Apple Main Store)",
    "仕入れ / 入札":"Procurement / Bids", "交渉中":"In Negotiation",
    "仕入れ / お気に入り":"Procurement / Favorites", "ウォッチ":"Watching",
    "出品 / 在庫":"Listing / Inventory", "自社在庫":"Own Inventory",
    "出品 / 委託":"Listing / Consignment", "委託販売中":"On Consignment",
    "出品 / 成約":"Listing / Sales", "今月の売上":"Sales This Month",
    "仕入れアクティビティ":"Procurement Activity", "入札・ウォッチリスト":"Bids & Watchlist",
    "すべて見る":"View all", "自社出品・委託アクティビティ":"Own Listings & Consignment",
    "出品中/委託中の車両":"Listed / consigned vehicles", "管理する":"Manage",
    "新規下書きを作成":"Create new draft", "成約パフォーマンス":"Sales Performance",
    "売上":"Sales", "手数料":"Commission", "問い合わせ":"inquiries",

    /* search / buyer detail */
    "在庫確認・問い合わせ":"Check stock & inquire", "掲載終了 7日 後":"Ends in 7 days",
    "ベースグレード":"Base grade",

    /* favorites */
    "お気に入り車両":"Favorite Vehicles", "登録順":"Date added",
    "0 車両をウォッチ中":"Watching 0 vehicles", "出品金額":"List price",
    "掲載ステータス":"Listing status", "ウォッチリストに車両がありません":"No vehicles in your watchlist",
    "検索リストから車両を追加してください。":"Add vehicles from the search list.",
    "在庫を探索する":"Explore inventory",

    /* inquiries (buyer) */
    "あなたが問い合わせた車両の交渉状況とメッセージ履歴です。":"Negotiation status and message history for vehicles you've inquired about.",
    "車両名、ID、またはやり取りした内容で検索...":"Search by vehicle, ID, or message content...",
    "最終メッセージ日付":"Last message date", "掲載終了日付":"Listing end date",
    "問合せ履歴が見つかりません":"No inquiry history found", "問合せ履歴の利用について":"About inquiry history",

    /* inventory */
    "自社出品・在庫管理":"My Listings & Inventory", "新規車両登録":"Register Vehicle",
    "掲載管理・通知メール送信ルール":"Listing & Notification Email Rules",
    "終了まで:":"Remaining:", "掲載終了済":"Listing ended", "下書き":"Draft",
    "掲載する":"Publish", "再開":"Resume",
    "経過日数(1/3/6ヶ月)および掲載終了前(1ヶ月/1週間/1日前)のタイミングで、":"At elapsed-day milestones (1/3/6 months) and before listing end (1 month / 1 week / 1 day),",
    "店舗の代表アドレス宛":"to the store's representative address",
    "に自動通知メールが送信されます。":" an automatic notification email is sent.",

    /* deals (store) */
    "商談・問い合わせ履歴":"Deals & Inquiries",
    "受信および送信した商談メッセージの一覧です。":"List of received and sent negotiation messages.",
    "車両名、ID、メッセージ内容で検索...":"Search by vehicle, ID, or message content...",
    "最新メッセージ日時":"Latest message", "商談履歴のモニタリングについて":"About deal monitoring",
    "商談はすべて ASSIST FORWARD 本部によってモニタリングされています。トラブル防止のため、直接の取引や連絡先の交換は行わないでください。":"All deals are monitored by ASSIST FORWARD HQ. To prevent trouble, do not conduct direct transactions or exchange contact details.",
    "メッセージの内容が規約に抵触する場合、アカウントが停止される可能性があります。":"If message content violates the terms, the account may be suspended.",
    "商談相手とのやり取りは ASSIST FORWARD がモニタリングしています。店名、個人名、直接の連絡先の交換は固く禁じられています。":"ASSIST FORWARD monitors all communication with counterparties. Exchanging store names, personal names, or direct contacts is strictly prohibited.",
    "成約に至った場合は、本プラットフォーム上で成約報告を行ってください。":"If a deal closes, report the closing on this platform.",

    /* store staff */
    "スタッフを追加":"Add Staff", "氏名・ユーザー名で検索...":"Search by name or username...",
    "ユーザー":"User", "有効":"Active",

    /* common buttons */
    "戻る":"Back", "次へ進む":"Next", "次へ":"Next", "下書き保存":"Save draft",
    "一時保存":"Save", "撮影・選択":"Capture / Select", "撮影済み":"Captured",
    "済み":"Done", "開く":"Open", "PDF出力":"Export PDF", "選択":"Select",
    "都道府県":"Prefecture", "都道府県すべて":"All prefectures",

    /* vehicle registration wizard */
    "新車車両登録":"New Vehicle Registration", "ウィザード":"Wizard",
    "1. 顧客情報の登録":"1. Customer Registration",
    "外部システム (COCO/ADB) 連携、または新規顧客として登録します。":"Link an external system (COCO/ADB) or register as a new customer.",
    "顧客ID (自動採番)":"Customer ID (auto)", "自動採番されます":"Auto-numbered",
    "顧客名":"Customer name", "電話番号":"Phone", "住所":"Address",
    "市区町村、番地、建物名など":"City, address, building, etc.",
    "2. 車両情報の入力":"2. Vehicle Information",
    "車検証のアップロードまたは撮影により、車両スペックを自動入力します。":"Upload or photograph the inspection certificate to auto-fill the vehicle specs.",
    "自動車検査証.jpg":"inspection_certificate.jpg",
    "OCR自動読み取り項目 (車検証情報)":"OCR auto-read items (inspection certificate)",
    "マスタ照合済み":"Master matched", "その他入力項目":"Other Input Items",
    "車名":"Model", "外装色":"Exterior color", "走行距離 (KM)":"Mileage (km)",
    "取扱説明書あり":"Owner's manual included", "保証書・整備手帳あり":"Warranty / service book included",
    "スペアキーあり":"Spare key included", "総排気量/定格出力":"Displacement / rated output",
    "特記事項、PRポイントなどを入力...":"Enter notes, PR points, etc...",
    "3. 車両写真登録":"3. Vehicle Photos", "ガイドに従って各部位を撮影してください。":"Photograph each part following the guide.",
    "右斜め前":"Front-right 3/4", "右斜め後ろ":"Rear-right 3/4", "左斜め後ろ":"Rear-left 3/4",
    "左斜め前":"Front-left 3/4", "運転席":"Driver's Seat", "コントロールパネル":"Control Panel",
    "4. AIモード写真撮影":"4. AI-Mode Photos",
    "修復歴判定AIのための詳細写真をガイドに沿って全40箇所撮影します。":"Capture all 40 detail photos along the guide for the repair-history AI.",
    "/ 40 箇所 撮影済み":"/ 40 captured",
    "ボンネット ヒンジ部分（ボルト）":"Hood hinge (bolt)", "ボンネット ヒンジ部分（ボルト）2":"Hood hinge (bolt) 2",
    "ボンネット エンジンルーム側（ボルト）":"Hood engine-bay side (bolt)", "ボンネット エンジンルーム側（ボルト）2":"Hood engine-bay side (bolt) 2",
    "右Fドア（ボルト）":"Right front door (bolt)", "右Fドア（ボルト）2":"Right front door (bolt) 2",
    "右Fドア（ボルト）3":"Right front door (bolt) 3", "右Fドア（ボルト）4":"Right front door (bolt) 4",
    "右Rドア（ボルト）":"Right rear door (bolt)", "右Rドア（ボルト）2":"Right rear door (bolt) 2",
    "左Fドア（ボルト）":"Left front door (bolt)", "左Fドア（ボルト）2":"Left front door (bolt) 2",
    "左Rドア（ボルト）":"Left rear door (bolt)", "左Rドア（ボルト）2":"Left rear door (bolt) 2",
    "トランク ヒンジ（ボルト）":"Trunk hinge (bolt)", "トランク ヒンジ（ボルト）2":"Trunk hinge (bolt) 2",
    "フロントバンパー 接合部":"Front bumper joint", "リアバンパー 接合部":"Rear bumper joint",
    "右クォーターパネル":"Right quarter panel", "右クォーターパネル2":"Right quarter panel 2",
    "左クォーターパネル":"Left quarter panel", "左クォーターパネル2":"Left quarter panel 2",
    "ルーフ 右レール":"Roof (right rail)", "ルーフ 左レール":"Roof (left rail)",
    "フロントガラス 下部":"Windshield (lower)", "リアガラス 下部":"Rear glass (lower)",
    "右サイドシル":"Right side sill", "左サイドシル":"Left side sill",
    "エンジン 型式プレート":"Engine model plate", "車台番号 刻印":"Chassis no. stamp",
    "右Fフェンダー 内側":"Right front fender (inner)", "左Fフェンダー 内側":"Left front fender (inner)",
    "ラジエーターコアサポート":"Radiator core support", "右フロントピラー":"Right front pillar",
    "左フロントピラー":"Left front pillar", "右センターピラー":"Right center pillar",
    "左センターピラー":"Left center pillar", "トランクフロア":"Trunk floor",
    "スペアタイヤハウス":"Spare tire well", "フロアパネル 中央":"Floor panel (center)",
    "5. 検査・評価入力":"5. Inspection & Rating", "車両の検査結果を入力します。":"Enter the vehicle inspection results.",
    "修復歴 (手入力)":"Repair history (manual)", "総合評価点 (USS基準)":"Overall Rating (USS standard)",
    "内装評価 (A-D)":"Interior Rating (A-D)", "外装評価 (5.0 - 3.0)":"Exterior Rating (5.0 - 3.0)",
    "展開図を取り込む":"Import diagram",
    "6. 査定":"6. Appraisal", "各種参考データを確認し、最終的な査定額を決定します。":"Review the reference data and decide the final appraisal.",
    "APPLE査定結果":"APPLE Appraisal Result", "システムから取得":"Fetch from system",
    "参考査定金額 (円)":"Reference appraisal (JPY)", "オークションDB連携中":"Linking auction DB",
    "算出査定レンジ":"Calculated appraisal range", "市場価格参照":"Market Price Reference",
    "最終査定額決定 (売却下限額)":"Final Appraisal Decision (Floor Price)",
    "参考データを踏まえ、オーナーへの支払額を確定してください。":"Based on the reference data, confirm the payment amount to the owner.",
    "決定査定金額 / オーナー手取 (円)":"Final appraisal / owner net (JPY)", "本部 査定員A":"HQ Appraiser A",
    "査定日":"Appraisal date",
    "7. 出品・委託設定":"7. Listing & Consignment", "掲載条件と販売価格を設定して完了です。":"Set the listing terms and sale price to finish.",
    "委託販売の場合、長期掲載が一般的です。デフォルトは1年後ですが、オーナーと相談の上決定してください。":"For consignment sales, long listings are common. The default is one year, but decide in consultation with the owner.",
    "委託・掲載通知ルール":"Consignment & Listing Notification Rules",
    "掲載開始から 1ヶ月 / 3ヶ月 / 6ヶ月 ごとに店舗代表アドレスへ通知":"Notify the store representative address at 1, 3, and 6 months after listing start",
    "掲載終了の 1ヶ月前 / 1週間前 / 1日前 に最終リマインド通知":"Final reminders 1 month / 1 week / 1 day before listing end",
    "※これらをトリガーに、オーナー（委託者）へのフォローコールを行ってください。":"※ Use these as triggers to make follow-up calls to the owner (consignor).",
    "委託利益シミュレーター":"Consignment Profit Simulator", "オーナー希望/確定査定額":"Owner ask / confirmed appraisal",
    "設定 販売価格":"Set sale price", "設定店舗収益 (成約時)":"Set store profit (on close)", "利益率":"Margin",
    "販売価格は市場データと査定額を参考に、店舗利益と売却のしやすさのバランスを見て決定してください。":"Set the sale price by balancing store profit and sale ease, referencing market data and the appraisal.",
    "出品を開始する":"Start Listing",
    "修復歴":"Repair history", "改造歴":"Modification history", "水没歴":"Flood history",
    "冠水・ひょう害歴":"Flood / hail history", "メーター改ざん":"Odometer tampering",
    "メーター交換":"Odometer replacement", "不具合・故障箇所":"Defects / faults",
    "自動車税の未納":"Unpaid automobile tax", "駐車違反金の未納":"Unpaid parking fines",

    /* e-contract list & detail */
    "ネットワーク全体の電子契約を一元管理します。 (法定保管 7年)":"Centrally manage e-contracts across the network. (7-yr legal retention)",
    "店舗の電子契約の作成・署名状況を管理します。":"Manage the store's e-contract creation and signing status.",
    "契約書を作成":"Create Contract", "契約書 総数":"Total Contracts",
    "署名待ち":"Awaiting signature", "本部承認待ち":"Pending HQ Approval",
    "署名済 (完了)":"Signed (complete)", "一部署名済":"Partially signed",
    "書類番号、車両、当事者で検索...":"Search by document no., vehicle, or party...",
    "作成日 新しい順":"Newest first", "すべて":"All",
    "買取契約書":"Purchase Agreement", "委託販売":"Consignment", "委託販売契約書":"Consignment Agreement",
    "発注書・請求書":"Order / Invoice", "発注請求":"Order/Invoice", "確認書":"Confirmation",
    "買取":"Purchase", "委託":"Consignment",
    "書類番号":"Document No.", "契約種別":"Type", "車両 / 当事者":"Vehicle / Party",
    "当事者 (売主 → 買主)":"Parties (Seller → Buyer)", "契約金額":"Contract amount", "7年保管":"7-yr retention",
    "B2C ・ 顧客 → 加盟店":"B2C · Customer → Franchise",
    "B2B ・ 加盟店 → 本部 → 加盟店":"B2B · Franchise → HQ → Franchise",
    "B2B ・ 本部 → 加盟店":"B2B · HQ → Franchise", "引渡時 ・ 支払額確定":"At handover · payment finalized",
    "メーカー / 車名":"Maker / Model", "登録番号":"Reg. number", "年式 / 走行":"Year / Mileage",
    "売主（お客様）情報 ・ 所有者/使用者":"Seller (Customer) Info · Owner/User",
    "氏名":"Name", "生年月日":"Date of birth", "連絡先":"Contact",
    "所有者 (車検証OCR)":"Owner (cert OCR)", "使用者 (車検証OCR)":"User (cert OCR)",
    "告知事項（売主申告）":"Declarations (Seller)", "確認済":"Confirmed",
    "支払い内訳":"Payment Breakdown", "自動車税 減算":"Auto tax deduction",
    "リサイクル預託金":"Recycling deposit", "ローン残債":"Loan balance",
    "確認書にて確定":"Set via Confirmation", "引渡時確定":"Set at handover",
    "差引支払額（オーナー手取）":"Net payment (owner)",
    "ローン残債は契約後・引渡前に変動する可能性があるため、引渡時に「確認書」を再交換し最終振込額を確定します。(A3)":"Because the loan balance may change after signing and before handover, a 'Confirmation' is re-exchanged at handover to finalize the transfer amount. (A3)",
    "必要書類 チェックリスト":"Required Documents Checklist",
    "車検証":"Inspection certificate", "納税証明書":"Tax payment certificate",
    "自賠責保険証":"Compulsory insurance cert.", "リサイクル券":"Recycling certificate",
    "印鑑証明書":"Seal certificate", "住民票":"Residence certificate",
    "委任状":"Power of attorney", "譲渡証明書":"Transfer certificate",
    "本部内部処理項目":"HQ Internal Items", "加盟店非表示 (A16)":"Hidden from franchise (A16)",
    "店舗名":"Store name", "担当者":"Person in charge", "入金確認日":"Payment confirmed date",
    "署名":"Signatures", "売主（お客様）":"Seller (Customer)", "買主（加盟店）":"Buyer (Franchise)",
    "売主":"Seller", "買主":"Buyer", "電子署名済":"E-signed",
    "署名フロー":"Signature Flow", "契約書 作成":"Contract created", "本部 承認":"HQ approval",
    "本部が売主・買主間を仲介・承認":"HQ mediates and approves between seller and buyer",
    "約款 同意 (顧客)":"Terms agreed (customer)", "画面表示の上、同意チェック":"Agreement checked after on-screen display",
    "署名URL 送信":"Signature URL sent", "で署名URLを送付":" — send signature URL",
    "顧客 (売主) 署名":"Customer (seller) signature", "加盟店 (買主) 署名":"Franchise (buyer) signature",
    "売主 署名":"Seller signature", "買主 署名":"Buyer signature",
    "本人のデバイスで署名":"Sign on signer's device", "契約 成立 ・ PDF保管":"Contract concluded · PDF stored",
    "書類番号付与 ・ 7年保管":"Document no. assigned · 7-yr retention",
    "電子署名 方式":"E-Signature Method", "本人確認方式":"ID verification",
    "署名URL":"Signature URL", "送信済":"Sent", "署名端末":"Signing device",
    "本人デバイス":"Signer's device", "収入印紙":"Stamp duty",
    "電子署名法に基づく契約締結 (URL送付 → 本人デバイス署名)。印紙税が非課税となり、FC展開のコスト削減に寄与します。":"Contract conclusion under the Electronic Signature Act (URL sent → signing on signer's device). Stamp duty becomes exempt, helping reduce franchise expansion costs.",
    "関連書類":"Related Documents", "確認書（引渡時）":"Confirmation (handover)",
    "保管期限":"Retention until", "約款監修":"Terms supervised by", "言語":"Language",
    "承認して進める":"Approve & proceed", "署名を依頼":"Request signature", "署名リマインド":"Send reminder",
    "お客様控":"Customer Copy", "店舗控":"Store Copy",
    "（お客様控）":" (Customer Copy)", "（店舗控）":" (Store Copy)", "（同上）":" (same as above)",

    /* contract wizard */
    "電子契約管理":"E-Contract Management", "作成ウィザード":"Creation Wizard",
    "1. 契約種別の選択":"1. Select Contract Type", "作成する契約書を選び、承認済の査定記録から起点します。":"Select the contract to create, starting from an approved appraisal record.",
    "契約種別を選択":"Select contract type",
    "B2C ・ 顧客（売主）→ 加盟店（買主）。査定承認後に締結。":"B2C · Customer (seller) → Franchise (buyer). Concluded after appraisal approval.",
    "B2B ・ 売主FC → 本部（承認・仲介）→ 買主FC。":"B2B · Seller FC → HQ (approve/intermediary) → Buyer FC.",
    "B2B ・ 本部 → 加盟店。発注書と請求書を一体で発行。":"B2B · HQ → Franchise. Order and invoice issued as one.",
    "引渡時に再交換し、ローン残債・最終振込額を確定。":"Re-exchanged at handover to finalize loan balance and transfer amount.",
    "査定記録から生成":"Generate from Appraisal Record",
    "承認済の査定を選択すると車両・顧客情報が自動入力されます (A17)":"Selecting an approved appraisal auto-fills the vehicle and customer info (A17)",
    "2. 当事者情報":"2. Parties", "売主（顧客）・買主（加盟店）の情報を確認します。":"Confirm the seller (customer) and buyer (franchise) information.",
    "売主（お客様）情報":"Seller (Customer) Info", "車検証OCRより自動入力 (A4)":"Auto-filled from cert OCR (A4)",
    "フリガナ":"Furigana", "メール (署名URL送付先)":"Email (signature URL recipient)",
    "買主（加盟店）情報":"Buyer (Franchise) Info", "所有者（車検証）":"Owner (cert)", "使用者（車検証）":"User (cert)",
    "委託販売フロー（本部仲介）":"Consignment Flow (HQ intermediary)",
    "売主FC → 本部（承認・費用按分）→ 買主FC の三者間で締結します。":"Concluded among three parties: Seller FC → HQ (approval / cost allocation) → Buyer FC.",
    "本部視点で売主・買主の双方を管理します。(A14)":"Manages both seller and buyer from the HQ perspective. (A14)",
    "3. 車両情報":"3. Vehicle Info", "査定・車検証OCRから車両情報を自動入力します。":"Auto-fill vehicle info from the appraisal and cert OCR.",
    "車両情報":"Vehicle Info", "査定データ連携済":"Linked to appraisal", "OCR自動入力":"OCR auto-fill",
    "リサイクル料金":"Recycling fee", "重複入力の削減":"Reduced duplicate entry",
    "年式・車名・車台番号・色・走行距離・リサイクル料・自動車税は Assist Forward の査定フローから自動連携されます。":"Year, model, chassis no., color, mileage, recycling fee, and automobile tax are auto-linked from the Assist Forward appraisal flow.",
    "4. 告知事項":"4. Declarations", "AI判定を参照しつつ、売主申告の告知事項を確定します。":"Confirm the seller's declarations while referencing the AI judgment.",
    "修復歴判定AI・メーター異常検知の結果を初期値として参照。最終申告は売主が画面でチェックします。(A1)":"References the repair-history AI and odometer-anomaly detection as defaults. The seller makes the final declaration on screen. (A1)",
    "告知事項チェックリスト":"Declaration Checklist", "AI: 確認要":"AI: Check", "AI: なし":"AI: None",
    "メーター異常検知AI":"Odometer anomaly AI", "AI査定":"AI appraisal", "修復歴判定AI":"Repair-history AI",
    "5. 必要書類・支払い内訳":"5. Documents & Payment", "受領書類の確認と支払い内訳を確定します。":"Confirm received documents and the payment breakdown.",
    "受領確認のみ（受領日不要・PDF出力対応） (A2)":"Receipt check only (no date needed · PDF export) (A2)",
    "査定データから自動計算 (A3)":"Auto-calculated from appraisal data (A3)", "契約金額（査定額）":"Contract amount (appraised)",
    "確認書にて引渡時確定":"Set at handover via Confirmation",
    "振込先（銀行マスタより自動反映 / A15）":"Transfer to (auto from bank master / A15)", "口座":"Account",
    "本部内部処理項目（二段表示）":"HQ Internal Items (two-tier)", "売上計上":"Sales entry", "未計上":"Not entered",
    "6. 約款の同意":"6. Agree to Terms", "約款を表示し、顧客の同意を取得します。":"Display the terms and obtain the customer's consent.",
    "約款（普通取引約款）":"Terms (Standard Trading Terms)",
    "第1条（目的）":"Article 1 (Purpose)", "第2条（契約の成立）":"Article 2 (Formation of Contract)",
    "第3条（告知事項）":"Article 3 (Declarations)", "第4条〜第12条":"Articles 4–12",
    "本約款は、売主と買主との間で締結される自動車の売買に関する基本的事項を定めるものとする。":"These terms set out the basic matters concerning the sale of a vehicle concluded between the seller and the buyer.",
    "本契約は、当事者双方の署名または記名押印（電子署名を含む）により成立する。本契約書は電子的に作成・保管され、各当事者がその控えを保持する。本条は印紙税の取扱いの基礎となる。":"This contract is formed by the signature or name-and-seal (including electronic signature) of both parties. It is created and stored electronically, and each party retains a copy. This article is the basis for the stamp duty treatment.",
    "売主は、メーター改ざん・修復歴・水没歴・不具合・自動車税および駐車違反金の未納の有無について、本契約書記載のとおり申告する。":"The seller declares, as stated in this contract, whether there is odometer tampering, repair history, flood history, defects, or unpaid automobile tax and parking fines.",
    "引渡し、所有権移転、危険負担、契約不適合責任、解除、反社会的勢力の排除、合意管轄ほか。（日本中古自動車販売協会連合会 JPUC 監修 / 16KH00009・2023年7月改定）":"Delivery, transfer of ownership, risk allocation, non-conformity liability, termination, exclusion of antisocial forces, agreed jurisdiction, etc. (Supervised by JPUC / 16KH00009 · rev. Jul 2023)",
    "JPUC 監修番号 16KH00009（2023年7月改定）・ 電子版は完了後に JPUC 再承認を取得 (A12)":"JPUC supervision no. 16KH00009 (rev. Jul 2023) · electronic version to obtain JPUC re-approval after completion (A12)",
    "上記約款を画面で確認し、内容に":"I have reviewed the above terms on screen and",
    "同意":"agree", "します。（顧客確認欄に反映 / A8）":" to them. (Reflected in customer confirmation field / A8)",
    "7. 署名依頼":"7. Request Signature", "電子署名の方式を選び、署名を依頼します。":"Choose the e-signature method and request signing.",
    "メール認証":"Email auth", "SMS認証":"SMS auth", "署名URLをメール送付":"Send signature URL by email",
    "署名URLをSMS送付":"Send signature URL by SMS", "本人確認・法的有効性 (A11)":"Identity verification & legal validity (A11)",
    "電子署名法に基づき本人性を担保し、証拠として有効。":"Ensures identity under the Electronic Signature Act and is valid as evidence.",
    "書類番号（自動採番 / A18）":"Document no. (auto / A18)", "売主 → 買主":"Seller → Buyer",
    "保管":"Retention", "7年 (電帳法)":"7 yrs (e-bookkeeping)",
    "署名を依頼して送信":"Request & send signature", "¥0 (非課税)":"¥0 (exempt)",
    "非課税（¥0）":"exempt (¥0)", "収入印紙が":"Stamp duty becomes", "となり、FC展開のコストを削減。":", reducing franchise expansion costs.",

    /* makers / models / colors / regions / sample data */
    "トヨタ":"Toyota", "ホンダ":"Honda", "ダイハツ":"Daihatsu", "スズキ":"Suzuki",
    "日産":"Nissan", "スバル":"Subaru", "三菱":"Mitsubishi", "レクサス":"Lexus",
    "いすゞ":"Isuzu", "ヴェルファイア":"Vellfire", "アクア":"Aqua", "タント":"Tanto",
    "ワゴンR":"Wagon R", "ハイラックス":"Hilux", "ハイエースワゴン":"Hiace Wagon",
    "クラウン ハイブリッド":"Crown Hybrid", "クラウンスポーツ":"Crown Sport", "シエンタ ハイブリッド":"Sienta Hybrid",
    "ライズ":"Raize", "ヤリス クロス":"Yaris Cross", "フリードスパイク":"Freed Spike",
    "ハイブリッド":"Hybrid", "ハスラー":"Hustler", "ロッキー":"Rocky", "フーガ":"Fuga",
    "フーガ ハイブリッド":"Fuga Hybrid", "ヴィッツ":"Vitz", "ジムニーシエラ":"Jimny Sierra",
    "ヴォクシー ハイブリッド":"Voxy Hybrid", "レヴォーグ":"Levorg", "レクサス RX350h":"Lexus RX350h",
    "デリカ D:5":"Delica D:5", "エルフ":"Elf", "BMW 4シリーズ":"BMW 4 Series",
    "Z プレミア":"Z Premier", "カスタムRS":"Custom RS", "STI スポーツ R EX":"STI Sport R EX",
    "100 1.15T Wキャブ フルスーパーロー":"100 1.15T W-Cab Full Super Low",
    "+スタイル クール ターボ ホンダセンシング":"+Style Cool Turbo Honda Sensing", "@ナビ":"@Navi",
    "トヨタ アクア":"Toyota Aqua", "トヨタ クラウン ハイブリッド":"Toyota Crown Hybrid",
    "トヨタ ハイラックス":"Toyota Hilux", "トヨタ ライズ":"Toyota Raize",
    "トヨタ ヴェルファイア":"Toyota Vellfire", "トヨタ ヴェルファイア (引渡時)":"Toyota Vellfire (at handover)",
    "ホンダ N-BOX":"Honda N-BOX", "ホンダ N-ONE":"Honda N-ONE", "ホンダ フリードスパイク":"Honda Freed Spike",
    "スズキ ジムニーシエラ":"Suzuki Jimny Sierra", "スズキ ワゴンR":"Suzuki Wagon R",
    "ダイハツ タント":"Daihatsu Tanto", "日産 フーガ":"Nissan Fuga", "BMW BMW 4シリーズ":"BMW BMW 4 Series",
    "ヴォクシー ハイブリッド":"Voxy Hybrid", "クライスラー クライスラー グランドボイジャー3300N":"Chrysler Chrysler Grand Voyager 3300N",
    "KF型":"KF type", "ブラック":"Black", "黒":"Black", "シルバー":"Silver",
    "パール":"Pearl", "パールホワイト":"Pearl White",
    "東京都":"Tokyo", "神奈川県":"Kanagawa", "千葉県":"Chiba", "新潟県":"Niigata",
    "静岡県":"Shizuoka", "愛知県":"Aichi", "三重県":"Mie", "大阪府":"Osaka",
    "宮崎県":"Miyazaki", "北海道":"Hokkaido", "青森県":"Aomori",
    "みずほ銀行":"Mizuho Bank", "四日市支店":"Yokkaichi Branch", "普通":"Ordinary",
    "アップルオートネットワーク（カ":"Apple Auto Network (K.K",
    "浜松小豆餅店":"Hamamatsu Azukimochi Store", "流山あおぞら店":"Nagareyama Aozora Store",
    "四日市南店":"Yokkaichi South Store", "四日市ときわ店":"Yokkaichi Tokiwa Store",
    "アップルインターアップルインター":"Apple Inter Apple Inter", "黒埼インター店":"Kurosaki Inter Store",
    "LOGIQUE1号店":"LOGIQUE Store 1", "鈴鹿中央通り店":"Suzuka Chuo-dori Store",
    "藤沢辻堂店":"Fujisawa Tsujido Store",
    "山田 太郎":"Yamada Taro", "ヤマダ タロウ":"Yamada Taro", "佐藤 花子":"Sato Hanako",
    "鈴木 一郎":"Suzuki Ichiro", "山田 健一":"Yamada Kenichi", "後藤 俊朗":"Goto Toshiro",
    "テスト":"Test", "テスト 太郎":"Test Taro", "テストアルファード":"Test Alphard",
    "テストスパイク":"Test Spike", "あかさたな":"Akasatana",
    "服部 真也":"Hattori Shinya", "阿部 涼太":"Abe Ryota", "樹木 優太":"Itsuki Yuta",
    "平木 健太郎":"Hiraki Kentaro", "大原":"Ohara", "島津":"Shimazu",
    "髙木 幹也":"Takagi Mikiya", "長橋 優星":"Nagahashi Yusei", "星野 龍史":"Hoshino Ryuji",
    "三重 300 あ 12-34":"Mie 300 A 12-34", "三重 500 さ 56-78":"Mie 500 Sa 56-78",
    "千葉 330 か 90-12":"Chiba 330 Ka 90-12", "湘南 300 あ 12-34":"Shonan 300 A 12-34",
    "三重県四日市市○○町1-2-3":"1-2-3 ○○-cho, Yokkaichi, Mie",
    "令和5年12月1日":"Dec 1, 2023", "令和8年 3月 5日":"Mar 5, 2026", "令和8年12月24日":"Dec 24, 2026",
    "令和8年3月5日":"Mar 5, 2026", "平成22年":"2010", "平成22年12月1日":"Dec 1, 2010", "昭和60年4月1日":"Apr 1, 1985",
    "¥0.0万":"¥0", "¥25万円":"¥250,000", "¥260万円":"¥2,600,000", "¥385万円":"¥3,850,000",
    "¥40万円":"¥400,000", "¥698万":"¥6.98M", "¥705万":"¥7.05M", "594.70万〜687.10万":"5.947M–6.871M",
    "直近 12 件":"Last 12",
    "全":"Total", "件 ・ 法定保管期間 7年 (電子帳簿保存法対応)":"items · 7-yr legal retention (e-bookkeeping compliant)",
    "発行日":"Issued", "メールで署名URLを送付":"Sent signature URL by email",
    "SMSで署名URLを送付":"Sent signature URL by SMS",
  };

  /* substring replacements for proper nouns embedded in composed strings (dates etc.) */
  const SUBSTR = [
    ["アップル本部","Apple HQ"], ["アップル本店","Apple Main Store"],
    ["鈴鹿中央通り店","Suzuka Chuo-dori Store"], ["四日市南店","Yokkaichi South Store"],
    ["流山あおぞら店","Nagareyama Aozora Store"], ["黒埼インター店","Kurosaki Inter Store"],
    [" ・ "," \u00b7 "], ["本部","HQ"]
  ];

  /* state */
  let lang = localStorage.getItem("af_lang") || "ja";
  window.__afLang = lang;
  let paused = false;
  let scheduled = false;
  const orig = new WeakMap();        // textNode -> original JA
  const origAttr = new WeakMap();    // el -> {placeholder, value}

  const SKIP_TAGS = new Set(["SCRIPT","STYLE","NOSCRIPT"]);

  function looksTranslatable(s){
    // must contain a Japanese char; never touch emails
    if(!s) return false;
    if(s.indexOf("@") !== -1) return false;
    return /[ぁ-んァ-ヶ一-龥０-９　]|[、。・（）／％]/.test(s);
  }

  function translateText(raw){
    const t = raw.trim();
    if(!t) return null;
    const hit = DICT[t];
    if(hit === undefined) return null;
    // preserve leading / trailing whitespace
    const lead = raw.match(/^\s*/)[0];
    const trail = raw.match(/\s*$/)[0];
    return lead + hit + trail;
  }

  function substr(raw){
    if(raw.indexOf("@") !== -1) return null;
    let s = raw, changed = false;
    for(const [ja,en] of SUBSTR){ if(s.indexOf(ja) !== -1){ s = s.split(ja).join(en); changed = true; } }
    return changed ? s : null;
  }

  function walk(node){
    if(node.nodeType === Node.TEXT_NODE){
      const parent = node.parentNode;
      if(parent && SKIP_TAGS.has(parent.tagName)) return;
      if(parent && parent.closest && parent.closest("[data-noi18n]")) return;
      if(lang === "en"){
        if(!orig.has(node)) {
          const tr = translateText(node.nodeValue);
          if(tr !== null){ orig.set(node, node.nodeValue); node.nodeValue = tr; }
          else { const sub = substr(node.nodeValue); if(sub !== null){ orig.set(node, node.nodeValue); node.nodeValue = sub; } }
        } else {
          // node already tracked; if React reset it to JA, retranslate
          const tr = translateText(node.nodeValue);
          if(tr !== null && tr !== node.nodeValue){ orig.set(node, node.nodeValue); node.nodeValue = tr; }
          else { const sub = substr(node.nodeValue); if(sub !== null && sub !== node.nodeValue){ orig.set(node, node.nodeValue); node.nodeValue = sub; } }
        }
      }
      return;
    }
    if(node.nodeType !== Node.ELEMENT_NODE) return;
    if(SKIP_TAGS.has(node.tagName)) return;
    if(node.hasAttribute && node.hasAttribute("data-noi18n")) return;

    // attributes: placeholder + readonly value
    if(lang === "en" && (node.tagName === "INPUT" || node.tagName === "TEXTAREA")){
      const ph = node.getAttribute("placeholder");
      if(ph){ const tr = translateText(ph); if(tr!==null){ const o=origAttr.get(node)||{}; if(o.placeholder===undefined){o.placeholder=ph;origAttr.set(node,o);} node.setAttribute("placeholder", tr.trim()); } }
      if(node.readOnly && node.value){ const tr = translateText(node.value); if(tr!==null){ const o=origAttr.get(node)||{}; if(o.value===undefined){o.value=node.value;origAttr.set(node,o);} node.value = tr.trim(); } }
    }
    for(let c = node.firstChild; c; c = c.nextSibling) walk(c);
  }

  function restore(node){
    if(node.nodeType === Node.TEXT_NODE){
      if(orig.has(node)){ node.nodeValue = orig.get(node); orig.delete(node); }
      return;
    }
    if(node.nodeType !== Node.ELEMENT_NODE) return;
    if(origAttr.has(node)){
      const o = origAttr.get(node);
      if(o.placeholder !== undefined) node.setAttribute("placeholder", o.placeholder);
      if(o.value !== undefined) node.value = o.value;
      origAttr.delete(node);
    }
    for(let c = node.firstChild; c; c = c.nextSibling) restore(c);
  }

  function run(){
    paused = true;
    try { walk(document.body); } finally { paused = false; }
  }
  function schedule(){
    if(scheduled) return; scheduled = true;
    setTimeout(()=>{ scheduled = false; if(lang==="en") run(); }, 0);
  }

  const mo = new MutationObserver((muts)=>{
    if(paused || lang !== "en") return;
    schedule();
  });

  function start(){
    mo.observe(document.body, { childList:true, subtree:true, characterData:true });
    if(lang === "en") run();
  }

  window.AF_setLang = function(l){
    if(l === lang) return;
    lang = l; window.__afLang = l; localStorage.setItem("af_lang", l);
    if(l === "ja"){ paused = true; restore(document.body); paused = false; }
    else { run(); }
  };
  window.AF_translate = run;

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
