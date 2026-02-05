import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './assets/appLogo.png';

// --- AD COMPONENT ---
const AdBanner = ({ label }) => {
  const adRef = React.useRef(null);

  React.useEffect(() => {
    // Component එක load වෙද්දී කලින් ඇඩ් එකක් නැත්නම් විතරක් අලුත් එකක් හදනවා
    if (adRef.current && !adRef.current.firstChild) {
      const configScript = document.createElement('script');
      const invokeScript = document.createElement('script');

      configScript.type = 'text/javascript';
      configScript.innerHTML = `
        atOptions = {
          'key' : 'b7e8b03fb50b30344e57cab86494616d',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;

      invokeScript.type = 'text/javascript';
      invokeScript.src = `https://www.highperformanceformat.com/b7e8b03fb50b30344e57cab86494616d/invoke.js`;

      adRef.current.appendChild(configScript);
      adRef.current.appendChild(invokeScript);
    }
  }, []);

  return (
    <div style={{ 
      width: '100%', 
      minHeight: '90px', 
      background: 'rgba(255, 255, 255, 0.05)', 
      backdropFilter: 'blur(10px)',
      borderRadius: '15px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      border: '1px solid rgba(255, 255, 255, 0.1)',
      margin: '20px 0',
      overflow: 'hidden'
    }} ref={adRef}>
      {/* ඇඩ් එක ලෝඩ් වෙනකම් පෙනෙන ලේබල් එක */}
      {!adRef.current?.firstChild && (
        <span style={{ color: 'rgba(255, 255, 255, 0.2)', fontSize: '12px' }}>
          {label} Loading Ad...
        </span>
      )}
    </div>
  );
};

function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Cinematic');
  const [currentPage, setCurrentPage] = useState('home'); 
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state එක ඇඩ් කළා
  const [page, setPage] = useState(1); // දැනට ඉන්නේ කීවෙනි පිටුවෙද කියලා දැනගන්න

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
  const categories = [
    "Cinematic", "Nature", "Technology", "Ocean", "Abstract", "City", "Animals", "Space",
    "Cars", "Cloud", "Cooking", "Cyberpunk", "Coffee", "Cat", "Camera"
  ];

const fetchVideos = async (query = activeCategory, isNextPage = false) => {
  setLoading(true);
  const nextPage = isNextPage ? page + 1 : 1; 
  
  try {
    const res = await axios.get(`https://api.pexels.com/videos/search?query=${query}&per_page=24&page=${nextPage}`, {
      headers: { Authorization: API_KEY }
    });

    if (isNextPage) {
      setVideos(prev => [...prev, ...res.data.videos]); // පරණ වීඩියෝ වලට අලුත් ඒවා එකතු කරනවා
      setPage(nextPage);
    } else {
      setVideos(res.data.videos); // අලුත් සර්ච් එකකදී කලින් තිබ්බ ඒවා අයින් කරලා අලුත් ඒවා පෙන්වනවා
      setPage(1);
    }
  } catch (error) {
    console.error("Error fetching videos", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchVideos(activeCategory);
  }, []);

  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
  };

  return (
    <div style={{ 
      backgroundColor: '#000000',
      backgroundImage: 'url("https://wallpapers.com/images/hd/black-mountain-bq5qj3ycvaoc7zoe.jpg")',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      color: 'white', 
      minHeight: '100vh', 
      width: '100vw', 
      fontFamily: '"Poppins", sans-serif',
      margin: 0,
      padding: 0,
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column' // Footer එක යටටම තියන්න ලේසියි
      
    }}>
      
      <style>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.3); }
        ::-webkit-scrollbar-thumb { 
          background: rgba(255, 59, 25, 0.4); 
          border-radius: 10px; 
          border: 2px solid rgba(255,255,255,0.1);
        }
        ::-webkit-scrollbar-thumb:hover { background: #820512; }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
          /* Related Clip Card Animation */
.related-card {
  transition: all 0.3s ease;
  border: 1px solid transparent;
}
.related-card:hover {
  background: rgba(255, 255, 255, 0.15) !important;
  transform: translateX(8px); /* දකුණට පොඩ්ඩක් move වෙනවා */
  border-color: rgb(255, 255, 255) !important;
}
.related-card:hover img {
  filter: brightness(1.2);
}
      `}</style>


      <nav className="search-container" style={{ 
        ...glassStyle, 
        padding: '15px 20px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: '15px',
        position: 'sticky', 
        top: 10, 
        margin: '0 auto',
        zIndex: 1000,
        width: '92%',
        borderRadius: '25px',
      }}>
<div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
  
  {/* ලෝගෝ එක සහ නම එක ළඟට ගන්න මෙන්න මේ div එක පාවිච්චි කරන්න */}
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} 
       onClick={() => {setSearchTerm(''); fetchVideos(); setSelectedVideo(null); setCurrentPage('home');}}>
    <img src={logo} alt="NexClip Logo" style={{ width: '45px', height: '45px', borderRadius: '10px', objectFit: 'cover' }} />
    <h1 style={{ color: '#ff0000', margin: 0, fontSize: 'clamp(22px, 5vw, 30px)', fontWeight: '900' }}>
      NexClip
    </h1>
  </div>

  <div style={{ display: 'flex', gap: '8px', padding: '5px 12px', borderRadius: '20px', background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
    {['home', 'about', 'privacy'].map((page) => (
      <span key={page} onClick={() => setCurrentPage(page)} style={{ cursor: 'pointer', fontSize: '11px', fontWeight: '600', textTransform: 'capitalize', color: currentPage === page ? '#ff0000' : 'rgba(255,255,255,0.8)' }}>
        {page}
      </span>
    ))}
  </div>
</div>

        <div style={{ width: '100%', maxWidth: '600px', position: 'relative' }}>
          <form onSubmit={(e) => { e.preventDefault(); setActiveCategory(searchTerm); fetchVideos(searchTerm); setShowSuggestions(false); setSelectedVideo(null); setCurrentPage('home'); }} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <i className="fas fa-search" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.5)' }}></i>
              <input 
                type="text" 
                placeholder="Search cinematic clips..." 
                value={searchTerm}
                onFocus={() => setShowSuggestions(true)}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ 
                  width: '100%', padding: '12px 15px 12px 45px', borderRadius: '30px', border: 'none', 
                  backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', outline: 'none', fontSize: '14px',
                  boxSizing: 'border-box'
                }} 
              />
            </div>
          </form>

          {showSuggestions && searchTerm.length > 0 && (
            <div style={{ 
              position: 'absolute', top: '110%', left: 0, width: '100%', 
              backgroundColor: 'rgba(20, 20, 20, 0.85)', backdropFilter: 'blur(25px)', WebkitBackdropFilter: 'blur(25px)',
              borderRadius: '18px', zIndex: 2000, overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.15)', boxShadow: '0 10px 40px rgba(0,0,0,0.6)'
            }}>
              {categories.filter(cat => cat.toLowerCase().includes(searchTerm.toLowerCase())).map((cat, i) => (
                  <div key={i} onClick={() => { setSearchTerm(cat); fetchVideos(cat); setShowSuggestions(false); setSelectedVideo(null); }}
                    style={{ padding: '14px 20px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '14px', color: 'white', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.2s ease' }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.paddingLeft = '25px'; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.paddingLeft = '20px'; }}
                  >
                    <i className="fas fa-history" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}></i>
                    {cat}
                  </div>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div style={{ padding: '20px 2.5%', width: '100%', boxSizing: 'border-box', flex: 1 }}>
        
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: '20px' }}>
            <div style={{ width: '50px', height: '50px', border: '5px solid rgba(255,255,255,0.1)', borderTop: '5px solid #ff0000', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <p style={{ color: 'rgba(255,255,255,0.6)', letterSpacing: '2px', fontSize: '14px' }}>FETCHING CLIPS...</p>
          </div>
        ) : (
          <>
            {currentPage === 'about' && (
              <div style={{ ...glassStyle, padding: '40px', borderRadius: '30px', maxWidth: '800px', margin: '40px auto', lineHeight: '1.8' }}>
                <h2 style={{ color: '#ff3b19' }}>About NexClip</h2>
                <p>Welcome to NexClip, your ultimate destination for high-quality cinematic stock footage. Our platform is designed for creators, editors, and filmmakers who need premium visuals for their projects.</p>
                <p>Powered by the Pexels API, we bring you thousands of 4K and HD clips across various categories including Nature, Technology, and Abstract.</p>
                <button onClick={() => setCurrentPage('home')} style={{ background: '#ff3b19', border: 'none', color: 'white', padding: '10px 25px', borderRadius: '20px', cursor: 'pointer', marginTop: '20px', fontWeight: 'bold' }}>Back to Explore</button>
              </div>
            )}

            {currentPage === 'privacy' && (
              <div style={{ ...glassStyle, padding: '40px', borderRadius: '30px', maxWidth: '800px', margin: '40px auto', lineHeight: '1.6', fontSize: '14px' }}>
                <h2 style={{ color: '#ff3b19' }}>Privacy Policy</h2>
                <p>At NexClip, we value your privacy. We do not collect personal data from our users unless explicitly provided. Our search results and video content are provided by the Pexels API.</p>
                <AdBanner label="Privacy Page Ad" />
                <button onClick={() => setCurrentPage('home')} style={{ background: '#ff3b19', border: 'none', color: 'white', padding: '10px 25px', borderRadius: '20px', cursor: 'pointer', marginTop: '20px', fontWeight: 'bold' }}>Back to Explore</button>
              </div>
            )}
{currentPage === 'home' && (
  <>
    {selectedVideo ? (
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
        
        {/* --- LEFT SIDE: VIDEO PLAYER --- */}
        <div style={{ flex: '3', minWidth: '350px' }}>
          <button onClick={() => setSelectedVideo(null)} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', padding: '10px 25px', borderRadius: '30px', marginBottom: '20px', cursor: 'pointer' }}>← Back to Explore</button>

          <div style={{ ...glassStyle, padding: '20px', borderRadius: '25px' }}>
            <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#000', borderRadius: '15px', overflow: 'hidden' }}>
              <video controls autoPlay src={selectedVideo.video_files[0].link} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>

            <AdBanner label="Video Player Ad" />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', flexWrap: 'wrap', gap: '15px' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '20px' }}>Shot by {selectedVideo.user.name}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
                  {/* --- 4K ULTRA HD TAG --- */}
                  <span style={{ 
                    background: '#ff0000', 
                    color: 'white', 
                    fontSize: '10px', 
                    fontWeight: 'bold', 
                    padding: '3px 8px', 
                    borderRadius: '5px',
                    letterSpacing: '0.5px'
                  }}>
                    4K ULTRA HD
                  </span>
                  <p style={{ color: '#aaa', fontSize: '13px', margin: 0 }}>HD Cinematic • {selectedVideo.duration}s</p>
                </div>
              </div>

<a href={selectedVideo.video_files[0].link} download target="_blank" rel="noreferrer"
   style={{ 
     background: '#ff0000', 
     color: 'white', 
     textDecoration: 'none', 
     padding: '12px 30px', 
     borderRadius: '40px', 
     fontWeight: 'bold',
     display: 'flex',       // Icon එකයි Text එකයි එක ලයින් එකේ තියන්න
     alignItems: 'center',  // මැදට ගන්න
     gap: '10px',           // Icon එකයි Text එකයි අතර පරතරය
     transition: 'background 0.3s ease'
   }}
   onMouseOver={(e) => e.currentTarget.style.background = '#cc0000'}
   onMouseOut={(e) => e.currentTarget.style.background = '#ff0000'}
>
  <i className="fas fa-download"></i> {/* මෙන්න Icon එක */}
  Download
</a>
            </div>
          </div>
        </div>

{/* --- RIGHT SIDE: RELATED CLIPS --- */}
<div style={{ flex: '1', minWidth: '300px' }}>
  <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
    <div style={{ width: '4px', height: '20px', background: '#ff0000', borderRadius: '10px' }}></div>
    Related Clips
  </h3>

  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
    {videos.slice(0, 10).map(v => (
      <div 
        key={v.id} 
        className="related-card" // මේ class එක තමයි animation එක දෙන්නේ
        onClick={() => {setSelectedVideo(v); window.scrollTo(0,0);}}
        style={{ 
          ...glassStyle, 
          padding: '10px', 
          borderRadius: '15px', 
          cursor: 'pointer', 
          display: 'flex', 
          gap: '12px',
          alignItems: 'center' 
        }}
      >
        <div style={{ width: '100px', aspectRatio: '16/9', borderRadius: '10px', overflow: 'hidden' }}>
          <img src={v.image} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.3s' }} alt="t" />
        </div>
        <div style={{ overflow: 'hidden', flex: 1 }}>
          <h5 style={{ margin: 0, fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.user.name}</h5>
          <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>Premium Content</p>
        </div>
      </div>
    ))}
  </div>
</div>

      </div>
    ) : (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '40px', flexWrap: 'wrap' }}>
                      {categories.map((cat, index) => (
                        <button key={cat} onClick={() => { setActiveCategory(cat); fetchVideos(cat); }}
                          style={{
                            padding: '8px 20px', borderRadius: '25px', border: 'none', cursor: 'pointer',
                            backgroundColor: activeCategory === cat ? '#ff0000' : 'rgba(255,255,255,0.1)', color: 'white',
                            display: index > 5 && window.innerWidth < 768 ? 'none' : 'block'
                          }}>
                          {cat}
                        </button>
                      ))}
                    </div>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                      <AdBanner label="Home Grid Top Ad" />
                    </div>
                   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px', width: '100%' }}>
  {videos.map((video, index) => (
    <React.Fragment key={video.id}>
      <div 
        onClick={() => setSelectedVideo(video)} 
        // Mouse එක උඩට යද්දී වෙනස්කම් කරන්න event handlers පාවිච්චි කරමු
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.6)';
          e.currentTarget.style.borderColor = '#ffffff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.4)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }}
        style={{ 
          ...glassStyle, 
          padding: '15px', 
          borderRadius: '25px', 
          cursor: 'pointer',
          transition: 'all 0.3s ease', // මේකෙන් තමයි animation එක smooth වෙන්නේ
        }}
      >
        <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '18px', overflow: 'hidden' }}>
          <img 
            src={video.image} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            alt="thumb" 
          />
        </div>
        <div style={{ padding: '15px 5px' }}>
          <h4 style={{ margin: 0, fontSize: '16px' }}>{video.user.name}</h4>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>Premium Content</p>
        </div>
      </div>

      {(index + 1) % 6 === 0 && (
        <div style={{ gridColumn: '1 / -1' }}>
           <AdBanner label="In-Feed Mid Ad" />
        </div>
      )}
    </React.Fragment>
  ))}
</div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>

{/* LOAD MORE SECTION */}
{/* currentPage එක 'home' සහ selectedVideo එකක් නැතිනම් විතරක් පෙන්වන්න */}
{currentPage === 'home' && !selectedVideo && (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', marginBottom: '20px' }}>
    {loading ? (
      <div style={{ width: '40px', height: '40px', border: '4px solid rgba(255,255,255,0.1)', borderTop: '4px solid #ff0000', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
    ) : (
      <button 
        onClick={() => fetchVideos(activeCategory, true)}
        style={{ ...glassStyle, padding: '15px 40px', borderRadius: '30px', color: 'white', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', border: '1px solid rgba(255,255,255,0.2)' }}
      >
        Load More Clips
      </button>
    )}
  </div>
)}

      {/* --- FOOTER SECTION --- */}
      <footer style={{ 
        ...glassStyle, 
        marginTop: '50px', 
        padding: '40px 5%', 
        borderRadius: '40px 40px 0 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '30px' }}>
          <div style={{ flex: 1, minWidth: '250px' }}>
            <h2 style={{ color: '#ff0000', fontWeight: '900', margin: '0 0 10px 0' }}>NexClip</h2>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>
              Premium cinematic stock footage platform powered by Pexels API. High-quality clips for creators worldwide.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '50px' }}>
            <div>
              <h4 style={{ marginBottom: '15px', fontSize: '14px' }}>Explore</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '13px', color: 'rgba(255,255,255,0.5)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li style={{ cursor: 'pointer' }} onClick={() => setCurrentPage('home')}>Home</li>
                <li style={{ cursor: 'pointer' }} onClick={() => setCurrentPage('about')}>About Us</li>
                <li style={{ cursor: 'pointer' }} onClick={() => setCurrentPage('privacy')}>Privacy</li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '15px', fontSize: '14px' }}>Legal</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontSize: '13px', color: 'rgba(255,255,255,0.5)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>License</li>
                <li>Terms of Use</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
        </div>
        <hr style={{ width: '100%', border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)' }} />
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
          © 2026 NexClip. Made with ❤️ for Creators.
        </p>
      </footer>
    </div>
  );
}

export default App;