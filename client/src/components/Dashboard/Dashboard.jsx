import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cropper from "react-easy-crop";
import { uploadImage } from "../../Utils/UploadImage";
import "./Dashboard.scss";

const CATEGORIES = ["Hair", "Makeup", "Bridal", "Skincare", "Editorial", "Other"];

const CATEGORY_STATS = [
  { name: "Hair",      count: 8, color: "#c9a96e" },
  { name: "Makeup",    count: 6, color: "#d4836a" },
  { name: "Bridal",    count: 5, color: "#c06b8a" },
  { name: "Skincare",  count: 3, color: "#8aab8c" },
  { name: "Editorial", count: 2, color: "#8a9ec0" },
];

const NAV_ITEMS = [
  { icon: "⊞", label: "Dashboard" },
  { icon: "✉", label: "Enquiries" },
  { icon: "❐", label: "Portfolio"  },
  { icon: "⚙", label: "Settings"  },
];

const STATUS_CONFIG = {
  new:     { label: "New",     color: "#c9854a", bg: "rgba(201,133,74,0.12)"  },
  viewed:  { label: "Viewed",  color: "#8a9ec0", bg: "rgba(138,158,192,0.12)" },
  replied: { label: "Replied", color: "#8aab8c", bg: "rgba(138,171,140,0.12)" },
};

// Demo data — remove when backend is connected
const DEMO_ENQUIRIES = [
  {
    _id: "1", fullName: "Priya Sharma", phone: "+91 98765 43210",
    email: "priya@example.com", service: "Bridal Makeup",
    preferredDate: "14-02-2025",
    message: "Hi! I'm getting married in February and would love a bridal makeup consultation. Looking for a natural glam look.",
    status: "new", createdAt: new Date().toISOString(),
  },
  {
    _id: "2", fullName: "Ananya Kapoor", phone: "+91 87654 32109",
    email: "ananya@example.com", service: "Hair Styling",
    preferredDate: "20-01-2025",
    message: "Looking for a party hairstyle for my sister's engagement ceremony next month.",
    status: "viewed", createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    _id: "3", fullName: "Meera Iyer", phone: "+91 76543 21098",
    email: "meera@example.com", service: "Skincare",
    preferredDate: "",
    message: "I have a big event coming up and want to get a facial done. Can we schedule something?",
    status: "replied", createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState(0);

  // portfolio
  const [portfolioData, setPortfolioData]         = useState({ category: "", customCategory: "" });
  const [imageSrc, setImageSrc]                   = useState(null);
  const [croppedImageBlob, setCroppedImageBlob]   = useState(null);
  const [crop, setCrop]                           = useState({ x: 0, y: 0 });
  const [zoom, setZoom]                           = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [fileName, setFileName]                   = useState("");
  const [fileSize, setFileSize]                   = useState("");
  const [uploading, setUploading]                 = useState(false);

  // enquiries
  const [enquiries, setEnquiries]           = useState([]);
  const [enquiryLoading, setEnquiryLoading] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [filterStatus, setFilterStatus]     = useState("all");

  useEffect(() => {
    if (activeNav === 1) fetchEnquiries();
  }, [activeNav]);

  const fetchEnquiries = async () => {
    try {
      setEnquiryLoading(true);
      const res = await axios.get("https://bride-makeup-mantra-and-salon.onrender.com/api/enquiries", { withCredentials: true });
      setEnquiries(res.data);
    } catch {
      setEnquiries(DEMO_ENQUIRIES); // fallback for dev
    } finally {
      setEnquiryLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`https://bride-makeup-mantra-and-salon.onrender.com/api/enquiries/${id}`, { status }, { withCredentials: true });
    } catch { /* optimistic update only in dev */ }
    setEnquiries((prev) => prev.map((e) => (e._id === id ? { ...e, status } : e)));
    setSelectedEnquiry((e) => e?._id === id ? { ...e, status } : e);
  };

  const deleteEnquiry = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;
    try {
      await axios.delete(`https://bride-makeup-mantra-and-salon.onrender.com/api/enquiries/${id}`, { withCredentials: true });
    } catch { /* optimistic */ }
    setEnquiries((prev) => prev.filter((e) => e._id !== id));
    if (selectedEnquiry?._id === id) setSelectedEnquiry(null);
  };

  const filtered = filterStatus === "all" ? enquiries : enquiries.filter((e) => e.status === filterStatus);
  const newCount = enquiries.filter((e) => e.status === "new").length;

  // portfolio helpers
  const handleChange = (e) => setPortfolioData({ ...portfolioData, [e.target.name]: e.target.value });

  const onSelectFile = (e) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      setFileName(file.name);
      setFileSize((file.size / 1024).toFixed(1) + " KB");
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => { setImageSrc(reader.result); setCroppedImageBlob(null); };
    }
  };

  const onCropComplete = (_, px) => setCroppedAreaPixels(px);

  const createImage = (url) => new Promise((res, rej) => {
    const img = new Image();
    img.addEventListener("load", () => res(img));
    img.addEventListener("error", rej);
    img.src = url;
  });

  const getCroppedImg = async (src, crop) => {
    const image = await createImage(src);
    const canvas = document.createElement("canvas");
    canvas.width = crop.width; canvas.height = crop.height;
    canvas.getContext("2d").drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
    return new Promise((res) => canvas.toBlob(res, "image/jpeg"));
  };

  const handleCropConfirm = async () => {
    try { setCroppedImageBlob(await getCroppedImg(imageSrc, croppedAreaPixels)); setImageSrc(null); }
    catch (err) { console.error(err); }
  };

  const handleReset = () => { setImageSrc(null); setCroppedImageBlob(null); setFileName(""); setFileSize(""); setZoom(1); };

 const addPortfolio = async (e) => {
  e.preventDefault();

  if (!croppedImageBlob) {
    alert("Please crop the image first");
    return;
  }

  const category =
    portfolioData.customCategory ||
    portfolioData.category;

  if (!category) {
    alert("Please select or enter a category");
    return;
  }

  try {

    setUploading(true);

    // 🔥 create file from cropped blob
    const file = new File(
      [croppedImageBlob],
      "image.jpg",
      {
        type: "image/jpeg",
      }
    );

    // 🔥 upload to firebase
    const imageUrl = await uploadImage(file);

    // 🔥 send URL to backend
    await axios.post(
      "https://bride-makeup-mantra-and-salon.onrender.com/api/portfolio",
      {
        image: imageUrl,
        category,
      },
      {
        withCredentials: true,
      }
    );

    alert("Portfolio Added ✅");

    // reset
    setPortfolioData({
      category: "",
      customCategory: "",
    });

    setCroppedImageBlob(null);
    setImageSrc(null);
    setFileName("");
    setFileSize("");

  } catch (err) {

    console.error(err);
    alert("Upload failed");

  } finally {

    setUploading(false);

  }
};

  const handleLogout = async () => {
    try {
      await axios.post("https://bride-makeup-mantra-and-salon.onrender.com/api/admin/logout", {}, { withCredentials: true });
      alert("Logged out successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Logout failed");
    }
  };

  return (
    <div className="dashboard">

      {/* ── SIDEBAR ── */}
      <aside className="dashboard__sidebar">
        <div className="sidebar__logo">B</div>
        <nav className="sidebar__nav">
          {NAV_ITEMS.map((item, i) => (
            <button key={i} className={`sidebar__icon ${activeNav === i ? "active" : ""}`}
              title={item.label} onClick={() => setActiveNav(i)}>
              {item.icon}
              {i === 1 && newCount > 0 && <span className="sidebar__dot">{newCount}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar__spacer" />
        <div className="logout-wrapper">
          <button className="sidebar__logout" onClick={handleLogout} title="Log Out">↩</button>
          <span className="sidebar__tooltip">Log Out</span>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="dashboard__main">
        <header className="dashboard__header">
          <div className="header__left">
            <h1 className="header__title">
              {activeNav === 0 && <>Admin <em>Dashboard</em></>}
              {activeNav === 1 && <em>Enquiries</em>}
              {activeNav === 2 && <em>Portfolio</em>}
              {activeNav === 3 && <em>Settings</em>}
            </h1>
            <p className="header__sub">
              {activeNav === 0 && "Manage your portfolio content"}
              {activeNav === 1 && `${enquiries.length} total · ${newCount} new`}
              {activeNav === 2 && "Browse your uploaded work"}
              {activeNav === 3 && "Account & preferences"}
            </p>
          </div>
          <div className="header__avatar">A</div>
        </header>

        <div className="section-divider" />

        {/* ── TAB 0: PORTFOLIO ── */}
        {activeNav === 0 && (
          <div className="dashboard__grid">
            <div className="panel">
              <h2 className="panel__title">Add Portfolio</h2>
              <p className="panel__subtitle">Upload &amp; categorise a new portfolio image</p>
              <form onSubmit={addPortfolio}>
                {!imageSrc && !croppedImageBlob && (
                  <label className="upload-zone">
                    <input type="file" accept="image/*" onChange={onSelectFile} />
                    <span className="upload-zone__icon">📷</span>
                    <span className="upload-zone__primary">Drop your image here, or <strong>browse files</strong></span>
                    <span className="upload-zone__hint">JPEG, PNG, WEBP · Max 10MB</span>
                  </label>
                )}
                {imageSrc && (
                  <>
                    <div className="crop-container">
                      <Cropper image={imageSrc} crop={crop} zoom={zoom} aspect={1}
                        onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={onCropComplete} />
                    </div>
                    <div className="zoom-row">
                      <label className="field-label">Zoom</label>
                      <input type="range" min={1} max={3} step={0.1} value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))} />
                    </div>
                    <button type="button" className="btn-outline" onClick={handleCropConfirm}>✂&nbsp;&nbsp;Crop &amp; Confirm</button>
                  </>
                )}
                {croppedImageBlob && (
                  <div className="preview-box">
                    <img src={URL.createObjectURL(croppedImageBlob)} alt="preview" className="preview-box__img" />
                    <div className="preview-box__info">
                      <div className="preview-box__name">{fileName || "image.jpg"}</div>
                      <div className="preview-box__size">{fileSize}</div>
                    </div>
                    <span className="preview-box__badge">Ready</span>
                    <button type="button" className="preview-box__remove" onClick={handleReset}>✕</button>
                  </div>
                )}
                <div className="field">
                  <label className="field-label">Category</label>
                  <select name="category" value={portfolioData.category} onChange={handleChange}>
                    <option value="" disabled>Select a category…</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label className="field-label">Custom Category <span className="field-optional">(optional)</span></label>
                  <input type="text" name="customCategory" placeholder="e.g. Avant-garde, Nail Art…"
                    value={portfolioData.customCategory} onChange={handleChange} />
                </div>
                <button type="submit" className="btn-primary" disabled={uploading}>
                  {uploading ? "Uploading…" : "Upload Portfolio →"}
                </button>
              </form>
            </div>

            <div className="panel panel--side">
              <h2 className="panel__title">Categories</h2>
              <p className="panel__subtitle">Portfolio breakdown</p>
              <div className="category-list">
                {CATEGORY_STATS.map((cat) => (
                  <div className="category-item" key={cat.name}>
                    <div className="category-item__left">
                      <span className="category-item__dot" style={{ background: cat.color }} />
                      <span className="category-item__name">{cat.name}</span>
                    </div>
                    <span className="category-item__count">{cat.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 1: ENQUIRIES ── */}
        {activeNav === 1 && (
          <div className="enquiries">

            {/* filter bar */}
            <div className="enq-filters">
              {["all", "new", "viewed", "replied"].map((s) => (
                <button key={s} className={`enq-filter-btn ${filterStatus === s ? "active" : ""}`}
                  onClick={() => setFilterStatus(s)}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                  {s !== "all" && (
                    <span className="enq-filter-count">{enquiries.filter((e) => e.status === s).length}</span>
                  )}
                </button>
              ))}
              <button className="enq-refresh" onClick={fetchEnquiries} title="Refresh">↻</button>
            </div>

            {enquiryLoading ? (
              <div className="enq-empty">Loading…</div>
            ) : filtered.length === 0 ? (
              <div className="enq-empty">No enquiries found.</div>
            ) : (
              <div className="enq-layout">

                {/* LIST */}
                <div className="enq-list">
                  {filtered.map((enq) => {
                    const st = STATUS_CONFIG[enq.status] || STATUS_CONFIG.new;
                    return (
                      <div key={enq._id}
                        className={`enq-card ${selectedEnquiry?._id === enq._id ? "enq-card--active" : ""}`}
                        onClick={() => { setSelectedEnquiry(enq); if (enq.status === "new") updateStatus(enq._id, "viewed"); }}>
                        <div className="enq-card__top">
                          <div className="enq-card__avatar">{enq.fullName?.charAt(0).toUpperCase()}</div>
                          <div className="enq-card__info">
                            <div className="enq-card__name">{enq.fullName}</div>
                            <div className="enq-card__service">{enq.service}</div>
                          </div>
                          <span className="enq-status-badge" style={{ color: st.color, background: st.bg }}>{st.label}</span>
                        </div>
                        <div className="enq-card__preview">{enq.message}</div>
                        <div className="enq-card__date">
                          {enq.preferredDate && <>{enq.preferredDate} &nbsp;·&nbsp; </>}
                          {new Date(enq.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* DETAIL */}
                {selectedEnquiry ? (
                  <div className="enq-detail">
                    <div className="enq-detail__header">
                      <div className="enq-detail__avatar-lg">{selectedEnquiry.fullName?.charAt(0).toUpperCase()}</div>
                      <div>
                        <div className="enq-detail__name">{selectedEnquiry.fullName}</div>
                        <div className="enq-detail__time">
                          {new Date(selectedEnquiry.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                        </div>
                      </div>
                    </div>

                    <div className="enq-detail__grid">
                      <div className="enq-detail__field">
                        <span className="enq-detail__label">📞 Phone</span>
                        <a className="enq-detail__value enq-detail__link" href={`tel:${selectedEnquiry.phone}`}>{selectedEnquiry.phone}</a>
                      </div>
                      <div className="enq-detail__field">
                        <span className="enq-detail__label">✉ Email</span>
                        <a className="enq-detail__value enq-detail__link" href={`mailto:${selectedEnquiry.email}`}>{selectedEnquiry.email}</a>
                      </div>
                      <div className="enq-detail__field">
                        <span className="enq-detail__label">💄 Service</span>
                        <span className="enq-detail__value">{selectedEnquiry.service}</span>
                      </div>
                      <div className="enq-detail__field">
                        <span className="enq-detail__label">📅 Preferred Date</span>
                        <span className="enq-detail__value">{selectedEnquiry.preferredDate || "Not specified"}</span>
                      </div>
                    </div>

                    <div className="enq-detail__msg-label">Message</div>
                    <div className="enq-detail__msg">{selectedEnquiry.message}</div>

                    <div className="enq-detail__actions">
                      <a href={`https://wa.me/${selectedEnquiry.phone?.replace(/\D/g, "")}?text=Hi ${encodeURIComponent(selectedEnquiry.fullName)}, thank you for your enquiry!`}
                        target="_blank" rel="noreferrer" className="btn-action btn-action--whatsapp">
                        💬 WhatsApp
                      </a>
                      <a href={`mailto:${selectedEnquiry.email}?subject=Re: Your Enquiry`}
                        className="btn-action btn-action--email">
                        ✉ Reply
                      </a>
                      <select className="enq-status-select" value={selectedEnquiry.status}
                        onChange={(e) => updateStatus(selectedEnquiry._id, e.target.value)}>
                        <option value="new">New</option>
                        <option value="viewed">Viewed</option>
                        <option value="replied">Replied</option>
                      </select>
                      <button className="btn-action btn-action--delete" onClick={() => deleteEnquiry(selectedEnquiry._id)}>🗑</button>
                    </div>
                  </div>
                ) : (
                  <div className="enq-detail enq-detail--empty">
                    <span>← Select an enquiry to view details</span>
                  </div>
                )}

              </div>
            )}
          </div>
        )}

        {(activeNav === 2 || activeNav === 3) && (
          <div className="enq-empty">Coming soon…</div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;