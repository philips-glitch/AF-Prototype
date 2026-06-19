/* ASSIST FORWARD — root app: login + hash router */
const { useState, useEffect } = React;

const CREDS = {
  hq:    { code:"",       user:"superadmin",   pass:"superadminpass" },
  store: { code:"S-0001", user:"sellerstaff1", pass:"sellerstaffpass" }
};

function Login({ onLogin }) {
  const [role, setRole] = useState("store");
  const [lang, setLang] = useState(window.__afLang || "ja");
  const setL = (l)=>{ setLang(l); window.AF_setLang && window.AF_setLang(l); };
  const c = CREDS[role];
  return (
    <div className="login-wrap">
      <div className="lang-toggle login-lang" data-noi18n="1">
        <button className={lang==="ja"?"on":""} onClick={()=>setL("ja")}>日本語</button>
        <button className={lang==="en"?"on":""} onClick={()=>setL("en")}>EN</button>
      </div>
      <div className="login-brand">ASSIST FORWARD</div>
      <div className="login-tag">ネットワーク内流通 ＆ 委託販売管理</div>
      <form className="login-card" onSubmit={(e)=>{e.preventDefault();onLogin(role);}}>
        <h2>ログイン</h2>
        <div className="role-toggle">
          <button type="button" className={role==="hq"?"on":""} onClick={()=>setRole("hq")}>本部 (HQ)</button>
          <button type="button" className={role==="store"?"on":""} onClick={()=>setRole("store")}>加盟店 (STORE)</button>
        </div>
        <div className="fieldset">
          <label>店舗コード</label>
          <input className={"login-input"+(c.code?" filled":"")} key={role+"-code"} defaultValue={c.code} placeholder="例: S-XXXX" />
        </div>
        <div className="fieldset">
          <label>ユーザー名</label>
          <input className="login-input filled" key={role+"-user"} defaultValue={c.user} />
        </div>
        <div className="fieldset">
          <label>パスワード</label>
          <input className="login-input filled" key={role+"-pass"} type="password" defaultValue={c.pass} />
        </div>
        <button className="login-submit" type="submit">ログイン <span className="dot-red"></span></button>
      </form>
      <div className="login-foot">
        <div className="login-links">プライバシーポリシー <span>|</span> FAQ</div>
        <div className="login-copy">© ASSIST FORWARD / APPLE AUTO NETWORK.<br/>JAPAN REGIONAL PLATFORM.</div>
      </div>
    </div>
  );
}

const USER = {
  hq:    { name:"Super Admin",  role:"本部", initials:"SA",
           account:"@superadmin", email:"superadmin@assist-forward.com", storeId:"本部 (HQ)", since:"2025/11/01" },
  store: { name:"AppleUser", role:"アップルインターアップルインター",  initials:"A",
           account:"@testuser1", email:"info@apple-assist.com", storeId:"S-0009", since:"2026/04/16" }
};
const TITLE = { hq:"アップル本部", store:"アップル本店" };

function App() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("af_authed") === "1");
  const [role, setRole]     = useState(() => sessionStorage.getItem("af_role") || "hq");
  const [route, setRoute]   = useState(() => (location.hash || "#dashboard").slice(1));

  useEffect(() => {
    const onHash = () => setRoute((location.hash || "#dashboard").slice(1));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = (r) => {
    if (r === "__logout") { sessionStorage.removeItem("af_authed"); setAuthed(false); return; }
    location.hash = r;
    setRoute(r);
    window.scrollTo(0,0);
  };

  if (!authed) {
    return <Login onLogin={(r) => {
      sessionStorage.setItem("af_authed","1");
      sessionStorage.setItem("af_role", r);
      setRole(r); setAuthed(true);
      location.hash = "dashboard"; setRoute("dashboard");
    }} />;
  }

  const [base, param] = route.split("/");

  if (role === "store") {
    const connected = base === "deals" || (base === "search" && param);
    let view;
    switch (base) {
      case "search":     view = param ? <StoreVehicleDetail id={param} go={go} /> : <VehicleSearch go={go} />; break;
      case "favorites":  view = <Favorites go={go} />; break;
      case "inquiries":  view = <InquiryHistory />; break;
      case "listings":   view = <Inventory />; break;
      case "deals":      view = <NegotiationHistory />; break;
      case "contracts":  view = param ? <ContractDetail no={decodeURIComponent(param)} go={go} role="store" /> : <Contracts go={go} role="store" />; break;
      case "staff":      view = <StoreStaff />; break;
      case "dashboard":
      default:           view = <StoreDashboard go={go} />;
    }
    return <Shell nav={NAV_STORE} title={TITLE.store} user={USER.store} route={route} go={go} connected={!!connected}>{view}</Shell>;
  }

  // HQ
  const connected = base === "vehicles" && param;
  let view;
  switch (base) {
    case "vehicles":    view = param ? <VehicleDetail id={param} go={go} /> : <VehicleList go={go} />; break;
    case "negotiation": view = <Negotiation />; break;
    case "customers":   view = <Customers />; break;
    case "stores":      view = <Stores />; break;
    case "storeusers":  view = <StoreUsers />; break;
    case "admins":      view = <AdminUsers />; break;
    case "review":      view = <MasterReview />; break;
    case "inspect":     view = <AFInspect />; break;
    case "contracts":   view = param ? <ContractDetail no={decodeURIComponent(param)} go={go} role="hq" /> : <Contracts go={go} role="hq" />; break;
    case "dashboard":
    default:            view = <Dashboard />;
  }
  return <Shell nav={NAV_HQ} title={TITLE.hq} user={USER.hq} route={route} go={go} connected={!!connected}>{view}</Shell>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
