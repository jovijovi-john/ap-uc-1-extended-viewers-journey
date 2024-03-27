export default [
  [
    {
      id: 1,
      indicacao: "14",
      inicio: "13:00", // usar timestamp
      termino: "14:00", // usar timestamp
      starred: false,
      content: "Programa Anterior",
      downloadable: false,
      type: "",
    },
    {
      id: 2,
      indicacao: "16",
      inicio: "13:00", // usar timestamp
      termino: "14:00", // usar timestamp
      starred: false,
      content: "Programa Atual",
      downloadable: false,
      onAir: true,
      live: true,
      type: "",
    },
    {
      id: 3,
      indicacao: "18",
      inicio: "13:00", // usar timestamp
      termino: "14:00", // usar timestamp
      starred: true,
      content: "Programa a Seguir",
      downloadable: false,
      downloaded: true,
      type: "",
    },
  ],
  [
    {
      id: 4,
      indicacao: "12",
      inicio: "12:30", // usar timestamp
      termino: "14:00", // usar timestamp
      starred: false,
      content: "Programa anterior",
      downloadable: true,
      type: "serie",
      serieName: "Temporada X, episódio Y",
      resumo:
        "Primeiras linhas de resumo sobre o programa anterior do radiodifusor 2",
      advice: "Assista agora!",
    },
    {
      id: 5,
      indicacao: "livre",
      inicio: "13:00", // usar timestamp
      termino: "14:00", // usar timestamp
      starred: false,
      resumo:
        "Primeiras linhas de resumo sobre o programa atual do radiodifusor 2",
      content: "Programa Atual Radiodifusor 2",
      downloadable: false,
      live: true,
      onAir: true,
      type: "",
      advice: "Veja do início!",
    },
    {
      id: 6,
      indicacao: "10",
      inicio: "16:30", // usar timestamp
      termino: "17:00", // usar timestamp
      starred: false,
      content: "Programa a Seguir",
      downloadable: false,
      type: "",
      resumo:
        "Primeiras linhas de resumo sobre o programa a seguir do radiodifusor 2",
      advice: "Assista agora!",
    },
  ],
  [
    {
      id: 7,
      indicacao: "14",
      inicio: "13:00", // usar timestamp
      termino: "14:00", // usar timestamp
      starred: false,
      content: "Programa Anterior",
      downloadable: false,
      type: "",
    },
    {
      id: 8,
      indicacao: "12",
      inicio: "13:00", // usar timestamp
      termino: "14:00", // usar timestamp
      starred: false,
      content: "Programa Atual Radiodifusor 3",
      downloadable: true,
      live: true,
      onAir: true,
      type: "",
    },
    {
      id: 9,
      indicacao: "14",
      inicio: "13:00", // usar timestamp
      termino: "14:00", // usar timestamp
      starred: false,
      content: "Programa a Seguir",
      downloadable: false,
      type: "",
    },
  ],
];
