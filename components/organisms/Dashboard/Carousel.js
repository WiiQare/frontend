import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import { BiCaretRight } from 'react-icons/bi';
import '@splidejs/react-splide/css';
import '../../../styles/Carousel.module.css';
import Link from 'next/link';

const Carousel = () => {
  return (
    <div className="px-2 pt-4 md:px-6">
      <Splide
        hasTrack={false}
        aria-label="Attribution"
        options={{
          type: 'loop',
          perPage: 1,
          heightRatio: 0.8,
          mediaQuery: 'min',
          breakpoints: {
            640: {
              heightRatio: 0.35,
              perPage: 1,
              gap: 20,
            },
          },
          pagination: true,
        }}
        className="container mx-auto px-8 bg-yellow-300 rounded-3xl"
      >
        <SplideTrack hasTrack={false}>
          <SplideSlide className="w-full">
            <div className="bg-yellow-300 h-full flex md:justify-center items-center md:pl-12 gap-10">
              <div className="flex flex-col md:gap-7 gap-2">
                <div className="space-y-3">
                  <h1 className="text-2xl md:text-4xl font-semibold">
                    Envoyez de l’argent pour la santé de vos proches sans payer de frais
                  </h1>
                  {/* <p className="text-xs md:text-sm text-gray-700 w-full flex">
                    Gagnez une somme de 5$ pour votre première achat de passe
                    santé WiiQare.
                  </p> */}
                </div>
                <Link href={'https://wiiqare.com/how-it-works'} target='_blank' legacyBehavior>
                  <a className="bg-gray-800 w-fit p-3 text-yellow-300 rounded-lg text-xs md:text-md">
                    Comment ça marche
                  </a>
                </Link>
              </div>

              <div className="hidden justify-end md:w-full md:flex">
                <img src="https://i.goopics.net/otvw2n.png" className="object-cover" alt="Wallet" />
              </div>
            </div>
          </SplideSlide>

          <SplideSlide className="w-full">
            <div className="bg-yellow-300 h-full flex md:justify-center md:pl-12">
              <div className="flex flex-col justify-center md:gap-7 gap-2">
                <div className="space-y-3">
                  <h1 className="text-2xl md:text-4xl font-semibold">
                    Envoyez de l’argent pour la santé de vos proches sans payer de frais
                  </h1>
                  {/* <p className="text-xs md:text-sm text-gray-700 w-full flex">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Adipisci, beatae nam eveniet hic nesciunt explicabo dolore
                    quidem Adipisci, beatae nam eveniet hic nesciunt explicabo
                    dolore quidem
                  </p> */}
                </div>
                <Link href={'https://wiiqare.com/how-it-works'} target='_blank' legacyBehavior>
                  <a className="bg-gray-800 w-fit p-3 text-yellow-300 rounded-lg text-xs md:text-md">
                    Comment ça marche
                  </a>
                </Link>
              </div>

              <div className="hidden md:w-full md:flex justify-end ">
                <img src="https://i.goopics.net/4kdqe7.png" className="object-cover" alt="Startup" />
              </div>
            </div>
          </SplideSlide>

          <SplideSlide className="w-full">
            <div className="bg-yellow-300 h-full flex md:justify-center md:pl-12 gap-10">
              <div className="flex flex-col justify-center md:gap-7 gap-2">
                <div className="space-y-3">
                  <h1 className="text-2xl md:text-4xl font-semibold">
                    Connecter vos proches aux meilleurs professionnels de santé
                  </h1>
                  {/* <p className="text-xs md:text-sm text-gray-700 w-full flex">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Adipisci, beatae nam eveniet hic nesciunt explicabo dolore
                    quidem Adipisci, beatae nam eveniet hic nesciunt explicabo
                    dolore quidem
                  </p> */}
                </div>
                <Link href={'https://wiiqare.com/second-opinion'} legacyBehavior>
                  <a className="bg-gray-800 w-fit p-3 text-yellow-300 rounded-lg text-xs md:text-md">
                    Consulter
                  </a>
                </Link>
              </div>

              <div className="hidden md:w-full md:flex justify-end relative -bottom-4 ">
                <img src="https://i.goopics.net/dlqbsx.png" className="object-cover" alt="Phone" />
              </div>
            </div>
          </SplideSlide>

          <SplideSlide className="w-full">
            <div className="bg-yellow-300 h-full flex md:justify-center md:pl-12 gap-10">
              <div className="flex flex-col justify-center md:gap-7 gap-2">
                <div className="space-y-3">
                  <h1 className="text-2xl md:text-4xl font-semibold">
                    Demander un second opinion aux professionnels de santé
                  </h1>
                  {/* <p className="text-xs md:text-sm text-gray-700 w-full flex">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Adipisci, beatae nam eveniet hic nesciunt explicabo dolore
                    quidem Adipisci, beatae nam eveniet hic nesciunt explicabo
                    dolore quidem
                  </p> */}
                </div>
                <Link href={'https://wiiqare.com/second-opinion'} legacyBehavior>
                  <a className="bg-gray-800 w-fit p-3 text-yellow-300 rounded-lg text-xs md:text-md">
                    Consulter
                  </a>
                </Link>
              </div>

              <div className="hidden md:w-full md:flex justify-end relative -bottom-4 ">
                <img src="https://i.goopics.net/jej08g.png" className="object-cover" alt="Phone" />
              </div>
            </div>
          </SplideSlide>
        </SplideTrack>

        <div className="splide__arrows">
          <button className="splide__arrow splide__arrow--prev bg-transparent relative !-left-7 top-2 bottom-0 !bg-[#F0F4FD] p-4 text-3xl focus:ring-0">
            <span className="bg-white rounded-full p-1 !text-red-500">
              <BiCaretRight />
            </span>
          </button>
          <button className="splide__arrow splide__arrow--next bg-transparent relative !-right-7 top-2 bottom-0 !bg-[#F0F4FD] p-4 text-3xl focus:ring-0">
            <span className="bg-white rounded-full p-1 !text-red-500">
              <BiCaretRight />
            </span>
          </button>
        </div>
      </Splide>
    </div>
  );
};

export default Carousel;
