/* ASSIST FORWARD — 新車車両登録ウィザード (7-step vehicle registration) */
const { useState } = React;

const PREFECTURES = ["北海道","青森県","東京都","神奈川県","千葉県","新潟県","静岡県","愛知県","三重県","大阪府","宮崎県"];

const STEP3_PHOTOS = [
  { nm:"右斜め前", icon:"ti-car" },
  { nm:"右斜め後ろ", icon:"ti-car" },
  { nm:"左斜め後ろ", icon:"ti-car" },
  { nm:"左斜め前", icon:"ti-car" },
  { nm:"運転席", icon:"ti-layout-list" },
  { nm:"コントロールパネル", icon:"ti-shield-check" }
];

const STEP4_LABELS = [
  "ボンネット ヒンジ部分（ボルト）","ボンネット ヒンジ部分（ボルト）2",
  "ボンネット エンジンルーム側（ボルト）","ボンネット エンジンルーム側（ボルト）2",
  "右Fドア（ボルト）","右Fドア（ボルト）2","右Fドア（ボルト）3","右Fドア（ボルト）4",
  "右Rドア（ボルト）","右Rドア（ボルト）2",
  "左Fドア（ボルト）","左Fドア（ボルト）2","左Rドア（ボルト）","左Rドア（ボルト）2",
  "トランク ヒンジ（ボルト）","トランク ヒンジ（ボルト）2",
  "フロントバンパー 接合部","リアバンパー 接合部",
  "右クォーターパネル","右クォーターパネル2","左クォーターパネル","左クォーターパネル2",
  "ルーフ 右レール","ルーフ 左レール","フロントガラス 下部","リアガラス 下部",
  "右サイドシル","左サイドシル","エンジン 型式プレート","車台番号 刻印",
  "右Fフェンダー 内側","左Fフェンダー 内側","ラジエーターコアサポート",
  "右フロントピラー","左フロントピラー","右センターピラー","左センターピラー",
  "トランクフロア","スペアタイヤハウス","フロアパネル 中央"
];

function StepCustomer() {
  return (
    <div style={{maxWidth:920,margin:"0 auto"}}>
      <div className="wz-card" style={{background:"#fbfcfe"}}>
        <div className="wz-field">
          <label>顧客ID (自動採番)</label>
          <div style={{position:"relative"}}>
            <input className="wz-inp" placeholder="自動採番されます" style={{paddingRight:44}} />
            <i className="ti ti-search" style={{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)",color:"#9aa6ba",fontSize:18}}></i>
          </div>
        </div>
      </div>
      <div className="wz-card" style={{boxShadow:"none",border:"none",background:"transparent",padding:"24px 6px 0"}}>
        <div className="wz-grid-3">
          <div className="wz-field"><label>顧客名</label><input className="wz-inp" defaultValue="山田 太郎" /></div>
          <div className="wz-field"><label>電話番号</label><input className="wz-inp" placeholder="090-0000-0000" /></div>
          <div className="wz-field"><label>LINE ID</label><input className="wz-inp" placeholder="@line_id" /></div>
        </div>
        <div className="wz-grid-3" style={{marginTop:22}}>
          <div className="wz-field"><label>メールアドレス</label><input className="wz-inp" placeholder="user@example.com" /></div>
          <div className="wz-field"><label>都道府県</label>
            <div className="wz-sel"><select defaultValue="東京都">{PREFECTURES.map(p=><option key={p}>{p}</option>)}</select></div>
          </div>
          <div className="wz-field"><label>住所</label><input className="wz-inp" placeholder="市区町村、番地、建物名など" /></div>
        </div>
      </div>
    </div>
  );
}

function StepVehicle() {
  const [chk,setChk] = useState({});
  const t = (k)=>setChk(s=>({...s,[k]:!s[k]}));
  return (
    <div className="wz-2col">
      <div className="wz-doc">
        <i className="ti ti-file-text"></i>
        <div className="ocr-lines"><span></span><span></span><span></span><span></span></div>
        <div className="cap">自動車検査証.jpg</div>
      </div>
      <div>
        <div className="wz-card">
          <div className="wz-ocr-head">
            <div className="lbl">OCR自動読み取り項目 (車検証情報)</div>
            <div className="badges">
              <span className="wz-badge green"><i className="ti ti-circle-check"></i>PARSED SUCCESSFULLY</span>
              <span className="wz-badge teal">マスタ照合済み</span>
            </div>
          </div>
          <div className="wz-grid-3">
            <div className="wz-field"><label>車検満了日 <span className="req">*</span></label><input className="wz-inp" type="date" defaultValue="2028-04-15" /></div>
            <div className="wz-field"><label>型式指定番号 <span className="req">*</span></label>
              <input className="wz-inp" type="number" defaultValue="17625" /></div>
            <div className="wz-field"><label>類別区分番号 <span className="req">*</span></label>
              <input className="wz-inp" type="number" defaultValue="15" /></div>
          </div>
          <div className="wz-grid-3" style={{marginTop:20}}>
            <div className="wz-field"><label>初度登録年月 <span className="req">*</span></label><input className="wz-inp" type="date" defaultValue="2019-04-01" /></div>
            <div className="wz-field"><label>型式 <span className="req">*</span></label><input className="wz-inp locked" defaultValue="DBA-LA600S" readOnly /></div>
            <div className="wz-field"><label>乗車定員 <span className="req">*</span></label><input className="wz-inp" defaultValue="4" /></div>
          </div>
          <div className="wz-grid-3" style={{marginTop:20}}>
            <div className="wz-field"><label>車台番号 <span className="req">*</span></label><input className="wz-inp" defaultValue="LA600S-0772049" /></div>
            <div className="wz-field"><label>総排気量/定格出力 <span className="req">*</span></label><input className="wz-inp" defaultValue="650" /></div>
            <div className="wz-field"><label>原動機の型式 <span className="req">*</span></label><input className="wz-inp locked" defaultValue="KF型" readOnly /></div>
          </div>
        </div>

        <div className="wz-card">
          <div className="wz-card-lbl jp">その他入力項目 <span className="req">*</span></div>
          <div className="wz-grid-5">
            <div className="wz-field"><label>メーカー <span className="req">*</span></label>
              <div className="wz-sel locked"><select defaultValue="ダイハツ" disabled><option>ダイハツ</option></select></div></div>
            <div className="wz-field"><label>車名 <span className="req">*</span></label>
              <div className="wz-sel locked"><select defaultValue="タント" disabled><option>タント</option></select></div></div>
            <div className="wz-field"><label>グレード <span className="req">*</span></label>
              <div className="wz-sel"><select defaultValue="X SA3"><option>X SA3</option><option>X</option><option>カスタムRS</option></select></div></div>
            <div className="wz-field"><label>走行距離 (KM) <span className="req">*</span></label><input className="wz-inp" defaultValue="0" /></div>
            <div className="wz-field"><label>外装色 <span className="req">*</span></label>
              <div className="wz-sel"><select defaultValue=""><option value="">選択</option><option>パール</option><option>ブラック</option><option>シルバー</option></select></div></div>
          </div>
          <div className="wz-checks" style={{marginTop:24}}>
            <label className="wz-check"><input type="checkbox" checked={!!chk.manual} onChange={()=>t("manual")} />取扱説明書あり</label>
            <label className="wz-check"><input type="checkbox" checked={!!chk.warranty} onChange={()=>t("warranty")} />保証書・整備手帳あり</label>
            <label className="wz-check"><input type="checkbox" checked={!!chk.sparekey} onChange={()=>t("sparekey")} />スペアキーあり</label>
          </div>
        </div>

        <div className="wz-card">
          <div className="wz-card-lbl">MAIN EQUIPMENT</div>
          <div className="wz-checkgrid">
            {["サンルーフ","革シート","ナビ","後席モニター","安全装備","エアロパーツ"].map(e=>(
              <label className="wz-check" key={e}><input type="checkbox" checked={!!chk[e]} onChange={()=>t(e)} />{e}</label>
            ))}
          </div>
        </div>

        <div className="wz-card">
          <div className="wz-card-lbl">FREE REMARKS</div>
          <textarea className="wz-ta" placeholder="特記事項、PRポイントなどを入力..."></textarea>
        </div>
      </div>
    </div>
  );
}

function StepPhotos() {
  const [done,setDone] = useState({});
  return (
    <div style={{maxWidth:1080,margin:"0 auto"}}>
      <div className="wz-photogrid">
        {STEP3_PHOTOS.map((p,i)=>(
          <div className={"wz-photo"+(done[i]?" done":"")} key={i}>
            <div className="ph"><i className={"ti "+(done[i]?"ti-circle-check":p.icon)}></i></div>
            <div className="nm">{p.nm}</div>
            <button className={"wz-shoot"+(done[i]?" done":"")} onClick={()=>setDone(s=>({...s,[i]:!s[i]}))}>
              <i className={"ti "+(done[i]?"ti-check":"ti-camera")}></i>{done[i]?"撮影済み":"撮影・選択"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepAIPhotos() {
  const [done,setDone] = useState({});
  const count = Object.values(done).filter(Boolean).length;
  return (
    <div>
      <div className="wz-aigrid">
        {STEP4_LABELS.map((nm,i)=>(
          <div className={"wz-aicard"+(done[i]?" done":"")} key={i}>
            <div className="ph"><i className={"ti "+(done[i]?"ti-circle-check":"ti-camera")}></i></div>
            <div className="nm">{i+1}. {nm}</div>
            <button className={"wz-shoot-sm"+(done[i]?" done":"")} onClick={()=>setDone(s=>({...s,[i]:!s[i]}))}>
              <i className={"ti "+(done[i]?"ti-check":"ti-camera")}></i>{done[i]?"済み":"撮影・選択"}
            </button>
          </div>
        ))}
      </div>
      <div className="wz-ai-count"><b>{count}</b> / 40 箇所 撮影済み</div>
    </div>
  );
}

function StepInspection() {
  const [repair,setRepair] = useState("none");
  const [smell,setSmell] = useState("none");
  const [uss,setUss] = useState("4.5");
  const [interior,setInterior] = useState("B");
  const [exterior,setExterior] = useState("4");
  return (
    <div style={{maxWidth:1080,margin:"0 auto"}}>
      <div className="wz-card">
        <div className="wz-grid-2" style={{gridTemplateColumns:"1fr 1fr",gap:30}}>
          <div>
            <div className="wz-field"><label>修復歴 (手入力)</label>
              <div className="wz-toggle danger">
                <button className={repair==="yes"?"on":""} onClick={()=>setRepair("yes")}>あり</button>
                <button className={repair==="none"?"on":""} onClick={()=>setRepair("none")}>なし</button>
              </div>
            </div>
            <div className="wz-field" style={{marginTop:22}}><label>臭い</label>
              <div className="wz-toggle" style={{maxWidth:220}}>
                <button className={smell==="yes"?"on":""} onClick={()=>setSmell("yes")}>あり</button>
                <button className={smell==="none"?"on":""} onClick={()=>setSmell("none")}>なし</button>
              </div>
            </div>
          </div>
          <div>
            <div className="wz-field"><label>AI判定リファレンス</label>
              <div className="wz-airef">
                <span className="v"><span className="dot"></span>なし</span>
                <span className="k">AI判定ロジック結果</span>
              </div>
            </div>
            <button className="wz-report-btn">
              <span className="l"><i className="ti ti-search"></i>インタラクティブ・レポート</span>
              <i className="ti ti-chevron-right"></i>
            </button>
          </div>
        </div>
        <div className="divider" style={{margin:"28px 0"}}></div>
        <div className="wz-score-lbl">総合評価点 (USS基準)</div>
        <div className="wz-scores">
          {["S","6","5","4.5","4","3.5","3","2","1","R"].map(s=>(
            <button key={s} className={"wz-score"+(uss===s?" on":"")} onClick={()=>setUss(s)}>{s}</button>
          ))}
        </div>
        <div className="wz-grid-2" style={{marginTop:30,gap:30}}>
          <div className="wz-field"><label style={{textAlign:"center"}}>内装評価 (A-D)</label>
            <div className="wz-seg">
              {["A","B","C","D"].map(s=><button key={s} className={interior===s?"on":""} onClick={()=>setInterior(s)}>{s}</button>)}
            </div>
          </div>
          <div className="wz-field"><label style={{textAlign:"center"}}>外装評価 (5.0 - 3.0)</label>
            <div className="wz-seg">
              {["5","4.5","4","3.5","3"].map(s=><button key={s} className={exterior===s?"on":""} onClick={()=>setExterior(s)}>{s}</button>)}
            </div>
          </div>
        </div>
        <button className="wz-upload"><i className="ti ti-upload"></i>展開図を取り込む</button>
      </div>
    </div>
  );
}

function StepValuation() {
  return (
    <div>
      <div className="wz-val-row">
        <div className="wz-val">
          <div className="vh">
            <div className="t"><i className="ti ti-database"></i>APPLE査定結果</div>
            <span className="wz-pull"><i className="ti ti-refresh"></i>システムから取得</span>
          </div>
          <div className="vk">参考査定金額 (円)</div>
          <div className="wz-bigfield"><span className="yen">¥</span>1,740,000</div>
        </div>
        <div className="wz-val dark">
          <div className="vh">
            <div className="t"><i className="ti ti-sparkles"></i>AF AI査定</div>
            <span className="wz-pull" style={{background:"rgba(255,255,255,.08)"}}>オークションDB連携中</span>
          </div>
          <div className="vk">算出査定レンジ</div>
          <div className="wz-range">¥2,880,000 ~ ¥3,520,000</div>
        </div>
        <div className="wz-val">
          <div className="vh">
            <div className="t" style={{color:"#1d2738"}}><i className="ti ti-chart-bar" style={{color:"#2563eb"}}></i>市場価格参照</div>
            <i className="ti ti-external-link" style={{color:"#9aa6ba",fontSize:17}}></i>
          </div>
          <div className="wz-market-empty">NO DATA</div>
        </div>
      </div>

      <div className="wz-final">
        <h3>最終査定額決定 (売却下限額)</h3>
        <p className="sub">参考データを踏まえ、オーナーへの支払額を確定してください。</p>
        <div className="wz-final-grid">
          <div className="wz-field">
            <label>決定査定金額 / オーナー手取 (円)</label>
            <div className="wz-bigfield" style={{padding:"22px 20px"}}><span className="yen">¥</span>0</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div className="wz-assessor">
              <div className="av"><i className="ti ti-user"></i></div>
              <div><div className="k">査定者</div><div className="v">本部 査定員A</div></div>
            </div>
            <div className="wz-assessor" style={{background:"#fdf3f2",borderColor:"#f6d6d2"}}>
              <div className="av" style={{background:"var(--brand-red)"}}><i className="ti ti-calendar"></i></div>
              <div><div className="k">査定日</div><div className="v">2026/06/18</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepListing() {
  return (
    <div>
      <div className="wz-7col">
        <div>
          <div className="wz-listcard">
            <div className="h"><i className="ti ti-clock-hour-4"></i>掲載終了日時</div>
            <div className="wz-datefield">05/12/2027 04:42 AM <i className="ti ti-calendar"></i></div>
            <div className="wz-note">委託販売の場合、長期掲載が一般的です。デフォルトは1年後ですが、オーナーと相談の上決定してください。</div>
          </div>
          <div className="wz-info-blue">
            <div className="t"><i className="ti ti-info-circle"></i>委託・掲載通知ルール</div>
            <ul>
              <li>掲載開始から 1ヶ月 / 3ヶ月 / 6ヶ月 ごとに店舗代表アドレスへ通知</li>
              <li>掲載終了の 1ヶ月前 / 1週間前 / 1日前 に最終リマインド通知</li>
              <li>※これらをトリガーに、オーナー（委託者）へのフォローコールを行ってください。</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="wz-sim">
            <div className="h">
              <div className="t"><i className="ti ti-heart-handshake"></i>委託利益シミュレーター</div>
              <div className="cc">COMMISSION CALC</div>
            </div>
            <div className="wz-sim-row"><span className="k">オーナー希望/確定査定額</span><span className="v">¥0</span></div>
            <div className="wz-field" style={{marginTop:10}}>
              <label style={{color:"#fff"}}><i className="ti ti-tag" style={{color:"var(--brand-red)",marginRight:6}}></i>設定 販売価格</label>
              <div className="wz-sim-price"><span className="yen">¥</span>0</div>
            </div>
            <div className="wz-sim-profit">
              <div><div className="lbl">設定店舗収益 (成約時)</div><div className="amt">+¥0</div></div>
              <div className="rate">利益率<br/><span style={{fontSize:15,color:"#fff",fontWeight:800}}>0%</span></div>
            </div>
          </div>
          <div className="wz-info-orange">
            <i className="ti ti-trending-up"></i>
            <span>販売価格は市場データと査定額を参考に、店舗利益と売却のしやすさのバランスを見て決定してください。</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const WZ_STEPS = [
  { n:1, title:"1. 顧客情報の登録", sub:"外部システム (COCO/ADB) 連携、または新規顧客として登録します。", body:StepCustomer },
  { n:2, title:"2. 車両情報の入力", sub:"車検証のアップロードまたは撮影により、車両スペックを自動入力します。", body:StepVehicle },
  { n:3, title:"3. 車両写真登録", sub:"ガイドに従って各部位を撮影してください。", body:StepPhotos },
  { n:4, title:"4. AIモード写真撮影", sub:"修復歴判定AIのための詳細写真をガイドに沿って全40箇所撮影します。", body:StepAIPhotos },
  { n:5, title:"5. 検査・評価入力", sub:"車両の検査結果を入力します。", body:StepInspection },
  { n:6, title:"6. 査定", sub:"各種参考データを確認し、最終的な査定額を決定します。", body:StepValuation },
  { n:7, title:"7. 出品・委託設定", sub:"掲載条件と販売価格を設定して完了です。", body:StepListing }
];

function RegisterWizard({ onClose }) {
  const [step, setStep] = useState(1);
  const total = 7;
  const cur = WZ_STEPS[step-1];
  const Body = cur.body;
  const last = step === total;

  const next = () => { if (step < total) { setStep(step+1); document.querySelector(".wz-body").scrollTop = 0; } };
  const back = () => { if (step > 1) { setStep(step-1); document.querySelector(".wz-body").scrollTop = 0; } };
  const saveLabel = step >= 3 && step !== 5 ? "一時保存" : "下書き保存";

  return (
    <div className="wz-overlay" onClick={onClose}>
      <div className="wz-modal" onClick={e=>e.stopPropagation()}>
        <div className="wz-head">
          <div className="wz-plus">+</div>
          <div className="wz-titlewrap">
            <div className="wz-title">新車車両登録<em>ウィザード</em></div>
            <div className="wz-progress">
              <div className="wz-track"><div className="wz-fill" style={{width:(step/total*100)+"%"}}></div></div>
              <div className="wz-step-lbl">STEP {step} / {total}</div>
            </div>
          </div>
          <button className="wz-close" onClick={onClose}><i className="ti ti-x"></i></button>
        </div>

        <div className="wz-body">
          <div className="wz-step-head">
            <h2>{cur.title}</h2>
            <p>{cur.sub}</p>
          </div>
          <Body />
        </div>

        <div className="wz-foot">
          <button className="wz-btn wz-btn-light" onClick={back} style={{visibility:step>1?"visible":"hidden"}}>
            <i className="ti ti-chevron-left"></i>戻る
          </button>
          <button className="wz-btn wz-btn-ghost"><i className="ti ti-device-floppy"></i>{saveLabel}</button>
          <div className="spacer"></div>
          {last
            ? <button key="finish" className="wz-btn wz-btn-finish"><i className="ti ti-rocket"></i>出品を開始する</button>
            : <button key="next" className="wz-btn wz-btn-dark" onClick={next}>次へ進む<i className="ti ti-chevron-right"></i></button>}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { RegisterWizard });
