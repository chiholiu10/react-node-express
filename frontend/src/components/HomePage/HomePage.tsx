import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { getData, getId } from '../../actions';
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

export const HomePage: React.FC<HomePageProps | MusicProps> = ({ musicListing }) => {
  // const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const config = {
      headers: { "accepts": "application/json" }
    };

    try {
      const fetchData = async () => {
        const result = await axios.get('http://localhost:5000/data', config);
        dispatch(getData(result.data.videos));
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return (
    <div>
      {musicListing.map((music: { id: number; image_url: string; title: string; }, index: number) => {
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

const mapStateToProps = (state: any) => {
  return {
    musicListing: state.musicData.allMusic || []
  };
};
const connector = connect(mapStateToProps);
type HomePageProps = ConnectedProps<typeof connector>;
export default connector(HomePage);