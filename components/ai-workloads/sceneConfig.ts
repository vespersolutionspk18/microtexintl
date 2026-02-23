export const SCENE_CONFIG = {
  cameras: {
    keys: [
      "Camera_02_data_center_01",
      "Camera_02_data_center_02",
      "Camera_02_data_center_03",
      "Camera_02_data_center_04",
      "Camera_02_data_center_05",
      "Camera_02_data_center_06",
      "Camera_02_data_center_07",
    ],
    motionStart: { key: "Camera_02_data_center_01", zoom: 15 },
    motionPath: [
      { key: "Camera_02_data_center_01", zoom: 9.5, duration: 1, hold: 0 },
      { key: "Camera_02_data_center_02", zoom: 11, duration: 1, hold: 0 },
      { key: "Camera_02_data_center_02", zoom: 19, duration: 1, hold: 0 },
      { key: "Camera_02_data_center_02", zoom: 19, duration: 0.5, hold: 0 },
      { key: "Camera_02_data_center_03", zoom: 11, duration: 1, hold: 0 },
      { key: "Camera_02_data_center_03", zoom: 30, duration: 1, hold: 0 },
      { key: "Camera_02_data_center_04", zoom: 60, duration: 1, hold: 0 },
      { key: "Camera_02_data_center_04", zoom: 50, duration: 1, hold: 0 },
      { key: "Camera_02_data_center_05", zoom: 30, duration: 1, hold: 0 },
      { key: "Camera_02_data_center_05", zoom: 30, duration: 1, hold: 0 },
      { key: "Camera_02_data_center_06", zoom: 15, duration: 1, hold: 0 },
      { key: "Camera_02_data_center_06", zoom: 15, duration: 1, hold: 0 },
      { key: "Camera_02_data_center_07", zoom: 9, duration: 1, hold: 0 },
      { key: "Camera_02_data_center_07", zoom: 7.5, duration: 1, hold: 0 },
      { key: "Camera_02_data_center_07", zoom: 6, duration: 1, hold: 0 },
      { key: "Camera_02_data_center_07", zoom: 5, duration: 1, hold: 0 },
    ],
  },
  turbines: {
    keys: ["WIND002"],
    bladeKeys: ["WIND_GEO002"],
    staticKeys: ["wind_static"],
    rotationSpeed: 4,
  },
  cars: {
    keys: ["CAR", "CAR001", "CAR002", "CAR003", "CAR004", "CAR007", "CAR010", "CAR011"],
    speed: 0.35,
    rotationSpeed: 0.12,
    routes: [
      ["waypoint001", "waypoint002", "waypoint003", "waypoint004", "waypoint005"],
      ["waypoint006", "waypoint007", "waypoint008", "waypoint009", "waypoint010", "waypoint011", "waypoint012", "waypoint013", "waypoint014", "waypoint015"],
      ["waypoint016", "waypoint017", "waypoint018", "waypoint019", "waypoint020", "waypoint021", "waypoint022"],
      ["waypoint023", "waypoint024", "waypoint025", "waypoint026", "waypoint027", "waypoint028", "waypoint004", "waypoint029", "waypoint030", "waypoint031", "waypoint032", "waypoint033"],
    ],
    geometry: {
      CAR: { rotateY: -Math.PI / 2 },
      CAR001: { rotateY: -Math.PI / 2 },
      CAR002: { rotateY: 0 },
      CAR003: { rotateY: Math.PI / 2 },
      CAR007: { rotateY: Math.PI / 2 },
      CAR011: { rotateY: -Math.PI / 2 },
    } as Record<string, { rotateY: number }>,
  },
  batteries: {
    keys: [
      "DATA_CENTER_BATTERIES_01_ROW_01001", "DATA_CENTER_BATTERIES_01_ROW_01002",
      "DATA_CENTER_BATTERIES_01_ROW_01004", "DATA_CENTER_BATTERIES_01_ROW_01006",
      "DATA_CENTER_BATTERIES_01_ROW_01008", "DATA_CENTER_BATTERIES_01_ROW_01010",
      "DATA_CENTER_BATTERIES_01_ROW_01012", "DATA_CENTER_BATTERIES_01_ROW_01014",
      "DATA_CENTER_BATTERIES_01_ROW_01016", "DATA_CENTER_BATTERIES_01_ROW_01018",
      "DATA_CENTER_BATTERIES_01_ROW_02", "DATA_CENTER_BATTERIES_01_ROW_02001",
      "DATA_CENTER_BATTERIES_01_ROW_02002", "DATA_CENTER_BATTERIES_01_ROW_02003",
      "DATA_CENTER_BATTERIES_01_ROW_02004", "DATA_CENTER_BATTERIES_01_ROW_02005",
      "DATA_CENTER_BATTERIES_01_ROW_02006", "DATA_CENTER_BATTERIES_01_ROW_02007",
      "DATA_CENTER_BATTERIES_01_ROW_02008", "DATA_CENTER_BATTERIES_01_ROW_02009",
    ],
  },
  floor: {
    keys: ["00_floor_city", "00_floor_data_center"],
  },
  powerlines: {
    config: {
      initialState: "bad" as const,
      lengthConstant: 2,
      bad: { color1: 0xf13536, color2: 0xd0cebd, uvScale: 3, speed: 1.5 },
      good: { color1: 0xfff313, color2: 0xc0b400, uvScale: 3, speed: 1.5 },
    },
    keys: [
      "line001", "line004", "line008", "line008_2", "line009", "line009_2",
      "line009_3", "line012", "line013", "line014", "line014_2", "line014_3", "line025",
    ],
    dataCenterKeys: {
      keys: ["line_data_center", "line_data_center001", "line_data_center003", "line_data_center004"],
      meshes: {
        line_data_center: { state: "bad" as const, direction: -1, yOffset: 0 },
        line_data_center001: { state: "good" as const, direction: 1, yOffset: 0 },
        line_data_center003: { state: "bad" as const, direction: 1, yOffset: 0.001 },
        line_data_center004: { state: "good" as const, direction: 1, yOffset: 0.001 },
      } as Record<string, { state: "bad" | "good"; direction: number; yOffset: number }>,
    },
    initiallyHidden: [
      "line004", "line008", "line009", "line009_2", "line012", "line013", "line014_2", "line014_3", "line025",
    ],
    meshes: {
      line004: { direction: -1, yOffset: 0, depthWrite: true },
      line009_3: { direction: -1, yOffset: 0, depthWrite: true },
      line012: { direction: -1, yOffset: 0, depthWrite: true },
      line013: { direction: -1, yOffset: 0, depthWrite: true },
      line014: { direction: -1, yOffset: 0, depthWrite: true },
      line025: { direction: -1, yOffset: 0.001, depthWrite: true },
    } as Record<string, { direction: number; yOffset: number; depthWrite: boolean }>,
  },
  dataCenterRoof: { key: "DATA_CENTER_ROOF001" },
  dataCenterExtraBatteries: { key: "DATA_CENTERS_BATTERIES_EXTRA001" },
  dataCenterWalls: {
    keys: ["line_data_center_wall_01", "line_data_center_wall_02", "line_data_center_wall_03"],
  },
  newDataCenters: {
    key: "NEW_DATA_CENTERS001",
    constructionKey: "CONSTRUCTION",
    floorTextures: { floorKey: "00_floor_data_center" },
  },
  textures: {
    "00_floor_city": {
      desktop: "/webgl/textures/desktop/data-center-floor-city.ktx2",
      mobile: "/webgl/textures/mobile/data-center-floor-city.ktx2",
      createNewMaterial: true,
    },
    "00_floor_data_center": {
      desktop: "/webgl/textures/desktop/data-center-floor-data-center-pre.ktx2",
      mobile: "/webgl/textures/mobile/data-center-floor-data-center-pre.ktx2",
      createNewMaterial: true,
    },
    newDatacenterFloorTextures: {
      desktop: "/webgl/textures/desktop/data-center-floor-data-center-post.ktx2",
      mobile: "/webgl/textures/mobile/data-center-floor-data-center-post.ktx2",
      createNewMaterial: true,
    },
  } as Record<string, { desktop: string; mobile: string; createNewMaterial: boolean }>,
  colors: {
    keys: {
      DATA_CENTER_ROOF_OUTLINE: { color: "#000000", replaceMaterialWithBasic: false },
      CONTRUCTION_OUTLINE_COLOR000000: { color: "#555555", replaceMaterialWithBasic: false },
      CONSTRUCTION_GEOMETRY: { color: "#eeeeee", replaceMaterialWithBasic: true },
    } as Record<string, { color: string; replaceMaterialWithBasic: boolean }>,
    forceBasicMaterial: ["ROAD_COLORD4D4D4"],
  },
  icons: {
    sets: {
      power1: {
        keys: ["PowerStatusIcon001", "PowerStatusIcon002", "PowerStatusIcon003", "PowerStatusIcon004"],
      },
      power3: {
        keys: ["PowerIcon007", "PowerIcon008", "PowerIcon009", "PowerIcon010"],
      },
      power4: {
        keys: [
          "PowerStatusIcon011", "PowerStatusIcon012", "PowerStatusIcon013", "PowerStatusIcon014",
          "PowerStatusIcon015", "PowerStatusIcon016", "PowerStatusIcon017", "PowerStatusIcon018",
        ],
      },
      dataCenter: {
        keys: ["DataCenterIcon001", "DataCenterIcon002", "DataCenterIcon003", "DataCenterIcon004"],
        label: "Data Center",
      },
      closeUp: {
        allKeys: ["ComputeLabelIcon", "AILabelIcon001", "AILabelIcon002", "CoolingLabelIcon", "BackRoomLabelIcon"],
        compute: { keys: ["ComputeLabelIcon"], label: "Compute" },
        aiUps: { keys: ["AILabelIcon001", "AILabelIcon002"], label: "AI UPS" },
        cooling: { keys: ["CoolingLabelIcon"], label: "Cooling" },
        backRoom: { keys: ["BackRoomLabelIcon"], label: "Old UPS", labelAlt: "More Compute" },
      },
    },
  },
  servers: {
    keys: [
      "CHANGED_NEW_SERVER_ROW_01001", "CHANGED_NEW_SERVER_ROW_01003", "CHANGED_NEW_SERVER_ROW_01005",
      "CHANGED_NEW_SERVER_ROW_01007", "CHANGED_NEW_SERVER_ROW_01009", "CHANGED_NEW_SERVER_ROW_01011",
      "CHANGED_NEW_SERVER_ROW_01013", "CHANGED_NEW_SERVER_ROW_01015", "CHANGED_NEW_SERVER_ROW_01017",
      "CHANGED_NEW_SERVER_ROW_01020", "CHANGED_NEW_SERVER_ROW_01021", "CHANGED_NEW_SERVER_ROW_01023",
      "CHANGED_NEW_SERVER_ROW_02", "CHANGED_NEW_SERVER_ROW_02001", "CHANGED_NEW_SERVER_ROW_02002",
      "CHANGED_NEW_SERVER_ROW_02003", "CHANGED_NEW_SERVER_ROW_02004", "CHANGED_NEW_SERVER_ROW_02005",
      "CHANGED_NEW_SERVER_ROW_02006", "CHANGED_NEW_SERVER_ROW_02007", "CHANGED_NEW_SERVER_ROW_02008",
      "CHANGED_NEW_SERVER_ROW_02009", "CHANGED_NEW_SERVER_ROW_02010", "CHANGED_NEW_SERVER_ROW_02011",
      "CHANGED_NEW_SERVER_ROW_03", "CHANGED_NEW_SERVER_ROW_03001", "CHANGED_NEW_SERVER_ROW_03002",
      "CHANGED_NEW_SERVER_ROW_03003", "CHANGED_NEW_SERVER_ROW_03004", "CHANGED_NEW_SERVER_ROW_03005",
      "CHANGED_NEW_SERVER_ROW_03006", "CHANGED_NEW_SERVER_ROW_03007", "CHANGED_NEW_SERVER_ROW_03008",
      "CHANGED_NEW_SERVER_ROW_03009", "CHANGED_NEW_SERVER_ROW_03010", "CHANGED_NEW_SERVER_ROW_03011",
    ],
  },
  coolingEquipment: {
    keys: [
      "CHANGED_POWER_ROOM_GEOMETRY_01", "CHANGED_POWER_ROOM_GEOMETRY_02",
      "CHANGED_POWER_ROOM_GEOMETRY_03", "CHANGED_POWER_ROOM_WALL001",
    ],
  },
};

// CDN base for all WebGL assets
export const WEBGL_CDN = "https://www.on.energy";

// Hero image sequence
export const HERO_FRAMES = {
  count: 200,
  getUrl: (index: number) => {
    const padded = String(index).padStart(3, "0");
    return `https://www.on.energy/img/ai-workloads/desktop/ai-workloads_${padded}.webp`;
  },
};

// Numeric scroll trigger breakpoints (exact from source Yx function)
export const PROGRESS_BREAKPOINTS = {
  roofLift: 0.42,
  wallsAppear: 0.45,
  bigTransition: 0.60,
  wallGlow: 0.68,
  roofReturn: 0.76,
  wallTransition: 0.90,
};

// Info card visibility ranges (exact from source: AIWorkloads_CardVisibilityRanges)
export const INFO_CARD_RANGES = [
  { key: "challenge-1", start: 0.03, end: 0.08 },
  { key: "challenge-2", start: 0.10, end: 0.19 },
  { key: "challenge-3", start: 0.30, end: 0.36 },
  { key: "challenge-4", start: 0.41, end: 0.53 },
  { key: "solution-1", start: 0.55, end: 0.62 },
  { key: "solution-2", start: 0.63, end: 0.71 },
  { key: "solution-3", start: 0.73, end: 0.83 },
  { key: "solution-4", start: 0.85, end: 0.999 },
];
