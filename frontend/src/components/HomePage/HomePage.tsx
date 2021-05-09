import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getId } from '../../actions';
import axios from 'axios';

interface MusicList {
  id: number;
  artist: string;
  title: string;
  release_year: number;
  genre_id: number;
  image_url: string;
}

interface MusicProps {
  musicListing?: MusicList[];
}

export const HomePage: React.FC<MusicProps> = () => {
  const [musicData, setMusicData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const config = {
      headers: { "accepts": "application/json" }
    };

    try {
      const fetchData = async () => {
        const result = await axios.get('http://localhost:5000/', config);
        setMusicData(result.data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return (
    <div>
      {musicData.map((music: { id: number; image_url: string; title: string; }) => {
        return (
          <Link
            key={music.id}
            to={`/music/${music.id}`}
            onClick={() => dispatch(getId(music.id))}
          >
            <div>
              <img src={music.image_url} alt={music.title} />
            </div>
          </Link>
        );
      })}
    </div >
  );
};

export default HomePage;