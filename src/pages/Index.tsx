import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const mockTracks = [
  { id: 1, title: 'Neon Dreams', artist: 'Electric Pulse', album: 'Synthwave Night', duration: '3:45', color: 'from-pink-500 to-purple-500', genre: 'Electronic' },
  { id: 2, title: 'Midnight Jazz', artist: 'The Groove Collective', album: 'Late Night Sessions', duration: '4:12', color: 'from-cyan-500 to-blue-500', genre: 'Jazz' },
  { id: 3, title: 'Digital Rain', artist: 'Cyber Orchestra', album: 'Future Sounds', duration: '3:28', color: 'from-purple-500 to-pink-500', genre: 'Electronic' },
  { id: 4, title: 'Acoustic Sunrise', artist: 'Mountain Echo', album: 'Natural Harmony', duration: '3:56', color: 'from-yellow-500 to-orange-500', genre: 'Acoustic' },
  { id: 5, title: 'Bass Revolution', artist: 'Urban Beats', album: 'Street Sound', duration: '3:33', color: 'from-green-500 to-cyan-500', genre: 'Hip-Hop' },
  { id: 6, title: 'Classical Dreams', artist: 'Symphony Hall', album: 'Timeless', duration: '5:21', color: 'from-blue-500 to-purple-500', genre: 'Classical' },
];

const mockPlaylists = [
  { id: 1, name: 'Chill Vibes', tracks: 24, color: 'from-purple-500 to-pink-500', emoji: '🌙' },
  { id: 2, name: 'Workout Energy', tracks: 38, color: 'from-red-500 to-orange-500', emoji: '⚡' },
  { id: 3, name: 'Focus Flow', tracks: 45, color: 'from-cyan-500 to-blue-500', emoji: '🎯' },
  { id: 4, name: 'Road Trip', tracks: 52, color: 'from-green-500 to-cyan-500', emoji: '🚗' },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState<'vinyl' | 'grid'>('vinyl');
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
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-950/20 to-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative">
        <header className="border-b border-border/50 backdrop-blur-xl bg-background/50 sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-montserrat font-black neon-glow text-primary">
                  RETROWAVE
                </h1>
                <p className="text-xs text-secondary">MUSIC COLLECTION</p>
              </div>

              <div className="flex-1 max-w-xl mx-8">
                <div className="relative">
                  <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search tracks, artists, albums..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 bg-card/50 border-primary/30 focus:border-primary h-12"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={activeView === 'vinyl' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setActiveView('vinyl')}
                  className={activeView === 'vinyl' ? 'bg-primary text-primary-foreground' : ''}
                >
                  <Icon name="Disc3" size={20} />
                </Button>
                <Button
                  variant={activeView === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setActiveView('grid')}
                  className={activeView === 'grid' ? 'bg-primary text-primary-foreground' : ''}
                >
                  <Icon name="LayoutGrid" size={20} />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-12 gap-8">
            <aside className="col-span-3 space-y-6">
              <Card className="p-6 bg-card/50 border-primary/30">
                <h3 className="text-sm font-bold text-primary mb-4 flex items-center gap-2">
                  <Icon name="Sparkles" size={16} />
                  AI RECOMMENDATIONS
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Based on {likedTracks.length} liked tracks
                </p>
                <div className="space-y-3">
                  {recommendedTracks.map(track => (
                    <div 
                      key={track.id} 
                      className="group flex items-center gap-3 p-2 rounded hover:bg-primary/10 cursor-pointer transition-all"
                      onClick={() => playTrack(track)}
                    >
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${track.color} flex items-center justify-center text-white shadow-lg`}>
                        <Icon name="Music" size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate">{track.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                      </div>
                      <Icon name="Play" size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-card/50 border-secondary/30">
                <h3 className="text-sm font-bold text-secondary mb-4 flex items-center gap-2">
                  <Icon name="ListMusic" size={16} />
                  PLAYLISTS
                </h3>
                <div className="space-y-2">
                  {mockPlaylists.map(playlist => (
                    <div key={playlist.id} className="flex items-center gap-3 p-2 rounded hover:bg-secondary/10 cursor-pointer transition-all">
                      <span className="text-2xl">{playlist.emoji}</span>
                      <div className="flex-1">
                        <p className="text-xs font-semibold">{playlist.name}</p>
                        <p className="text-xs text-muted-foreground">{playlist.tracks} tracks</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </aside>

            <div className="col-span-9">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-4xl font-montserrat font-black mb-2">
                    {searchQuery ? (
                      <span className="text-foreground">Search: <span className="text-primary neon-glow">{searchQuery}</span></span>
                    ) : (
                      <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                        YOUR COLLECTION
                      </span>
                    )}
                  </h2>
                  <p className="text-muted-foreground">{filteredTracks.length} tracks available</p>
                </div>
              </div>

              {activeView === 'vinyl' ? (
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredTracks.map((track, idx) => (
                    <Card 
                      key={track.id}
                      className="bg-card/30 border-white/10 p-8 hover:border-primary/50 transition-all cursor-pointer group animate-scale-in"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                      onClick={() => playTrack(track)}
                    >
                      <div className="relative mb-6">
                        <div className={`w-48 h-48 mx-auto rounded-full bg-gradient-to-br ${track.color} shadow-2xl relative group-hover:vinyl-spin transition-all duration-300`}>
                          <div className="absolute inset-4 rounded-full bg-background/80 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-card" />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-1 bg-background/20" />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center rotate-45">
                            <div className="w-full h-1 bg-background/20" />
                          </div>
                        </div>
                        <Button
                          size="icon"
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-primary hover:bg-primary/90 opacity-0 group-hover:opacity-100 transition-all shadow-xl"
                        >
                          <Icon name="Play" size={24} />
                        </Button>
                      </div>
                      
                      <div className="text-center">
                        <h3 className="font-bold text-lg mb-1 truncate">{track.title}</h3>
                        <p className="text-sm text-muted-foreground truncate mb-2">{track.artist}</p>
                        <div className="flex items-center justify-center gap-2">
                          <Badge variant="outline" className="text-xs border-primary/50 text-primary">
                            {track.genre}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{track.duration}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-center">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(track.id);
                          }}
                          className="hover:scale-110 transition-transform"
                        >
                          <Icon 
                            name="Heart" 
                            size={20}
                            className={likedTracks.includes(track.id) ? "fill-primary text-primary" : ""}
                          />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredTracks.map((track, idx) => (
                    <Card 
                      key={track.id}
                      className="bg-card/30 border-white/10 p-4 hover:bg-card/50 hover:border-primary/50 transition-all cursor-pointer group animate-fade-in"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                      onClick={() => playTrack(track)}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${track.color} flex items-center justify-center shadow-lg relative overflow-hidden`}>
                          <Icon name="Music" size={24} className="text-white relative z-10" />
                          <div className="absolute inset-0 bg-black/20" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-lg truncate">{track.title}</h4>
                          <p className="text-sm text-muted-foreground truncate">{track.artist} • {track.album}</p>
                        </div>

                        <Badge variant="outline" className="border-primary/50 text-primary">
                          {track.genre}
                        </Badge>

                        <span className="text-muted-foreground w-16 text-right">{track.duration}</span>

                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(track.id);
                          }}
                        >
                          <Icon 
                            name="Heart" 
                            size={20}
                            className={likedTracks.includes(track.id) ? "fill-primary text-primary" : ""}
                          />
                        </Button>

                        <Button
                          size="icon"
                          variant="ghost"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Icon name="Play" size={20} className="text-primary" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {filteredTracks.length === 0 && (
                <div className="text-center py-20">
                  <Icon name="SearchX" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-xl text-muted-foreground">No tracks found</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 backdrop-blur-xl bg-background/90 border-t border-primary/30 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${currentTrack.color} flex items-center justify-center shadow-lg ${isPlaying ? 'vinyl-spin' : ''}`}>
                  <Icon name="Music" size={24} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-lg truncate">{currentTrack.title}</h4>
                  <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
                </div>
                <Badge variant="outline" className="border-primary/50 text-primary">
                  {currentTrack.genre}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost" className="hover:text-primary">
                  <Icon name="Shuffle" size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="hover:text-primary">
                  <Icon name="SkipBack" size={20} />
                </Button>
                <Button 
                  size="icon" 
                  className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg neon-border text-primary"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <Icon name={isPlaying ? "Pause" : "Play"} size={24} />
                </Button>
                <Button size="icon" variant="ghost" className="hover:text-primary">
                  <Icon name="SkipForward" size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="hover:text-primary">
                  <Icon name="Repeat" size={20} />
                </Button>
              </div>

              <div className="flex items-center gap-4 flex-1 justify-end">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => toggleLike(currentTrack.id)}
                  className="hover:scale-110 transition-transform"
                >
                  <Icon 
                    name="Heart" 
                    size={20}
                    className={likedTracks.includes(currentTrack.id) ? "fill-primary text-primary" : ""}
                  />
                </Button>
                <div className="flex items-center gap-2">
                  <Icon name="Volume2" size={20} className="text-muted-foreground" />
                  <div className="w-24 h-1 bg-muted rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-primary" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <span>1:23</span>
                <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden cursor-pointer">
                  <div className="w-1/3 h-full bg-gradient-to-r from-primary to-accent" />
                </div>
                <span>{currentTrack.duration}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
