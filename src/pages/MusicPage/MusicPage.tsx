import Block from "../../components/Block/Block";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const MusicPage = () => {
  return (
    <Block>
      Surf_Curse_-_Freaks
      <AudioPlayer src="https://ds.cdn19.deliciouspeaches.com/get/cuts/29/1d/291da91f066d26c1284fa050bcdf70ed/73035154/Surf_Curse_-_Freaks_b128f0d147.mp3" />
    </Block>
  );
};

export default MusicPage;
