import { SearchBar } from "@/components/search-bar";
import { SongTab } from "@/components/song-tab";
import api from "@/lib/api";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const query = searchParams.q || "";
  const songs = (await api.marathiControllerGetSong()).data;

  return (
    <div className="container">
      <h1 className="section-title">{`Search Results for "${query}"`}</h1>
      <SearchBar defaultValue={query} />
      <SongTab songs={songs} letter={query} />
    </div>
  );
}
