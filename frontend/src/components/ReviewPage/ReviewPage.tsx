import React, { useEffect } from 'react';
import { connect, ConnectedProps } from "react-redux";
import { useParams } from "react-router-dom";

interface MusicList {
    id: number;
    artist: string;
    title: string;
    release_year: number;
    genre_id: number;
    image_url: string;
}

interface Params {
    id: any;
}

interface MusicProps {
    musicListing?: MusicList[];
}
export const ReviewPage: React.FC<ReviewProps | MusicProps> = ({ musicListing }) => {
    const { id } = useParams<Params>();
    useEffect(() => {
        console.log('load');
    }, []);

    const showAllMusic = musicListing.map((item: { id: number; artist: string; title: string; release_year: number; image_url: string; }, index: number) => (
        <div key={item.id}>
            <div>{item.id}</div>
            <div>{item.artist}</div>
            <div>{item.title}</div>
            <div>{item.release_year}</div>
            <img src={item.image_url} alt={item.title} />
        </div>
    ));
    return (
        <div>{showAllMusic}</div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        musicListing: state.musicData.allMusic || [],

    };
};
const connector = connect(mapStateToProps);
type ReviewProps = ConnectedProps<typeof connector>;
export default connector(ReviewPage);
