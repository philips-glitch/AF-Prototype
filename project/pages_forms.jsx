/* ASSIST FORWARD — create/edit form modals (admin user, store user, store) */
const { useState } = React;

function FmAvatar() {
  return (
    <div className="fm-avatar-wrap">
      <div className="fm-avatar">
        <div className="face"><i className="ti ti-user"></i></div>
        <button className="refresh" title="アバターを再生成"><i className="ti ti-refresh"></i></button>
      </div>
    </div>
  );
}

function FmPwd({ placeholder }) {
  const [show,setShow] = useState(false);
  return (
    <div className="fm-pwd">
      <input className="fm-inp" type={show?"text":"password"} placeholder={placeholder} />
      <i className={"ti "+(show?"ti-eye-off":"ti-eye")+" eye"} onClick={()=>setShow(s=>!s)}></i>
    </div>
  );
}

function FmModal({ title, children, save="dark", saveLabel="保存する", onClose }) {
  return (
    <div className="fm-overlay" onClick={onClose}>
      <div className="fm-modal" onClick={e=>e.stopPropagation()}>
        <div className="fm-head">
          <h3>{title}</h3>
          <button className="fm-close" onClick={onClose}><i className="ti ti-x"></i></button>
        </div>
        <div className="fm-body">
          {children}
          <button className={"fm-save "+save} onClick={onClose}>
            <i className="ti ti-device-floppy"></i>{saveLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- 新規管理者登録 (Admin user) ---------- */
function AdminUserForm({ onClose }) {
  return (
    <FmModal title="新規管理者登録" save="dark" onClose={onClose}>
      <FmAvatar />
      <div className="fm-grid">
        <div className="fm-field">
          <label><i className="ti ti-user"></i>表示名</label>
          <input className="fm-inp" placeholder="アップル太郎" />
        </div>
        <div className="fm-field">
          <label><i className="ti ti-at"></i>ユーザーID</label>
          <input className="fm-inp" placeholder="hanako_tanaka" />
        </div>
      </div>
      <div className="fm-grid">
        <div className="fm-field full">
          <label><i className="ti ti-mail"></i>メールアドレス</label>
          <input className="fm-inp" type="email" placeholder="user@apple.jp" />
        </div>
      </div>
      <div className="fm-grid">
        <div className="fm-field">
          <label><i className="ti ti-lock"></i>パスワード</label>
          <FmPwd placeholder="P@ssw0rd!" />
        </div>
        <div className="fm-field">
          <label><i className="ti ti-lock"></i>パスワード確認</label>
          <FmPwd placeholder="もう一度入力" />
        </div>
      </div>
      <div className="fm-hint">8文字以上、大文字・小文字・数字・記号を含む</div>
      <div className="fm-grid">
        <div className="fm-field full">
          <label><i className="ti ti-shield-half"></i>権限ロール</label>
          <div className="fm-sel">
            <select defaultValue="">
              <option value="" disabled>選択してください</option>
              <option>HEADQUARTERS ADMINISTRATOR</option>
              <option>OPERATIONS ADMINISTRATOR</option>
              <option>REGIONAL ADMINISTRATOR</option>
            </select>
          </div>
        </div>
      </div>
      <div className="fm-note">
        <i className="ti ti-shield"></i>
        <span>注: 管理者アカウントには全店舗のデータ閲覧権限が付与されます。</span>
      </div>
    </FmModal>
  );
}

/* ---------- 店舗ユーザー (Store user) ---------- */
function StoreUserForm({ onClose }) {
  const stores = window.AF_DATA.stores;
  return (
    <FmModal title="ユーザーアカウント 登録・編集" save="dark" onClose={onClose}>
      <FmAvatar />
      <div className="fm-grid">
        <div className="fm-field">
          <label><i className="ti ti-user"></i>表示名</label>
          <input className="fm-inp" placeholder="アップル太郎" />
        </div>
        <div className="fm-field">
          <label><i className="ti ti-at"></i>ユーザーID</label>
          <input className="fm-inp" placeholder="hanako_tanaka" />
        </div>
      </div>
      <div className="fm-grid">
        <div className="fm-field full">
          <label><i className="ti ti-mail"></i>メールアドレス</label>
          <input className="fm-inp" type="email" placeholder="user@apple.jp" />
        </div>
      </div>
      <div className="fm-grid">
        <div className="fm-field">
          <label><i className="ti ti-lock"></i>パスワード</label>
          <FmPwd placeholder="P@ssw0rd!" />
        </div>
        <div className="fm-field">
          <label><i className="ti ti-lock"></i>パスワード確認</label>
          <FmPwd placeholder="もう一度入力" />
        </div>
      </div>
      <div className="fm-hint">8文字以上、大文字・小文字・数字・記号を含む</div>
      <div className="fm-grid">
        <div className="fm-field full">
          <label><i className="ti ti-building-store"></i>所属店舗</label>
          <div className="fm-sel">
            <select defaultValue="">
              <option value="" disabled>選択してください</option>
              {stores.map(s=><option key={s.id}>{s.name}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div className="fm-note">
        <i className="ti ti-shield"></i>
        <span>注: ユーザーIDはシステム内で重複できません。</span>
      </div>
    </FmModal>
  );
}

/* ---------- 店舗情報 (Store) ---------- */
function StoreForm({ onClose }) {
  const regions = ["北海道","青森県","東京都","神奈川県","千葉県","新潟県","静岡県","愛知県","三重県","大阪府","宮崎県"];
  return (
    <FmModal title="店舗情報の登録・編集" save="red" onClose={onClose}>
      <div className="fm-grid">
        <div className="fm-field">
          <label><i className="ti ti-building-store"></i>店舗名</label>
          <input className="fm-inp" placeholder="アップル〇〇店" />
        </div>
        <div className="fm-field">
          <label><i className="ti ti-building"></i>運営会社</label>
          <input className="fm-inp" placeholder="株式会社〇〇" />
        </div>
      </div>
      <div className="fm-grid">
        <div className="fm-field">
          <label><i className="ti ti-tag"></i>種別</label>
          <div className="fm-sel">
            <select defaultValue="加盟店">
              <option>加盟店</option>
              <option>直営</option>
            </select>
          </div>
        </div>
        <div className="fm-field">
          <label><i className="ti ti-map-pin"></i>所在地</label>
          <div className="fm-sel">
            <select defaultValue="">
              <option value="" disabled>選択してください</option>
              {regions.map(r=><option key={r}>{r}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div className="fm-grid">
        <div className="fm-field">
          <label><i className="ti ti-phone"></i>電話番号</label>
          <input className="fm-inp" placeholder="03-0000-0000" />
        </div>
        <div className="fm-field">
          <label><i className="ti ti-mail"></i>メールアドレス</label>
          <input className="fm-inp" type="email" placeholder="store@example.jp" />
        </div>
      </div>
      <div className="fm-grid">
        <div className="fm-field full">
          <label><i className="ti ti-brand-line"></i>LINE ID</label>
          <input className="fm-inp" placeholder="@store_line_id" />
        </div>
      </div>
      <div className="fm-note blue">
        <i className="ti ti-info-circle"></i>
        <span>注: 登録された店舗メールアドレスは、システム通知や委託販売のアラート送信に使用されます。</span>
      </div>
    </FmModal>
  );
}

/* ---------- 新規スタッフ登録 (Store staff) ---------- */
function StaffForm({ onClose }) {
  return (
    <FmModal title="新規スタッフ登録" save="dark" saveLabel="スタッフを登録" onClose={onClose}>
      <FmAvatar />
      <div className="fm-grid">
        <div className="fm-field full">
          <label><i className="ti ti-user"></i>表示名</label>
          <input className="fm-inp" placeholder="例：田中 花子" />
        </div>
      </div>
      <div className="fm-grid">
        <div className="fm-field full">
          <label><i className="ti ti-at"></i>ユーザー名（ID）</label>
          <input className="fm-inp" placeholder="例：tanaka01" />
        </div>
      </div>
      <div className="fm-grid">
        <div className="fm-field full">
          <label><i className="ti ti-mail"></i>メールアドレス</label>
          <input className="fm-inp" type="email" placeholder="staff@apple.jp" />
        </div>
      </div>
      <div className="fm-grid">
        <div className="fm-field">
          <label><i className="ti ti-lock"></i>パスワード</label>
          <FmPwd placeholder="P@ssw0rd!" />
        </div>
        <div className="fm-field">
          <label><i className="ti ti-lock"></i>パスワード確認</label>
          <FmPwd placeholder="もう一度入力" />
        </div>
      </div>
      <div className="fm-hint">8文字以上、大文字・小文字・数字・記号を含む</div>
    </FmModal>
  );
}

Object.assign(window, { AdminUserForm, StoreUserForm, StoreForm, StaffForm });
