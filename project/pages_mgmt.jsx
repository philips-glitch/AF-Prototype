/* ASSIST FORWARD — management pages */
const { useState, useEffect, useRef } = React;

/* ===================== NEGOTIATION (応札・商談管理) ===================== */
function Negotiation() {
  const [chat,setChat] = useState(null);
  const rows = window.AF_DATA.negotiations;
  const cols = "1.1fr 2fr 1.6fr 1.4fr 0.7fr 1fr";
  return (
    <div>
      <PageHead title="応札・商談管理" sub="全店舗間の商談ステータスとメッセージのモニタリングを行います。" />
      <div className="searchbar">
        <div className="search-row">
          <div className="input pill"><i className="ti ti-search"></i>
            <input placeholder="車両名、出品店舗、商談申込店で検索..." /></div>
          <button className="sort-btn"><i className="ti ti-adjustments"></i>メッセージ新着順</button>
        </div>
      </div>
      <div className="table-card">
        <div className="thead" style={{gridTemplateColumns:cols}}>
          <div>最新メッセージ</div><div>車両情報 / 掲載終了</div><div>出品店舗</div>
          <div>商談申込店</div><div style={{textAlign:"center"}}>メッセージ数</div><div style={{textAlign:"right"}}>操作</div>
        </div>
        {rows.map((r,i)=>(
          <div className="trow" style={{gridTemplateColumns:cols}} key={i}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <i className="ti ti-clock-hour-4" style={{color:"#ee3124"}}></i>
              <span style={{fontSize:13,fontStyle:"italic",color:r.date==="-"?"#aab3c2":"#46536b"}}>{r.date}</span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div className="thumb" style={{width:54,height:40,fontSize:8,color:"#aab3c2",fontWeight:700}}>NO<br/>IMAGE</div>
              <div>
                <div className="cell-strong">{r.veh}</div>
                <div className="cell-sub">{r.vid} <span className={"tag "+(r.endLate?"tag-amber":"tag-r8")} style={{marginLeft:4,fontStyle:"italic"}}>終了: {r.end}</span></div>
              </div>
            </div>
            <div className="muted"><i className="ti ti-building-store" style={{marginRight:6,verticalAlign:-2}}></i>{r.seller}</div>
            <div className="muted"><i className="ti ti-building-store" style={{marginRight:6,verticalAlign:-2}}></i>{r.buyer}</div>
            <div style={{textAlign:"center",fontWeight:700}}>{r.msgs}</div>
            <div className="row-actions">
              <button className="btn btn-navy btn-sm" onClick={()=>setChat(r)}><i className="ti ti-message"></i>メッセージを閲覧</button>
            </div>
          </div>
        ))}
      </div>
      {chat && <ChatModal r={chat} onClose={()=>setChat(null)} />}
    </div>
  );
}

function ChatModal({ r, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="chat-modal" onClick={e=>e.stopPropagation()}>
        <div className="chat-head">
          <div className="chat-head__top">
            <div>
              <h3>{r.veh}</h3>
              <div className="mode">本部モニタリングモード ・ CONV-ID: BD7F50E5</div>
            </div>
            <button className="chat-close" onClick={onClose}><i className="ti ti-x"></i></button>
          </div>
          <div className="chat-parties">
            <span className="p"><i className="ti ti-building-store"></i>出品店 (売リ手): 019400AA...</span>
            <span className="p">商談申込店 (買い手): 019D7BC2... <i className="ti ti-phone" style={{color:"#ee3124"}}></i></span>
          </div>
        </div>
        <div className="chat-veh">
          <div className="vthumb"><i className="ti ti-car"></i></div>
          <div>
            <div className="vt">{r.veh}</div>
            <div className="vp">¥480,000</div>
          </div>
          <span className="online">オンライン</span>
        </div>
        <div className="chat-body">
          <div className="chat-day">6月1日月曜日</div>
          <div className="msg">
            <div className="msg__meta">
              <div className="msg__name">星野 龍史 <span className="role-pill">販売者</span></div>
              <div className="bubble">興味あります</div>
              <div className="msg__time">04:44 PM</div>
            </div>
            <div className="msg__av"><i className="ti ti-user"></i></div>
          </div>
        </div>
        <div className="chat-foot">
          <div className="lock">閲覧のみ - 管理者はこの会話に参加できません</div>
        </div>
      </div>
    </div>
  );
}

/* ===================== CUSTOMERS (顧客管理) ===================== */
function Customers() {
  const rows = window.AF_DATA.customers;
  const cols = "2.2fr 1.8fr 1.3fr 1fr 0.8fr";
  return (
    <div>
      <PageHead title="顧客管理" sub="車両の委託者（一般顧客）の情報を一元管理します。">
        <button className="btn btn-red"><i className="ti ti-plus"></i>新規顧客登録</button>
      </PageHead>
      <div className="searchbar">
        <div className="input pill"><i className="ti ti-search"></i>
          <input placeholder="顧客名、ID、連絡先、LINE IDで検索..." /></div>
      </div>
      <div className="table-card">
        <div className="thead" style={{gridTemplateColumns:cols}}>
          <div>氏名 / 顧客ID</div><div>連絡先 / LINE</div><div>担当店舗</div><div>最終同期</div><div style={{textAlign:"right"}}>操作</div>
        </div>
        {rows.map((r,i)=>(
          <div className="trow" style={{gridTemplateColumns:cols}} key={i}>
            <div className="avatar-row">
              <div className="avatar-md" style={{background:"#eef1f6",color:"#aab3c2",fontSize:18}}><i className="ti ti-user"></i></div>
              <div><div className="cell-strong">{r.name}</div><div className="cell-sub">{r.id}</div></div>
            </div>
            <div>
              <div className="contact-line"><i className="ti ti-phone"></i>{r.tel}</div>
              <div className="contact-line mail"><i className="ti ti-mail"></i>{r.mail}</div>
              {r.line && <div className="contact-line mail"><i className="ti ti-brand-line"></i>{r.line}</div>}
            </div>
            <div className="muted"><i className="ti ti-building-store" style={{marginRight:6,verticalAlign:-2}}></i>{r.store}</div>
            <div className="muted" style={{fontStyle:"italic"}}><i className="ti ti-clock" style={{marginRight:6,verticalAlign:-2}}></i>{r.sync}</div>
            <div className="row-actions">
              <button className="iconlink"><i className="ti ti-pencil"></i></button>
              <button className="iconlink"><i className="ti ti-trash"></i></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===================== STORES (店舗マスタ管理) ===================== */
function Stores() {
  const rows = window.AF_DATA.stores;
  const cols = "2.4fr 0.9fr 1fr 2fr 1fr 0.8fr";
  const [form,setForm] = useState(false);
  return (
    <div>
      <PageHead title="店舗マスタ管理" sub="ネットワークに加盟している店舗情報の閲覧・編集を行います。">
        <button className="btn btn-red" onClick={()=>setForm(true)}><i className="ti ti-plus"></i>新規店舗登録</button>
      </PageHead>
      <div className="searchbar">
        <div className="input pill"><i className="ti ti-search"></i>
          <input placeholder="店舗名、住所、電話番号で検索..." /></div>
      </div>
      <div className="table-card">
        <div className="thead" style={{gridTemplateColumns:cols}}>
          <div>店舗情報 / ID</div><div>種別</div><div>所在地</div><div>連絡先</div><div>状態</div><div style={{textAlign:"right"}}>操作</div>
        </div>
        {rows.map((r,i)=>(
          <div className="trow" style={{gridTemplateColumns:cols}} key={i}>
            <div className="avatar-row">
              <div className="shop-ic"><i className="ti ti-building-store"></i></div>
              <div><div className="cell-strong">{r.name}</div><div className="cell-sub">{r.id}</div></div>
            </div>
            <div><span className={"tag "+(r.type==="直営"?"tag-blue":"tag-amber")}>{r.type}</span></div>
            <div className="muted"><i className="ti ti-map-pin" style={{marginRight:6,verticalAlign:-2}}></i>{r.region}</div>
            <div>
              <div className="contact-line"><i className="ti ti-phone"></i>{r.tel}</div>
              <div className="contact-line mail"><i className="ti ti-mail"></i>{r.mail}</div>
            </div>
            <div><StatusActive /></div>
            <div className="row-actions">
              <button className="iconlink" onClick={()=>setForm(true)}><i className="ti ti-pencil"></i></button>
              <button className="iconlink"><i className="ti ti-trash"></i></button>
            </div>
          </div>
        ))}
      </div>
      {form && React.createElement(window.StoreForm, { onClose:()=>setForm(false) })}
    </div>
  );
}

/* ===================== STORE USERS (店舗ユーザー管理) ===================== */
function StoreUsers() {
  const rows = window.AF_DATA.storeUsers;
  const cols = "2.2fr 1.6fr 1fr 1.4fr 0.7fr";
  const [form,setForm] = useState(false);
  return (
    <div>
      <PageHead title="店舗ユーザー管理" sub="各店舗に紐づくスタッフのアカウント管理を行います。">
        <button className="btn btn-navy" onClick={()=>setForm(true)}><i className="ti ti-plus"></i>新規ユーザー登録</button>
      </PageHead>
      <div className="searchbar">
        <div className="input pill"><i className="ti ti-search"></i>
          <input placeholder="ID、氏名、または店舗名で検索..." /></div>
      </div>
      <div className="table-card">
        <div className="thead" style={{gridTemplateColumns:cols}}>
          <div>ユーザー名 / ID</div><div>所属店舗</div><div>状態</div><div>最終ログイン</div><div style={{textAlign:"right"}}>編集</div>
        </div>
        {rows.map((r,i)=>(
          <div className="trow" style={{gridTemplateColumns:cols}} key={i}>
            <div className="avatar-row">
              <Avatar name={r.name} hue={r.hue} />
              <div><div className="cell-strong">{r.name}</div><div className="cell-sub">{r.handle}</div></div>
            </div>
            <div className="muted" style={{fontStyle:"italic"}}><i className="ti ti-building-store" style={{marginRight:6,verticalAlign:-2}}></i>{r.store}</div>
            <div><StatusActive /></div>
            <div className="muted" style={{fontStyle:"italic"}}>{r.last}</div>
            <div className="row-actions">
              <button className="iconlink" onClick={()=>setForm(true)}><i className="ti ti-pencil"></i></button>
              <button className="iconlink"><i className="ti ti-trash"></i></button>
            </div>
          </div>
        ))}
      </div>
      {form && React.createElement(window.StoreUserForm, { onClose:()=>setForm(false) })}
    </div>
  );
}

/* ===================== ADMIN USERS (アドミンユーザー) ===================== */
function AdminUsers() {
  const rows = window.AF_DATA.adminUsers;
  const cols = "2fr 1.6fr 2fr 1.2fr 0.7fr";
  const [form,setForm] = useState(false);
  return (
    <div>
      <PageHead title="アドミンユーザー管理" sub="本部システム管理権限を持つユーザーの管理を行います。">
        <button className="btn btn-red" onClick={()=>setForm(true)}><i className="ti ti-plus"></i>新規管理者登録</button>
      </PageHead>
      <div className="table-card">
        <div className="thead" style={{gridTemplateColumns:cols}}>
          <div>名前 / ID</div><div>権限レベル</div><div>メールアドレス</div><div>最終ログイン</div><div style={{textAlign:"right"}}>操作</div>
        </div>
        {rows.map((r,i)=>(
          <div className="trow" style={{gridTemplateColumns:cols}} key={i}>
            <div className="avatar-row">
              <div className="avatar-md" style={{background:"#0c1322",color:"#fff",fontSize:16}}><i className="ti ti-shield-check"></i></div>
              <div><div className="cell-strong">{r.name}</div><div className="cell-sub">{r.handle}</div></div>
            </div>
            <div><span className="tag" style={{background:"#fdeeec",color:"#ee3124",fontStyle:"italic"}}>{r.role}</span></div>
            <div className="muted">{r.mail}</div>
            <div className="muted" style={{fontStyle:"italic"}}>{r.last}</div>
            <div className="row-actions">
              <button className="iconlink"><i className="ti ti-pencil"></i></button>
              <button className="iconlink"><i className="ti ti-trash"></i></button>
            </div>
          </div>
        ))}
      </div>
      <div className="list-foot">
        <span>全 3 名 | ページ 1 / 1</span>
        <div className="pager"><button><i className="ti ti-chevron-left"></i></button><button><i className="ti ti-chevron-right"></i></button></div>
      </div>
      {form && React.createElement(window.AdminUserForm, { onClose:()=>setForm(false) })}
    </div>
  );
}

/* ===================== MASTER DATA REVIEW (マスタデータレビュー) ===================== */
function MasterReview() {
  const [seg,setSeg] = useState("pending");
  const rows = window.AF_DATA.masterReview;
  const cols = "1fr 1.6fr 2fr 1.8fr 1.3fr 0.8fr";
  return (
    <div>
      <PageHead title="マスタデータレビュー" sub="ユーザーから申請された車両グレードをマスタ登録前に審査します。">
        <div className="seg">
          <button className={seg==="pending"?"on":""} onClick={()=>setSeg("pending")}>申請中</button>
          <button className={seg==="approved"?"on":""} onClick={()=>setSeg("approved")}>承認済み</button>
          <button className={seg==="rejected"?"on":""} onClick={()=>setSeg("rejected")}>却下</button>
        </div>
      </PageHead>
      <div className="table-card">
        <div className="thead" style={{gridTemplateColumns:cols}}>
          <div>型式指定 / 類別区分</div><div>メーカー / 車種</div><div>申請グレード</div>
          <div>申請日時</div><div>登録車両</div><div style={{textAlign:"right"}}>操作</div>
        </div>
        {rows.map((r,i)=>(
          <div className="trow" style={{gridTemplateColumns:cols}} key={i}>
            <div><div style={{fontWeight:700}}>{r.spec}</div><div className="cell-sub">/ {r.cls}</div></div>
            <div className="cell-strong" style={{fontWeight:600}}>{r.maker} / {r.model}</div>
            <div><span style={{background:"#0c1322",color:"#fff",fontSize:12,fontWeight:700,padding:"7px 14px",borderRadius:9,display:"inline-block"}}>{r.grade}</span></div>
            <div><div style={{fontStyle:"italic",fontSize:13}}>{r.date}</div><div className="cell-sub">申請者: {r.by}</div></div>
            <div>{r.veh ? <><div style={{fontStyle:"italic",fontWeight:700}}>{r.veh}</div><div className="cell-sub">{r.vin}</div></> : <div className="cell-sub" style={{fontStyle:"italic"}}>{r.vin}</div>}</div>
            <div className="row-actions">
              <button className="iconlink" style={{color:"#16a34a"}}><i className="ti ti-circle-check"></i></button>
              <button className="iconlink" style={{color:"#aab3c2"}}><i className="ti ti-circle-x"></i></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===================== AF INSPECT (AFインスペクト) ===================== */
function AFInspect() {
  const lineRef = useRef(null);
  const donutRef = useRef(null);
  useEffect(() => {
    if (!window.Chart) return;
    const labels = ["05/12","05/15","05/18","05/21","05/24","05/27","05/30","06/02","06/05","06/10"];
    const line = new Chart(lineRef.current, {
      type:"line",
      data:{ labels, datasets:[{ data:[0,1,0,0,0,0,0,0,1,0], borderColor:"#ee3124",
        backgroundColor:"rgba(238,49,36,.08)", fill:true, tension:.45, pointRadius:0, borderWidth:2 }] },
      options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}},
        scales:{ y:{beginAtZero:true,max:4,ticks:{stepSize:1,color:"#9aa6ba"},grid:{color:"#eef1f5"},border:{display:false}},
                 x:{ticks:{color:"#9aa6ba",font:{size:10}},grid:{display:false},border:{display:false}} } }
    });
    const donut = new Chart(donutRef.current, {
      type:"doughnut",
      data:{ labels:["保留中","処理中","完了"], datasets:[{ data:[1,1,9],
        backgroundColor:["#f59e0b","#3b82f6","#22c55e"], borderWidth:0 }] },
      options:{ responsive:true, maintainAspectRatio:false, cutout:"68%",
        plugins:{ legend:{display:false} } }
    });
    return ()=>{ line.destroy(); donut.destroy(); };
  }, []);

  const kpis = [
    { label:"検査総数", value:"11", icon:"ti-clipboard-check", cls:"ico-blue", c:"#1d2738" },
    { label:"今月の完了数", value:"1", icon:"ti-circle-check", cls:"ico-green", c:"#1d2738" },
    { label:"保留中・処理中", value:"0", icon:"ti-clock", cls:"ico-amber", c:"#d97706" },
    { label:"平均合格率", value:"39.24%", icon:"ti-percentage", cls:"ico-blue", c:"#ee3124" }
  ];
  const rows = window.AF_DATA.afInspect;
  const cols = "1.2fr 2fr 0.9fr 1.6fr 0.9fr 1fr 0.7fr";
  return (
    <div>
      <PageHead title="AFインスペクト" sub="AFインスペクトモバイルアプリからの車両検査データ" />
      <div className="kpi-grid">
        {kpis.map((k,i)=>(
          <div className="kpi" key={i}>
            <div><div className="kpi__label">{k.label}</div>
              <div className="kpi__value" style={{color:k.c}}>{k.value}</div></div>
            <div className={"kpi__icon "+k.cls}><i className={"ti "+k.icon}></i></div>
          </div>
        ))}
      </div>
      <div className="chart-2col">
        <div className="panel">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div className="panel__title jp">日別検査数</div>
            <div style={{fontSize:11,color:"#aab3c2",fontStyle:"italic"}}>過去30日</div>
          </div>
          <div style={{height:300,marginTop:14}}><canvas ref={lineRef}></canvas></div>
        </div>
        <div className="panel">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div className="panel__title jp">ステータス内訳</div>
            <div style={{fontSize:11,color:"#aab3c2",fontStyle:"italic"}}>全検査</div>
          </div>
          <div style={{height:230,marginTop:14}}><canvas ref={donutRef}></canvas></div>
          <div style={{display:"flex",gap:24,justifyContent:"center",marginTop:14,fontSize:13}}>
            <span><span className="dot" style={{background:"#f59e0b",marginRight:7}}></span>保留中</span>
            <span><span className="dot" style={{background:"#3b82f6",marginRight:7}}></span>処理中</span>
            <span><span className="dot" style={{background:"#22c55e",marginRight:7}}></span>完了</span>
          </div>
        </div>
      </div>

      <div className="searchbar" style={{marginTop:24}}>
        <div className="input pill"><i className="ti ti-search"></i>
          <input placeholder="ナンバー・メーカー・モデルで検索" /></div>
        <div className="filter-row" style={{gridTemplateColumns:"repeat(4,1fr)"}}>
          <div className="field"><label>ステータス</label><div className="select"><select><option>すべてのステータス</option></select></div></div>
          <div className="field"><label>ボディタイプ</label><div className="select"><select><option>すべてのボディタイプ</option></select></div></div>
          <div className="field"><label>開始日</label><input className="login-input" style={{height:46,borderRadius:12,fontWeight:600,fontSize:13.5}} type="date" /></div>
          <div className="field"><label>終了日</label><input className="login-input" style={{height:46,borderRadius:12,fontWeight:600,fontSize:13.5}} type="date" /></div>
        </div>
      </div>

      <div className="table-card">
        <div className="thead" style={{gridTemplateColumns:cols}}>
          <div>ナンバー</div><div>車両</div><div>ボディ</div><div>ポイント（合/不/判/未）</div>
          <div>ステータス</div><div>登録日 <i className="ti ti-arrow-down" style={{fontSize:12}}></i></div><div style={{textAlign:"right"}}>操作</div>
        </div>
        {rows.map((r,i)=>(
          <div className="trow" style={{gridTemplateColumns:cols}} key={i}>
            <div className="cell-strong">{r.plate}</div>
            <div><div style={{fontWeight:600}}>{r.veh}</div>{r.vyear && <div className="cell-sub">{r.vyear}</div>}</div>
            <div className="muted">{r.body}</div>
            <div className="af-pts">
              <span className="g">{r.pass}</span> / <span className="b">{r.fail}</span> / <span className="u">{r.na}</span> / <span className="n">{r.un}</span>
              <small>合格 不合格 判別不能 未撮影</small>
            </div>
            <div><span className={"tag "+(r.status==="完了"?"tag-green":r.status==="処理中"?"tag-blue":"tag-amber")}>{r.status}</span></div>
            <div className="muted" style={{fontStyle:"italic"}}>{r.date}</div>
            <div className="row-actions"><button className="btn btn-navy btn-sm">詳細</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Negotiation, ChatModal, Customers, Stores, StoreUsers, AdminUsers, MasterReview, AFInspect });
