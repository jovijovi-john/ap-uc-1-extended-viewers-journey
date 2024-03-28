import MAXIcon from "../assets/apps/max.webp"
import NetflixIcon from "../assets/apps/netflix.png"
import PlutoTvIcon from "../assets/apps/pluto-logo.webp"
import PrimeVideoIcon from "../assets/apps/primeVideo.png"

import TheWitcherIcon from "../assets/apps/netflix_content/the_witcher.jpg"
import SandmanIcon from "../assets/apps/netflix_content/sandman.jpg"
import JujutsuIcon from "../assets/apps/netflix_content/jujutsu.jpg"
import DarkIcon from "../assets/apps/netflix_content/dark.jpg"
import LaCasaDePapelIcon from "../assets/apps/netflix_content/la_casa_de_papel.jpg"


export const apps = {

  max: {
    name: "MAX",
    icon: MAXIcon,
    slogan: "Slogan MAX",
    initialContent: 0,
    programs: [
      {
        title: "Titulo do programa",
        summary: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, odit! Alias nam dolorem iure? Natus optio enim fugit nisi corrupti mollitia itaque vel tempora perspiciatis quod, repudiandae qui vero adipisci. Sapiente asperiores quo quaerat ut nihil aut nesciunt quas, dolor assumenda.",
        blocked: true,
        rating: 12,
        banner: "https://github.com/csalles.png",
        startTime: "14:00",
        endTime: "15:30",
        downloadable: true,
        genre: "A",
        availableUntil: "28/07/2024",
        video: "https://www.youtube.com/embed/eNDKWr3Xmjk?si=r0cZNZOAfHsBox3-",
        broadcaster: "hbo",
        isLive: true,
        isOnAir: true,
        advice: "Assista agora!",
        icon: "https://2.bp.blogspot.com/-8z3ByL9Czxc/Wxqp2bPK85I/AAAAAAABl3Y/Ed3qBTAgqlobFmHXLF63-fMTiDVwu8RnwCLcBGAs/s1600/new-chacioms-league-branding%2B%25282%2529.jpg",
      },
    ],

    related: [1, 2, 3, 4, 5]
  },



  netflix: {
    name: "Netflix",
    icon: NetflixIcon,
    slogan: "Slogan HBO",
    initialContent: 0,
    programs: [
      {
        title: "Titulo do programa",
        summary: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, odit! Alias nam dolorem iure? Natus optio enim fugit nisi corrupti mollitia itaque vel tempora perspiciatis quod, repudiandae qui vero adipisci. Sapiente asperiores quo quaerat ut nihil aut nesciunt quas, dolor assumenda.",
        blocked: true,
        rating: 12,
        banner: "https://github.com/csalles.png",
        startTime: "14:00",
        endTime: "15:30",
        downloadable: true,
        genre: "A",
        availableUntil: "28/07/2024",
        video: "https://www.youtube.com/embed/6jtOBIICfJc?si=WakjsvqLFcty-bWJ",
        broadcaster: "netflix",
        isLive: true,
        isOnAir: true,
        advice: "Assista agora!",
        icon: "https://2.bp.blogspot.com/-8z3ByL9Czxc/Wxqp2bPK85I/AAAAAAABl3Y/Ed3qBTAgqlobFmHXLF63-fMTiDVwu8RnwCLcBGAs/s1600/new-chacioms-league-branding%2B%25282%2529.jpg",
      },
    ],

    related: [1, 2, 3, 4, 5]
  },

  plutoTv: {
    name: "Pluto TV",
    icon: PlutoTvIcon,
    slogan: "Slogan HBO",
    initialContent: 0,
    programs: [
      {
        title: "Titulo do programa",
        summary: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, odit! Alias nam dolorem iure? Natus optio enim fugit nisi corrupti mollitia itaque vel tempora perspiciatis quod, repudiandae qui vero adipisci. Sapiente asperiores quo quaerat ut nihil aut nesciunt quas, dolor assumenda.",
        blocked: true,
        rating: 12,
        banner: "https://github.com/csalles.png",
        startTime: "14:00",
        endTime: "15:30",
        downloadable: true,
        genre: "A",
        availableUntil: "28/07/2024",
        video: "https://www.youtube.com/embed/6jtOBIICfJc?si=WakjsvqLFcty-bWJ",
        broadcaster: "plutoTv",
        isLive: true,
        isOnAir: true,
        advice: "Assista agora!",
        icon: "https://2.bp.blogspot.com/-8z3ByL9Czxc/Wxqp2bPK85I/AAAAAAABl3Y/Ed3qBTAgqlobFmHXLF63-fMTiDVwu8RnwCLcBGAs/s1600/new-chacioms-league-branding%2B%25282%2529.jpg",
      },
    ],

    related: [1, 2, 3, 4, 5]
  },

  primeVideo: {
    name: "Prime Video",
    icon: PrimeVideoIcon,
    slogan: "Slogan HBO",
    initialContent: 0,
    programs: [
      {
        title: "Titulo do programa",
        summary: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, odit! Alias nam dolorem iure? Natus optio enim fugit nisi corrupti mollitia itaque vel tempora perspiciatis quod, repudiandae qui vero adipisci. Sapiente asperiores quo quaerat ut nihil aut nesciunt quas, dolor assumenda.",
        blocked: true,
        rating: 12,
        banner: "https://github.com/csalles.png",
        startTime: "14:00",
        endTime: "15:30",
        downloadable: true,
        genre: "A",
        availableUntil: "28/07/2024",
        video: "https://www.youtube.com/embed/6jtOBIICfJc?si=WakjsvqLFcty-bWJ",
        broadcaster: "primeVideo",
        isLive: true,
        isOnAir: true,
        advice: "Assista agora!",
        icon: "https://2.bp.blogspot.com/-8z3ByL9Czxc/Wxqp2bPK85I/AAAAAAABl3Y/Ed3qBTAgqlobFmHXLF63-fMTiDVwu8RnwCLcBGAs/s1600/new-chacioms-league-branding%2B%25282%2529.jpg",
      },
    ],

    related: [1, 2, 3, 4, 5]
  },
}

export const netflixContent = [
  {
    name: "",
    icon: TheWitcherIcon
  },
  {
    name: "",
    icon: SandmanIcon
  },
  {
    name: "",
    icon: JujutsuIcon
  },
  {
    name: "",
    icon: DarkIcon
  },
  {
    name: "",
    icon: LaCasaDePapelIcon
  },

]