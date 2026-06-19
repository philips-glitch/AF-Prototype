/* ASSIST FORWARD — Dashboard, Vehicle List, Vehicle Detail */
const { useState, useEffect, useRef } = React;

/* ============================ DASHBOARD ============================ */
function Dashboard() {
  const barRef = useRef(null);
  useEffect(() => {
    if (!window.Chart || !barRef.current) return;
    const ch = new Chart(barRef.current, {
      type: "bar",
      data: {
        labels: ["published", "draft"],
        datasets: [{ data: [38, 36], backgroundColor: "#4285f4", borderRadius: 4, barThickness: 46 }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: true } },
        scales: {
          y: { beginAtZero: true, max: 40, ticks: { stepSize: 10, color: "#9aa6ba" },
               grid: { color: "#eef1f5" }, border: { display: false } },
          x: { ticks: { color: "#46536b", font: { weight: 700 } }, grid: { display: false }, border: { display: false } }
        }
      }
    });
    return () => ch.destroy();
  }, []);

  const kpis = [
    { label:"総出品台数", value:"74",     icon:"ti-car",       cls:"ico-blue" },
    { label:"進行中の商談", value:"0",     icon:"ti-users",     cls:"ico-amber" },
    { label:"今月の流通総額", value:"¥0.0万", icon:"ti-currency-dollar", cls:"ico-green" },
    { label:"成約率", value:"0%",          icon:"ti-arrow-up-right", cls:"ico-purple" }
  ];

  return (
    <div>
      <PageHead title="本部ダッシュボード" sub="ネットワーク内 全体稼働状況" />
      <div className="kpi-grid">
        {kpis.map((k,i)=>(
          <div className="kpi" key={i}>
            <div>
              <div className="kpi__label">{k.label}</div>
              <div className="kpi__value">{k.value}</div>
            </div>
            <div className={"kpi__icon "+k.cls}><i className={"ti "+k.icon}></i></div>
          </div>
        ))}
      </div>
      <div className="chart-2col">
        <div className="panel">
          <div className="panel__title">VEHICLES BY STATUS</div>
          <div style={{height:330,marginTop:16}}><canvas ref={barRef}></canvas></div>
        </div>
        <div className="panel">
          <div className="panel__title jp" style={{color:"#46536b"}}>平均成約価格トレンド</div>
          <div className="nodata">NO DATA</div>
        </div>
      </div>
    </div>
  );
}

/* ============================ VEHICLE LIST ============================ */
function VehicleList({ go }) {
  const v = window.AF_DATA.vehicles;
  const cols = "64px 2.4fr 1fr 1.1fr 1.3fr 0.9fr 1.1fr 0.9fr";
  return (
    <div>
      <PageHead title="ネットワーク車両全件管理" />
      <div className="searchbar">
        <div className="search-row">
          <div className="input input--code"><i className="ti ti-hash"></i>
            <input placeholder="型式番号" /></div>
          <div className="input pill"><i className="ti ti-search"></i>
            <input placeholder="キーワード（車名・ID）で検索..." /></div>
          <button className="sort-btn"><i className="ti ti-adjustments"></i>新着順 <i className="ti ti-chevron-down"></i></button>
        </div>
        <div className="filter-row">
          {[["掲載期間","すべて表示"],["所在地","都道府県すべて"],["メーカー","メーカーすべて"],
            ["出品店舗","店舗すべて"],["商談ステータス","状態すべて"]].map(([l,o],i)=>(
            <div className="field" key={i}>
              <label>{l}</label>
              <div className="select"><select defaultValue=""><option value="">{o}</option></select></div>
            </div>
          ))}
        </div>
      </div>

      <div className="table-card">
        <div className="thead" style={{gridTemplateColumns:cols}}>
          <div>写真</div><div>車両情報</div><div>出品店舗</div><div>出品価格</div>
          <div>掲載日数 / 終了まで</div><div>通知</div><div>状態</div><div style={{textAlign:"right"}}>操作</div>
        </div>
        {v.map((row,i)=>(
          <div className="trow" style={{gridTemplateColumns:cols}} key={i}>
            <VThumb />
            <div>
              <div className="cell-strong">{row.maker} {row.model}</div>
              <div className="cell-sub">{row.id} <span className="tag tag-r8">{row.reg}</span>
                {row.store!=="---" && row.store!=="アップル本店" ? " ・ "+(row.store.includes("県")?row.store:"") : ""}</div>
            </div>
            <div className="muted"><i className="ti ti-building-store" style={{fontSize:15,marginRight:5,verticalAlign:-2}}></i>{row.store}</div>
            <div className="cell-strong">{yen(row.price)}</div>
            <div>
              <div style={{fontSize:13}}><i className="ti ti-calendar-event" style={{color:"#aab3c2",marginRight:5,verticalAlign:-2}}></i>経過: {row.days}日</div>
              <div className="cell-sub"><i className="ti ti-clock-hour-4" style={{marginRight:5,verticalAlign:-2}}></i>{row.days>0?row.end:"---"}</div>
            </div>
            <div style={{display:"flex",gap:6}}>
              <span className="notif-ic"><i className="ti ti-mail"></i></span>
              <span className="notif-ic"><i className="ti ti-info-circle"></i></span>
            </div>
            <div>
              <span className="status-select">
                <select defaultValue="掲載中"><option>掲載中</option><option>商談中</option><option>成約</option></select>
              </span>
            </div>
            <div className="row-actions">
              <button className="btn btn-navy btn-sm" onClick={()=>go("vehicles/"+row.id)}>詳細</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================ VEHICLE DETAIL ============================ */
function VehicleDetail({ id, go }) {
  const [tab, setTab] = useState("overview");
  const v = window.AF_DATA.vehicles.find(x=>x.id===id) || window.AF_DATA.vehicles[0];
  const tabs = [
    {key:"overview", label:"車両概要", icon:"ti-file-description"},
    {key:"assess",   label:"査定 / 出品情報詳細", icon:"ti-clipboard-data"},
    {key:"owner",    label:"顧客(OWNER)管理", icon:"ti-user"},
    {key:"ai",       label:"AI検査レポート", icon:"ti-shield-check"}
  ];
  return (
    <div>
      <div className="detail-head">
        <button className="back-btn" onClick={()=>go("vehicles")}><i className="ti ti-arrow-left"></i></button>
        <h1 className="page-title">車両詳細</h1>
        <div className="detail-actions">
          <button className="btn btn-light"><i className="ti ti-heart"></i>お気に入り</button>
          <button className="btn btn-light"><i className="ti ti-layout-grid"></i>展開図を表示</button>
        </div>
      </div>

      <div className="tabs-card">
        <div className="tabs">
          {tabs.map(t=>(
            <div key={t.key} className={"tab"+(tab===t.key?" active":"")} onClick={()=>setTab(t.key)}>
              <i className={"ti "+t.icon}></i>{t.label}
            </div>
          ))}
        </div>
        <div className="tab-body">
          {tab==="overview" && <OverviewTab v={v} />}
          {tab==="assess"   && <AssessTab v={v} />}
          {tab==="owner"    && <OwnerTab v={v} />}
          {tab==="ai"       && <AiTab />}
        </div>
      </div>
    </div>
  );
}

const EQUIP = [
  ["取扱説明書",1],["保証書・整備手帳",1],["スペアキー",1],
  ["サンルーフ",0],["革シート",0],["カーナビ",1],
  ["後席モニター",0],["衝突安全装置",1],["エアロ",0]
];

function OverviewTab({ v }) {
  const [sel,setSel] = useState(0);
  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1.1fr 1.2fr 0.9fr",gap:26,alignItems:"start"}}>
        {/* photos */}
        <div>
          <div className="hero-photo">
            <i className="ti ti-car"></i>
            <div className="expand"><i className="ti ti-arrows-maximize"></i></div>
          </div>
          <div className="thumb-strip">
            <span className="thumb-tab">基本写真 <span className="cnt">6</span></span>
            <span className="thumb-tab off">AI詳細撮影 <span className="cnt">1</span></span>
            <span className="thumb-tab off">追加登録 <span className="cnt">1</span></span>
          </div>
          <div className="gallery">
            {[0,1,2,3,4].map(i=>(
              <div key={i} className={"gthumb"+(i===sel?" sel":"")} onClick={()=>setSel(i)}>
                <i className="ti ti-car"></i></div>
            ))}
          </div>
        </div>
        {/* basic spec */}
        <div className="spec-card">
          <div className="spec-card__head">
            <div className="ic"><i className="ti ti-tag"></i></div>
            <h3>車両基本情報</h3>
          </div>
          <dl className="spec-grid">
            <div className="spec"><dt>メーカー</dt><dd>{v.maker}</dd></div>
            <div className="spec"><dt>モデル</dt><dd>{v.model}</dd></div>
            <div className="spec"><dt>グレード</dt><dd>{v.grade||"-"}</dd></div>
            <div className="spec"><dt>年式</dt><dd>-</dd></div>
            <div className="spec"><dt>カラー</dt><dd>{v.color||"-"}</dd></div>
            <div className="spec"><dt>走行距離</dt><dd>{v.mileage||"-"}</dd></div>
            <div className="spec"><dt>所在地</dt><dd>-</dd></div>
            <div className="spec"><dt>修理歴</dt><dd>なし</dd></div>
          </dl>
        </div>
        {/* price */}
        <div>
          <div className="price-box">
            <div className="lbl">出品価格</div>
            <div className="val">{yen(v.price)}</div>
          </div>
          <div className="deadline-box">
            <div className="lbl"><i className="ti ti-clock-hour-4"></i>掲載終了日時</div>
            <div className="val">{v.end||"令和8年12月24日"}</div>
          </div>
        </div>
      </div>

      <div className="equip-grid">
        {EQUIP.map(([name,on],i)=>(
          <div key={i} className={"equip"+(on?"":" off")}>
            <span>{name}</span>
            {on ? <i className="ti ti-check yes"></i> : <i className="ti ti-x no"></i>}
          </div>
        ))}
      </div>

      <div className="inspect-card">
        <div className="inspect-card__top">
          <div className="ttl"><i className="ti ti-shield-check"></i>プロ検査・評価</div>
          <div className="inspect-metrics">
            <div className="m"><div className="k">USS点</div><div className="v">{v.inspect||4.5}</div></div>
            <div className="m"><div className="k">内装/外装</div><div className="v white">{v.ext||"B/4"}</div></div>
          </div>
        </div>
        <div className="sub"><div className="k">臭い</div><div className="v">なし</div></div>
      </div>

      <div className="spec-card" style={{marginTop:22}}>
        <div className="spec-card__head">
          <div className="ic"><i className="ti ti-file-text"></i></div>
          <h3>車検証 抜粋詳細</h3>
        </div>
        <dl className="spec-grid three">
          <div className="spec"><dt>初度登録年月</dt><dd>令和5年12月1日</dd></div>
          <div className="spec"><dt>車検満了日</dt><dd>令和8年12月24日</dd></div>
          <div className="spec"><dt>型式</dt><dd>5BA-TAHA45W</dd></div>
          <div className="spec"><dt>型式指定番号</dt><dd>20713</dd></div>
          <div className="spec"><dt>類別区分番号</dt><dd>0004</dd></div>
          <div className="spec"><dt>乗車定員</dt><dd>5</dd></div>
          <div className="spec"><dt>車台番号</dt><dd>TAHA45-0001870</dd></div>
          <div className="spec"><dt>排気量</dt><dd>2.39</dd></div>
          <div className="spec"><dt>原動機の型式</dt><dd>T24A-FTS</dd></div>
        </dl>
      </div>

      <div style={{marginTop:24}}>
        <div className="spec-card__head" style={{marginBottom:14}}>
          <div className="ic"><i className="ti ti-sparkles"></i></div>
          <h3 style={{margin:0,fontSize:16,fontWeight:800,fontStyle:"italic"}}>車両PR・備考</h3>
        </div>
        <div className="spec-card" style={{position:"relative",background:"#f7f8fa"}}>
          <div style={{position:"absolute",top:16,right:20,color:"#c4ccd8",fontSize:11,letterSpacing:1,fontStyle:"italic"}}>SELLER'S NOTE</div>
          <div style={{fontStyle:"italic",color:"#46536b"}}>特記事項はありません。</div>
        </div>
      </div>
    </div>
  );
}

function AssessTab({ v }) {
  return (
    <div className="assess-grid">
      <div>
        <div className="spec-card" style={{borderRadius:18}}>
          <div className="spec-card__head">
            <div className="ic"><i className="ti ti-history"></i></div>
            <h3>査定記録・履歴の蓄積</h3>
            <div style={{marginLeft:"auto",fontSize:11,color:"#aab3c2",fontStyle:"italic"}}>最終更新 2026/6/9 17:45</div>
          </div>
          <div className="assess-input">
            <div className="lbl">新規 最終査定額を記録</div>
            <div className="big"><span className="yen">¥</span> 6,500,000</div>
          </div>
          <div className="assess-table">
            <div className="h"><div>査定日時</div><div>査定者</div><div>APPLE査定</div><div>AI RANGE</div><div style={{textAlign:"right"}}>最終査定額</div></div>
            <div className="r"><div>2026/6/9 17:45</div><div>後藤 俊朗</div><div>¥0</div><div className="blue">594.70万〜687.10万</div><div style={{textAlign:"right"}}>¥6,500,000</div></div>
          </div>
        </div>

        <div className="spec-card" style={{borderRadius:18,marginTop:22}}>
          <div className="spec-card__head">
            <div className="ic"><i className="ti ti-tag"></i></div>
            <h3>出品情報を更新</h3>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
            <div className="assess-input">
              <div className="lbl"><i className="ti ti-trending-up" style={{color:"#ee3124",marginRight:5}}></i>出品価格（税込）</div>
              <div className="big"><span className="yen">¥</span> 7,000,000</div>
            </div>
            <div className="assess-input">
              <div className="lbl"><i className="ti ti-clock-hour-4" style={{marginRight:5}}></i>掲載終了日時</div>
              <div className="big" style={{fontSize:22}}>12/24/2026 07:00 AM</div>
            </div>
          </div>
        </div>
      </div>

      <div className="assess-side">
        <div className="side-dark">
          <div className="top-ic"><i className="ti ti-trending-up"></i></div>
          <div className="center" style={{fontWeight:800,fontStyle:"italic"}}>収益分析</div>
          <div className="side-row"><div className="k">差額査定額</div><div className="v">¥6,500,000</div></div>
          <div className="side-row"><div className="k">現在出品価格</div><div className="v green">¥7,000,000</div></div>
          <div className="side-row" style={{borderTop:"1px solid rgba(255,255,255,.08)",paddingTop:14,marginTop:16}}>
            <div className="k">想定収益見込</div><div className="v red">+ ¥500,000</div></div>
        </div>
        <div className="side-dark">
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{fontWeight:800,fontStyle:"italic",color:"#ee3124"}}><i className="ti ti-robot" style={{marginRight:6}}></i>AF AI査定</div>
            <div style={{fontSize:10,color:"#7b88a0"}}>オークション相場参照</div>
          </div>
          <div className="side-row" style={{marginTop:14}}><div className="k">推定出品金レンジ</div>
            <div style={{display:"flex",justifyContent:"center",gap:14,marginTop:6}}>
              <div className="v" style={{fontSize:16}}>¥5,947,000</div>
              <div className="v" style={{fontSize:16}}>¥6,871,000</div>
            </div>
          </div>
          <button className="btn btn-light btn-sm" style={{width:"100%",marginTop:16,justifyContent:"center",background:"rgba(255,255,255,.06)",color:"#fff",border:"1px solid rgba(255,255,255,.12)"}}>
            <i className="ti ti-info-circle"></i>REASONS</button>
        </div>
        <div className="side-dark">
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{fontWeight:800,fontStyle:"italic"}}><i className="ti ti-chart-bar" style={{marginRight:6,color:"#ee3124"}}></i>市場相場参照</div>
            <div style={{fontSize:10,color:"#7b88a0"}}>直近 12 件</div>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"14px 0"}}>
            <span className="tag tag-amber" style={{fontStyle:"normal"}}>TX HIGH</span>
            <span style={{fontSize:11,color:"#7b88a0"}}>N=235</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:6}}>
            <div className="side-row" style={{margin:0,textAlign:"left"}}><div className="k">下限値</div><div className="v" style={{fontSize:18}}>¥698万</div></div>
            <div className="side-row" style={{margin:0,textAlign:"left"}}><div className="k">上限値</div><div className="v" style={{fontSize:18}}>¥705万</div></div>
          </div>
          <div className="side-row" style={{textAlign:"left",marginTop:14,borderTop:"1px solid rgba(255,255,255,.08)",paddingTop:12}}>
            <div className="k">出回り年式</div><div className="v" style={{fontSize:13}}>2020–2024 ・ 0.8–3.5万km ・ excellent</div></div>
          <button className="btn btn-light btn-sm" style={{width:"100%",marginTop:16,justifyContent:"center",background:"rgba(255,255,255,.06)",color:"#fff",border:"1px solid rgba(255,255,255,.12)"}}>
            <i className="ti ti-list"></i>比較リストを表示</button>
        </div>
      </div>
    </div>
  );
}

function OwnerTab({ v }) {
  return (
    <div className="spec-card" style={{borderRadius:18,padding:0,overflow:"hidden",border:"none",boxShadow:"none"}}>
      <div style={{background:"#f7f8fa",borderRadius:20,padding:"34px 38px",display:"flex",alignItems:"center",gap:30}}>
        <div style={{width:120,height:120,borderRadius:"50%",background:"#fff",display:"flex",
          alignItems:"center",justifyContent:"center",color:"#c4ccd8",fontSize:50,boxShadow:"var(--shadow-card)"}}>
          <i className="ti ti-user"></i>
        </div>
        <div>
          <h2 style={{margin:0,fontStyle:"italic",fontWeight:800,fontSize:28,color:"#1e2a3a"}}>テストアルファード</h2>
          <div style={{display:"flex",gap:10,marginTop:14}}>
            <span className="tag tag-r8" style={{padding:"6px 12px",fontStyle:"italic"}}>ID: CID-00152</span>
            <span className="tag tag-r8" style={{padding:"6px 12px",fontStyle:"italic"}}>藤沢辻堂店</span>
            <span className="tag tag-r8" style={{padding:"6px 12px",fontStyle:"italic"}}>TEL: 1111</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AiTab() {
  return (
    <div style={{padding:"50px 20px",textAlign:"center"}}>
      <div style={{color:"#aab3c2",fontSize:12,letterSpacing:3,fontStyle:"italic"}}>AI 検査レポート</div>
      <div style={{fontSize:18,fontStyle:"italic",fontWeight:700,marginTop:10}}>AI JUDGMENT: <span style={{color:"#16a34a"}}>NO</span></div>
      <button className="btn btn-red" style={{margin:"26px auto 0",padding:"15px 32px"}}>
        <i className="ti ti-shield-check"></i>インタラクティブ3Dレポートを開く <i className="ti ti-chevron-right"></i></button>
      <div style={{color:"#aab3c2",fontSize:12,fontStyle:"italic",marginTop:18}}>新しいタブで開きます</div>
    </div>
  );
}

Object.assign(window, { Dashboard, VehicleList, VehicleDetail });
