"use client";

import type * as THREE_NS from "three";
import { useRef, useEffect, useState, useCallback } from "react";
import styles from "./AIScene.module.css";
import infoStyles from "./AIInfoCard.module.css";
import ctrlStyles from "./AISceneControls.module.css";
import { SCENE_CONFIG, WEBGL_CDN, INFO_CARD_RANGES } from "./sceneConfig";
import { powerlineVertexShader, powerlineFragmentShader } from "./shaders";
import { infoCards } from "./aiWorkloadsData";
import { createCameraParallax } from "./cameraParallax";
import { ShadowMesh } from "./shadowMesh";
import VoltageInstabilityChart from "./VoltageInstabilityChart";
import DataCenterDemandChart from "./DataCenterDemandChart";
import PeakDemandChart from "./PeakDemandChart";

export default function AIScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollSpacerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sceneRef = useRef<any>(null);
  const rafRef = useRef<number>(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const cardRefsArray = useRef<(HTMLDivElement | null)[]>(new Array(8).fill(null));
  const prevVisibleRef = useRef<boolean[]>(new Array(8).fill(false));
  const gsapRefForCards = useRef<typeof import("gsap").default | null>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const setupScene = useCallback(async () => {
    if (!canvasRef.current || !containerRef.current || !scrollSpacerRef.current) return null;
    const scrollSpacer = scrollSpacerRef.current;

    const THREE = await import("three");
    const { GLTFLoader } = await import("three/addons/loaders/GLTFLoader.js");
    const { DRACOLoader } = await import("three/addons/loaders/DRACOLoader.js");
    const { KTX2Loader } = await import("three/addons/loaders/KTX2Loader.js");
    const gsapModule = await import("gsap");
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    const gsap = gsapModule.default || gsapModule.gsap;
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    const wrapper = containerRef.current;
    const config = SCENE_CONFIG;

    // Renderer (exact from source WebglBase: antialias only, setClearColor white, no toneMapping)
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1);

    // Camera (exact from source WebglBase: frustumSize=50, near=0.1, far=1000)
    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 50;
    const camera = new THREE.OrthographicCamera(
      frustumSize * aspect / -2, frustumSize * aspect / 2,
      frustumSize / 2, frustumSize / -2,
      0.1, 1000
    );
    camera.zoom = config.cameras.motionStart.zoom;
    camera.updateProjectionMatrix();

    // Scene (exact from source: no background set, renderer clear color handles it)
    const scene = new THREE.Scene();
    const root = new THREE.Group();
    scene.add(root);

    // Light (exact from source qx: DirectionalLight with intensity 0, position 5,12,-10)
    const dirLight = new THREE.DirectionalLight(0xffffff, 0);
    dirLight.position.set(5, 12, -10);
    root.add(dirLight);

    // Data center powerline meshes (separate array for Yx color transitions)
    const dataCenterPowerlineMeshes: THREE_NS.Mesh[] = [];

    // State arrays
    const powerlineMaterials: THREE_NS.ShaderMaterial[] = [];
    const center = new THREE.Vector3();
    const textureMap: Record<string, THREE_NS.Texture> = {};
    const shadowMeshes: ShadowMesh[] = [];
    // Separate arrays matching source Yx: l = regular powerline meshes, c = datacenter powerline meshes
    const regularPowerlineMeshes: THREE_NS.Mesh[] = [];

    // Shadow ground plane and light (exact from source: y=-.47 plane, light at ambient position)
    const shadowPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.47);
    const shadowLight = new THREE.Vector4(5, 12, -10, 0.001);

    // Camera parallax controller (exact from source: Zd)
    const parallax = createCameraParallax(camera, {
      enabled: true,
      posIntensity: 1,
      rotIntensity: 3,
      smoothing: 0.03,
    });

    // Overlay markers state
    type Marker = {
      id: string;
      position3D: THREE_NS.Vector3;
      screenX: number;
      screenY: number;
      visible: boolean;
      data: {
        iconType: "text" | "power-status" | "power";
        label?: string;
        setId: string;
        hidden: boolean;
        type?: "bad" | "good" | "light";
        showBadge?: boolean;
        showBar?: boolean;
        barPercentage?: number;
        _lastType?: string;
      };
    };
    const markers: Marker[] = [];
    const projVec = new THREE.Vector3(); // reusable for 3D→2D projection

    // Loaders
    const loadingManager = new THREE.LoadingManager();
    const ktx2Loader = new KTX2Loader(loadingManager)
      .setTranscoderPath(`${WEBGL_CDN}/webgl/basis/`)
      .detectSupport(renderer);
    const gltfLoader = new GLTFLoader(loadingManager);
    gltfLoader.setKTX2Loader(ktx2Loader);
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(`${WEBGL_CDN}/webgl/gltf/draco/`);
    gltfLoader.setDRACOLoader(dracoLoader);

    // Create powerline material (exact from source)
    // Exact from source qx: N function — default blending=AdditiveBlending, premultipliedAlpha when Additive
    const createPowerlineMaterial = (
      state: "bad" | "good", direction: number, uvScale: number,
      opacity = 0.75, blending: THREE_NS.Blending = THREE.AdditiveBlending, depthWrite = true
    ) => {
      const cfg = config.powerlines.config[state];
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 }, uSpeed: { value: cfg.speed },
          uDirection: { value: direction }, uTransition: { value: 1 },
          uUvScale: { value: cfg.uvScale * uvScale },
          uColor1: { value: new THREE.Color(cfg.color1) },
          uColor2: { value: new THREE.Color(cfg.color2) },
          uOpacity: { value: opacity },
          uUvOffset: { value: new THREE.Vector2(0, 0) },
        },
        vertexShader: powerlineVertexShader, fragmentShader: powerlineFragmentShader,
        blending, premultipliedAlpha: blending === THREE.AdditiveBlending,
        side: THREE.DoubleSide, transparent: true, depthWrite,
      });
      powerlineMaterials.push(mat);
      return mat;
    };

    // Load textures
    const isMobile = window.innerWidth < 834;
    const textureEntries = Object.entries(config.textures);
    const texturePromises = textureEntries.map(
      ([key, tex]) => new Promise<void>((resolve) => {
        const url = `${WEBGL_CDN}${isMobile ? tex.mobile : tex.desktop}`;
        ktx2Loader.load(url, (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.flipY = false; texture.needsUpdate = true;
          textureMap[key] = texture; resolve();
        });
      })
    );

    // Load GLTF
    const gltfPromise = new Promise<{ scene: THREE_NS.Group }>((resolve) => {
      gltfLoader.load(`${WEBGL_CDN}/webgl/gltf/data-center.glb`, (gltf) => resolve(gltf));
    });

    const [gltfResult] = await Promise.all([gltfPromise, ...texturePromises]);
    if (!gltfResult) return null;

    // Center scene
    const bbox = new THREE.Box3().setFromObject(gltfResult.scene);
    bbox.getCenter(center);
    gltfResult.scene.position.sub(center);
    root.add(gltfResult.scene);

    // Collect objects (matching source's qx function exactly)
    const cameraObjects: Record<string, THREE_NS.Object3D> = {};
    const batteryObjects: THREE_NS.Object3D[] = [];
    const serverObjects: THREE_NS.Object3D[] = [];
    const turbineUpdaters: { update: (dt: number) => void }[] = [];
    const carUpdaters: { update: (dt: number) => void }[] = [];
    // Note: regularPowerlineMeshes (l in source) declared earlier; dataCenterPowerlineMeshes (c in source) below
    let roofObject: THREE_NS.Object3D | null = null;

    // Build car waypoint routes
    const carRoutes: THREE_NS.Vector3[][] = [];
    config.cars.routes.forEach((route) => {
      const waypoints: THREE_NS.Vector3[] = [];
      route.forEach((wpName) => {
        const wp = root.getObjectByName(wpName);
        if (wp) { waypoints.push(wp.position.clone()); wp.visible = false; }
      });
      carRoutes.push(waypoints);
    });

    let carIndex = 0;

    root.traverse((obj) => {
      // Camera positions
      if (config.cameras.keys.includes(obj.name)) cameraObjects[obj.name] = obj;

      // Textures
      if (textureMap[obj.name] && obj instanceof THREE.Mesh) {
        if (config.textures[obj.name]?.createNewMaterial) {
          obj.material = new THREE.MeshStandardMaterial({
            emissiveMap: textureMap[obj.name], emissive: 0xffffff, emissiveIntensity: 1,
          });
        } else {
          obj.material.emissiveMap = textureMap[obj.name];
          obj.material.emissive.set(0xffffff);
          obj.material.emissiveIntensity = 1;
        }
      }

      // Turbines rotation (exact from source am function: on PARENT turbine keys, not blade keys)
      if (config.turbines.keys.includes(obj.name)) {
        obj.rotation.z = Math.random() * 2 * Math.PI;
        const speed = THREE.MathUtils.randFloat(config.turbines.rotationSpeed * 0.8, config.turbines.rotationSpeed * 1.2);
        turbineUpdaters.push({ update: (dt: number) => { obj.rotation.z -= dt * speed; } });
      }

      // Shadow mesh for turbine blades (exact from source: on bladeKeys, not turbine keys)
      if (config.turbines.bladeKeys.includes(obj.name) && obj instanceof THREE.Mesh) {
        const shadow = new ShadowMesh(obj);
        (shadow.material as THREE_NS.Material).transparent = true;
        (shadow.material as THREE_NS.MeshBasicMaterial).opacity = 1;
        root.add(shadow);
        shadowMeshes.push(shadow);
      }

      // Turbine static shadow (exact from source)
      if (config.turbines.staticKeys.includes(obj.name) && obj instanceof THREE.Mesh) {
        const shadow = new ShadowMesh(obj);
        (shadow.material as THREE_NS.Material).transparent = true;
        (shadow.material as THREE_NS.MeshBasicMaterial).opacity = 1;
        root.add(shadow);
        shadowMeshes.push(shadow);
      }

      // Cars
      if (config.cars.keys.includes(obj.name)) {
        const geoCfg = config.cars.geometry[obj.name];
        const waypoints = carRoutes[carIndex % carRoutes.length];
        const speed = config.cars.speed * (0.8 + Math.random() * 0.4);
        const startDelay = carIndex * 2;
        let wpIdx = 0;
        let elapsed = 0;
        const baseY = obj.position.y;
        const target = new THREE.Vector3();
        const dir = new THREE.Vector3();
        const lookHelper = new THREE.Group();
        const lookQuat = new THREE.Quaternion();

        // Apply geometry rotation
        obj.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.geometry.boundingBox === null) child.geometry.computeBoundingBox();
            if (child.geometry.boundingBox) {
              const c2 = new THREE.Vector3();
              child.geometry.boundingBox.getCenter(c2);
              child.geometry.translate(-c2.x, 0, -c2.z);
            }
            child.geometry.rotateY(geoCfg?.rotateY ?? Math.PI);
            child.position.set(0, child.position.y, 0);
          }
        });
        if (waypoints[0]) { obj.position.setX(waypoints[0].x); obj.position.setZ(waypoints[0].z); }

        carUpdaters.push({
          update: (dt: number) => {
            elapsed += dt;
            if (elapsed < startDelay || !waypoints[wpIdx]) return;
            waypoints[wpIdx].setY(obj.position.y);
            target.copy(waypoints[wpIdx]);
            dir.copy(target).sub(obj.position).normalize();
            const angleDiff = obj.quaternion.angleTo(lookQuat);
            const speedMul = Math.max(0.5, 1 - angleDiff);
            obj.position.add(dir.multiplyScalar(speed * speedMul * dt));
            obj.position.setY(baseY);
            lookHelper.position.copy(obj.position);
            lookHelper.lookAt(target);
            lookQuat.copy(lookHelper.quaternion);
            obj.quaternion.slerp(lookQuat, config.cars.rotationSpeed);
            if (target.distanceTo(obj.position) < 0.01) wpIdx++;
            if (wpIdx >= waypoints.length) {
              wpIdx = 0;
              if (waypoints[0]) { obj.position.setX(waypoints[0].x); obj.position.setZ(waypoints[0].z); }
            }
          },
        });

        // Car shadow meshes (exact from source: shadow for cars_geo children)
        obj.traverse((child) => {
          if (child instanceof THREE.Mesh && child.name.includes("cars_geo")) {
            const shadow = new ShadowMesh(child);
            (shadow.material as THREE_NS.MeshBasicMaterial).opacity = 1;
            root.add(shadow);
            shadowMeshes.push(shadow);
          }
        });
        carIndex++;
      }

      // Powerlines (initial "bad" state) — track initialState on userData
      // Pushes to regularPowerlineMeshes (source: l array in qx)
      if (config.powerlines.keys.includes(obj.name)) {
        obj.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const meshCfg = config.powerlines.meshes[obj.name];
            const direction = meshCfg?.direction || 1;
            const yOffset = meshCfg?.yOffset ?? 0;
            const uvScale = new THREE.Box3().setFromObject(child).getSize(new THREE.Vector3()).length() / config.powerlines.config.lengthConstant;
            const state = config.powerlines.config.initialState;
            const mat = createPowerlineMaterial(state, direction, uvScale, 0.75, THREE.AdditiveBlending, meshCfg?.depthWrite ?? true);
            child.position.y = -0.001 + yOffset;
            child.material = mat;
            child.userData.initialState = state;
            child.userData.originalScale = child.scale.clone();
            regularPowerlineMeshes.push(child);
          }
        });
        if (config.powerlines.initiallyHidden.includes(obj.name)) obj.visible = false;
      }

      // Data center powerlines (separate array c in source Yx — NO overlap with regular)
      if (config.powerlines.dataCenterKeys.keys.includes(obj.name)) {
        obj.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const meshCfg = config.powerlines.dataCenterKeys.meshes[obj.name];
            const direction = meshCfg?.direction || 1;
            const yOffset = meshCfg?.yOffset ?? 0;
            const uvScale = new THREE.Box3().setFromObject(child).getSize(new THREE.Vector3()).length() / config.powerlines.config.lengthConstant;
            const state = meshCfg?.state || "good";
            const mat = createPowerlineMaterial(state, direction, uvScale);
            child.position.y += yOffset;
            child.material = mat;
            child.userData.initialState = state;
            child.userData.originalScale = child.scale.clone();
            dataCenterPowerlineMeshes.push(child);
          }
        });
      }

      // Batteries (exact from source: shadow mesh per non-outline child)
      if (config.batteries.keys.includes(obj.name)) {
        obj.userData.originalPosition = obj.position.clone();
        obj.position.y = -1;
        batteryObjects.push(obj);
        obj.traverse((child) => {
          if (child instanceof THREE.Mesh && !child.name.includes("OUTLINES")) {
            const shadow = new ShadowMesh(child);
            (shadow.material as THREE_NS.MeshBasicMaterial).opacity = 1;
            (shadow.material as THREE_NS.Material).visible = false;
            root.add(shadow);
            shadowMeshes.push(shadow);
            obj.userData.shadowMesh = shadow;
          }
        });
      }

      // Servers
      if (config.servers.keys.includes(obj.name)) {
        obj.userData.originalPosition = obj.position.clone();
        obj.position.y = -1;
        obj.visible = false;
        serverObjects.push(obj);
      }

      // Roof (exact from source qx: just add 0.002, originalPosition stored later in Yx)
      if (obj.name === config.dataCenterRoof.key) {
        obj.position.y += 0.002;
        roofObject = obj;
      }

      // Extra batteries (initially hidden)
      if (obj.name === config.dataCenterExtraBatteries.key) obj.visible = false;

      // Walls (initially hidden, with powerline material at opacity 0)
      if (config.dataCenterWalls.keys.includes(obj.name)) {
        obj.visible = false;
        obj.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const mat = createPowerlineMaterial("good", 1, 1, 0, THREE.NormalBlending, false);
            child.material = mat;
          }
        });
      }

      // New data centers (initially hidden)
      if (obj.name === config.newDataCenters.key) obj.visible = false;

      // Construction (initially visible)
      if (obj.name === config.newDataCenters.constructionKey) obj.visible = true;

      // Overlay markers (exact from source: icon positions from GLB objects)
      if (config.icons.sets.dataCenter.keys.includes(obj.name)) {
        obj.updateMatrixWorld(true);
        const pos = new THREE.Vector3();
        obj.getWorldPosition(pos);
        obj.visible = false;
        markers.push({ id: obj.name, position3D: pos, screenX: 0, screenY: 0, visible: true, data: { iconType: "text", label: config.icons.sets.dataCenter.label, hidden: false, setId: "dataCenter" } });
      } else if (config.icons.sets.power1.keys.includes(obj.name)) {
        obj.updateMatrixWorld(true);
        const pos = new THREE.Vector3();
        obj.getWorldPosition(pos);
        obj.visible = false;
        markers.push({ id: obj.name, position3D: pos, screenX: 0, screenY: 0, visible: true, data: { iconType: "power-status", type: "bad", showBadge: false, hidden: false, setId: "power1" } });
      } else if (config.icons.sets.power3.keys.includes(obj.name)) {
        obj.updateMatrixWorld(true);
        const pos = new THREE.Vector3();
        obj.getWorldPosition(pos);
        obj.visible = false;
        markers.push({ id: obj.name, position3D: pos, screenX: 0, screenY: 0, visible: true, data: { iconType: "power", type: "light" as "bad", showBar: true, barPercentage: 1, hidden: true, setId: "power3" } });
      } else if (config.icons.sets.power4.keys.includes(obj.name)) {
        obj.updateMatrixWorld(true);
        const pos = new THREE.Vector3();
        obj.getWorldPosition(pos);
        obj.visible = false;
        markers.push({ id: obj.name, position3D: pos, screenX: 0, screenY: 0, visible: true, data: { iconType: "power-status", type: "good", showBadge: true, hidden: true, setId: "power4" } });
      } else if (config.icons.sets.closeUp.allKeys.includes(obj.name)) {
        obj.updateMatrixWorld(true);
        const pos = new THREE.Vector3();
        obj.getWorldPosition(pos);
        obj.visible = false;
        let setId = "";
        let label = "";
        if (config.icons.sets.closeUp.compute.keys.includes(obj.name)) { setId = "compute"; label = config.icons.sets.closeUp.compute.label; }
        else if (config.icons.sets.closeUp.aiUps.keys.includes(obj.name)) { setId = "aiUps"; label = config.icons.sets.closeUp.aiUps.label; }
        else if (config.icons.sets.closeUp.cooling.keys.includes(obj.name)) { setId = "cooling"; label = config.icons.sets.closeUp.cooling.label; }
        else if (config.icons.sets.closeUp.backRoom.keys.includes(obj.name)) { setId = "backRoom"; label = config.icons.sets.closeUp.backRoom.label; }
        markers.push({ id: obj.name, position3D: pos, screenX: 0, screenY: 0, visible: true, data: { iconType: "text", label, hidden: true, setId } });
      }

      // Camera start position
      if (obj.name === config.cameras.motionStart.key) {
        camera.position.copy(obj.position).sub(center);
        camera.quaternion.copy(obj.quaternion);
        camera.zoom = config.cameras.motionStart.zoom;
        camera.updateProjectionMatrix();
      }

      // _color handling FIRST (exact from source order: od runs before JC)
      if (obj.name.toLowerCase().includes("_color")) {
        const isForceBasic = config.colors.forceBasicMaterial.includes(obj.name);
        let hexColor: string | null = null;
        if (obj.name.includes("_color_")) {
          hexColor = "#" + obj.name.split("_color_")[1];
        } else if (obj.name.includes("_COLOR")) {
          hexColor = "#" + (obj.name.split("_COLOR")[1]?.substring(0, 6) || "");
        } else if (obj.name.includes("_color")) {
          hexColor = "#" + (obj.name.split("_color")[1]?.substring(0, 6) || "");
        }
        if (hexColor) {
          obj.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              if (isForceBasic) {
                child.material = new THREE.MeshBasicMaterial({ color: hexColor });
              } else if (child.material instanceof THREE.MeshBasicMaterial) {
                child.material = new THREE.MeshBasicMaterial({ ...child.material, color: new THREE.Color(hexColor!) });
              } else {
                child.material = new THREE.MeshStandardMaterial({ ...(child.material as THREE_NS.MeshStandardMaterial), color: new THREE.Color(hexColor!) });
              }
            }
          });
        }
      }

      // Forced colors SECOND (exact from source: JC only called when parent instanceof Mesh)
      const colorConfig = config.colors.keys[obj.name];
      if (obj instanceof THREE.Mesh && colorConfig) {
        obj.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (colorConfig.replaceMaterialWithBasic) {
              child.material = new THREE.MeshBasicMaterial({ color: colorConfig.color });
            } else if (child.material instanceof THREE.MeshBasicMaterial) {
              child.material = new THREE.MeshBasicMaterial({ ...child.material, color: new THREE.Color(colorConfig.color) });
            } else {
              child.material = new THREE.MeshStandardMaterial({ ...(child.material as THREE_NS.MeshStandardMaterial), color: new THREE.Color(colorConfig.color) });
            }
          }
        });
      }

      // floor_lines handling (exact from source: jd + blending=hi=AdditiveBlending)
      if (obj.name.includes("floor_lines")) {
        obj.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const mat = child.material as THREE_NS.MeshStandardMaterial;
            child.material = new THREE.MeshBasicMaterial({
              color: mat.color,
              map: mat.map,
            });
            (child.material as THREE_NS.Material).blending = THREE.AdditiveBlending;
            (child.material as THREE_NS.Material).transparent = true;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (child.material as any).premultipliedAlpha = true;
          }
        });
      }
    });

    // Store roof originalPosition AFTER traverse (exact from source Yx)
    const roofObj = roofObject as THREE_NS.Object3D | null;
    if (roofObj) roofObj.userData.originalPosition = roofObj.position.clone();

    // ============== BUILD CAMERA PATH (exact from source Yx) ==============
    const motionPath = config.cameras.motionPath;
    const cameraPositions: THREE_NS.Vector3[] = [];
    const cameraZooms: number[] = [];
    const floorObjects = config.floor.keys.map((key) => root.getObjectByName(key)).filter(Boolean) as THREE_NS.Object3D[];
    const raycaster = new THREE.Raycaster();
    const lookAtTargets: THREE_NS.Vector3[] = [];
    const motionRef = new THREE.Group();
    motionRef.name = "motionRef";
    root.add(motionRef);

    const startCam = cameraObjects[config.cameras.motionStart.key];
    if (startCam) {
      cameraPositions.push(startCam.position.clone().sub(center));
      cameraZooms.push(config.cameras.motionStart.zoom);
      const hits: THREE_NS.Intersection[] = [];
      raycaster.setFromCamera(new THREE.Vector2(0, 0), startCam as unknown as THREE_NS.Camera);
      raycaster.intersectObjects(floorObjects, false, hits);
      const lookPt = (hits[0]?.point || new THREE.Vector3()).sub(center);
      lookAtTargets.push(lookPt);
      motionRef.position.copy(lookPt);
    }

    motionPath.forEach((mp) => {
      const cam = cameraObjects[mp.key];
      if (!cam) return;
      cameraPositions.push(cam.position.clone().sub(center));
      cameraZooms.push(mp.zoom);
      const hits: THREE_NS.Intersection[] = [];
      raycaster.setFromCamera(new THREE.Vector2(0, 0), cam as unknown as THREE_NS.Camera);
      raycaster.intersectObjects(floorObjects, false, hits);
      lookAtTargets.push((hits[0]?.point || new THREE.Vector3()).sub(center));
    });

    // Build segments
    type Segment = { type: "transition" | "hold"; startTime: number; endTime: number; positionIndex: number; curveProgressStart: number; curveProgressEnd: number };
    const segments: Segment[] = [];
    let totalTime = 0;
    for (let i = 0; i < motionPath.length; i++) {
      const curveProgress = i / (motionPath.length - 1);
      if (i > 0) {
        const duration = motionPath[i]?.duration || 1;
        const prevProgress = (i - 1) / (motionPath.length - 1);
        segments.push({ type: "transition", startTime: totalTime, endTime: totalTime + duration, positionIndex: i - 1, curveProgressStart: prevProgress, curveProgressEnd: curveProgress });
        totalTime += duration;
      }
      const hold = motionPath[i]?.hold || 0;
      if (hold > 0) {
        segments.push({ type: "hold", startTime: totalTime, endTime: totalTime + hold, positionIndex: i, curveProgressStart: curveProgress, curveProgressEnd: curveProgress });
        totalTime += hold;
      }
    }

    // Build smoothed curves (exact algorithm from source)
    const buildSmoothedPoints = (points: THREE_NS.Vector3[]) => {
      const result: THREE_NS.Vector3[] = [];
      for (let i = 0; i < points.length; i++) {
        if (points[i]) result.push(points[i]);
        if (i < points.length - 1) {
          const a = points[i], b = points[i + 1];
          if (!a || !b) continue;
          const mid = new THREE.Vector3().lerpVectors(a, b, 0.5);
          if (a.equals(b)) { result.push(mid); continue; }
          const diff = new THREE.Vector3().subVectors(b, a);
          const len = diff.length();
          const up = new THREE.Vector3(0, 1, 0);
          const cross = new THREE.Vector3().crossVectors(diff, up).normalize();
          result.push(mid.clone().add(cross.multiplyScalar(len * 0.15)));
        }
      }
      return result;
    };

    const positionCurve = new THREE.CatmullRomCurve3(buildSmoothedPoints(cameraPositions), false, "centripetal", 0.5);
    const lookAtCurve = new THREE.CatmullRomCurve3(buildSmoothedPoints(lookAtTargets), false, "centripetal", 0.5);

    let curveT = 0;
    let currentZoom = motionPath[0]?.zoom || 1;

    // Camera update function (exact from source — includes parallax from Zd)
    const updateCameraFromCurve = (t: number, zoom: number) => {
      const pos = positionCurve.getPoint(t);
      const lookAt = lookAtCurve.getPoint(t);
      motionRef.position.copy(lookAt);
      camera.position.copy(pos);
      // Parallax offset (exact from source: scale inversely with zoom)
      const parallaxScale = Math.max(
        THREE.MathUtils.mapLinear(camera.zoom, 10, 60, 1, 0.1),
        0.1
      );
      const posOffset = parallax.getPositionOffset().multiplyScalar(parallaxScale);
      camera.position.add(posOffset);
      camera.lookAt(lookAt);
      camera.zoom = zoom;
      camera.updateProjectionMatrix();
    };

    updateCameraFromCurve(0, currentZoom);

    // ============== GSAP SCROLL SETUP (exact from source Yx) ==============
    const scrollProgress = { value: 0 };

    // Main camera timeline — scrubbed to scroll (exact from source: trigger is scroll-spacer)
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: scrollSpacer,
        start: "top top",
        end: "bottom+=25% bottom",
        scrub: true,
      },
    });

    mainTimeline.to(scrollProgress, {
      value: 1,
      duration: totalTime,
      ease: "none",
      onUpdate: () => {
        const time = scrollProgress.value * totalTime;
        let seg: Segment | null = null;
        for (const s of segments) {
          if (time >= s.startTime && time < s.endTime) { seg = s; break; }
        }
        if (!seg && segments.length > 0) seg = segments[segments.length - 1] ?? null;
        if (!seg) return;

        if (seg.type === "hold") {
          curveT = seg.curveProgressEnd;
          currentZoom = motionPath[seg.positionIndex]?.zoom || 1;
        } else {
          const elapsed = seg.endTime - seg.startTime;
          const t = elapsed > 0 ? (time - seg.startTime) / elapsed : 0;
          curveT = seg.curveProgressStart + (seg.curveProgressEnd - seg.curveProgressStart) * t;
          const fromZoom = motionPath[seg.positionIndex]?.zoom || 1;
          const toZoom = motionPath[seg.positionIndex + 1]?.zoom || fromZoom;
          currentZoom = fromZoom + (toZoom - fromZoom) * t;
        }
        updateCameraFromCurve(curveT, currentZoom);
      },
    });

    // Helper: find objects by name list
    const findObjects = (names: string[]) => {
      const result: THREE_NS.Object3D[] = [];
      names.forEach((n) => { const o = root.getObjectByName(n); if (o) result.push(o); });
      return result;
    };

    // F() function from source — toggles new data centers / construction / floor texture / extra batteries
    const toggleNewDataCenters = (show: boolean) => {
      const newDC = root.getObjectByName(config.newDataCenters.key);
      const construction = root.getObjectByName(config.newDataCenters.constructionKey);
      const floorMesh = root.getObjectByName(config.newDataCenters.floorTextures.floorKey);
      const extraBat = root.getObjectByName(config.dataCenterExtraBatteries.key);

      if (floorMesh && floorMesh instanceof THREE.Mesh) {
        const mat = floorMesh.material as THREE_NS.MeshStandardMaterial;
        if (show) {
          const postTex = textureMap.newDatacenterFloorTextures;
          if (postTex) mat.emissiveMap = postTex;
        } else {
          const preTex = textureMap["00_floor_data_center"];
          if (preTex) mat.emissiveMap = preTex;
        }
      }
      if (newDC) newDC.visible = show;
      if (construction) construction.visible = !show;
      if (extraBat) extraBat.visible = show;
    };

    // Initialize (exact from source: F(true) then requestAnimationFrame F(false))
    toggleNewDataCenters(true);
    requestAnimationFrame(() => { toggleNewDataCenters(false); });

    // ============== SCROLL TRIGGER BREAKPOINTS (exact from source Yx function) ==============

    // 42% — Roof lifts +3, close-up labels show (exact from source Yx: gsap.set with overwrite)
    ScrollTrigger.create({
      trigger: scrollSpacer, start: "top+=42% top", scrub: true,
      onEnter: () => {
        if (roofObject) gsap.to(roofObject.position, { y: roofObject.userData.originalPosition.y + 3, duration: 1, ease: "power2.inOut", overwrite: true });
        const showSets = ["compute", "cooling", "backRoom"];
        markers.forEach((m) => {
          if (m.data.setId === "dataCenter") gsap.set(m.data, { hidden: true, overwrite: true });
          if (showSets.includes(m.data.setId)) gsap.set(m.data, { hidden: false, overwrite: true });
        });
      },
      onLeaveBack: () => {
        if (roofObject) gsap.to(roofObject.position, { y: roofObject.userData.originalPosition.y, duration: 1, ease: "power2.inOut", overwrite: true });
        const hideSets = ["compute", "cooling", "backRoom"];
        markers.forEach((m) => {
          if (m.data.setId === "dataCenter") gsap.set(m.data, { hidden: false, overwrite: true });
          if (hideSets.includes(m.data.setId)) gsap.set(m.data, { hidden: true, overwrite: true });
        });
      },
    });

    // 45% — New data centers appear, floor texture swap
    ScrollTrigger.create({
      trigger: scrollSpacer, start: "top+=45% top", scrub: true,
      onEnter: () => { toggleNewDataCenters(true); },
      onLeaveBack: () => { toggleNewDataCenters(false); },
    });

    // 60% — THE BIG TRANSITION (exact from source Yx: batteries, powerlines, servers, markers)
    ScrollTrigger.create({
      trigger: scrollSpacer, start: "top+=60% top", scrub: true,
      onEnter: () => {
        // Batteries rise with back.out(0.6), staggered 0.05s
        batteryObjects.forEach((obj, i) => {
          gsap.to(obj.position, {
            y: obj.userData.originalPosition.y, duration: 0.9, ease: "back.out(0.6)",
            delay: i * 0.05, overwrite: true,
            onUpdate: () => {
              if (obj.userData.shadowMesh) {
                Math.round(obj.position.y * 100) / 100 >= Math.round(obj.userData.originalPosition.y * 100) / 100
                  ? obj.userData.shadowMesh.material?.setValues({ visible: true })
                  : obj.userData.shadowMesh.material?.setValues({ visible: false });
              }
            },
          });
        });
        // Show AI UPS markers
        markers.forEach((m) => { if (m.data.setId === "aiUps") m.data.hidden = false; });

        // Reveal hidden powerlines (exact from source: set uOpacity/uTransition to 0, then animate)
        findObjects(config.powerlines.initiallyHidden).forEach((obj) => {
          const mat = (obj as THREE_NS.Mesh).material as THREE_NS.ShaderMaterial;
          if (mat?.uniforms) {
            gsap.set(mat.uniforms, { uOpacity: { value: 0 }, uTransition: { value: 0 } });
            gsap.to(mat.uniforms.uOpacity, { value: 0.75, duration: 1, ease: "power2.out", overwrite: true, delay: batteryObjects.length * 0.1, onStart: () => { obj.visible = true; } });
            gsap.to(mat.uniforms.uTransition, { value: 1, duration: 1, ease: "power2.out", overwrite: true, delay: batteryObjects.length * 0.1, onStart: () => { obj.visible = true; } });
          } else {
            obj.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                const cMat = child.material as THREE_NS.ShaderMaterial;
                gsap.set(cMat.uniforms, { uOpacity: { value: 0 }, uTransition: { value: 0 } });
                gsap.to(cMat.uniforms.uOpacity, { value: 0.75, duration: 1, ease: "power2.out", overwrite: true, delay: batteryObjects.length * 0.1, onStart: () => { obj.visible = true; } });
                gsap.to(cMat.uniforms.uTransition, { value: 1, duration: 1, ease: "power2.out", overwrite: true, delay: batteryObjects.length * 0.1, onStart: () => { obj.visible = true; } });
              }
            });
          }
        });

        // Powerline + dataCenterPowerline colors → good (exact from source: [...l,...c].forEach)
        const goodC1 = new THREE.Color(config.powerlines.config.good.color1);
        const goodC2 = new THREE.Color(config.powerlines.config.good.color2);
        const allLines = [...regularPowerlineMeshes, ...dataCenterPowerlineMeshes];
        allLines.forEach((mesh, idx) => {
          const mat = mesh.material as THREE_NS.ShaderMaterial;
          mesh.userData.previousColor1 = mesh.userData.previousColor1 || mat.uniforms.uColor1?.value.clone();
          mesh.userData.previousColor2 = mesh.userData.previousColor2 || mat.uniforms.uColor2?.value.clone();
          gsap.to(mat.uniforms.uColor1?.value, { r: goodC1.r, g: goodC1.g, b: goodC1.b, duration: 1, ease: "none", delay: batteryObjects.length * 0.1, overwrite: true });
          gsap.to(mat.uniforms.uColor2?.value, {
            r: goodC2.r, g: goodC2.g, b: goodC2.b, duration: 1, ease: "none", delay: batteryObjects.length * 0.1, overwrite: true,
            // power1→good on completion of LAST regular powerline (exact from source: Y===l.length-1)
            onComplete: () => {
              if (idx === regularPowerlineMeshes.length - 1) {
                markers.forEach((m) => { if (m.data.setId === "power1") m.data.type = "good"; });
              }
            },
          });
        });

        // Hide cooling equipment with delay (exact from source)
        findObjects(config.coolingEquipment.keys).forEach((obj, i) => {
          gsap.set(obj, { visible: false, delay: batteryObjects.length * 0.1 + 0.5 + i * 0.1, overwrite: true });
        });
        // Hide backRoom markers with delay (exact from source: gsap.set with delay)
        markers.forEach((m) => {
          if (m.data.setId === "backRoom") gsap.set(m.data, { hidden: true, delay: batteryObjects.length * 0.1 + 0.5, overwrite: true });
        });

        // Servers rise (exact from source: delayed after batteries)
        serverObjects.forEach((obj, i) => {
          gsap.to(obj.position, {
            y: obj.userData.originalPosition.y, duration: 0.9, ease: "back.out(0.6)",
            delay: batteryObjects.length * 0.1 + 0.8 + i * 0.05, overwrite: true,
            onStart: () => { obj.visible = true; },
          });
        });
        // Change backRoom label to "More Compute" and show with delay (exact from source)
        markers.forEach((m) => {
          if (m.data.setId === "backRoom") {
            gsap.set(m.data, {
              label: config.icons.sets.closeUp.backRoom.labelAlt,
              hidden: false,
              delay: batteryObjects.length * 0.1 + 0.8 + Math.floor(serverObjects.length / 2) * 0.05,
            });
          }
        });
      },
      onLeaveBack: () => {
        // Batteries drop
        batteryObjects.forEach((obj, i) => {
          gsap.to(obj.position, {
            y: -1, duration: 2, ease: "expo.out", delay: i * 0.05, overwrite: true,
            onUpdate: () => {
              if (obj.userData.shadowMesh) {
                Math.round(obj.position.y * 100) / 100 >= Math.round(obj.userData.originalPosition.y * 100) / 100
                  ? obj.userData.shadowMesh.material?.setValues({ visible: true })
                  : obj.userData.shadowMesh.material?.setValues({ visible: false });
              }
            },
          });
        });
        // Hide AI UPS markers
        markers.forEach((m) => { if (m.data.setId === "aiUps") m.data.hidden = true; });

        // Hidden powerlines fade out
        findObjects(config.powerlines.initiallyHidden).forEach((obj) => {
          const mat = (obj as THREE_NS.Mesh).material as THREE_NS.ShaderMaterial;
          if (mat?.uniforms) {
            gsap.to(mat.uniforms.uTransition, { value: 0, duration: 1, ease: "power2.inOut", overwrite: true });
            gsap.to(mat.uniforms.uOpacity, { value: 0, duration: 1, ease: "power2.inOut", overwrite: true, onComplete: () => { obj.visible = false; } });
          } else {
            obj.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                const cMat = child.material as THREE_NS.ShaderMaterial;
                gsap.to(cMat.uniforms.uTransition, { value: 0, duration: 1, ease: "power2.inOut", overwrite: true });
                gsap.to(cMat.uniforms.uOpacity, { value: 0, duration: 1, ease: "power2.inOut", overwrite: true, onComplete: () => { obj.visible = false; } });
              }
            });
          }
        });

        // Powerline colors → original state (exact from source: [...l,...c])
        [...regularPowerlineMeshes, ...dataCenterPowerlineMeshes].forEach((mesh) => {
          const state = mesh.userData.initialState as "bad" | "good";
          const prevC1 = mesh.userData.previousColor1 || new THREE.Color(config.powerlines.config[state].color1);
          const prevC2 = mesh.userData.previousColor2 || new THREE.Color(config.powerlines.config[state].color2);
          const mat = mesh.material as THREE_NS.ShaderMaterial;
          gsap.to(mat.uniforms.uColor1?.value, { r: prevC1.r, g: prevC1.g, b: prevC1.b, duration: 1, ease: "none", overwrite: true });
          gsap.to(mat.uniforms.uColor2?.value, { r: prevC2.r, g: prevC2.g, b: prevC2.b, duration: 1, ease: "none", overwrite: true });
        });
        // Power1 markers back to "bad"
        markers.forEach((m) => { if (m.data.setId === "power1") m.data.type = "bad"; });

        // Servers drop and hide
        serverObjects.forEach((obj, i) => {
          gsap.to(obj.position, { y: -1, duration: 0.9, ease: "power2.inOut", delay: i * 0.05, overwrite: true, onComplete: () => { obj.visible = false; } });
        });
        // Hide backRoom markers (exact from source: gsap.set with overwrite)
        markers.forEach((m) => { if (m.data.setId === "backRoom") gsap.set(m.data, { hidden: true, overwrite: true }); });

        // Show cooling equipment (reversed, exact from source: delay based on serverObjects length)
        const cooling = findObjects(config.coolingEquipment.keys);
        cooling.reverse();
        cooling.forEach((obj, i) => {
          gsap.set(obj, { visible: true, delay: serverObjects.length * 0.05 + i * 0.1, overwrite: true });
        });
        // Restore backRoom label and show with delay (exact from source)
        markers.forEach((m) => {
          if (m.data.setId === "backRoom") {
            gsap.set(m.data, {
              label: config.icons.sets.closeUp.backRoom.label,
              hidden: false,
              delay: serverObjects.length * 0.05,
              overwrite: true,
            });
          }
        });
      },
    });

    // 68% — Wall 01 glow (exact from source Yx: access .material.uniforms.uOpacity directly on object)
    ScrollTrigger.create({
      trigger: scrollSpacer, start: "top+=68% top", scrub: true,
      onEnter: () => {
        const wall = root.getObjectByName(config.dataCenterWalls.keys[0]);
        if (wall) {
          // Source accesses .material directly — works because wall objects are Meshes
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mat = (wall as any).material as THREE_NS.ShaderMaterial;
          if (mat?.uniforms?.uOpacity) {
            gsap.to(mat.uniforms.uOpacity, { value: 0.75, duration: 1, ease: "power2.inOut", overwrite: true, onStart: () => { wall.visible = true; } });
          } else {
            // Fallback: traverse children for material
            wall.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                const cMat = child.material as THREE_NS.ShaderMaterial;
                if (cMat?.uniforms?.uOpacity) {
                  gsap.to(cMat.uniforms.uOpacity, { value: 0.75, duration: 1, ease: "power2.inOut", overwrite: true, onStart: () => { wall.visible = true; } });
                }
              }
            });
          }
        }
        markers.forEach((m) => { if (m.data.setId === "power1") m.data.hidden = true; });
      },
      onLeaveBack: () => {
        const wall = root.getObjectByName(config.dataCenterWalls.keys[0]);
        if (wall) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const mat = (wall as any).material as THREE_NS.ShaderMaterial;
          if (mat?.uniforms?.uOpacity) {
            gsap.to(mat.uniforms.uOpacity, { value: 0, duration: 1, ease: "power2.inOut", overwrite: true, onComplete: () => { wall.visible = false; } });
          } else {
            wall.traverse((child) => {
              if (child instanceof THREE.Mesh) {
                const cMat = child.material as THREE_NS.ShaderMaterial;
                if (cMat?.uniforms?.uOpacity) {
                  gsap.to(cMat.uniforms.uOpacity, { value: 0, duration: 1, ease: "power2.inOut", overwrite: true, onComplete: () => { wall.visible = false; } });
                }
              }
            });
          }
        }
        markers.forEach((m) => { if (m.data.setId === "power1") m.data.hidden = false; });
      },
    });

    // 76% — Roof returns (exact from source Yx: gsap.set with overwrite for markers)
    ScrollTrigger.create({
      trigger: scrollSpacer, start: "top+=76% top", scrub: true,
      onEnter: () => {
        if (roofObject) gsap.to(roofObject.position, { y: roofObject.userData.originalPosition.y, duration: 1, ease: "power2.inOut", overwrite: true });
        const hideSets = ["aiUps", "backRoom", "cooling", "compute"];
        markers.forEach((m) => {
          if (m.data.setId === "power3") { m.data.hidden = false; m.data.barPercentage = 0.2; }
          if (hideSets.includes(m.data.setId)) gsap.set(m.data, { hidden: true, overwrite: true });
        });
      },
      onLeaveBack: () => {
        if (roofObject) gsap.to(roofObject.position, { y: roofObject.userData.originalPosition.y + 3, duration: 1, ease: "power2.inOut", overwrite: true });
        const showSets = ["aiUps", "backRoom", "cooling", "compute"];
        markers.forEach((m) => {
          if (m.data.setId === "power3") { m.data.hidden = true; m.data.barPercentage = 1; }
          if (showSets.includes(m.data.setId)) {
            if (m.data.setId === "backRoom") m.data.label = config.icons.sets.closeUp.backRoom.labelAlt;
            gsap.set(m.data, { hidden: false, overwrite: true });
          }
        });
      },
    });

    // 90% — Wall transition (exact from source Yx: .material directly on wall objects)
    // Helper: get ShaderMaterial from wall object (try direct, then traverse children)
    const getWallMaterial = (wallObj: THREE_NS.Object3D | undefined): THREE_NS.ShaderMaterial | null => {
      if (!wallObj) return null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const directMat = (wallObj as any).material as THREE_NS.ShaderMaterial;
      if (directMat?.uniforms?.uOpacity) return directMat;
      // Fallback: find first child Mesh with ShaderMaterial
      let found: THREE_NS.ShaderMaterial | null = null;
      wallObj.traverse((child) => {
        if (!found && child instanceof THREE.Mesh) {
          const cMat = child.material as THREE_NS.ShaderMaterial;
          if (cMat?.uniforms?.uOpacity) found = cMat;
        }
      });
      return found;
    };

    ScrollTrigger.create({
      trigger: scrollSpacer, start: "top+=90% top", scrub: true,
      onEnter: () => {
        const wall01 = root.getObjectByName(config.dataCenterWalls.keys[0]);
        const wall02 = root.getObjectByName(config.dataCenterWalls.keys[1]);
        const wall03 = root.getObjectByName(config.dataCenterWalls.keys[2]);
        const mat01 = getWallMaterial(wall01);
        const mat02 = getWallMaterial(wall02);
        const mat03 = getWallMaterial(wall03);
        const tl = gsap.timeline();

        // Wall 01 fades out
        if (mat01) {
          tl.to(mat01.uniforms.uOpacity, { value: 0, duration: 0.5, ease: "power2.inOut", overwrite: true, onComplete: () => { if (wall01) wall01.visible = false; } });
        }

        // Walls 02+03 fade in
        if (mat02 && mat03) {
          const targets = [mat02.uniforms.uOpacity, mat03.uniforms.uOpacity];
          tl.to(targets, {
            value: 0.75, duration: 0.5, ease: "power2.inOut", overwrite: true,
            onStart: () => { if (wall02) wall02.visible = true; if (wall03) wall03.visible = true; },
          });
        }
        markers.forEach((m) => {
          if (m.data.setId === "power3") m.data.hidden = true;
          if (m.data.setId === "power4") m.data.hidden = false;
        });
      },
      onLeaveBack: () => {
        const wall01 = root.getObjectByName(config.dataCenterWalls.keys[0]);
        const wall02 = root.getObjectByName(config.dataCenterWalls.keys[1]);
        const wall03 = root.getObjectByName(config.dataCenterWalls.keys[2]);
        const mat01 = getWallMaterial(wall01);
        const mat02 = getWallMaterial(wall02);
        const mat03 = getWallMaterial(wall03);
        const tl = gsap.timeline();

        // Walls 02+03 fade out
        if (mat02 && mat03) {
          const targets = [mat02.uniforms.uOpacity, mat03.uniforms.uOpacity];
          tl.to(targets, {
            value: 0, duration: 0.5, ease: "power2.inOut", overwrite: true,
            onComplete: () => { if (wall02) wall02.visible = false; if (wall03) wall03.visible = false; },
          });
        }

        // Wall 01 fades back in
        if (mat01) {
          tl.to(mat01.uniforms.uOpacity, { value: 0.75, duration: 0.5, ease: "power2.inOut", overwrite: true, onStart: () => { if (wall01) wall01.visible = true; } });
        }
        markers.forEach((m) => {
          if (m.data.setId === "power3") m.data.hidden = false;
          if (m.data.setId === "power4") m.data.hidden = true;
        });
      },
    });

    // Create marker DOM elements (exact from source: SVG-based marker components)
    const overlayDiv = document.getElementById("webgl-overlay");
    if (overlayDiv) {
      markers.forEach((m) => {
        const el = document.createElement("div");
        el.id = `marker-${m.id}`;
        el.className = styles.overlayMarker;
        m.data._lastType = m.data.type;

        if (m.data.iconType === "text") {
          // Exact from source: TextIcon (data-v-7f2b1257)
          el.innerHTML = `<div class="${styles.textIcon}"><div class="${styles.textIconDot}"></div><div class="${styles.textIconLabel}">${m.data.label || ""}</div></div>`;
        } else if (m.data.iconType === "power-status") {
          // Exact from source: PowerStatusIcon (data-v-e6fffe0c)
          const isBad = m.data.type === "bad";
          el.innerHTML = `<div class="${styles.powerStatusIcon}"><svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="32" height="32" rx="3" fill="${isBad ? '#2F2E2D' : '#fff313'}"/><path d="${isBad ? 'M17 32l4-7.5-8-1L25 12h2l-4 7.5 8 1L19 32h-2z' : 'M17 32l4-7.5-8-1 12-11.5h2l-4 7.5 8 1-12 11.5z'}" fill="${isBad ? '#FF4E13' : '#000'}"/><path d="M31 20.5H16l9-8.5h2l-4 7.5 8 1z" fill="#EEE" opacity="${isBad ? '1' : '0'}"/><rect x="31" y="1" width="12" height="12" rx="6" fill="#000" opacity="${m.data.showBadge && isBad ? '1' : '0'}"/><g opacity="${m.data.showBadge && isBad ? '1' : '0'}" fill="#fff313"><circle cx="33.9971" cy="6.99907" r="0.473684"/><circle cx="34.9971" cy="7.99907" r="0.473684"/><circle cx="35.9971" cy="8.99907" r="0.473684"/><circle cx="36.9971" cy="7.99907" r="0.473684"/><circle cx="37.9971" cy="6.99907" r="0.473684"/><circle cx="38.9971" cy="5.99907" r="0.473684"/><circle cx="39.9971" cy="4.99907" r="0.473684"/></g></svg></div>`;
        } else if (m.data.iconType === "power") {
          // Exact from source: PowerIcon (data-v-e342c0db)
          const isLight = m.data.type === "light";
          el.innerHTML = `<div class="${styles.powerIcon}"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="3" fill="${isLight ? '#FFF313' : '#2F2E2D'}"/><path d="M11 26L15 18.5L7 17.5L19 6H21L17 13.5L25 14.5L13 26H11Z" fill="${isLight ? '#000' : '#FFF313'}"/></svg>${m.data.showBar ? `<div class="${styles.powerIconBar}"><div class="${styles.powerIconBarInner}" style="transform: scaleY(${m.data.barPercentage ?? 1})"></div></div>` : ''}</div>`;
        }
        overlayDiv.appendChild(el);
      });
    }

    ScrollTrigger.refresh();

    // ============== ANIMATION LOOP ==============
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();

      // Powerline time animation
      powerlineMaterials.forEach((mat) => {
        if (mat.uniforms?.uTime) mat.uniforms.uTime.value += delta;
      });

      // Turbines
      turbineUpdaters.forEach((t) => t.update(delta));

      // Cars
      carUpdaters.forEach((c) => c.update(delta));

      // Camera parallax (exact from source: update + apply)
      parallax.update();
      updateCameraFromCurve(curveT, currentZoom);

      // Shadow meshes (exact from source: update visible shadows)
      shadowMeshes.forEach((shadow) => {
        if ((shadow.material as THREE_NS.Material).visible) {
          shadow.update(shadowPlane, shadowLight);
        }
      });

      // Overlay marker projection (exact from source: project 3D→2D + class-based visibility)
      camera.updateMatrixWorld(true);
      {
        markers.forEach((m) => {
          projVec.copy(m.position3D).project(camera);
          const isInFrustum = projVec.z < 1 && Math.abs(projVec.x) <= 1 && Math.abs(projVec.y) <= 1;
          m.screenX = (projVec.x + 1) / 2 * window.innerWidth;
          m.screenY = -(projVec.y - 1) / 2 * window.innerHeight;
          m.visible = isInFrustum && !m.data.hidden;

          const el = document.getElementById(`marker-${m.id}`);
          if (!el) return;

          // Position wrapper via transform + inline opacity/pointerEvents (exact from source: WebglOverlay data-v-9426613f)
          el.style.transform = `translate(${m.screenX}px, ${m.screenY}px)`;
          el.style.opacity = m.visible ? "1" : "0";
          el.style.pointerEvents = m.visible ? "auto" : "none";

          // Toggle visibility CSS class on inner marker element (exact from source: Vue class binding)
          const inner = el.firstElementChild as HTMLElement;
          if (inner) {
            const visClass = m.data.iconType === "text" ? styles.textIconVisible
              : m.data.iconType === "power-status" ? styles.powerStatusIconVisible
              : styles.powerIconVisible;
            if (m.visible) {
              if (!inner.classList.contains(visClass)) inner.classList.add(visClass);
            } else {
              if (inner.classList.contains(visClass)) inner.classList.remove(visClass);
            }

            // Handle type state changes (bad↔good) — update SVG fills
            if (m.data.iconType === "power-status" && m.data.type !== m.data._lastType) {
              m.data._lastType = m.data.type;
              const isBad = m.data.type === "bad";
              const svg = inner.querySelector("svg");
              if (svg) {
                const rects = svg.querySelectorAll("rect");
                const paths = svg.querySelectorAll("path");
                const g = svg.querySelector("g");
                if (rects[0]) rects[0].setAttribute("fill", isBad ? "#2F2E2D" : "#fff313");
                if (paths[0]) paths[0].setAttribute("fill", isBad ? "#FF4E13" : "#000");
                if (paths[1]) paths[1].setAttribute("opacity", isBad ? "1" : "0");
                if (rects[1]) rects[1].setAttribute("opacity", isBad ? "1" : "0");
                if (g) g.setAttribute("opacity", isBad ? "1" : "0");
              }
            }

            // Handle label text changes for text markers (e.g., backRoom → "More Compute")
            if (m.data.iconType === "text") {
              const labelEl = inner.querySelector(`.${styles.textIconLabel}`);
              if (labelEl && labelEl.textContent !== (m.data.label || "")) {
                labelEl.textContent = m.data.label || "";
              }
            }

            // Handle bar percentage changes for power markers
            if (m.data.iconType === "power" && m.data.showBar) {
              const barInner = inner.querySelector(`.${styles.powerIconBarInner}`) as HTMLElement;
              if (barInner) {
                barInner.style.transform = `scaleY(${m.data.barPercentage ?? 1})`;
              }
            }
          }
        });
      }

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };


    rafRef.current = requestAnimationFrame(animate);

    // Resize (exact from source WebglBase: frustumSize/2 based ortho)
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      const a = w / h;
      camera.left = -frustumSize * a / 2;
      camera.right = frustumSize * a / 2;
      camera.top = frustumSize / 2;
      camera.bottom = -frustumSize / 2;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return {
      cleanup: () => {
        cancelAnimationFrame(rafRef.current);
        window.removeEventListener("resize", handleResize);
        parallax.dispose();
        ScrollTrigger.getAll().forEach((st) => st.kill());
        renderer.dispose();
        scene.clear();
        dracoLoader.dispose();
        ktx2Loader.dispose();
      },
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    setupScene().then((result) => {
      if (mounted && result) sceneRef.current = result;
    });
    return () => { mounted = false; sceneRef.current?.cleanup(); };
  }, [setupScene]);

  // Section height management (exact from source StickySection: set section height = inner height)
  useEffect(() => {
    const updateSectionHeight = () => {
      if (sectionRef.current && innerRef.current) {
        const { height } = innerRef.current.getBoundingClientRect();
        sectionRef.current.style.height = `${height}px`;
      }
    };
    updateSectionHeight();
    window.addEventListener("resize", updateSectionHeight);
    return () => window.removeEventListener("resize", updateSectionHeight);
  }, []);

  // Info card visibility via scroll + GSAP enter/leave animations
  // Exact from source: ExpertiseInfoCardWrapper (data-v-7c7268b4)
  useEffect(() => {
    const wrapper = containerRef.current;
    if (!wrapper) return;

    // Load GSAP for card animations
    let gsapInstance: typeof import("gsap").default | null = null;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule]) => {
      gsapInstance = gsapModule.default || gsapModule.gsap;
      gsapRefForCards.current = gsapInstance;

      // Set initial state: all card wrappers hidden
      cardRefsArray.current.forEach((el) => {
        if (el) {
          gsapInstance!.set(el, { autoAlpha: 0 });
          // Set children initial state
          const children = el.children;
          if (children.length > 0) {
            gsapInstance!.set(children, { autoAlpha: 0, y: 50 });
          }
        }
      });
    });

    // Exact from source ExpertiseInfoCardWrapper (data-v-7c7268b4): enter animation
    // Source: set wrapper autoAlpha 1, then fromTo children with staggered fade+slide
    // Note: source does NOT call killTweensOf before enter
    const enterCard = (el: HTMLDivElement) => {
      if (!gsapInstance) return;
      const children = el.children;
      const delay = 0; // desktop delay = 0 (mobile = 0.1, but we only need desktop)
      gsapInstance.set(el, { autoAlpha: 1, delay });
      if (children.length > 0) {
        gsapInstance.fromTo(children,
          { autoAlpha: 0 },
          { autoAlpha: 1, delay, duration: 0.3, stagger: 0.05 }
        );
        gsapInstance.fromTo(children,
          { y: 50 },
          { delay, duration: 1.2, ease: "expo.out", stagger: 0.08, y: 0 }
        );
      }
    };

    // Exact from source ExpertiseInfoCardWrapper (data-v-7c7268b4): leave animation
    // Source: fade children out, then complete callback
    // Note: source does NOT call killTweensOf before leave
    const leaveCard = (el: HTMLDivElement) => {
      if (!gsapInstance) return;
      const children = el.children;
      if (children.length > 0) {
        gsapInstance.to(children, {
          autoAlpha: 0,
          duration: 0.2,
          onComplete: () => {
            gsapInstance!.set(el, { autoAlpha: 0 });
            // Reset y for next enter
            gsapInstance!.set(children, { y: 50 });
          },
        });
      }
    };

    let lastBgOpacity = -1;
    const handleScroll = () => {
      const sectionEl = sectionRef.current;
      const innerEl = innerRef.current;
      const viewHeight = window.innerHeight;

      // Exact from source StickySection (data-v-5cd934a4): toggle position:fixed on inner wrapper
      // When sectionTop > 0 (section hasn't reached viewport top): inner is fixed
      // When sectionTop <= 0 (section at or past viewport top): inner is relative
      if (sectionEl && innerEl) {
        const sectionRect = sectionEl.getBoundingClientRect();
        const sectionTop = sectionRect.top;
        const sectionBottom = sectionRect.bottom;

        // Only process when section is near viewport (exact from source: top < vh*3 && bottom > -vh*2)
        if (sectionTop < viewHeight * 3 && sectionBottom > -viewHeight * 2) {
          // Toggle fixed positioning (exact from source StickySection)
          const shouldBeFixed = sectionTop > 0;
          const wasFixed = innerEl.classList.contains(styles.innerFixed);
          if (shouldBeFixed && !wasFixed) {
            innerEl.classList.add(styles.innerFixed);
          } else if (!shouldBeFixed && wasFixed) {
            innerEl.classList.remove(styles.innerFixed);
          }

          // Background opacity (exact from source StickySection)
          // mapRange([vh*0.95, vh/3], [1, 0], sectionTop)
          if (bgRef.current) {
            const rangeStart = viewHeight * 0.95;
            const rangeEnd = viewHeight / 3;
            const opacity = Math.max(0, Math.min(1, (sectionTop - rangeEnd) / (rangeStart - rangeEnd)));
            if (Math.abs(opacity - lastBgOpacity) > 0.01) {
              bgRef.current.style.opacity = `${opacity}`;
              lastBgOpacity = opacity;
            }
          }

          // Progress calculation (exact from source StickySection onProgress callback)
          // Uses scene-wrapper height and section top for progress
          const sceneWrapperRect = wrapper.getBoundingClientRect();
          const sceneWrapperHeight = sceneWrapperRect.height;
          if (sceneWrapperRect.bottom >= viewHeight) {
            // progress = clamp((viewHeight - sectionTop) / sceneWrapperHeight, 0, 1)
            const rawProgress = (viewHeight - sectionTop) / sceneWrapperHeight;
            const p = Math.max(0, Math.min(1, rawProgress));

            // Exact from source: progress > start && progress <= end (open start, closed end)
            const newVisible = INFO_CARD_RANGES.map((range) => p > range.start && p <= range.end);
            setScrollProgress(p);

            const idx = INFO_CARD_RANGES.findIndex((range) => p > range.start && p <= range.end);
            if (idx >= 0) setCurrentCardIndex(idx);

            // Trigger GSAP enter/leave on visibility changes
            newVisible.forEach((isNowVisible, i) => {
              const wasVisible = prevVisibleRef.current[i];
              const el = cardRefsArray.current[i];
              if (!el || !gsapInstance) return;
              if (isNowVisible && !wasVisible) enterCard(el);
              if (!isNowVisible && wasVisible) leaveCard(el);
            });
            prevVisibleRef.current = newVisible;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Exact from source: navigate to card by scrolling to progress position
  // Source uses section.offsetTop and scene-wrapper height, scrolls to card range END
  const navigateCard = (direction: number) => {
    const section = sectionRef.current;
    const wrapper = containerRef.current;
    if (!section || !wrapper) return;

    // Find current card index and determine target (exact from source m() function)
    const ranges = INFO_CARD_RANGES;
    let cardIdx = -1;
    for (let i = 0; i < ranges.length; i++) {
      if (scrollProgress >= ranges[i].start && scrollProgress <= ranges[i].end) {
        cardIdx = i;
        break;
      }
      if (i < ranges.length - 1 && scrollProgress > ranges[i].end && scrollProgress < ranges[i + 1].start) {
        cardIdx = i;
        break;
      }
    }
    if (cardIdx === -1 && scrollProgress < ranges[0].start) cardIdx = -1;
    if (cardIdx === -1 && scrollProgress > ranges[ranges.length - 1].end) cardIdx = ranges.length - 1;

    let targetProgress = scrollProgress;
    if (direction === -1) {
      const prevIdx = cardIdx - 1;
      if (prevIdx >= 0) targetProgress = ranges[prevIdx].end;
    }
    if (direction === 1) {
      const nextIdx = cardIdx + 1;
      if (nextIdx >= 0 && nextIdx < ranges.length) targetProgress = ranges[nextIdx].end;
    }

    // Exact from source A() function: scrollTo = sectionOffsetTop - windowHeight + progress * sceneHeight - 1
    const viewHeight = window.innerHeight;
    const sceneHeight = wrapper.offsetHeight;
    const targetScroll = section.offsetTop - viewHeight + targetProgress * sceneHeight - 1;

    // Exact from source: duration 1.5, easing p = quadratic ease-in-out (= power2.inOut)
    const gsap = gsapRefForCards.current;
    if (gsap) {
      const scrollObj = { y: window.scrollY };
      gsap.to(scrollObj, {
        y: targetScroll,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => { window.scrollTo(0, scrollObj.y); },
      });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} className={styles.sceneSection}>
      <div ref={innerRef} className={styles.inner}>
        <div className={styles.sceneWrapper} ref={containerRef}>
          <div className={styles.sceneInner}>
            <div className={styles.webglContainer}>
              <canvas ref={canvasRef} />
              {/* Exact from source WebglBase: scroll-spacer is the ScrollTrigger trigger */}
              <div ref={scrollSpacerRef} className={styles.scrollSpacer} />
              {/* Overlay markers (exact from source: WebglOverlay component) */}
              <div id="webgl-overlay" className={styles.overlay}>
                {/* Markers rendered via direct DOM updates in animation loop */}
              </div>
            </div>
          </div>
          <div className={styles.contentWrapper}>
            <div className={styles.content}>
              <div className={styles.uiContainer}>
                <div className="grid-container">
                  {infoCards.map((card, i) => (
                  <div
                    key={card.key}
                    ref={(el) => { cardRefsArray.current[i] = el; }}
                    className={infoStyles.cardWrapper}
                    style={{ opacity: 0, visibility: "hidden" }}
                  >
                    {/* Exact from source: .expertise-info-card */}
                    <div className={`${infoStyles.card} ${card.theme === "yellow" ? infoStyles.cardYellow : ""}`}>
                      <div className={infoStyles.cardHead}>
                        <div className={`${infoStyles.cardIcon} ${card.icon === "warning" ? infoStyles.iconWarning : infoStyles.iconSuccess}`}>
                          {card.icon === "warning" ? (
                            /* Exact from source: aI warning icon — triangle with dot lightning */
                            <svg viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.03357 1C5.80337 -0.33333 7.72788 -0.333333 8.49768 1L13.2608 9.25C14.0306 10.5833 13.0684 12.25 11.5288 12.25H2.00249C0.462888 12.25 -0.499366 10.5833 0.270434 9.25L5.03357 1Z" fill="#7D7D7D" />
                              <circle cx="4.76562" cy="9.5" r="0.5" fill="currentColor" />
                              <circle cx="5.76562" cy="8.5" r="0.5" fill="currentColor" />
                              <circle cx="6.76562" cy="7.5" r="0.5" fill="currentColor" />
                              <circle cx="7.76562" cy="6.5" r="0.5" fill="currentColor" />
                              <circle cx="8.76562" cy="5.5" r="0.5" fill="currentColor" />
                              <circle cx="8.76562" cy="9.5" r="0.5" transform="rotate(-90 8.76562 9.5)" fill="currentColor" />
                              <circle cx="7.76562" cy="8.5" r="0.5" transform="rotate(-90 7.76562 8.5)" fill="currentColor" />
                              <circle cx="6.76562" cy="7.5" r="0.5" transform="rotate(-90 6.76562 7.5)" fill="currentColor" />
                              <circle cx="5.76562" cy="6.5" r="0.5" transform="rotate(-90 5.76562 6.5)" fill="currentColor" />
                              <circle cx="4.76562" cy="5.5" r="0.5" transform="rotate(-90 4.76562 5.5)" fill="currentColor" />
                            </svg>
                          ) : (
                            /* Exact from source: sI success icon — black circle with yellow checkmark dots */
                            <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="12" height="12" rx="6" fill="black" />
                              <circle cx="4.99712" cy="7.99907" r="0.473684" fill="#FFF313" />
                              <circle cx="3.99712" cy="6.99907" r="0.473684" fill="#FFF313" />
                              <circle cx="2.99712" cy="5.99907" r="0.473684" fill="#FFF313" />
                              <circle cx="5.99712" cy="6.99907" r="0.473684" fill="#FFF313" />
                              <circle cx="6.99712" cy="5.99907" r="0.473684" fill="#FFF313" />
                              <circle cx="7.99712" cy="4.99907" r="0.473684" fill="#FFF313" />
                              <circle cx="8.99712" cy="3.99907" r="0.473684" fill="#FFF313" />
                            </svg>
                          )}
                        </div>
                        <div className={infoStyles.cardTitle}>{card.title}</div>
                      </div>
                      <div className={infoStyles.cardBody}>
                        <div className={infoStyles.cardSubtitle}>{card.subtitle}</div>
                        <p className={infoStyles.cardCopy}>{card.copy}</p>
                      </div>
                    </div>
                    {/* Exact from source: ListChart component (data-v-74a50d83) */}
                    {"listChart" in card && card.listChart && (
                      <div className={`${infoStyles.chart} ${card.theme === "yellow" ? infoStyles.chartYellow : ""}`}>
                        <div className={infoStyles.chartHead}>
                          <div className={infoStyles.chartTitle}>{card.listChart.title}</div>
                          <div className={infoStyles.chartPercentage}>{card.listChart.percentage}%</div>
                        </div>
                        <div className={infoStyles.chartSubtitle}>{card.listChart.subtitle}</div>
                        <ul className={infoStyles.chartList}>
                          {card.listChart.items.map((item) => (
                            <li
                              key={item.label}
                              className={`${infoStyles.listItem} ${
                                item.status === "Protected" ? infoStyles.listItemProtected :
                                item.status === "Approved" ? infoStyles.listItemApproved :
                                infoStyles.listItemVulnerable
                              }`}
                            >
                              <div className={infoStyles.listItemTitle}>{item.label}</div>
                              <div className={infoStyles.listItemStatus}>
                                <div>{item.status}</div>
                                {(item.status === "Protected" || item.status === "Approved") && (
                                  <div className={infoStyles.listItemIconButton}>
                                    {/* Exact from source: checkmark dots icon */}
                                    <svg viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "0.7rem", height: "0.5rem" }}>
                                      <circle cx="2.47368" cy="4.47368" r="0.473684" fill="currentColor" />
                                      <circle cx="1.47368" cy="3.47368" r="0.473684" fill="currentColor" />
                                      <circle cx="0.473684" cy="2.47368" r="0.473684" fill="currentColor" />
                                      <circle cx="3.47368" cy="3.47368" r="0.473684" fill="currentColor" />
                                      <circle cx="4.47368" cy="2.47368" r="0.473684" fill="currentColor" />
                                      <circle cx="5.47368" cy="1.47368" r="0.473684" fill="currentColor" />
                                      <circle cx="6.47368" cy="0.473684" r="0.473684" fill="currentColor" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {/* Exact from source: Canvas chart components */}
                    {card.key === "challenge-2" && <VoltageInstabilityChart theme="black" />}
                    {card.key === "challenge-3" && <DataCenterDemandChart theme="black" />}
                    {card.key === "solution-2" && <DataCenterDemandChart optimized theme="yellow" />}
                    {card.key === "solution-3" && <PeakDemandChart theme="yellow" progress={scrollProgress} />}
                  </div>
                ))}
              </div>
              <div className={ctrlStyles.controls}>
                <button className={ctrlStyles.button} disabled={currentCardIndex === 0} onClick={() => navigateCard(-1)} aria-label="Previous">
                  <svg viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="13.5" cy="1.5" rx="1.5" ry="1.5" transform="rotate(90 13.5 1.5)" fill="currentColor" />
                    <ellipse cx="13.5" cy="7.5" rx="1.5" ry="1.5" transform="rotate(90 13.5 7.5)" fill="currentColor" />
                    <ellipse cx="19.5" cy="7.5" rx="1.5" ry="1.5" transform="rotate(90 19.5 7.5)" fill="currentColor" />
                    <ellipse cx="7.5" cy="7.5" rx="1.5" ry="1.5" transform="rotate(90 7.5 7.5)" fill="currentColor" />
                    <ellipse cx="1.5" cy="13.5" rx="1.5" ry="1.5" transform="rotate(90 1.5 13.5)" fill="currentColor" />
                    <ellipse cx="25.5" cy="13.5" rx="1.5" ry="1.5" transform="rotate(90 25.5 13.5)" fill="currentColor" />
                    <ellipse cx="13.5" cy="13.5" rx="1.5" ry="1.5" transform="rotate(90 13.5 13.5)" fill="currentColor" />
                    <ellipse cx="13.5" cy="19.5" rx="1.5" ry="1.5" transform="rotate(90 13.5 19.5)" fill="currentColor" />
                    <ellipse cx="13.5" cy="25.5" rx="1.5" ry="1.5" transform="rotate(90 13.5 25.5)" fill="currentColor" />
                  </svg>
                </button>
                <button className={ctrlStyles.button} disabled={currentCardIndex === 7} onClick={() => navigateCard(1)} aria-label="Next">
                  <svg viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="13.5" cy="25.5" rx="1.5" ry="1.5" transform="rotate(-90 13.5 25.5)" fill="currentColor" />
                    <ellipse cx="13.5" cy="19.5" rx="1.5" ry="1.5" transform="rotate(-90 13.5 19.5)" fill="currentColor" />
                    <ellipse cx="7.5" cy="19.5" rx="1.5" ry="1.5" transform="rotate(-90 7.5 19.5)" fill="currentColor" />
                    <ellipse cx="19.5" cy="19.5" rx="1.5" ry="1.5" transform="rotate(-90 19.5 19.5)" fill="currentColor" />
                    <ellipse cx="25.5" cy="13.5" rx="1.5" ry="1.5" transform="rotate(-90 25.5 13.5)" fill="currentColor" />
                    <ellipse cx="1.5" cy="13.5" rx="1.5" ry="1.5" transform="rotate(-90 1.5 13.5)" fill="currentColor" />
                    <ellipse cx="13.5" cy="13.5" rx="1.5" ry="1.5" transform="rotate(-90 13.5 13.5)" fill="currentColor" />
                    <ellipse cx="13.5" cy="7.5" rx="1.5" ry="1.5" transform="rotate(-90 13.5 7.5)" fill="currentColor" />
                    <ellipse cx="13.5" cy="1.5" rx="1.5" ry="1.5" transform="rotate(-90 13.5 1.5)" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>
        <div ref={bgRef} className={styles.background} />
      </div>
    </section>
  );
}
