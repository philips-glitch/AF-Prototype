/* ASSIST FORWARD — 電子契約 list/archive + detail — Phase 2 */
const { useState } = React;

function yen2(n){ return "¥" + Number(n).toLocaleString("ja-JP"); }

function ECTypeChip({ type }) {
  const m = window.AF_CONTRACTS.TYPE_META[type];
  return (
    <div className="ec-type">
      <div className="ec-type-ic" style={{background:m.bg,color:m.color}}><i className={"ti "+m.icon}></i></div>
      <div><div className="nm">{m.label}</div><div className="sb">{m.sub}</div></div>
    </div>
  );
}
function ECStatus({ status }) {
  const s = window.AF_CONTRACTS.STATUS_META[status];
  return <span className={"ec-status "+s.cls}><i className={"ti "+s.icon}></i>{s.label}</span>;
}

/* ===================== LIST / ARCHIVE ===================== */
function Contracts({ go, role }) {
  const D = window.AF_CONTRACTS;
  const [wiz,setWiz] = useState(false);
  const [filter,setFilter] = useState("all");
  const rows = filter==="all" ? D.contracts : D.contracts.filter(c=>c.type===filter);

  const kpis = [
    { label:"契約書 総数", value:D.contracts.length, icon:"ti-files", cls:"ico-blue" },
    { label:"署名待ち", value:D.contracts.filter(c=>c.status==="awaiting_sign"||c.status==="partial").length, icon:"ti-clock-hour-4", cls:"ico-amber" },
    { label:"本部承認待ち", value:D.contracts.filter(c=>c.status==="hq_review").length, icon:"ti-gavel", cls:"ico-purple" },
    { label:"署名済 (完了)", value:D.contracts.filter(c=>c.status==="completed").length, icon:"ti-circle-check", cls:"ico-green" }
  ];
  const cols = "1.3fr 1.7fr 1.8fr 1.6fr 1.1fr 1.1fr 0.7fr";
  const tabs = [["all","すべて"],["purchase","買取契約書"],["consign","委託販売"],["order","発注書・請求書"],["confirm","確認書"]];

  return (
    <div>
      <PageHead title="電子契約管理" sub={role==="hq"?"ネットワーク全体の電子契約を一元管理します。 (法定保管 7年)":"店舗の電子契約の作成・署名状況を管理します。"}>
        <button className="btn btn-red" onClick={()=>setWiz(true)}><i className="ti ti-plus"></i>契約書を作成</button>
      </PageHead>

      <div className="kpi-grid">
        {kpis.map((k,i)=>(
          <div className="kpi" key={i}>
            <div><div className="kpi__label">{k.label}</div><div className="kpi__value">{k.value}</div></div>
            <div className={"kpi__icon "+k.cls}><i className={"ti "+k.icon}></i></div>
          </div>
        ))}
      </div>

      <div className="searchbar" style={{marginTop:24}}>
        <div className="search-row">
          <div className="input pill"><i className="ti ti-search"></i><input placeholder="書類番号、車両、当事者で検索..." /></div>
          <button className="sort-btn"><i className="ti ti-adjustments"></i>作成日 新しい順</button>
        </div>
        <div className="seg" style={{marginTop:16}}>
          {tabs.map(([k,l])=>(
            <button key={k} className={filter===k?"on":""} onClick={()=>setFilter(k)}>{l}</button>
          ))}
        </div>
      </div>

      <div className="table-card">
        <div className="thead" style={{gridTemplateColumns:cols}}>
          <div>書類番号</div><div>契約種別</div><div>車両 / 当事者</div><div>当事者 (売主 → 買主)</div>
          <div>契約金額</div><div>ステータス</div><div style={{textAlign:"right"}}>操作</div>
        </div>
        {rows.map((c,i)=>(
          <div className="trow" style={{gridTemplateColumns:cols}} key={i}>
            <div>
              <div className="ec-serial">{c.no}</div>
              <div className="ec-retention"><i className="ti ti-archive" style={{fontSize:12}}></i>7年保管</div>
            </div>
            <ECTypeChip type={c.type} />
            <div>
              <div className="cell-strong">{c.veh}</div>
              <div className="cell-sub">{c.vid}</div>
            </div>
            <div style={{fontSize:13}}>
              <div style={{fontWeight:700}}>{c.seller}</div>
              <div className="cell-sub" style={{display:"flex",alignItems:"center",gap:5}}><i className="ti ti-arrow-down" style={{fontSize:13}}></i>{c.buyer}</div>
            </div>
            <div className="cell-strong">{yen2(c.amount)}</div>
            <div><ECStatus status={c.status} /></div>
            <div className="row-actions">
              <button className="btn btn-navy btn-sm" onClick={()=>go("contracts/"+c.no)}>開く</button>
            </div>
          </div>
        ))}
      </div>
      <div className="list-foot">
        <span>全 {rows.length} 件 ・ 法定保管期間 7年 (電子帳簿保存法対応)</span>
        <div className="pager"><button><i className="ti ti-chevron-left"></i></button><button><i className="ti ti-chevron-right"></i></button></div>
      </div>

      {wiz && React.createElement(window.ContractWizard, { onClose:()=>setWiz(false), go })}
    </div>
  );
}

/* ===================== DETAIL ===================== */
function ContractDetail({ no, go, role }) {
  const D = window.AF_CONTRACTS;
  const c = D.contracts.find(x=>x.no===no) || D.contracts[0];
  const m = D.TYPE_META[c.type];
  const [copy,setCopy] = useState("customer");
  const isPurchase = c.type==="purchase";

  // timeline derived from status
  const order = ["draft","hq_review","awaiting_sign","partial","completed"];
  const steps = [
    { key:"created", t:"契約書 作成", s:c.created+" ・ "+c.store },
    ...(c.type==="consign" ? [{ key:"hq_review", t:"本部 承認", s:"本部が売主・買主間を仲介・承認" }] : []),
    { key:"agreed",  t:"約款 同意 (顧客)", s:"画面表示の上、同意チェック" },
    { key:"sent",    t:"署名URL 送信", s:(c.esign==="sms"?"SMS":"メール")+"で署名URLを送付" },
    { key:"signed1", t:isPurchase?"顧客 (売主) 署名":"売主 署名", s:"本人のデバイスで署名" },
    { key:"signed2", t:isPurchase?"加盟店 (買主) 署名":"買主 署名", s:"本人のデバイスで署名" },
    { key:"done",    t:"契約 成立 ・ PDF保管", s:"書類番号付与 ・ 7年保管" }
  ];
  // mark progress
  const prog = { draft:1, hq_review:2, awaiting_sign:3, partial:5, completed:99 }[c.status];
  let idx = 0;

  return (
    <div>
      <div className="detail-head">
        <button className="back-btn" onClick={()=>go("contracts")}><i className="ti ti-arrow-left"></i></button>
        <div>
          <h1 className="page-title">{m.label}</h1>
          <div className="page-sub"><span className="ec-serial">{c.no}</span> ・ {m.sub}</div>
        </div>
        <div className="detail-actions">
          <button className="btn btn-light"><i className="ti ti-printer"></i>PDF出力</button>
          {c.status==="draft" && <button className="btn btn-red"><i className="ti ti-send"></i>署名を依頼</button>}
          {(c.status==="awaiting_sign"||c.status==="partial") && <button className="btn btn-red"><i className="ti ti-bell"></i>署名リマインド</button>}
          {c.status==="hq_review" && role==="hq" && <button className="btn btn-red"><i className="ti ti-check"></i>承認して進める</button>}
        </div>
      </div>

      <div className="ec-detail-grid">
        {/* document preview */}
        <div className="ec-paper">
          <div className="ec-paper-band">
            <div className="ttl">{m.label}{isPurchase && (copy==="customer"?"（お客様控）":"（店舗控）")}</div>
            <div className="meta">{c.no}<br/>発行日 {c.created}</div>
          </div>
          <div className="ec-paper-body">
            {isPurchase && (
              <div style={{marginBottom:22}}>
                <div className="ec-copy-toggle" style={{maxWidth:280}}>
                  <button className={copy==="customer"?"on":""} onClick={()=>setCopy("customer")}>お客様控</button>
                  <button className={copy==="store"?"on":""} onClick={()=>setCopy("store")}>店舗控</button>
                </div>
              </div>
            )}

            <div className="ec-sec">
              <div className="ec-sec-h">車両情報</div>
              <div className="ec-kv three">
                <div className="row"><span className="k">メーカー / 車名</span><span className="v">{c.veh}</span></div>
                <div className="row"><span className="k">車台番号</span><span className="v">TAHA45-0001870</span></div>
                <div className="row"><span className="k">登録番号</span><span className="v">三重 300 あ 12-34</span></div>
                <div className="row"><span className="k">年式 / 走行</span><span className="v">R5 ・ 15,000 km</span></div>
                <div className="row"><span className="k">色</span><span className="v">ブラック</span></div>
                <div className="row"><span className="k">車検満了日</span><span className="v">R8/12/24</span></div>
              </div>
            </div>

            {isPurchase && (
              <div className="ec-sec">
                <div className="ec-sec-h">売主（お客様）情報 ・ 所有者/使用者</div>
                <div className="ec-kv">
                  <div className="row"><span className="k">氏名</span><span className="v">{c.seller}</span></div>
                  <div className="row"><span className="k">生年月日</span><span className="v">昭和60年4月1日</span></div>
                  <div className="row"><span className="k">住所</span><span className="v">三重県四日市市○○町1-2-3</span></div>
                  <div className="row"><span className="k">連絡先</span><span className="v">090-1234-5678</span></div>
                  <div className="row"><span className="k">所有者 (車検証OCR)</span><span className="v">{c.seller}</span></div>
                  <div className="row"><span className="k">使用者 (車検証OCR)</span><span className="v">{c.seller}（同上）</span></div>
                </div>
              </div>
            )}

            {isPurchase && (
              <div className="ec-sec">
                <div className="ec-sec-h">告知事項（売主申告）</div>
                <div className="ec-chk-list">
                  {D.declarations.map((d,i)=>(
                    <div className="ec-chk-item" key={i}>
                      <i className={"ti "+(d.ai==="確認要"?"ti-alert-triangle":"ti-circle-check")} style={d.ai==="確認要"?{color:"#d97706"}:{}}></i>
                      {d.k}: <b style={{marginLeft:4,fontStyle:"italic"}}>{d.ai==="確認要"?"確認済":"なし"}</b>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="ec-sec">
              <div className="ec-sec-h">支払い内訳</div>
              <div className="ec-pay">
                <div className="ec-pay-row"><span className="k">契約金額</span><span className="v">{yen2(c.amount)}</span></div>
                <div className="ec-pay-row minus"><span className="k">自動車税 減算</span><span className="v">- ¥12,000</span></div>
                <div className="ec-pay-row"><span className="k">リサイクル預託金</span><span className="v">¥11,540</span></div>
                <div className="ec-pay-row minus"><span className="k">ローン残債 <span className="ec-defer"><i className="ti ti-clock"></i>確認書にて確定</span></span><span className="v">引渡時確定</span></div>
                <div className="ec-pay-row total"><span className="k">差引支払額（オーナー手取）</span><span className="v">{yen2(c.amount-12000+11540)}</span></div>
              </div>
              <div className="ec-note-amber" style={{marginTop:14}}>
                <i className="ti ti-info-circle"></i>
                <span>ローン残債は契約後・引渡前に変動する可能性があるため、引渡時に「確認書」を再交換し最終振込額を確定します。(A3)</span>
              </div>
            </div>

            <div className="ec-sec">
              <div className="ec-sec-h">必要書類 チェックリスト</div>
              <div className="ec-chk-list" style={{gridTemplateColumns:"repeat(4,1fr)"}}>
                {D.reqDocs.map((d,i)=>(
                  <div className="ec-chk-item" key={i}><i className={"ti "+(i<6?"ti-checkbox":"ti-square")} style={i<6?{}:{color:"#c8d0db"}}></i>{d}</div>
                ))}
              </div>
            </div>

            {role==="hq" && (
              <div className="ec-internal">
                <div className="hd"><i className="ti ti-lock"></i>本部内部処理項目<span className="lock">加盟店非表示 (A16)</span></div>
                <div className="ec-kv three">
                  <div className="row"><span className="k">店舗名</span><span className="v">{c.store}</span></div>
                  <div className="row"><span className="k">担当者</span><span className="v">後藤 俊朗</span></div>
                  <div className="row"><span className="k">入金確認日</span><span className="v">{c.status==="completed"?"2026/06/14":"—"}</span></div>
                </div>
              </div>
            )}

            <div className="ec-sec" style={{marginBottom:0}}>
              <div className="ec-sec-h">署名</div>
              <div className="ec-sign-blocks">
                <div className="ec-sign-box">
                  <div className="role">{isPurchase?"売主（お客様）":"売主"}</div>
                  <div className="who">{c.seller}</div>
                  <div className={"ec-sign-mark"+(prog>4?" signed":"")}>
                    {prog>4 ? <><i className="ti ti-writing-sign"></i>電子署名済 {c.created}</> : <><i className="ti ti-clock"></i>署名待ち</>}
                  </div>
                </div>
                <div className="ec-sign-box">
                  <div className="role">{isPurchase?"買主（加盟店）":"買主"}</div>
                  <div className="who">{c.buyer}</div>
                  <div className={"ec-sign-mark"+(prog>=99?" signed":"")}>
                    {prog>=99 ? <><i className="ti ti-writing-sign"></i>電子署名済 {c.created}</> : <><i className="ti ti-clock"></i>署名待ち</>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right rail */}
        <div className="ec-rail">
          <div className="ec-rail-card">
            <h4><i className="ti ti-route"></i>署名フロー</h4>
            <div className="ec-tl">
              {steps.map((st,i)=>{
                idx++;
                const cls = idx<prog ? "done" : (idx===prog ? "active" : (prog>=99?"done":"pending"));
                return (
                  <div className={"ec-tl-item "+cls} key={i}>
                    <div className="ec-tl-dot"></div>
                    <div className="t">{st.t}</div>
                    <div className="s">{st.s}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="ec-rail-card">
            <h4><i className="ti ti-signature"></i>電子署名 方式</h4>
            <div className="ec-esign-line"><i className="ti ti-shield-check"></i>本人確認方式<b>{c.esign==="sms"?"SMS認証":"メール認証"}</b></div>
            <div className="ec-esign-line"><i className="ti ti-link"></i>署名URL<b>送信済</b></div>
            <div className="ec-esign-line"><i className="ti ti-device-mobile"></i>署名端末<b>本人デバイス</b></div>
            <div className="ec-esign-line"><i className="ti ti-stamp"></i>収入印紙<b style={{color:"#16a34a"}}>¥0 (非課税)</b></div>
            <div className="ec-note-amber" style={{marginTop:14}}>
              <i className="ti ti-gavel"></i>
              <span>電子署名法に基づく契約締結 (URL送付 → 本人デバイス署名)。印紙税が非課税となり、FC展開のコスト削減に寄与します。</span>
            </div>
          </div>

          <div className="ec-rail-card">
            <h4><i className="ti ti-files"></i>関連書類</h4>
            {c.type==="purchase" && (
              <button className="btn btn-light" style={{width:"100%",justifyContent:"space-between",marginBottom:10}} onClick={()=>go("contracts/AF-EC-2026-0038")}>
                <span><i className="ti ti-clipboard-check" style={{marginRight:8}}></i>確認書（引渡時）</span><i className="ti ti-chevron-right"></i></button>
            )}
            <div className="ec-esign-line"><i className="ti ti-archive"></i>保管期限<b>{(()=>{const y=parseInt(c.created)+7;return c.created.replace(/^\d+/,String(y));})()}</b></div>
            <div className="ec-esign-line"><i className="ti ti-certificate"></i>約款監修<b>JPUC 16KH00009</b></div>
            <div className="ec-esign-line"><i className="ti ti-world"></i>言語<b>日本語</b></div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Contracts, ContractDetail, ECTypeChip, ECStatus, yen2 });
