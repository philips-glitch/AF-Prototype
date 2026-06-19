/* ASSIST FORWARD — 電子契約 (Electronic Contracts) sample data — Phase 2 */
window.AF_CONTRACTS = (function(){

  // status: draft / hq_review / awaiting_sign / partial / completed
  const contracts = [
    { no:"AF-EC-2026-0042", type:"purchase", veh:"トヨタ ヴェルファイア", vid:"V-187",
      seller:"山田 太郎", buyer:"アップル本店", amount:6500000, status:"completed",
      created:"2026/06/12", store:"アップル本店", esign:"email", confirm:true },
    { no:"AF-EC-2026-0041", type:"consign", veh:"トヨタ クラウン ハイブリッド", vid:"V-158",
      seller:"アップル本店", buyer:"黒埼インター店", amount:4000000, status:"hq_review",
      created:"2026/06/10", store:"アップル本店", esign:"email" },
    { no:"AF-EC-2026-0040", type:"order", veh:"トヨタ ハイラックス", vid:"V-162",
      seller:"本部", buyer:"鈴鹿中央通り店", amount:5380000, status:"awaiting_sign",
      created:"2026/06/09", store:"鈴鹿中央通り店", esign:"sms" },
    { no:"AF-EC-2026-0039", type:"purchase", veh:"ダイハツ タント", vid:"V-180",
      seller:"佐藤 花子", buyer:"四日市南店", amount:980000, status:"partial",
      created:"2026/06/08", store:"四日市南店", esign:"email" },
    { no:"AF-EC-2026-0038", type:"confirm", veh:"トヨタ ヴェルファイア (引渡時)", vid:"V-187",
      seller:"山田 太郎", buyer:"アップル本店", amount:6500000, status:"draft",
      created:"2026/06/12", store:"アップル本店", esign:"email" },
    { no:"AF-EC-2026-0037", type:"purchase", veh:"ホンダ N-BOX", vid:"V-236",
      seller:"鈴木 一郎", buyer:"流山あおぞら店", amount:1090000, status:"draft",
      created:"2026/06/07", store:"流山あおぞら店", esign:"email" },
    { no:"AF-EC-2026-0036", type:"order", veh:"スズキ ジムニーシエラ", vid:"V-154",
      seller:"本部", buyer:"アップル本店", amount:2600000, status:"completed",
      created:"2026/06/05", store:"アップル本店", esign:"email", confirm:false }
  ];

  const TYPE_META = {
    purchase:{ label:"買取契約書", short:"買取", icon:"ti-file-certificate", color:"#ee3124", bg:"#fdecea", sub:"B2C ・ 顧客 → 加盟店" },
    consign: { label:"委託販売契約書", short:"委託", icon:"ti-file-symlink", color:"#7c3aed", bg:"#f3ecff", sub:"B2B ・ 加盟店 → 本部 → 加盟店" },
    order:   { label:"発注書・請求書", short:"発注請求", icon:"ti-receipt", color:"#2563eb", bg:"#eef4ff", sub:"B2B ・ 本部 → 加盟店" },
    confirm: { label:"確認書", short:"確認書", icon:"ti-clipboard-check", color:"#0c8a7e", bg:"#d3f2ef", sub:"引渡時 ・ 支払額確定" }
  };

  const STATUS_META = {
    draft:        { label:"下書き",      cls:"st-draft",   icon:"ti-pencil" },
    hq_review:    { label:"本部承認待ち", cls:"st-review",  icon:"ti-gavel" },
    awaiting_sign:{ label:"署名待ち",    cls:"st-await",   icon:"ti-clock-hour-4" },
    partial:      { label:"一部署名済",  cls:"st-partial", icon:"ti-writing-sign" },
    completed:    { label:"署名済 (完了)", cls:"st-done",  icon:"ti-circle-check" }
  };

  // approved assessment records that can seed a new contract (A17)
  const assessments = [
    { vid:"V-187", veh:"トヨタ ヴェルファイア", grade:"Z プレミア", year:"R5", mileage:"15,000 km",
      color:"ブラック", chassis:"TAHA45-0001870", amount:6500000, customer:"山田 太郎", approved:"2026/06/11" },
    { vid:"V-180", veh:"ダイハツ タント", grade:"X SA3", year:"R8", mileage:"0 km",
      color:"パールホワイト", chassis:"LA600S-0772049", amount:398000, customer:"佐藤 花子", approved:"2026/06/08" },
    { vid:"V-236", veh:"ホンダ N-BOX", grade:"G", year:"R8", mileage:"32,400 km",
      color:"シルバー", chassis:"JF5-1009823", amount:1090000, customer:"鈴木 一郎", approved:"2026/06/07" }
  ];

  // declaration checklist (告知事項) — A1 interactive, AI-referenced
  const declarations = [
    { k:"メーター改ざん", ai:"なし", aiSrc:"メーター異常検知AI" },
    { k:"メーター交換", ai:"なし", aiSrc:null },
    { k:"水没歴", ai:"なし", aiSrc:"AI査定" },
    { k:"冠水・ひょう害歴", ai:"なし", aiSrc:null },
    { k:"修復歴", ai:"なし", aiSrc:"修復歴判定AI" },
    { k:"改造歴", ai:"なし", aiSrc:null },
    { k:"不具合・故障箇所", ai:"なし", aiSrc:null },
    { k:"自動車税の未納", ai:"確認要", aiSrc:null },
    { k:"駐車違反金の未納", ai:"確認要", aiSrc:null }
  ];

  // required documents checklist (必要書類) — A2 check only, no date
  const reqDocs = [
    "車検証", "納税証明書", "自賠責保険証", "リサイクル券",
    "印鑑証明書", "住民票", "委任状", "譲渡証明書"
  ];

  // bank master (A15)
  const bankMaster = { bank:"みずほ銀行", branch:"四日市支店", type:"普通", no:"1234567", holder:"アップルオートネットワーク（カ" };

  return { contracts, TYPE_META, STATUS_META, assessments, declarations, reqDocs, bankMaster };
})();
