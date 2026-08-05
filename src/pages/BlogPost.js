import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  FaArrowLeft, FaUser, FaClock, FaComment, 
  FaHeart, FaShare, FaFacebook, FaTwitter, 
  FaPinterest, FaEnvelope, FaUserCircle
} from 'react-icons/fa';

const BlogPost = () => {
  const { id } = useParams();
  const { isDarkMode } = useTheme();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [avatarErrors, setAvatarErrors] = useState({});

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sample blog post data (in real app, fetch based on id)
  const post = {
    id: 1,
    title: "10 Tips for Flawless Foundation Application",
    excerpt: "Master the art of foundation application with these professional tips and tricks for a seamless, natural-looking finish.",
    content: `
      <p>Applying foundation might seem straightforward, but achieving that flawless, airbrushed look requires technique and the right products. Whether you're a makeup beginner or a seasoned pro, these tips will help you elevate your foundation game.</p>
      
      <h2>1. Start with Clean, Hydrated Skin</h2>
      <p>The key to flawless foundation application begins with skincare. Always start with a clean, moisturized face. Use a gentle cleanser followed by a hydrating moisturizer suitable for your skin type. Allow the moisturizer to absorb for at least 5 minutes before applying any makeup.</p>
      
      <h2>2. Use a Primer</h2>
      <p>Primer creates a smooth canvas for your foundation and helps it last longer. Choose a primer based on your skin concerns: mattifying for oily skin, hydrating for dry skin, or illuminating for dull skin.</p>
      
      <h2>3. Choose the Right Foundation Formula</h2>
      <p>Different foundations work best for different skin types and desired coverage levels. Liquid foundations are versatile and work for most skin types. Cream foundations offer more coverage, while powder foundations are great for oily skin and quick application.</p>
      
      <h2>4. Find Your Perfect Shade</h2>
      <p>Testing foundation on your jawline in natural light is crucial. The right shade should disappear into your skin. Consider getting samples to test at home before committing to a full-size product.</p>
      
      <h2>5. Use the Right Tools</h2>
      <p>The tool you use can dramatically affect the finish. Beauty sponges create a natural, dewy finish. Brushes offer more coverage and a polished look. Your fingers can work well too, as the warmth helps blend the product seamlessly.</p>
      
      <h2>6. Apply in Thin Layers</h2>
      <p>Start with a small amount and build coverage where needed. Applying too much foundation at once can look cakey and unnatural. Remember, you can always add more, but it's hard to take away excess product.</p>
      
      <h2>7. Blend, Blend, Blend</h2>
      <p>Whether using a sponge, brush, or fingers, blend thoroughly, especially around the jawline, hairline, and ears. Make sure there are no harsh lines between your face and neck.</p>
      
      <h2>8. Don't Forget Your Neck and Ears</h2>
      <p>For a seamless look, blend foundation down your neck and over your ears. This ensures no visible line where your makeup ends.</p>
      
      <h2>9. Set with Powder</h2>
      <p>If you have oily skin or want your makeup to last all day, set your foundation with a translucent powder. Focus on the T-zone (forehead, nose, chin) where you tend to get oiliest.</p>
      
      <h2>10. Finishing Spray is Your Friend</h2>
      <p>A setting spray not only helps your makeup last longer but also melds all the layers of product together for a natural, skin-like finish. Hold the bottle 8-10 inches away and mist evenly over your face.</p>
      
      <p>With these tips, you'll be well on your way to foundation perfection. Remember, practice makes perfect, and the most important thing is that you feel confident and beautiful in your skin!</p>
    `,
    image: "/assets/images/blog/foundation-tips.png",
    category: "Makeup Tips",
    tags: ["Foundation", "Makeup Tips", "Beginner"],
    author: "Sarah Johnson",
    authorAvatar: "/assets/images/team/sarah.jpg",
    authorBio: "Sarah is a professional makeup artist with over 10 years of experience in the beauty industry. She specializes in bridal and editorial makeup and loves sharing her expertise with others.",
    date: "March 15, 2026",
    readTime: "5 min read",
    views: 1245,
    comments: 23,
    likes: 89
  };

  // Sample comments data
  const comments = [
    {
      id: 1,
      name: "Michael Chen",
      avatar: "/assets/images/team/michael.jpg",
      date: "March 16, 2026",
      text: "This article was so helpful! I've been struggling with foundation application for years. The tip about using thin layers made a huge difference."
    },
    {
      id: 2,
      name: "Maria Garcia",
      avatar: "/assets/images/team/sarah.jpg",
      date: "March 15, 2026",
      text: "I never knew about setting spray! Just tried it and my makeup lasted all day. Thank you so much for these tips."
    },
    {
      id: 3,
      name: "Priya Sharma",
      avatar: "/assets/images/team/priya.jpg",
      date: "March 14, 2026",
      text: "The primer tip is gold! I switched to a hydrating primer and my foundation looks so much smoother now."
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      });
    }
  };

  const handleAvatarError = (commentId) => {
    setAvatarErrors(prev => ({ ...prev, [commentId]: true }));
  };

  const themeStyles = {
    container: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#333333',
      minHeight: '100vh',
      transition: 'all 0.3s ease'
    },

    // Hero Section
    hero: {
      position: 'relative',
      height: windowWidth <= 768 ? '300px' : '400px',
      overflow: 'hidden'
    },
    heroImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    },
    heroOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: '#ffffff',
      padding: '2rem'
    },
    heroTitle: {
      fontSize: windowWidth <= 480 ? '1.8rem' : windowWidth <= 768 ? '2.2rem' : '3rem',
      fontWeight: '700',
      maxWidth: '800px',
      margin: '0 auto'
    },

    // Back Button
    backButton: {
      position: 'absolute',
      top: '1rem',
      left: '1rem',
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      backgroundColor: 'rgba(0,0,0,0.5)',
      color: '#ffffff',
      textDecoration: 'none',
      borderRadius: '2rem',
      backdropFilter: 'blur(5px)',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: 'rgba(232,140,166,0.8)'
      }
    },

    // Main Content
    mainContent: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '3rem 2rem'
    },

    // Post Meta
    postMeta: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1.5rem',
      marginBottom: '2rem',
      fontSize: '0.95rem',
      color: isDarkMode ? '#cccccc' : '#666666'
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    authorInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '2rem',
      padding: '1rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '1rem'
    },
    authorAvatar: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      objectFit: 'cover'
    },
    authorAvatarFallback: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: isDarkMode ? '#404040' : '#e0e0e0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
      color: isDarkMode ? '#cccccc' : '#666666'
    },
    authorDetails: {
      flex: 1
    },
    authorName: {
      fontSize: '1rem',
      fontWeight: '600',
      marginBottom: '0.25rem',
      color: isDarkMode ? '#ffffff' : '#333333'
    },

    // Post Content
    postContent: {
      fontSize: '1.1rem',
      lineHeight: '1.8',
      color: isDarkMode ? '#cccccc' : '#666666',
      marginBottom: '3rem',
      '& h2': {
        fontSize: '1.5rem',
        margin: '2rem 0 1rem',
        color: isDarkMode ? '#e88ca6' : '#333333'
      },
      '& p': {
        marginBottom: '1.5rem'
      }
    },

    // Tags Section
    tagsSection: {
      marginBottom: '2rem',
      padding: '1rem 0',
      borderTop: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
      borderBottom: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`
    },
    tagsTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: isDarkMode ? '#ffffff' : '#333333'
    },
    tagsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem'
    },
    tag: {
      padding: '0.3rem 1rem',
      backgroundColor: isDarkMode ? '#404040' : '#f0f0f0',
      color: isDarkMode ? '#cccccc' : '#666666',
      borderRadius: '2rem',
      fontSize: '0.9rem',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#e88ca6',
        color: '#ffffff'
      }
    },

    // Share and Actions
    actionsSection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '3rem',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    actionButtons: {
      display: 'flex',
      gap: '1rem'
    },
    actionButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      border: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
      borderRadius: '2rem',
      color: isDarkMode ? '#ffffff' : '#333333',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#e88ca6',
        color: '#ffffff',
        borderColor: '#e88ca6'
      }
    },
    activeActionButton: {
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      borderColor: '#e88ca6'
    },
    shareButtons: {
      display: 'flex',
      gap: '0.5rem'
    },
    shareButton: {
      width: '36px',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      border: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
      borderRadius: '50%',
      color: isDarkMode ? '#ffffff' : '#333333',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#e88ca6',
        color: '#ffffff',
        borderColor: '#e88ca6'
      }
    },

    // Comments Section
    commentsSection: {
      marginBottom: '3rem'
    },
    commentsTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      marginBottom: '2rem',
      color: isDarkMode ? '#e88ca6' : '#333333'
    },
    commentForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginBottom: '2rem'
    },
    commentInput: {
      padding: '1rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      border: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
      borderRadius: '1rem',
      color: isDarkMode ? '#ffffff' : '#333333',
      fontSize: '0.95rem',
      resize: 'vertical',
      minHeight: '100px',
      outline: 'none',
      ':focus': {
        borderColor: '#e88ca6'
      }
    },
    commentButton: {
      alignSelf: 'flex-end',
      padding: '0.75rem 1.5rem',
      backgroundColor: '#e88ca6',
      color: '#ffffff',
      border: 'none',
      borderRadius: '2rem',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      ':hover': {
        backgroundColor: '#d47a94',
        transform: 'translateY(-2px)'
      }
    },
    commentList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem'
    },
    comment: {
      padding: '1rem',
      backgroundColor: isDarkMode ? '#2d2d2d' : '#f8f8f8',
      borderRadius: '1rem'
    },
    commentHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '0.75rem'
    },
    commentAvatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      objectFit: 'cover'
    },
    commentAvatarFallback: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: isDarkMode ? '#404040' : '#e0e0e0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.2rem',
      color: isDarkMode ? '#cccccc' : '#666666'
    },
    commentInfo: {
      flex: 1
    },
    commentName: {
      fontSize: '1rem',
      fontWeight: '600',
      marginBottom: '0.25rem',
      color: isDarkMode ? '#ffffff' : '#333333'
    },
    commentDate: {
      fontSize: '0.85rem',
      color: isDarkMode ? '#999' : '#999'
    },
    commentText: {
      fontSize: '0.95rem',
      lineHeight: '1.6',
      color: isDarkMode ? '#cccccc' : '#666666'
    },

    // Related Posts
    relatedSection: {
      marginTop: '3rem',
      paddingTop: '3rem',
      borderTop: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`
    },
    relatedTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      marginBottom: '2rem',
      color: isDarkMode ? '#e88ca6' : '#333333'
    },
    relatedGrid: {
      display: 'grid',
      gridTemplateColumns: windowWidth <= 480 ? '1fr' : windowWidth <= 768 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
      gap: '1.5rem'
    },
    relatedCard: {
      textDecoration: 'none',
      color: 'inherit'
    },
    relatedImage: {
      width: '100%',
      height: '150px',
      objectFit: 'cover',
      borderRadius: '1rem',
      marginBottom: '1rem'
    },
    relatedPostTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: isDarkMode ? '#ffffff' : '#333333',
      ':hover': {
        color: '#e88ca6'
      }
    },
    relatedPostMeta: {
      fontSize: '0.85rem',
      color: isDarkMode ? '#999' : '#999'
    }
  };

  return (
    <div style={themeStyles.container}>
      {/* Hero Section */}
      <section style={themeStyles.hero}>
        <img
          src={post.image}
          alt={post.title}
          style={themeStyles.heroImage}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/1200x400/f8f8f8/e88ca6?text=" + post.title;
          }}
        />
        <div style={themeStyles.heroOverlay}>
          <h1 style={themeStyles.heroTitle}>{post.title}</h1>
        </div>
        <Link to="/blog" style={themeStyles.backButton}>
          <FaArrowLeft /> Back to Blog
        </Link>
      </section>

      {/* Main Content */}
      <div style={themeStyles.mainContent}>
        {/* Post Meta */}
        <div style={themeStyles.postMeta}>
          <span style={themeStyles.metaItem}><FaUser /> {post.author}</span>
          <span style={themeStyles.metaItem}><FaClock /> {post.readTime}</span>
          <span style={themeStyles.metaItem}><FaComment /> {post.comments} comments</span>
        </div>

        {/* Author Info */}
        <div style={themeStyles.authorInfo}>
          <img
            src={post.authorAvatar}
            alt={post.author}
            style={themeStyles.authorAvatar}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/50x50/f8f8f8/e88ca6?text=" + post.author.charAt(0);
            }}
          />
          <div style={themeStyles.authorDetails}>
            <div style={themeStyles.authorName}>{post.author}</div>
            <div style={{ color: isDarkMode ? '#999' : '#999', fontSize: '0.9rem' }}>{post.authorBio}</div>
          </div>
        </div>

        {/* Post Content */}
        <div
          style={themeStyles.postContent}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div style={themeStyles.tagsSection}>
          <h4 style={themeStyles.tagsTitle}>Tags:</h4>
          <div style={themeStyles.tagsContainer}>
            {post.tags.map(tag => (
              <Link
                key={tag}
                to={`/blog?tag=${tag}`}
                style={themeStyles.tag}
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={themeStyles.actionsSection}>
          <div style={themeStyles.actionButtons}>
            <button
              style={{
                ...themeStyles.actionButton,
                ...(liked && themeStyles.activeActionButton)
              }}
              onClick={() => setLiked(!liked)}
            >
              <FaHeart /> {liked ? 'Liked' : 'Like'} ({post.likes + (liked ? 1 : 0)})
            </button>
          </div>
          <div style={themeStyles.shareButtons}>
            <button style={themeStyles.shareButton} onClick={handleShare}>
              <FaShare />
            </button>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
              style={themeStyles.shareButton}
            >
              <FaFacebook />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title}`}
              target="_blank"
              rel="noopener noreferrer"
              style={themeStyles.shareButton}
            >
              <FaTwitter />
            </a>
            <a
              href={`https://pinterest.com/pin/create/button/?url=${window.location.href}&media=${post.image}&description=${post.title}`}
              target="_blank"
              rel="noopener noreferrer"
              style={themeStyles.shareButton}
            >
              <FaPinterest />
            </a>
            <a
              href={`mailto:?subject=${post.title}&body=${window.location.href}`}
              style={themeStyles.shareButton}
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Comments Section */}
        <div style={themeStyles.commentsSection}>
          <h3 style={themeStyles.commentsTitle}>Comments ({comments.length})</h3>
          
          {/* Comment Form */}
          <form style={themeStyles.commentForm} onSubmit={(e) => e.preventDefault()}>
            <textarea
              placeholder="Leave a comment..."
              style={themeStyles.commentInput}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit" style={themeStyles.commentButton}>
              Post Comment
            </button>
          </form>

          {/* Comments List */}
          <div style={themeStyles.commentList}>
            {comments.map((comment) => (
              <div key={comment.id} style={themeStyles.comment}>
                <div style={themeStyles.commentHeader}>
                  {!avatarErrors[comment.id] ? (
                    <img
                      src={comment.avatar}
                      alt={comment.name}
                      style={themeStyles.commentAvatar}
                      onError={() => handleAvatarError(comment.id)}
                    />
                  ) : (
                    <div style={themeStyles.commentAvatarFallback}>
                      <FaUserCircle />
                    </div>
                  )}
                  <div style={themeStyles.commentInfo}>
                    <div style={themeStyles.commentName}>{comment.name}</div>
                    <div style={themeStyles.commentDate}>{comment.date}</div>
                  </div>
                </div>
                <p style={themeStyles.commentText}>{comment.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        {/* <div style={themeStyles.relatedSection}>
          <h3 style={themeStyles.relatedTitle}>Related Posts</h3>
          <div style={themeStyles.relatedGrid}>
            {[1, 2, 3].map((_, i) => (
              <Link key={i} to={`/blog/${i + 2}`} style={themeStyles.relatedCard}>
                <img
                  src={`https://via.placeholder.com/300x150/f8f8f8/e88ca6?text=Post+${i+2}`}
                  alt={`Post ${i + 2}`}
                  style={themeStyles.relatedImage}
                />
                <h4 style={themeStyles.relatedPostTitle}>Related Blog Post Title {i + 2}</h4>
                <div style={themeStyles.relatedPostMeta}>
                  <FaClock /> 5 min read
                </div>
              </Link>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default BlogPost;