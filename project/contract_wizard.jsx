/* ASSIST FORWARD — 契約作成ウィザード (Electronic Contract generation) — Phase 2 */
const { useState } = React;

const ECW_TYPES = [
  { key:"purchase", title:"買取契約書", sub:"B2C ・ 顧客（売主）→ 加盟店（買主）。査定承認後に締結。", icon:"ti-file-certificate" },
  { key:"consign",  title:"委託販売契約書", sub:"B2B ・ 売主FC → 本部（承認・仲介）→ 買主FC。", icon:"ti-file-symlink" },
  { key:"order",    title:"発注書・請求書", sub:"B2B ・ 本部 → 加盟店。発注書と請求書を一体で発行。", icon:"ti-receipt" },
  { key:"confirm",  title:"確認書", sub:"引渡時に再交換し、ローン残債・最終振込額を確定。", icon:"ti-clipboard-check" }
];

/* ---- step 1: type + assessment source ---- */
function ECStep1({ st, set }) {
  const D = window.AF_CONTRACTS;
  return (
    <div style={{maxWidth:1000,margin:"0 auto"}}>
      <div className="wz-card-lbl jp" style={{marginBottom:16}}>契約種別を選択 <span className="req">*</span></div>
      <div className="ec-typegrid">
        {ECW_TYPES.map(t=>{
          const m = D.TYPE_META[t.key];
          return (
            <div key={t.key} className={"ec-typecard"+(st.type===t.key?" on":"")} onClick={()=>set({type:t.key})}>
              <div className="big-ic" style={{background:m.bg,color:m.color}}><i className={"ti "+t.icon}></i></div>
              <div style={{flex:1}}><h4>{t.title}</h4><p>{t.sub}</p></div>
              <div className="chk"><i className="ti ti-check" style={{fontSize:14}}></i></div>
            </div>
          );
        })}
      </div>

      <div className="wz-card" style={{marginTop:24}}>
        <div className="wz-card-lbl jp"><i className="ti ti-clipboard-data" style={{color:"#ee3124",marginRight:7}}></i>査定記録から生成 <span style={{color:"#9aa6ba",fontWeight:500,fontStyle:"italic",fontSize:12,marginLeft:6}}>承認済の査定を選択すると車両・顧客情報が自動入力されます (A17)</span></div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {D.assessments.map(a=>(
            <div key={a.vid} className={"ec-assess"+(st.assess===a.vid?" on":"")} onClick={()=>set({assess:a.vid})}>
              <div className="av"><i className="ti ti-car"></i></div>
              <div className="meta">
                <div className="t">{a.veh} <span style={{color:"#9aa6ba",fontWeight:600,fontSize:12}}>{a.grade}</span></div>
                <div className="s">{a.vid} ・ {a.year} ・ {a.mileage} ・ {a.color} ・ 売主: {a.customer}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div className="amt">{window.yen2(a.amount)}</div>
                <span className="badge-ok"><i className="ti ti-check" style={{fontSize:11}}></i> 査定承認済 {a.approved}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- step 2: parties ---- */
function ECStep2({ st }) {
  const D = window.AF_CONTRACTS;
  const a = D.assessments.find(x=>x.vid===st.assess) || D.assessments[0];
  return (
    <div style={{maxWidth:1000,margin:"0 auto"}}>
      <div className="wz-card">
        <div className="wz-ocr-head">
          <div className="lbl">売主（お客様）情報</div>
          <span className="wz-badge teal">車検証OCRより自動入力 (A4)</span>
        </div>
        <div className="wz-grid-3">
          <div className="wz-field"><label>氏名 <span className="req">*</span></label><input className="wz-inp" defaultValue={a.customer} /></div>
          <div className="wz-field"><label>フリガナ</label><input className="wz-inp" defaultValue="ヤマダ タロウ" /></div>
          <div className="wz-field"><label>生年月日</label><input className="wz-inp" type="date" defaultValue="1985-04-01" /></div>
        </div>
        <div className="wz-grid-3" style={{marginTop:20}}>
          <div className="wz-field"><label>住所 <span className="req">*</span></label><input className="wz-inp" defaultValue="三重県四日市市○○町1-2-3" /></div>
          <div className="wz-field"><label>電話番号</label><input className="wz-inp" defaultValue="090-1234-5678" /></div>
          <div className="wz-field"><label>メール (署名URL送付先)</label><input className="wz-inp" defaultValue="yamada@example.jp" /></div>
        </div>
        <div className="wz-grid-2" style={{marginTop:20}}>
          <div className="wz-field"><label>所有者（車検証）</label><input className="wz-inp locked" defaultValue={a.customer} readOnly /></div>
          <div className="wz-field"><label>使用者（車検証）</label><input className="wz-inp locked" defaultValue={a.customer+"（同上）"} readOnly /></div>
        </div>
      </div>

      <div className="wz-card">
        <div className="wz-card-lbl jp">買主（加盟店）情報</div>
        <div className="wz-grid-3">
          <div className="wz-field"><label>店舗名 <span className="req">*</span></label><input className="wz-inp locked" defaultValue="アップル本店" readOnly /></div>
          <div className="wz-field"><label>担当者</label><input className="wz-inp" defaultValue="後藤 俊朗" /></div>
          <div className="wz-field"><label>店舗コード</label><input className="wz-inp locked" defaultValue="S-0001" readOnly /></div>
        </div>
        {st.type==="consign" && (
          <div className="wz-info-blue" style={{marginTop:18}}>
            <div className="t"><i className="ti ti-gavel"></i>委託販売フロー（本部仲介）</div>
            <ul><li>売主FC → 本部（承認・費用按分）→ 買主FC の三者間で締結します。</li>
            <li>本部視点で売主・買主の双方を管理します。(A14)</li></ul>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- step 3: vehicle ---- */
function ECStep3({ st }) {
  const D = window.AF_CONTRACTS;
  const a = D.assessments.find(x=>x.vid===st.assess) || D.assessments[0];
  return (
    <div style={{maxWidth:1000,margin:"0 auto"}}>
      <div className="wz-card">
        <div className="wz-ocr-head">
          <div className="lbl">車両情報</div>
          <div className="badges">
            <span className="wz-badge green"><i className="ti ti-circle-check"></i>査定データ連携済</span>
            <span className="wz-badge teal">OCR自動入力</span>
          </div>
        </div>
        <div className="wz-grid-3">
          <div className="wz-field"><label>メーカー / 車名 <span className="req">*</span></label><input className="wz-inp locked" defaultValue={a.veh} readOnly /></div>
          <div className="wz-field"><label>グレード</label><input className="wz-inp locked" defaultValue={a.grade} readOnly /></div>
          <div className="wz-field"><label>年式</label><input className="wz-inp locked" defaultValue={a.year} readOnly /></div>
        </div>
        <div className="wz-grid-3" style={{marginTop:20}}>
          <div className="wz-field"><label>車台番号 <span className="req">*</span></label><input className="wz-inp locked" defaultValue={a.chassis} readOnly /></div>
          <div className="wz-field"><label>登録番号</label><input className="wz-inp" defaultValue="三重 300 あ 12-34" /></div>
          <div className="wz-field"><label>色</label><input className="wz-inp locked" defaultValue={a.color} readOnly /></div>
        </div>
        <div className="wz-grid-3" style={{marginTop:20}}>
          <div className="wz-field"><label>走行距離 <span className="req">*</span></label><input className="wz-inp locked" defaultValue={a.mileage} readOnly /></div>
          <div className="wz-field"><label>車検満了日</label><input className="wz-inp" type="date" defaultValue="2028-12-24" /></div>
          <div className="wz-field"><label>リサイクル料金</label><input className="wz-inp" defaultValue="¥11,540" /></div>
        </div>
      </div>
      <div className="wz-info-blue">
        <div className="t"><i className="ti ti-info-circle"></i>重複入力の削減</div>
        <ul><li>年式・車名・車台番号・色・走行距離・リサイクル料・自動車税は Assist Forward の査定フローから自動連携されます。</li></ul>
      </div>
    </div>
  );
}

/* ---- step 4: declarations ---- */
function ECStep4({ st, set }) {
  const D = window.AF_CONTRACTS;
  const vals = st.decl;
  const setv = (k,v)=>set({ decl:{...vals,[k]:v} });
  return (
    <div style={{maxWidth:920,margin:"0 auto"}}>
      <div className="wz-info-blue" style={{marginTop:0,marginBottom:22}}>
        <div className="t"><i className="ti ti-robot"></i>AI判定リファレンス</div>
        <ul><li>修復歴判定AI・メーター異常検知の結果を初期値として参照。最終申告は売主が画面でチェックします。(A1)</li></ul>
      </div>
      <div className="wz-card">
        <div className="wz-card-lbl jp">告知事項チェックリスト <span className="req">*</span></div>
        <div style={{display:"flex",flexDirection:"column",gap:11}}>
          {D.declarations.map((d,i)=>{
            const cur = vals[d.k] || (d.ai==="確認要"?"":"none");
            return (
              <div className="ec-decl" key={i}>
                <div className="left">
                  <span className="nm">{d.k}</span>
                  {d.ai==="確認要"
                    ? <span className="ai warn"><i className="ti ti-alert-triangle" style={{fontSize:12}}></i>AI: 確認要</span>
                    : <span className="ai ok"><i className="ti ti-circle-check" style={{fontSize:12}}></i>AI: なし</span>}
                  {d.aiSrc && <span className="ai-src">{d.aiSrc}</span>}
                </div>
                <div className="ec-seg2">
                  <button className={cur==="yes"?"on yes":""} onClick={()=>setv(d.k,"yes")}>あり</button>
                  <button className={cur==="none"?"on no":""} onClick={()=>setv(d.k,"none")}>なし</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---- step 5: required docs + payment ---- */
function ECStep5({ st, set, role }) {
  const D = window.AF_CONTRACTS;
  const a = D.assessments.find(x=>x.vid===st.assess) || D.assessments[0];
  const docs = st.docs;
  const toggle = (d)=>set({ docs:{...docs,[d]:!docs[d]} });
  return (
    <div style={{maxWidth:1000,margin:"0 auto"}}>
      <div className="wz-card">
        <div className="wz-card-lbl jp">必要書類 チェックリスト <span style={{color:"#9aa6ba",fontWeight:500,fontStyle:"italic",fontSize:12,marginLeft:6}}>受領確認のみ（受領日不要・PDF出力対応） (A2)</span></div>
        <div className="ec-docgrid">
          {D.reqDocs.map((d,i)=>(
            <label className="wz-check" key={i} style={{border:"1px solid #eef1f5",borderRadius:12,padding:"13px 15px"}}>
              <input type="checkbox" checked={!!docs[d]} onChange={()=>toggle(d)} />{d}
            </label>
          ))}
        </div>
      </div>

      <div className="wz-card">
        <div className="wz-card-lbl jp">支払い内訳 <span style={{color:"#9aa6ba",fontWeight:500,fontStyle:"italic",fontSize:12,marginLeft:6}}>査定データから自動計算 (A3)</span></div>
        <div className="ec-pay">
          <div className="ec-pay-row"><span className="k"><i className="ti ti-currency-yen"></i>契約金額（査定額）</span><span className="v">{window.yen2(a.amount)}</span></div>
          <div className="ec-pay-row minus"><span className="k">自動車税 減算</span><span className="v">- ¥12,000</span></div>
          <div className="ec-pay-row"><span className="k">リサイクル預託金</span><span className="v">¥11,540</span></div>
          <div className="ec-pay-row minus"><span className="k">ローン残債 <span className="ec-defer"><i className="ti ti-clock" style={{fontSize:11}}></i>確認書にて引渡時確定</span></span><span className="v" style={{color:"#9aa6ba"}}>引渡時確定</span></div>
          <div className="ec-pay-row total"><span className="k">差引支払額（オーナー手取）</span><span className="v">{window.yen2(a.amount-12000+11540)}</span></div>
        </div>

        <div className="wz-grid-2" style={{marginTop:20}}>
          <div className="wz-field"><label>振込先（銀行マスタより自動反映 / A15）</label>
            <input className="wz-inp locked" defaultValue={`${D.bankMaster.bank} ${D.bankMaster.branch}`} readOnly /></div>
          <div className="wz-field"><label>口座</label>
            <input className="wz-inp locked" defaultValue={`${D.bankMaster.type} ${D.bankMaster.no}`} readOnly /></div>
        </div>
      </div>

      {role==="hq" && (
        <div className="ec-internal">
          <div className="hd"><i className="ti ti-lock"></i>本部内部処理項目（二段表示）<span className="lock">加盟店非表示 (A16)</span></div>
          <div className="wz-grid-3">
            <div className="wz-field"><label>店舗名</label><input className="wz-inp" defaultValue="アップル本店" /></div>
            <div className="wz-field"><label>入金確認日</label><input className="wz-inp" type="date" /></div>
            <div className="wz-field"><label>売上計上</label><input className="wz-inp" placeholder="未計上" /></div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---- step 6: terms agreement ---- */
function ECStep6({ st, set }) {
  return (
    <div style={{maxWidth:820,margin:"0 auto"}}>
      <div className="wz-card">
        <div className="wz-card-lbl jp">約款（普通取引約款）</div>
        <div className="ec-terms">
          <h5>第1条（目的）</h5>
          <p>本約款は、売主と買主との間で締結される自動車の売買に関する基本的事項を定めるものとする。</p>
          <h5>第2条（契約の成立）</h5>
          <p>本契約は、当事者双方の署名または記名押印（電子署名を含む）により成立する。本契約書は電子的に作成・保管され、各当事者がその控えを保持する。本条は印紙税の取扱いの基礎となる。</p>
          <h5>第3条（告知事項）</h5>
          <p>売主は、メーター改ざん・修復歴・水没歴・不具合・自動車税および駐車違反金の未納の有無について、本契約書記載のとおり申告する。</p>
          <h5>第4条〜第12条</h5>
          <p>引渡し、所有権移転、危険負担、契約不適合責任、解除、反社会的勢力の排除、合意管轄ほか。（日本中古自動車販売協会連合会 JPUC 監修 / 16KH00009・2023年7月改定）</p>
        </div>
        <div className="ec-jpuc"><i className="ti ti-certificate"></i>JPUC 監修番号 16KH00009（2023年7月改定）・ 電子版は完了後に JPUC 再承認を取得 (A12)</div>

        <label className="wz-check" style={{marginTop:22,padding:"16px 18px",border:"1.5px solid "+(st.agreed?"#bfe6cd":"#e7ebf2"),borderRadius:13,background:st.agreed?"#f3fbf6":"#fff",fontSize:14.5}}>
          <input type="checkbox" checked={st.agreed} onChange={()=>set({agreed:!st.agreed})} />
          <span>上記約款を画面で確認し、内容に <b>同意</b> します。（顧客確認欄に反映 / A8）</span>
        </label>
      </div>
    </div>
  );
}

/* ---- step 7: e-sign request ---- */
function ECStep7({ st, set }) {
  const D = window.AF_CONTRACTS;
  const a = D.assessments.find(x=>x.vid===st.assess) || D.assessments[0];
  const tm = D.TYPE_META[st.type];
  return (
    <div style={{maxWidth:980,margin:"0 auto"}}>
      <div className="wz-7col">
        <div>
          <div className="wz-card" style={{marginTop:0}}>
            <div className="wz-card-lbl jp">電子署名 方式 <span className="req">*</span></div>
            <div className="ec-signpick">
              <div className={"ec-signopt"+(st.esign==="email"?" on":"")} onClick={()=>set({esign:"email"})}>
                <i className="ti ti-mail"></i><div className="t">メール認証</div><div className="s">署名URLをメール送付</div>
              </div>
              <div className={"ec-signopt"+(st.esign==="sms"?" on":"")} onClick={()=>set({esign:"sms"})}>
                <i className="ti ti-device-mobile-message"></i><div className="t">SMS認証</div><div className="s">署名URLをSMS送付</div>
              </div>
            </div>
            <div className="wz-info-blue">
              <div className="t"><i className="ti ti-shield-check"></i>本人確認・法的有効性 (A11)</div>
              <ul>
                <li>契約作成 → {st.esign==="sms"?"SMS":"メール"}で署名URL送付 → 本人デバイスで署名。</li>
                <li>電子署名法に基づき本人性を担保し、証拠として有効。</li>
                <li>収入印紙が <b style={{color:"#16a34a"}}>非課税（¥0）</b> となり、FC展開のコストを削減。</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <div className="wz-sim">
            <div className="h"><div className="t"><i className={"ti "+tm.icon}></i>{tm.label}</div><div className="cc">DOCUMENT SUMMARY</div></div>
            <div className="wz-sim-row"><span className="k">書類番号（自動採番 / A18）</span><span className="v">AF-EC-2026-0043</span></div>
            <div className="wz-sim-row"><span className="k">車両</span><span className="v" style={{fontSize:13}}>{a.veh}</span></div>
            <div className="wz-sim-row"><span className="k">売主 → 買主</span><span className="v" style={{fontSize:13}}>{a.customer} → アップル本店</span></div>
            <div className="wz-sim-row" style={{borderTop:"1px solid rgba(255,255,255,.08)",paddingTop:14,marginTop:6}}>
              <span className="k">契約金額</span><span className="v" style={{fontSize:20,color:"#34d27b"}}>{window.yen2(a.amount)}</span></div>
            <div className="wz-sim-row"><span className="k">収入印紙</span><span className="v" style={{color:"#34d27b"}}>¥0 (非課税)</span></div>
            <div className="wz-sim-row"><span className="k">保管</span><span className="v" style={{fontSize:13}}>7年 (電帳法)</span></div>
          </div>
          <div className="ec-note-amber" style={{marginTop:16}}>
            <i className="ti ti-info-circle"></i>
            <span>「署名を依頼」を押すと書類番号が採番され、{st.esign==="sms"?"SMS":"メール"}で署名URLが送信されます。ステータスは「署名待ち」に更新されます。</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const ECW_STEPS = [
  { n:1, title:"1. 契約種別の選択", sub:"作成する契約書を選び、承認済の査定記録から起点します。", body:ECStep1 },
  { n:2, title:"2. 当事者情報", sub:"売主（顧客）・買主（加盟店）の情報を確認します。", body:ECStep2 },
  { n:3, title:"3. 車両情報", sub:"査定・車検証OCRから車両情報を自動入力します。", body:ECStep3 },
  { n:4, title:"4. 告知事項", sub:"AI判定を参照しつつ、売主申告の告知事項を確定します。", body:ECStep4 },
  { n:5, title:"5. 必要書類・支払い内訳", sub:"受領書類の確認と支払い内訳を確定します。", body:ECStep5 },
  { n:6, title:"6. 約款の同意", sub:"約款を表示し、顧客の同意を取得します。", body:ECStep6 },
  { n:7, title:"7. 署名依頼", sub:"電子署名の方式を選び、署名を依頼します。", body:ECStep7 }
];

function ContractWizard({ onClose, go }) {
  const role = sessionStorage.getItem("af_role") || "hq";
  const [step, setStep] = useState(1);
  const [st, setSt] = useState({ type:"purchase", assess:"V-187", decl:{}, docs:{"車検証":true,"納税証明書":true,"自賠責保険証":true,"リサイクル券":true,"印鑑証明書":true,"住民票":true}, agreed:false, esign:"email" });
  const set = (patch)=>setSt(s=>({...s,...patch}));
  const total = 7;
  const cur = ECW_STEPS[step-1];
  const Body = cur.body;
  const last = step === total;
  const canFinish = st.agreed;

  const next = ()=>{ if(step<total){ setStep(step+1); const b=document.querySelector(".wz-body"); if(b) b.scrollTop=0; } };
  const back = ()=>{ if(step>1){ setStep(step-1); const b=document.querySelector(".wz-body"); if(b) b.scrollTop=0; } };

  return (
    <div className="wz-overlay" onClick={onClose}>
      <div className="wz-modal" onClick={e=>e.stopPropagation()}>
        <div className="wz-head">
          <div className="wz-plus" style={{fontSize:24}}><i className="ti ti-file-pencil"></i></div>
          <div className="wz-titlewrap">
            <div className="wz-title">電子契約<em>作成ウィザード</em></div>
            <div className="wz-progress">
              <div className="wz-track"><div className="wz-fill" style={{width:(step/total*100)+"%"}}></div></div>
              <div className="wz-step-lbl">STEP {step} / {total}</div>
            </div>
          </div>
          <button className="wz-close" onClick={onClose}><i className="ti ti-x"></i></button>
        </div>

        <div className="wz-body">
          <div className="wz-step-head"><h2>{cur.title}</h2><p>{cur.sub}</p></div>
          <Body st={st} set={set} role={role} />
        </div>

        <div className="wz-foot">
          <button className="wz-btn wz-btn-light" onClick={back} style={{visibility:step>1?"visible":"hidden"}}>
            <i className="ti ti-chevron-left"></i>戻る</button>
          <button className="wz-btn wz-btn-ghost"><i className="ti ti-device-floppy"></i>下書き保存</button>
          <div className="spacer"></div>
          {last
            ? <button key="ecfin" className={"wz-btn "+(canFinish?"wz-btn-dark":"wz-btn-finish")} onClick={canFinish?onClose:undefined}
                style={canFinish?{background:"var(--brand-red)"}:{}}><i className="ti ti-send"></i>署名を依頼して送信</button>
            : <button key="ecnext" className="wz-btn wz-btn-dark" onClick={next}>次へ進む<i className="ti ti-chevron-right"></i></button>}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ContractWizard });
