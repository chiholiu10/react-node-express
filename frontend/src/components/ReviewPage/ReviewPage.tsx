import React, { useEffect } from 'react';
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { getDetails } from '../../actions';
import { useParams } from "react-router-dom";
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
}

interface Params {
    id: any;
}

export const ReviewPage: React.FC<ReviewProps | MusicProps> = ({ musicDetails }) => {
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

    return (
        <div>
            <div>{musicDetails.id}</div>
            <div>{musicDetails.artist}</div>
            <div>{musicDetails.title}</div>
            <div>{musicDetails.release_year}</div>
            <img src={musicDetails.image_url} alt={musicDetails.title} />

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
