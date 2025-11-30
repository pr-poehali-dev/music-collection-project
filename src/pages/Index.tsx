import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const mockTracks = [
  { id: 1, title: 'Neon Dreams', artist: 'Electric Pulse', album: 'Synthwave Night', duration: '3:45', cover: '🎵', genre: 'Electronic' },
  { id: 2, title: 'Midnight Jazz', artist: 'The Groove Collective', album: 'Late Night Sessions', duration: '4:12', cover: '🎷', genre: 'Jazz' },
  { id: 3, title: 'Digital Rain', artist: 'Cyber Orchestra', album: 'Future Sounds', duration: '3:28', cover: '🎹', genre: 'Electronic' },
  { id: 4, title: 'Acoustic Sunrise', artist: 'Mountain Echo', album: 'Natural Harmony', duration: '3:56', cover: '🎸', genre: 'Acoustic' },
  { id: 5, title: 'Bass Revolution', artist: 'Urban Beats', album: 'Street Sound', duration: '3:33', cover: '🥁', genre: 'Hip-Hop' },
  { id: 6, title: 'Classical Dreams', artist: 'Symphony Hall', album: 'Timeless', duration: '5:21', cover: '🎻', genre: 'Classical' },
];

const mockPlaylists = [
  { id: 1, name: 'Chill Vibes', tracks: 24, cover: '🌙', description: 'Расслабляющая музыка для вечера' },
  { id: 2, name: 'Workout Energy', tracks: 38, cover: '⚡', description: 'Энергия для тренировок' },
  { id: 3, name: 'Focus Flow', tracks: 45, cover: '🎯', description: 'Концентрация и продуктивность' },
  { id: 4, name: 'Road Trip', tracks: 52, cover: '🚗', description: 'Музыка для путешествий' },
];

const mockArtists = [
  { id: 1, name: 'Electric Pulse', albums: 5, followers: '2.5M', cover: '🎤', genre: 'Electronic' },
  { id: 2, name: 'The Groove Collective', albums: 8, followers: '1.8M', cover: '🎺', genre: 'Jazz' },
  { id: 3, name: 'Cyber Orchestra', albums: 3, followers: '3.2M', cover: '🎼', genre: 'Electronic' },
  { id: 4, name: 'Mountain Echo', albums: 6, followers: '1.2M', cover: '🪕', genre: 'Acoustic' },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [currentTrack, setCurrentTrack] = useState<typeof mockTracks[0] | null>(null);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-950/30">
      <div className="flex">
        <aside className="w-64 h-screen sticky top-0 glass-effect border-r p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-montserrat font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              MusicBox
            </h1>
            <p className="text-xs text-muted-foreground mt-1">Твоя музыкальная вселенная</p>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'home', icon: 'Home', label: 'Главная' },
              { id: 'collection', icon: 'Library', label: 'Коллекция' },
              { id: 'playlists', icon: 'ListMusic', label: 'Плейлисты' },
              { id: 'artists', icon: 'Mic2', label: 'Исполнители' },
              { id: 'search', icon: 'Search', label: 'Поиск' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/50'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-8 p-4 rounded-lg glass-effect border">
            <h3 className="text-sm font-semibold mb-2">🎯 Рекомендации</h3>
            <p className="text-xs text-muted-foreground mb-3">
              На основе {likedTracks.length} любимых треков
            </p>
            {recommendedTracks.map(track => (
              <div key={track.id} className="flex items-center gap-2 mb-2 p-2 rounded hover:bg-white/5 cursor-pointer">
                <span className="text-2xl">{track.cover}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{track.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 p-8 overflow-y-auto h-screen">
          {activeTab === 'search' && (
            <div className="mb-6">
              <div className="relative max-w-2xl">
                <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Поиск музыки, исполнителей, альбомов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg glass-effect border-white/10"
                />
              </div>
            </div>
          )}

          {activeTab === 'home' && (
            <div className="space-y-8 animate-fade-in">
              <div className="relative h-64 rounded-2xl overflow-hidden glass-effect border">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 backdrop-blur-sm" />
                <div className="relative h-full flex items-center justify-center p-8">
                  <div className="text-center">
                    <h2 className="text-5xl font-montserrat font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                      Открой новую музыку
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      Персональные рекомендации на основе твоих предпочтений
                    </p>
                    <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
                      <Icon name="Sparkles" size={20} className="mr-2" />
                      Получить рекомендации
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Недавно прослушано</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockTracks.slice(0, 6).map((track, idx) => (
                    <Card 
                      key={track.id} 
                      className="glass-effect border-white/10 p-4 hover-scale cursor-pointer animate-scale-in"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                      onClick={() => setCurrentTrack(track)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl">
                          {track.cover}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">{track.title}</h4>
                          <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">{track.genre}</Badge>
                            <span className="text-xs text-muted-foreground">{track.duration}</span>
                          </div>
                        </div>
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
                            name={likedTracks.includes(track.id) ? "Heart" : "Heart"} 
                            size={20}
                            className={likedTracks.includes(track.id) ? "fill-accent text-accent" : ""}
                          />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'collection' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">Твоя коллекция</h2>
                <Badge className="bg-primary">{mockTracks.length} треков</Badge>
              </div>
              
              <div className="space-y-2">
                {mockTracks.map((track, idx) => (
                  <Card 
                    key={track.id}
                    className="glass-effect border-white/10 p-4 hover:bg-white/10 transition-all cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                    onClick={() => setCurrentTrack(track)}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl w-12 h-12 flex items-center justify-center rounded bg-gradient-to-br from-primary/20 to-accent/20">
                        {track.cover}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold">{track.title}</h4>
                        <p className="text-sm text-muted-foreground">{track.artist} • {track.album}</p>
                      </div>
                      <Badge variant="outline">{track.genre}</Badge>
                      <span className="text-muted-foreground">{track.duration}</span>
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
                          className={likedTracks.includes(track.id) ? "fill-accent text-accent" : ""}
                        />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'playlists' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl font-bold">Плейлисты</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockPlaylists.map((playlist, idx) => (
                  <Card 
                    key={playlist.id}
                    className="glass-effect border-white/10 p-6 hover-scale cursor-pointer animate-scale-in"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="text-6xl mb-4 h-32 flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg">
                      {playlist.cover}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{playlist.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{playlist.description}</p>
                    <div className="flex items-center gap-2">
                      <Icon name="Music" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{playlist.tracks} треков</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'artists' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl font-bold">Исполнители</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockArtists.map((artist, idx) => (
                  <Card 
                    key={artist.id}
                    className="glass-effect border-white/10 p-6 hover-scale cursor-pointer animate-scale-in text-center"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div className="text-6xl mb-4 h-32 w-32 mx-auto flex items-center justify-center bg-gradient-to-br from-primary to-accent rounded-full">
                      {artist.cover}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{artist.name}</h3>
                    <Badge variant="secondary" className="mb-3">{artist.genre}</Badge>
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                      <span>{artist.albums} альбомов</span>
                      <span>•</span>
                      <span>{artist.followers}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'search' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl font-bold">
                {searchQuery ? `Результаты для "${searchQuery}"` : 'Начни поиск'}
              </h2>
              {searchQuery ? (
                <div className="space-y-2">
                  {filteredTracks.map((track) => (
                    <Card 
                      key={track.id}
                      className="glass-effect border-white/10 p-4 hover:bg-white/10 transition-all cursor-pointer"
                      onClick={() => setCurrentTrack(track)}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{track.cover}</span>
                        <div className="flex-1">
                          <h4 className="font-semibold">{track.title}</h4>
                          <p className="text-sm text-muted-foreground">{track.artist} • {track.album}</p>
                        </div>
                        <Badge variant="outline">{track.genre}</Badge>
                        <span className="text-muted-foreground">{track.duration}</span>
                      </div>
                    </Card>
                  ))}
                  {filteredTracks.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Ничего не найдено</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {['Electronic', 'Jazz', 'Rock', 'Hip-Hop', 'Classical', 'Pop', 'Indie', 'R&B'].map((genre, idx) => (
                    <Card 
                      key={genre}
                      className="glass-effect border-white/10 p-6 hover-scale cursor-pointer animate-scale-in"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <h3 className="font-bold text-lg">{genre}</h3>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 glass-effect border-t p-4 animate-fade-in">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <div className="flex items-center gap-4 flex-1">
              <span className="text-4xl w-14 h-14 flex items-center justify-center rounded bg-gradient-to-br from-primary to-accent">
                {currentTrack.cover}
              </span>
              <div>
                <h4 className="font-semibold">{currentTrack.title}</h4>
                <p className="text-sm text-muted-foreground">{currentTrack.artist}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost">
                <Icon name="SkipBack" size={20} />
              </Button>
              <Button size="icon" className="w-12 h-12 bg-primary hover:bg-primary/90">
                <Icon name="Play" size={24} />
              </Button>
              <Button size="icon" variant="ghost">
                <Icon name="SkipForward" size={20} />
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => toggleLike(currentTrack.id)}
              >
                <Icon 
                  name="Heart" 
                  size={20}
                  className={likedTracks.includes(currentTrack.id) ? "fill-accent text-accent" : ""}
                />
              </Button>
              <Button size="icon" variant="ghost">
                <Icon name="Volume2" size={20} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
