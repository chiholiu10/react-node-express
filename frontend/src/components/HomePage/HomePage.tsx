import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Link, BrowserRouter } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
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
        dispatch(getData(result.data));
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  // const postReview = async (value: string) => {
  //   const config = {
  //     headers: { "Content-Type": "application/json" }
  //   };

  //   let data = {
  //     name: value
  //   };
  //   try {
  //     const getData = async () => {
  //       const result = await axios.post('http://localhost:5000/songs', data, config);
  //       console.log(result);
  //     };
  //     getData();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const submitReview = () => {
  //   postReview(inputValue);
  // };
  return (
    <div>
      {musicListing.map((music: { id: number; image_url: string; title: string; }, index: number) => {
        return (
          <BrowserRouter key={music.id}>
            <Link
              to={`/music/${music.id}`}
              onClick={() => dispatch(getId(music.id))}
            >
              <div>
                <img src={music.image_url} alt={music.title} />
              </div>
            </Link>
          </BrowserRouter>
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