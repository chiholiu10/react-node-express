import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { getDetails } from '../../actions';
import { useParams } from "react-router-dom";
import { RatingStar } from "rating-star";
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
  musicDetails?: MusicList;
  onRatingChange?: (rating: number) => void;
}

interface Params {
  id: any;
}

export const ReviewPage: React.FC<ReviewProps | MusicProps> = ({ musicDetails }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const { id } = useParams<Params>();

  useEffect(() => {
    const config = {
      headers: { "accepts": "application/json" }
    };

    try {
      const fetchData = async () => {
        const result = await axios.get(`http://localhost:5000/music/${id}`, config);
        dispatch(getDetails(result.data));
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [id, dispatch]);

  const postReview = (reviews: object) => {
    const data = reviews;
    console.log(data);

    const config = {
      headers: { "accepts": "application/json" }
    };

    try {
      const postData = async () => {
        const result = await axios.post(`http://localhost:5000/addReview/${id}`, data, config);
        dispatch(getDetails(result.data));
      };
      postData();
    } catch (error) {
      console.log(error);
    }

  };

  const submitReview = (reviewComment: string) => {
    postReview({
      id: id,
      locale: "nl",
      rating: rating,
      text: String(reviewComment)
    });
  };

  const onRatingChange = (currentRating: number) => {
    setRating(currentRating);
  };

  return (
    <div>
      <div>{musicDetails.id}</div>
      <div>{musicDetails.artist}</div>
      <div>{musicDetails.title}</div>
      <div>{musicDetails.release_year}</div>
      <img src={musicDetails.image_url} alt={musicDetails.title} />
      <form
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            comment: { value: string; };
          };
          const reviewComment = target.comment.value; // typechecks!
          setComment(reviewComment);
          submitReview(reviewComment);
          target.comment.value = "";
          setRating(0);
        }}
      >
        <div>
          <textarea name="comment" rows={5} cols={33} />
        </div>
        <div>
          <RatingStar
            id="clickable"
            clickable
            rating={rating}
            onRatingChange={onRatingChange}
          />
        </div>
        <div>
          <button type="submit" disabled={comment.length < 1 && rating < 1} >Login in</button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    musicDetails: state.musicData.musicDetail || []
  };
};

const connector = connect(mapStateToProps);
type ReviewProps = ConnectedProps<typeof connector>;
export default connector(ReviewPage);
