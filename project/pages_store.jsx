/* ASSIST FORWARD — store-admin (加盟店) pages */
const { useState } = React;

/* ===================== 加盟店ダッシュボード ===================== */
function StoreDashboard({ go }) {
  const acts = window.AF_DATA.storeActivity;
  const kpis = [
    { cat:"仕入れ / 入札",       name:"交渉中",     val:"4",  icon:"ti-gavel",          acc:"acc-green", ic:"ico-green" },
    { cat:"仕入れ / お気に入り", name:"ウォッチ",   val:"0",  icon:"ti-heart",          acc:"",          ic:"ico-red" },
    { cat:"出品 / 在庫",         name:"自社在庫",   val:"4",  icon:"ti-car",            acc:"acc-red",   ic:"ico-red" },
    { cat:"出品 / 委託",         name:"委託販売中", val:"0",  icon:"ti-heart-handshake", acc:"",         ic:"ico-red" },
    { cat:"出品 / 成約",         name:"今月の売上", val:"¥0", icon:"ti-currency-dollar", acc:"",         ic:"ico-red" }
  ];
  return (
    <div>
      <PageHead title="加盟店ダッシュボード" sub="ようこそ、SELLER STAFF 1 様 (アップル本店)" />
      <div className="kpi-grid five">
        {kpis.map((k,i)=>(
          <div className={"kpi "+k.acc} key={i}>
            <div>
              <div className="kpi__cat">{k.cat}</div>
              <div className="kpi__label" style={{fontStyle:"normal",color:"#46536b"}}>{k.name}</div>
              <div className="kpi__value">{k.val}</div>
            </div>
            <div className={"kpi__icon "+k.ic}><i className={"ti "+k.icon}></i></div>
          </div>
        ))}
      </div>

      <div className="store-cols">
        {/* 仕入れアクティビティ */}
        <div>
          <div className="act-head"><span className="act-ic blue"><i className="ti ti-shopping-bag"></i></span>仕入れアクティビティ</div>
          <div className="panel">
            <div className="panel-row">
              <span className="panel__title jp">入札・ウォッチリスト</span>
              <a className="link-blue" onClick={()=>go("favorites")} href="#favorites">すべて見る</a>
            </div>
            <div className="act-empty">NO DATA</div>
          </div>
        </div>

        {/* 自社出品・委託アクティビティ + 成約パフォーマンス */}
        <div>
          <div className="act-head"><span className="act-ic red"><i className="ti ti-building-store"></i></span>自社出品・委託アクティビティ</div>
          <div className="panel">
            <div className="panel-row">
              <span className="panel__title jp">出品中/委託中の車両</span>
              <a className="link-blue" onClick={()=>go("listings")} href="#listings">管理する</a>
            </div>
            <div style={{marginTop:8}}>
              {acts.map((a,i)=>(
                <div className="li-row" key={i}>
                  <div className="thumb"><i className="ti ti-car"></i></div>
                  <div style={{flex:1}}>
                    <div className="cell-strong">{a.name}</div>
                    <div className="cell-sub">{a.id} ・ {a.price}</div>
                  </div>
                  <div className="li-inq"><i className="ti ti-users"></i>{a.inq} 問い合わせ</div>
                </div>
              ))}
            </div>
            <button className="dashed-btn" onClick={()=>go("listings")}><i className="ti ti-plus"></i>新規下書きを作成</button>
          </div>

          <div className="panel" style={{marginTop:24}}>
            <div className="panel-row">
              <span style={{display:"flex",alignItems:"center",gap:10,fontWeight:800,fontStyle:"italic",fontSize:15,color:"#1d2738"}}>
                <span className="act-ic blue" style={{width:30,height:30,fontSize:16}}><i className="ti ti-activity"></i></span>成約パフォーマンス</span>
              <span className="legend">
                <span className="lg"><span className="dot" style={{background:"#ee3124"}}></span>売上</span>
                <span className="lg"><span className="dot" style={{background:"#2563eb"}}></span>手数料</span>
              </span>
            </div>
            <div className="perf-empty"><span></span><span></span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== 車両検索 ===================== */
function VehicleSearch({ go }) {
  const v = window.AF_DATA.storeSearch;
  const cols = "64px 2.6fr 1.1fr 1fr 0.9fr";
  return (
    <div>
      <PageHead title="ネットワーク車両全件管理" />
      <div className="searchbar">
        <div className="search-row">
          <div className="input input--code"><i className="ti ti-hash"></i><input placeholder="型式番号" /></div>
          <div className="input pill"><i className="ti ti-search"></i><input placeholder="キーワード（車名・ID）で検索..." /></div>
          <button className="sort-btn"><i className="ti ti-adjustments"></i>新着順 <i className="ti ti-chevron-down"></i></button>
        </div>
        <div className="filter-row" style={{gridTemplateColumns:"repeat(4,1fr)"}}>
          {[["掲載期間","すべて表示"],["所在地","都道府県すべて"],["メーカー","メーカーすべて"],["商談ステータス","状態すべて"]].map(([l,o],i)=>(
            <div className="field" key={i}><label>{l}</label>
              <div className="select"><select defaultValue=""><option value="">{o}</option></select></div></div>
          ))}
        </div>
      </div>
      <div className="table-card">
        <div className="thead" style={{gridTemplateColumns:cols}}>
          <div>写真</div><div>車両情報</div><div>出品価格</div><div>状態</div><div style={{textAlign:"right"}}>操作</div>
        </div>
        {v.map((row,i)=>(
          <div className="trow" style={{gridTemplateColumns:cols}} key={i}>
            <VThumb />
            <div>
              <div className="cell-strong">{row.maker} {row.model}</div>
              <div className="cell-sub">{row.id} <span className="tag tag-r8">{row.reg}</span> ・ ---</div>
            </div>
            <div className="cell-strong">{yen(row.price)}</div>
            <div><span className={"tag "+(row.status==="商談中"?"tag-amber":"tag-green")}>{row.status}</span></div>
            <div className="row-actions">
              <button className="btn btn-red btn-sm" onClick={()=>go("search/"+row.id)}>詳細</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===================== 車両詳細 (買い手ビュー) ===================== */
const EQUIP_STORE = [
  ["取扱説明書",0],["保証書・整備手帳",0],["スペアキー",0],
  ["サンルーフ",1],["革シート",1],["カーナビ",1],
  ["後席モニター",0],["緊急通報装置",0],["エアロ",1]
];

function StoreVehicleDetail({ id, go }) {
  const v = window.AF_DATA.storeSearch.find(x=>x.id===id) || window.AF_DATA.storeSearch[0];
  const [sel,setSel] = useState(0);
  return (
    <div>
      <div className="detail-head">
        <button className="back-btn" onClick={()=>go("search")}><i className="ti ti-arrow-left"></i></button>
        <h1 className="page-title">車両詳細</h1>
        <div className="detail-actions">
          <button className="btn btn-light"><i className="ti ti-layout-grid"></i>展開図を表示</button>
        </div>
      </div>
      <div className="tabs-card">
        <div className="tabs"><div className="tab active"><i className="ti ti-file-description"></i>車両概要</div></div>
        <div className="tab-body">
          <div style={{display:"grid",gridTemplateColumns:"1.1fr 1.2fr 0.9fr",gap:26,alignItems:"start"}}>
            <div>
              <div className="hero-photo"><i className="ti ti-car"></i>
                <div className="expand"><i className="ti ti-arrows-maximize"></i></div></div>
              <div className="thumb-strip">
                <span className="thumb-tab">基本写真 <span className="cnt">6</span></span>
                <span className="thumb-tab off">AI詳細撮影 <span className="cnt">14</span></span>
                <span className="thumb-tab off">追加登録 <span className="cnt">2</span></span>
              </div>
              <div className="gallery">
                {[0,1,2,3,4].map(i=>(
                  <div key={i} className={"gthumb"+(i===sel?" sel":"")} onClick={()=>setSel(i)}><i className="ti ti-car"></i></div>
                ))}
              </div>
            </div>
            <div className="spec-card">
              <div className="spec-card__head"><div className="ic"><i className="ti ti-tag"></i></div><h3>車両基本情報</h3></div>
              <dl className="spec-grid">
                <div className="spec"><dt>メーカー</dt><dd>{v.maker}</dd></div>
                <div className="spec"><dt>モデル</dt><dd>{v.model}</dd></div>
                <div className="spec"><dt>グレード</dt><dd>ベースグレード</dd></div>
                <div className="spec"><dt>年式</dt><dd>平成22年</dd></div>
                <div className="spec"><dt>カラー</dt><dd>黒</dd></div>
                <div className="spec"><dt>走行距離</dt><dd>86,089 KM</dd></div>
                <div className="spec"><dt>所在地</dt><dd>-</dd></div>
                <div className="spec"><dt>修理歴</dt><dd>なし</dd></div>
              </dl>
            </div>
            <div>
              <div className="price-box"><div className="lbl">出品価格</div><div className="val">{yen(v.price)}</div></div>
              <div className="deadline-box"><div className="lbl"><i className="ti ti-clock-hour-4"></i>掲載終了 7日 後</div><div className="val">令和8年 3月 5日</div></div>
              <button className="btn" style={{width:"100%",marginTop:16,justifyContent:"center",background:"linear-gradient(135deg,#2f6fed,#2459d6)",color:"#fff",padding:"15px",boxShadow:"0 14px 26px -12px rgba(47,111,237,.7)"}}>
                <i className="ti ti-message"></i>在庫確認・問い合わせ</button>
            </div>
          </div>

          <div className="equip-grid">
            {EQUIP_STORE.map(([name,on],i)=>(
              <div key={i} className={"equip"+(on?"":" off")}>
                <span>{name}</span>{on ? <i className="ti ti-check yes"></i> : <i className="ti ti-x no"></i>}
              </div>
            ))}
          </div>

          <div className="inspect-card">
            <div className="inspect-card__top">
              <div className="ttl"><i className="ti ti-shield-check"></i>プロ検査・評価</div>
              <div className="inspect-metrics">
                <div className="m"><div className="k">USS点</div><div className="v">4.5</div></div>
                <div className="m"><div className="k">内装/外装</div><div className="v white">B/4.5</div></div>
              </div>
            </div>
            <div className="sub"><div className="k">臭い</div><div className="v">なし</div></div>
          </div>

          <div className="spec-card" style={{marginTop:22}}>
            <div className="spec-card__head"><div className="ic"><i className="ti ti-file-text"></i></div><h3>車検証 抜粋詳細</h3></div>
            <dl className="spec-grid three">
              <div className="spec"><dt>初度登録年月</dt><dd>平成22年12月1日</dd></div>
              <div className="spec"><dt>車検満了日</dt><dd>令和8年3月5日</dd></div>
              <div className="spec"><dt>型式</dt><dd>DAA-HY51</dd></div>
              <div className="spec"><dt>型式指定番号</dt><dd>16665</dd></div>
              <div className="spec"><dt>類別区分番号</dt><dd>0010</dd></div>
              <div className="spec"><dt>乗車定員</dt><dd>5</dd></div>
              <div className="spec"><dt>車台番号</dt><dd>HY51-400964</dd></div>
              <div className="spec"><dt>排気量</dt><dd>3.49</dd></div>
              <div className="spec"><dt>原動機の型式</dt><dd>VQ35HR</dd></div>
            </dl>
          </div>

          <div style={{marginTop:24}}>
            <div className="spec-card__head" style={{marginBottom:14}}><div className="ic"><i className="ti ti-sparkles"></i></div>
              <h3 style={{margin:0,fontSize:16,fontWeight:800,fontStyle:"italic"}}>車両PR・備考</h3></div>
            <div className="spec-card" style={{position:"relative",background:"#f7f8fa"}}>
              <div style={{position:"absolute",top:16,right:20,color:"#c4ccd8",fontSize:11,letterSpacing:1,fontStyle:"italic"}}>SELLER'S NOTE</div>
              <div style={{fontStyle:"italic",color:"#46536b"}}>アクセスエボリューションエアロ　トラスト車高調　ZEESマフラー</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===================== お気に入り ===================== */
function Favorites({ go }) {
  const cols = "2.4fr 1.1fr 1.3fr 1.3fr 0.8fr";
  return (
    <div>
      <PageHead title="お気に入り車両">
        <div className="fav-controls">
          <button className="sort-dark"><i className="ti ti-filter"></i>登録順</button>
          <span className="watch-badge">0 車両をウォッチ中</span>
        </div>
      </PageHead>
      <div className="table-card">
        <div className="thead" style={{gridTemplateColumns:cols}}>
          <div>車両情報</div><div>出品金額</div><div>掲載ステータス</div><div>掲載終了日時</div><div style={{textAlign:"right"}}>操作</div>
        </div>
        <div className="empty-big">
          <i className="ti ti-heart empty-ic"></i>
          <div className="empty-title">ウォッチリストに車両がありません</div>
          <div className="empty-sub">検索リストから車両を追加してください。</div>
          <a className="empty-link" onClick={()=>go("search")} href="#search">在庫を探索する <i className="ti ti-arrow-right"></i></a>
        </div>
      </div>
    </div>
  );
}

/* ===================== 問合せ履歴 (買い手) ===================== */
function InquiryHistory() {
  const cols = "2.2fr 1.4fr 1.4fr 1.2fr 1fr 0.7fr";
  return (
    <div>
      <PageHead title="問合せ履歴" sub="あなたが問い合わせた車両の交渉状況とメッセージ履歴です。" />
      <div className="searchbar">
        <div className="input pill"><i className="ti ti-search"></i><input placeholder="車両名、ID、またはやり取りした内容で検索..." /></div>
      </div>
      <div className="table-card">
        <div className="thead" style={{gridTemplateColumns:cols}}>
          <div>車両情報</div><div>最終メッセージ日付</div><div>掲載終了日付</div><div>出品金額</div><div>状態</div><div style={{textAlign:"right"}}>操作</div>
        </div>
        <div className="empty-big">
          <i className="ti ti-message-2 empty-ic"></i>
          <div className="empty-title">問合せ履歴が見つかりません</div>
        </div>
      </div>
      <div className="info-box">
        <div className="info-ic"><i className="ti ti-info-circle"></i></div>
        <div>
          <div className="t">問合せ履歴の利用について</div>
          <div className="b">商談相手とのやり取りは ASSIST FORWARD がモニタリングしています。店名、個人名、直接の連絡先の交換は固く禁じられています。<br/>成約に至った場合は、本プラットフォーム上で成約報告を行ってください。</div>
        </div>
      </div>
    </div>
  );
}

/* ===================== 出品管理 (自社出品・在庫管理) ===================== */
function Inventory() {
  const rows = window.AF_DATA.storeListings;
  const cols = "64px 2.1fr 1fr 1.4fr 1.2fr 1fr";
  const [wiz,setWiz] = useState(false);
  return (
    <div>
      <PageHead title="自社出品・在庫管理">
        <button className="btn btn-red" onClick={()=>setWiz(true)}><i className="ti ti-plus"></i>新規車両登録</button>
      </PageHead>
      <div className="searchbar">
        <div className="search-row">
          <div className="input input--code"><i className="ti ti-hash"></i><input placeholder="型式番号" /></div>
          <div className="input pill"><i className="ti ti-search"></i><input placeholder="キーワード（車名・ID）で検索..." /></div>
          <button className="sort-btn"><i className="ti ti-adjustments"></i>新着順 <i className="ti ti-chevron-down"></i></button>
        </div>
        <div className="filter-row" style={{gridTemplateColumns:"repeat(4,1fr)"}}>
          {[["掲載期間","すべて表示"],["所在地","都道府県すべて"],["メーカー","メーカーすべて"],["商談ステータス","状態すべて"]].map(([l,o],i)=>(
            <div className="field" key={i}><label>{l}</label>
              <div className="select"><select defaultValue=""><option value="">{o}</option></select></div></div>
          ))}
        </div>
      </div>
      <div className="info-box">
        <div className="info-ic"><i className="ti ti-mail"></i></div>
        <div>
          <div className="t">掲載管理・通知メール送信ルール</div>
          <div className="b">経過日数(1/3/6ヶ月)および掲載終了前(1ヶ月/1週間/1日前)のタイミングで、<a style={{color:"#ee3124",fontWeight:700}}>店舗の代表アドレス宛</a>に自動通知メールが送信されます。</div>
        </div>
      </div>
      <div className="table-card">
        <div className="thead" style={{gridTemplateColumns:cols}}>
          <div>写真</div><div>車両情報</div><div>出品価格</div><div>掲載日数 / 終了まで</div><div>状態</div><div style={{textAlign:"right"}}>操作</div>
        </div>
        {rows.map((r,i)=>{
          const draft = r.state==="draft";
          const expired = r.end==="expired";
          return (
            <div className="trow" style={{gridTemplateColumns:cols}} key={i}>
              {r.noimg
                ? <div className="imgnf"><i className="ti ti-photo-off"></i>IMAGE<br/>NOT FOUND</div>
                : <VThumb />}
              <div>
                <div className="cell-strong">{r.maker} {r.model}</div>
                <div className="cell-sub">{r.id} <span className="tag tag-r8" style={{padding:"2px 7px"}}>···</span>{r.loc ? " ・ "+r.loc : " ・"}</div>
              </div>
              <div className="cell-strong">{yen(r.price)}</div>
              <div>
                <div style={{fontSize:13}}><i className="ti ti-calendar-event" style={{color:"#aab3c2",marginRight:5,verticalAlign:-2}}></i>経過: {r.days}日</div>
                {expired
                  ? <div className="cell-sub"><i className="ti ti-clock-hour-4" style={{marginRight:5,verticalAlign:-2}}></i>掲載終了済</div>
                  : <div className="cell-sub" style={{color:r.end==="0"?"#ee3124":"#94a1b6",fontWeight:r.end==="0"?700:400}}><i className="ti ti-clock-hour-4" style={{marginRight:5,verticalAlign:-2}}></i>終了まで: {r.end}日</div>}
              </div>
              <div>
                <span className={"status-select"+(draft?" draft":"")}>
                  <select defaultValue={draft?"下書き":"掲載中"}>
                    {draft ? <><option>下書き</option><option>掲載する</option></> : <><option>掲載中</option><option>商談中</option><option>成約</option><option>掲載終了</option></>}
                  </select>
                </span>
                {draft && <div className="step-badge">STEP 1</div>}
              </div>
              <div className="row-actions">
                {draft
                  ? <><button className="btn btn-orange btn-sm"><i className="ti ti-player-play"></i>再開</button>
                      <button className="del-btn"><i className="ti ti-trash"></i></button></>
                  : <button className="eye-btn"><i className="ti ti-eye-off"></i></button>}
              </div>
            </div>
          );
        })}
      </div>
      {wiz && React.createElement(window.RegisterWizard, { onClose: ()=>setWiz(false) })}
    </div>
  );
}

/* ===================== 商談履歴 (商談・問い合わせ履歴) ===================== */
function NegotiationHistory() {
  const [chat,setChat] = useState(null);
  const rows = window.AF_DATA.storeDeals;
  const cols = "2fr 1.2fr 1.1fr 1.2fr 1fr 0.9fr 0.7fr";
  return (
    <div>
      <PageHead title="商談・問い合わせ履歴" sub="受信および送信した商談メッセージの一覧です。" />
      <div className="searchbar">
        <div className="input pill"><i className="ti ti-search"></i><input placeholder="車両名、ID、メッセージ内容で検索..." /></div>
      </div>
      <div className="table-card">
        <div className="thead" style={{gridTemplateColumns:cols}}>
          <div>車両情報</div><div>最新メッセージ日時</div><div>最新メッセージ</div><div>掲載終了</div><div>出品金額</div><div>状態</div><div style={{textAlign:"right"}}>操作</div>
        </div>
        {rows.map((r,i)=>(
          <div className="trow" style={{gridTemplateColumns:cols}} key={i}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div className="imgnf" style={{width:48,height:36}}><i className="ti ti-photo-off"></i></div>
              <div><div className="cell-strong" style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:160}}>{r.name}</div>
                <div className="cell-sub">{r.id} <span className="tag tag-blue" style={{marginLeft:3}}>{r.store}</span></div></div>
            </div>
            <div style={{fontStyle:"italic",fontSize:13,color:"#46536b"}}><i className="ti ti-clock" style={{marginRight:5,verticalAlign:-2,color:"#aab3c2"}}></i>{r.date}</div>
            <div style={{fontWeight:600}}>{r.msg}</div>
            <div><div style={{fontStyle:"italic",fontSize:13}}><i className="ti ti-calendar" style={{marginRight:5,verticalAlign:-2,color:"#aab3c2"}}></i>{r.end}</div><div style={{fontSize:10,color:"#aab3c2",fontStyle:"italic",letterSpacing:1}}>LISTING EXPIRY</div></div>
            <div className="cell-strong">{yen(r.price)}</div>
            <div><span className="tag tag-amber">{r.status}</span></div>
            <div className="row-actions"><button className="eye-btn" onClick={()=>setChat(r)}><i className="ti ti-message"></i></button></div>
          </div>
        ))}
      </div>
      <div className="list-foot"><span>TOTAL 1 ITEMS | PAGE 1 / 1</span>
        <div className="pager"><button><i className="ti ti-chevron-left"></i></button><button><i className="ti ti-chevron-right"></i></button></div></div>
      <div className="info-box">
        <div className="info-ic"><i className="ti ti-shield"></i></div>
        <div>
          <div className="t">商談履歴のモニタリングについて</div>
          <div className="b">商談はすべて ASSIST FORWARD 本部によってモニタリングされています。トラブル防止のため、直接の取引や連絡先の交換は行わないでください。<br/>メッセージの内容が規約に抵触する場合、アカウントが停止される可能性があります。</div>
        </div>
      </div>
      {chat && <ChatModal r={{veh:chat.name, vid:chat.id, end:chat.end}} onClose={()=>setChat(null)} />}
    </div>
  );
}

/* ===================== 店舗スタッフ管理 ===================== */
function StoreStaff() {
  const rows = window.AF_DATA.storeStaff;
  const cols = "2.4fr 1.6fr 1.2fr 0.8fr";
  const [form,setForm] = useState(false);
  return (
    <div>
      <PageHead title="店舗スタッフ管理" sub="アップル本店 — 1名のスタッフ">
        <button className="btn btn-navy" onClick={()=>setForm(true)}><i className="ti ti-plus"></i>スタッフを追加</button>
      </PageHead>
      <div className="searchbar">
        <div className="input pill"><i className="ti ti-search"></i><input placeholder="氏名・ユーザー名で検索..." /></div>
      </div>
      <div className="table-card">
        <div className="thead" style={{gridTemplateColumns:cols}}>
          <div>ユーザー</div><div>最終ログイン</div><div>ステータス</div><div style={{textAlign:"right"}}>操作</div>
        </div>
        {rows.map((r,i)=>(
          <div className="trow" style={{gridTemplateColumns:cols}} key={i}>
            <div className="avatar-row">
              <Avatar name={r.name} hue={r.hue} />
              <div><div className="cell-strong">{r.name}</div><div className="cell-sub">{r.handle}</div></div>
            </div>
            <div className="muted" style={{fontStyle:"italic"}}>{r.last}</div>
            <div><span className="status-pill"><span className="dot dot-green"></span>有効</span></div>
            <div className="row-actions">
              <button className="iconlink" onClick={()=>setForm(true)}><i className="ti ti-pencil"></i></button>
              <button className="iconlink"><i className="ti ti-eye-off"></i></button>
              <button className="iconlink"><i className="ti ti-trash"></i></button>
            </div>
          </div>
        ))}
      </div>
      <div className="list-foot"><span>全1件中 1/1ページ</span>
        <div className="pager"><button><i className="ti ti-chevron-left"></i></button><button><i className="ti ti-chevron-right"></i></button></div></div>
      {form && React.createElement(window.StaffForm, { onClose:()=>setForm(false) })}
    </div>
  );
}

Object.assign(window, { StoreDashboard, VehicleSearch, StoreVehicleDetail, Favorites, InquiryHistory, Inventory, NegotiationHistory, StoreStaff });
