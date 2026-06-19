/* ASSIST FORWARD — shell: sidebar, topbar, shared helpers */
const { useState, useEffect, useRef } = React;

const NAV_HQ = [
  { section:"システム管理", items:[
    { key:"dashboard",   label:"ダッシュボード",      icon:"ti-layout-dashboard" },
    { key:"vehicles",    label:"車両一覧",            icon:"ti-car" },
    { key:"negotiation", label:"応札・商談管理",      icon:"ti-gavel" },
    { key:"customers",   label:"顧客管理",            icon:"ti-user-search" },
    { key:"stores",      label:"店舗マスタ管理",      icon:"ti-building-store" },
    { key:"storeusers",  label:"店舗ユーザー管理",    icon:"ti-user-circle" },
    { key:"admins",      label:"アドミンユーザー",    icon:"ti-shield-check" },
    { key:"review",      label:"マスタデータレビュー", icon:"ti-clipboard-list", badge:9 },
    { key:"inspect",     label:"AFインスペクト",      icon:"ti-clipboard-check" }
  ]},
  { section:"電子契約", items:[
    { key:"contracts",  label:"電子契約管理",      icon:"ti-file-certificate" }
  ]}
];

const NAV_STORE = [
  { section:"概要", items:[
    { key:"dashboard", label:"ダッシュボード", icon:"ti-layout-dashboard" }
  ]},
  { section:"仕入れ（買い）業務", items:[
    { key:"search",    label:"車両検索",   icon:"ti-search" },
    { key:"favorites", label:"お気に入り", icon:"ti-heart" },
    { key:"inquiries", label:"問合せ履歴", icon:"ti-message" }
  ]},
  { section:"出品（売り）業務", items:[
    { key:"listings", label:"出品管理",   icon:"ti-car" },
    { key:"deals",    label:"商談履歴",   icon:"ti-messages" }
  ]},
  { section:"契約業務", items:[
    { key:"contracts", label:"電子契約", icon:"ti-file-certificate" }
  ]},
  { section:"店舗スタッフ管理", items:[
    { key:"staff", label:"店舗スタッフ管理", icon:"ti-users" }
  ]}
];

function Sidebar({ nav, route, go, onLogout }) {
  const base = route.split("/")[0];
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="brand-logo">ASSIST FORWARD</div>
        <div className="brand-sub">ネットワーク内流通＆委託販売管理</div>
      </div>
      <nav className="sidebar__nav">
        {nav.map((sec, si) => (
          <React.Fragment key={si}>
            <div className="sidebar__section">{sec.section}</div>
            {sec.items.map(n => (
              <a key={n.key}
                 className={"nav-item" + (base === n.key ? " active" : "")}
                 onClick={(e)=>{e.preventDefault();go(n.key);}}
                 href={"#"+n.key}>
                <i className={"ti " + n.icon}></i>
                <span>{n.label}</span>
                {n.badge ? <span className="nav-badge">{n.badge}</span> : null}
              </a>
            ))}
          </React.Fragment>
        ))}
      </nav>
      <div className="sidebar__foot">
        <button className="logout-btn" onClick={onLogout}>
          <i className="ti ti-logout"></i><span>ログアウト</span>
        </button>
      </div>
    </aside>
  );
}

function UserMenu({ user, go }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("menu"); // menu | account
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) { setOpen(false); setView("menu"); } };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);
  const close = () => { setOpen(false); setView("menu"); };
  return (
    <div className="usermenu" ref={ref}>
      <button className="userchip" onClick={()=>setOpen(o=>!o)}>
        <div className="avatar-sm">{user.initials}</div>
        <div className="userchip__txt">
          <div className="userchip__name">{user.name}</div>
          {user.role && <div className="userchip__role">{user.role}</div>}
        </div>
        <i className="ti ti-chevron-down"></i>
      </button>

      {open && view === "menu" && (
        <div className="um-pop">
          <div className="um-id">
            <div className="um-av">{user.initials}</div>
            <div className="um-name">{user.name}</div>
            <div className="um-sub">{user.role || "—"}</div>
          </div>
          <button className="um-row" onClick={()=>setView("account")}>
            <i className="ti ti-user"></i><span>プロフィール詳細</span><i className="ti ti-chevron-right um-chev"></i>
          </button>
          <button className="um-row danger" onClick={()=>{ close(); go("__logout"); }}>
            <i className="ti ti-logout"></i><span>ログアウト</span>
          </button>
        </div>
      )}

      {open && view === "account" && (
        <div className="um-pop account">
          <div className="um-acc-head">
            <button className="um-back" onClick={()=>setView("menu")}><i className="ti ti-chevron-left"></i></button>
            <span>アカウント詳細</span>
          </div>
          <div className="um-acc-body">
            <div className="um-acc-field"><div className="k">アカウントID</div><div className="v">{user.account}</div></div>
            <div className="um-acc-field"><div className="k">メールアドレス</div><div className="v">{user.email}</div></div>
            <div className="um-acc-field"><div className="k">所属店舗 ID</div><div className="v">{user.storeId}</div></div>
            <div className="um-acc-note"><i className="ti ti-clock"></i>システム利用開始: {user.since}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function Topbar({ title, user, connected, go }) {
  const [lang, setLang] = useState(window.__afLang || "ja");
  const setL = (l) => { setLang(l); window.AF_setLang && window.AF_setLang(l); };
  return (
    <header className="topbar">
      <div className="topbar__title">{title}</div>
      {connected && (
        <>
          <div className="topbar__divider"></div>
          <span className="conn-badge"><i className="ti ti-wifi"></i>接続済み</span>
        </>
      )}
      <div className="topbar__spacer"></div>
      <div className="lang-toggle" data-noi18n="1">
        <button className={lang==="ja"?"on":""} onClick={()=>setL("ja")}>日本語</button>
        <button className={lang==="en"?"on":""} onClick={()=>setL("en")}>EN</button>
      </div>
      <button className="icon-btn"><i className="ti ti-bell"></i></button>
      <UserMenu user={user} go={go} />
    </header>
  );
}

function Shell({ nav, title, user, route, go, connected, children }) {
  return (
    <div className="app-shell">
      <Sidebar nav={nav} route={route} go={go} onLogout={()=>go("__logout")} />
      <div className="main">
        <Topbar title={title} user={user} connected={connected} go={go} />
        <main className="page">{children}</main>
      </div>
    </div>
  );
}

/* ---- shared bits ---- */
function PageHead({ title, sub, children }) {
  return (
    <div className="page-head">
      <div>
        <h1 className="page-title">{title}</h1>
        {sub && <div className="page-sub">{sub}</div>}
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}

function Avatar({ name, hue }) {
  const initial = (name || "?").trim().charAt(0);
  const bg = hue != null
    ? `hsl(${hue} 62% 58%)`
    : "#cdd5e2";
  return <div className="avatar-md" style={{background:bg}}>{initial}</div>;
}

function StatusActive() {
  return <span className="status-pill"><span className="dot dot-green"></span>ACTIVE</span>;
}

function VThumb() {
  return <div className="thumb"><i className="ti ti-car"></i></div>;
}

function yen(n){ return "¥" + Number(n).toLocaleString("ja-JP"); }

Object.assign(window, { NAV_HQ, NAV_STORE, Sidebar, Topbar, Shell, PageHead, Avatar, StatusActive, VThumb, yen });
