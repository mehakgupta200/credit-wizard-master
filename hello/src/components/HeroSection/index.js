import React,{useState} from "react";
import Video from "../../videos/video.mp4";
import {Button} from '../ButtonElement';
import { HeroContainer, HeroBg, VideoBg,HeroContent,HeroP,HeroH1,HeroBtnWrapper,ArrowForward,ArrowRight } from "./HeroElements";

const HeroSection = () => {
    const [hover,setHover] =useState(false);

    const onHover = () => {
        setHover(!hover);
    }
  return (
    <HeroContainer id='home'>
      <HeroBg>
        <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
      </HeroBg>
      <HeroContent>
        <HeroH1>Bussiness Hua Easy!</HeroH1>
        <HeroP>
          DIGITAL LEDGER
        </HeroP>
        <HeroBtnWrapper>
            <Button to="signup" onMouseEnter={onHover} onMouseLeave={onHover}
            primary="true" dark="true"
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}>
                Get started {hover? <ArrowForward/>:<ArrowRight/>}
            </Button>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;