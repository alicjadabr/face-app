import Particles from "react-tsparticles";
import { loadSlim} from "tsparticles-slim";
// import { loadFull } from "tsparticles";
import { useCallback, useMemo} from 'react';

const ParticlesComponent = (props) => {
  const options = useMemo(() =>  {
    return {
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: 'push',
          },
          onHover: {
            enable: true,
            mode: 'repulse',
          },
        },
        modes: {
          push: {
            quantity: 10,
          },
          repulse: {
            distance: 100,
          },
        },
      },
      particles: {
        number: {
          value: 120,
          density: {
            enable: true,
            value_area: 1000,
          },
        },
        line_linked: {
          shadow: {
            enable: true,
            color: '#3CA9D1',
            blur: 5,
          },
        },
        links: {
          enable: true,
        },
        move: {
          enable: true,
          speed: 1,
        },
        opacity: {
          value: {min:0.5, max: 0.6},
        },
        size: {
          value: {min: 1, max: 2},
        },
      }

    };
  }, []);

  const particlesInit = useCallback((engine) => {
    loadSlim(engine);
    // loadFull(engine); //for this sample the slim is v is enough, choose whatever u prefer, slim is smaller in size
  }, []);


  return <Particles id={props.id} init={particlesInit} options={options}/>;
};

export default ParticlesComponent;