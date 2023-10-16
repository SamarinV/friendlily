import Block from "../../components/Block/Block";
import useSound from "use-sound";

const MusicPage = () => {
  return (
    <>
      <Block>
        Здесь будет музыка
        <audio
          id="jp_audio_0"
          preload="metadata"
          src="https://rur.hitmotop.com/get/cuts/29/1d/291da91f066d26c1284fa050bcdf70ed/73035154/Surf_Curse_-_Freaks_b128f0d147.mp3"
          title="Freaks"
        ></audio>
      </Block>
    </>
  );
};

export default MusicPage;
