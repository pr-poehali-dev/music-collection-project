import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge, ListGroup, Navbar, Nav } from 'react-bootstrap';

const mockTracks = [
  { id: 1, title: 'Neon Dreams', artist: 'Electric Pulse', album: 'Synthwave Night', duration: '3:45', emoji: '🎵', genre: 'Electronic' },
  { id: 2, title: 'Midnight Jazz', artist: 'The Groove Collective', album: 'Late Night Sessions', duration: '4:12', emoji: '🎷', genre: 'Jazz' },
  { id: 3, title: 'Digital Rain', artist: 'Cyber Orchestra', album: 'Future Sounds', duration: '3:28', emoji: '🎹', genre: 'Electronic' },
  { id: 4, title: 'Acoustic Sunrise', artist: 'Mountain Echo', album: 'Natural Harmony', duration: '3:56', emoji: '🎸', genre: 'Acoustic' },
  { id: 5, title: 'Bass Revolution', artist: 'Urban Beats', album: 'Street Sound', duration: '3:33', emoji: '🥁', genre: 'Hip-Hop' },
  { id: 6, title: 'Classical Dreams', artist: 'Symphony Hall', album: 'Timeless', duration: '5:21', emoji: '🎻', genre: 'Classical' },
];

const mockPlaylists = [
  { id: 1, name: 'Chill Vibes', tracks: 24, emoji: '🌙' },
  { id: 2, name: 'Workout Energy', tracks: 38, emoji: '⚡' },
  { id: 3, name: 'Focus Flow', tracks: 45, emoji: '🎯' },
  { id: 4, name: 'Road Trip', tracks: 52, emoji: '🚗' },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTrack, setCurrentTrack] = useState<typeof mockTracks[0] | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedTracks, setLikedTracks] = useState<number[]>([1, 3]);

  const filteredTracks = mockTracks.filter(track => 
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recommendedTracks = mockTracks.filter(track => 
    likedTracks.includes(track.id) ? false : 
    mockTracks.find(t => likedTracks.includes(t.id))?.genre === track.genre
  ).slice(0, 3);

  const toggleLike = (trackId: number) => {
    setLikedTracks(prev => 
      prev.includes(trackId) ? prev.filter(id => id !== trackId) : [...prev, trackId]
    );
  };

  const playTrack = (track: typeof mockTracks[0]) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <>
      <Navbar className="navbar-custom" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand className="fw-bold fs-3" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            🎵 MusicHub
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Form className="d-flex mx-3">
                <Form.Control
                  type="search"
                  placeholder="Search music..."
                  className="search-bar"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid style={{ paddingTop: '80px', paddingBottom: currentTrack ? '140px' : '20px' }}>
        <Row>
          <Col lg={3} className="mb-4">
            <div className="sidebar fade-in">
              <h5 className="mb-3 fw-bold">✨ AI Recommendations</h5>
              <p className="text-muted small mb-3">Based on {likedTracks.length} liked tracks</p>
              <ListGroup variant="flush">
                {recommendedTracks.map(track => (
                  <ListGroup.Item 
                    key={track.id}
                    action
                    className="recommendation-item border-0"
                    onClick={() => playTrack(track)}
                  >
                    <div className="d-flex align-items-center">
                      <span className="fs-3 me-2">{track.emoji}</span>
                      <div className="flex-grow-1">
                        <div className="fw-semibold small">{track.title}</div>
                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>{track.artist}</div>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <h5 className="mt-4 mb-3 fw-bold">📚 Playlists</h5>
              <ListGroup variant="flush">
                {mockPlaylists.map(playlist => (
                  <ListGroup.Item 
                    key={playlist.id}
                    action
                    className="border-0"
                    style={{ padding: '0.75rem', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    <div className="d-flex align-items-center">
                      <span className="fs-3 me-2">{playlist.emoji}</span>
                      <div className="flex-grow-1">
                        <div className="fw-semibold small">{playlist.name}</div>
                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>{playlist.tracks} tracks</div>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Col>

          <Col lg={9}>
            <div className="mb-4">
              <h2 className="fw-bold mb-1" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {searchQuery ? `Search: "${searchQuery}"` : 'Your Music Collection'}
              </h2>
              <p className="text-white-50">{filteredTracks.length} tracks available</p>
            </div>

            <Row>
              {filteredTracks.map((track, idx) => (
                <Col key={track.id} md={6} lg={4} className="mb-4">
                  <Card className="music-card border-0 h-100 fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <div className="album-art" onClick={() => playTrack(track)}>
                      <span>{track.emoji}</span>
                      <div className="play-overlay">
                        <Button 
                          variant="light" 
                          size="lg"
                          className="rounded-circle"
                          style={{ width: '60px', height: '60px' }}
                        >
                          ▶️
                        </Button>
                      </div>
                    </div>
                    <Card.Body>
                      <Card.Title className="mb-1 fw-bold">{track.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted small">{track.artist}</Card.Subtitle>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="badge-genre">{track.genre}</span>
                        <small className="text-muted">{track.duration}</small>
                      </div>
                      <div className="d-flex gap-2">
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => toggleLike(track.id)}
                          className="flex-grow-1"
                        >
                          {likedTracks.includes(track.id) ? '❤️' : '🤍'} Like
                        </Button>
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => playTrack(track)}
                        >
                          ▶️
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {filteredTracks.length === 0 && (
              <div className="text-center py-5">
                <h3 className="text-white-50">🔍 No tracks found</h3>
                <p className="text-white-50">Try searching for something else</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>

      {currentTrack && (
        <div className="player-bar fixed-bottom">
          <Container>
            <Row className="align-items-center py-3">
              <Col md={4} className="d-flex align-items-center">
                <div 
                  className="rounded me-3"
                  style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem'
                  }}
                >
                  {currentTrack.emoji}
                </div>
                <div>
                  <div className="fw-bold">{currentTrack.title}</div>
                  <div className="text-muted small">{currentTrack.artist}</div>
                </div>
              </Col>

              <Col md={4} className="text-center">
                <div className="d-flex justify-content-center align-items-center gap-3">
                  <Button variant="outline-secondary" size="sm" className="rounded-circle" style={{ width: '40px', height: '40px' }}>
                    ⏮️
                  </Button>
                  <Button 
                    variant="primary" 
                    size="lg"
                    className="rounded-circle"
                    onClick={() => setIsPlaying(!isPlaying)}
                    style={{ 
                      width: '50px', 
                      height: '50px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none'
                    }}
                  >
                    {isPlaying ? '⏸️' : '▶️'}
                  </Button>
                  <Button variant="outline-secondary" size="sm" className="rounded-circle" style={{ width: '40px', height: '40px' }}>
                    ⏭️
                  </Button>
                </div>
                <div className="mt-2">
                  <Form.Range className="w-100" />
                  <div className="d-flex justify-content-between small text-muted">
                    <span>1:23</span>
                    <span>{currentTrack.duration}</span>
                  </div>
                </div>
              </Col>

              <Col md={4} className="text-end">
                <div className="d-flex justify-content-end align-items-center gap-2">
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => toggleLike(currentTrack.id)}
                  >
                    {likedTracks.includes(currentTrack.id) ? '❤️' : '🤍'}
                  </Button>
                  <Button variant="outline-secondary" size="sm">
                    🔊
                  </Button>
                  <Form.Range style={{ width: '100px' }} />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default Index;
