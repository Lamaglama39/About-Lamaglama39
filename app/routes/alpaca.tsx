import { useEffect, useState, useRef } from 'react';
import type { Route } from './+types/alpaca';
import LIGHT_PRESETS, { type LightPreset, type LightPresets } from '../data/lightPresets';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "3D Alpaca | Lamaglama39" },
    { name: "description", content: "3Dアルパカモデルビューワー" },
  ];
}

// スクロールを無効化する関数
const preventScroll = (e: Event) => {
  e.preventDefault();
};

// アルパカの3Dモデルビューワーコンポーネント
const AlpacaModel = ({ initialIsMobile }: { initialIsMobile: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const interactionTimeoutRef = useRef<number | null>(null);
  
  // ライト設定のステート
  const [preset, setPreset] = useState<string>("DEFAULT");
  const [lightIntensity, setLightIntensity] = useState<number>(1.0);
  const [showControls, setShowControls] = useState<boolean>(false);
  
  // デバイスタイプのステート
  const [isMobile, setIsMobile] = useState<boolean>(initialIsMobile);
  
  // Three.js関連の参照保持用
  const sceneRef = useRef<any>(null);
  const lightsRef = useRef<{
    ambient?: any;
    directional?: any;
    spots: any[];
  }>({
    spots: []
  });
  
  // 現在ロード中のモデルパスを保持
  const currentModelPathRef = useRef<string>("");
  // 現在ロードされているモデルの参照
  const currentModelRef = useRef<any>(null);
  
  // スクロール無効化を設定
  useEffect(() => {
    // スクロールを無効化
    document.addEventListener('touchmove', preventScroll, { passive: false });
    document.addEventListener('wheel', preventScroll, { passive: false });
    
    // クリーンアップ時にイベントリスナーを削除
    return () => {
      document.removeEventListener('touchmove', preventScroll);
      document.removeEventListener('wheel', preventScroll);
    };
  }, []);
  
  const applyLightPreset = (presetKey: string, intensity: number = 1.0) => {
    if (!sceneRef.current) return;
    
    const presetData = LIGHT_PRESETS[presetKey as keyof typeof LIGHT_PRESETS];
    if (!presetData) return;
    
    // 背景色の変更
    sceneRef.current.background.set(presetData.background);
    
    // 環境光の調整
    if (lightsRef.current.ambient) {
      lightsRef.current.ambient.color.set(presetData.ambientLight.color);
      lightsRef.current.ambient.intensity = presetData.ambientLight.intensity * intensity;
    }
    
    // 指向性ライトの調整
    if (lightsRef.current.directional) {
      lightsRef.current.directional.color.set(presetData.directionalLight.color);
      lightsRef.current.directional.intensity = presetData.directionalLight.intensity * intensity;
    }
    
    // スポットライトの調整
    lightsRef.current.spots.forEach((spot, index) => {
      if (index < presetData.spotLights.length) {
        const spotData = presetData.spotLights[index];
        spot.color.set(spotData.color);
        spot.intensity = spotData.intensity * intensity;
        spot.angle = spotData.angle;
        spot.penumbra = spotData.penumbra;
        spot.position.set(...spotData.position);
      }
    });
  };
  
  useEffect(() => {
    // ThreeJSを動的にロード
    const loadThreeJS = async () => {
      try {
        setLoading(true);
        
        // 必要なモジュールを動的にインポート
        const THREE = await import('three');
        const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
        const { MeshoptDecoder } = await import('three/examples/jsm/libs/meshopt_decoder.module.js');
        const { DRACOLoader } = await import('three/examples/jsm/loaders/DRACOLoader.js');
        
        if (!containerRef.current) return;
        
        // シーンの作成
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#000000');
        sceneRef.current = scene;
        
        // 床を表示するかどうか
        const showFloor = false;
        
        // カメラの設定
        const camera = new THREE.PerspectiveCamera(
          50, 
          window.innerWidth / window.innerHeight, 
          0.1, 
          1000
        );
        camera.position.z = 5;
        
        // レンダラーの作成
        const renderer = new THREE.WebGLRenderer({ 
          antialias: true,
          alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // DOMに追加
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(renderer.domElement);
        
        // ライトを追加
        const ambientLight = new THREE.AmbientLight('#ffffff', 0.7);
        scene.add(ambientLight);
        lightsRef.current.ambient = ambientLight;
        
        // メインの指向性ライト - 少し上から光を当てる
        const directionalLight = new THREE.DirectionalLight('#ffffff', 0.8);
        directionalLight.position.set(0, 5, 1); // より上からの角度に
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        // シャドウカメラのパラメータ調整
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 15;
        directionalLight.shadow.camera.left = -5;
        directionalLight.shadow.camera.right = 5;
        directionalLight.shadow.camera.top = 5;
        directionalLight.shadow.camera.bottom = -5;
        scene.add(directionalLight);
        lightsRef.current.directional = directionalLight;
        
        // スポットライト1 - 青っぽい - 位置と強度を調整
        const spotLight1 = new THREE.SpotLight('#4477ff', 500.0);
        spotLight1.position.set(-3, 5, 2);
        spotLight1.angle = Math.PI / 8; // より集中した光に
        spotLight1.penumbra = 0.5; // よりソフトな光の減衰
        spotLight1.castShadow = true;
        spotLight1.shadow.mapSize.width = 1024;
        spotLight1.shadow.mapSize.height = 1024;
        // ターゲットを追加
        scene.add(spotLight1.target);
        scene.add(spotLight1);
        
        // スポットライト2 - ピンクっぽい - 位置と強度を調整
        const spotLight2 = new THREE.SpotLight('#ff77aa', 500.0);
        spotLight2.position.set(3, 5, 2);
        spotLight2.angle = Math.PI / 8; // より集中した光に
        spotLight2.penumbra = 0.5; // よりソフトな光の減衰
        spotLight2.castShadow = true;
        spotLight2.shadow.mapSize.width = 1024;
        spotLight2.shadow.mapSize.height = 1024;
        // ターゲットを追加
        scene.add(spotLight2.target);
        scene.add(spotLight2);
        
        // スポットライトを参照に保持
        lightsRef.current.spots = [spotLight1, spotLight2];
        
        // 地面（ステージ）の追加 - 任意で表示
        if (showFloor) {
          const stageGeometry = new THREE.CircleGeometry(5, 32);
          const stageMaterial = new THREE.MeshStandardMaterial({ 
            color: '#111111', // より暗く
            metalness: 0.3, // やや光沢を抑える
            roughness: 0.4, // 滑らかさを増す
            transparent: true,
            opacity: 0.3 // さらに透明に
          });
          const stage = new THREE.Mesh(stageGeometry, stageMaterial);
          stage.rotation.x = -Math.PI / 2; // 水平に回転
          stage.position.y = -1.8; // さらに下に配置
          stage.receiveShadow = true;
          scene.add(stage);
        }
        
        // オービットコントロールの追加
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.minDistance = 3;
        controls.maxDistance = 10;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1;
        
        // ユーザーの操作を検知する
        controls.addEventListener('start', () => {
          setIsInteracting(true);
          
          // 前回のタイマーがあればクリア
          if (interactionTimeoutRef.current !== null) {
            window.clearTimeout(interactionTimeoutRef.current);
            interactionTimeoutRef.current = null;
          }
        });
        
        controls.addEventListener('end', () => {
          // 3秒後に操作終了とみなす
          interactionTimeoutRef.current = window.setTimeout(() => {
            setIsInteracting(false);
            interactionTimeoutRef.current = null;
          }, 3000);
        });
        
        // モデルをロード
        const loader = new GLTFLoader();
        // DRACOLoaderを設定
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('/draco/');
        loader.setDRACOLoader(dracoLoader);
        // Meshoptデコーダーを設定
        loader.setMeshoptDecoder(MeshoptDecoder);
        
        // デバイスタイプに基づいてモデルのパスを決定
        const modelPath = isMobile 
            ? '/model/alpaca-mobile.glb' 
            : '/model/alpaca-desktop.glb';
        
        // 現在のモデルパスを更新
        currentModelPathRef.current = modelPath;
        
        console.log(`モデルの読み込みを開始します (${isMobile ? 'モバイル' : 'デスクトップ'}):`, modelPath);
        
        // ローディングを表示するためのオブジェクト
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: '#666666', wireframe: true });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        
        // アニメーションの処理
        const animate = () => {
          requestAnimationFrame(animate);
          
          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;
          
          // スポットライトをゆっくり回転 - 回転範囲とスピードを調整
          const time = Date.now() * 0.0005; // ゆっくりとした動き
          spotLight1.position.x = Math.sin(time * 0.7) * 4;
          spotLight1.position.z = Math.cos(time * 0.5) * 4;
          
          spotLight2.position.x = Math.sin(time * 0.7 + Math.PI) * 4;
          spotLight2.position.z = Math.cos(time * 0.5 + Math.PI) * 4;
          
          // ライトがモデルを常に照らすようにtargetを設定
          spotLight1.target.position.set(0, 0, 0);
          spotLight2.target.position.set(0, 0, 0);
          
          controls.update();
          renderer.render(scene, camera);
        };
        
        animate();
        
        // モデルのロード
        loader.load(
          modelPath,
          (gltf) => {
            console.log('モデルの読み込み成功');
            
            // ロード中のキューブを削除
            scene.remove(cube);
            
            const model = gltf.scene;
            
            // モデルの参照を更新
            currentModelRef.current = model;
            
            // シャドウの設定
            model.traverse((node) => {
              // Mesh型かどうかをチェック
              if (node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
              }
            });
            
            // モデルのサイズ調整
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());
            
            console.log('モデルサイズ:', size);
            
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2 / maxDim; // 適切なスケールに調整
            
            model.scale.multiplyScalar(scale);
            
            model.position.x = -center.x * scale;
            model.position.y = -center.y * scale + 0.5; // アルパカをさらに上に持ち上げる
            model.position.z = -center.z * scale;
            
            scene.add(model);
            
            // 初期プリセットを適用
            applyLightPreset(preset, lightIntensity);
            
            setLoading(false);
          },
          (progress) => {
            const percent = (progress.loaded / progress.total) * 100;
            console.log('読み込み進捗:', percent.toFixed(2) + '%');
          },
          (error) => {
            console.error('モデルの読み込みエラー:', error);
            setError(`モデルの読み込みに失敗しました。${error instanceof Error ? error.message : '不明なエラー'}`);
            setLoading(false);
          }
        );
        
        // リサイズハンドラ
        const handleResize = () => {
          if (!containerRef.current) return;
          
          // カメラとレンダラーを更新
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
          
          // 端末タイプのチェック
          const newIsMobile = window.innerWidth <= 768;
          
          // 端末タイプが変わった場合にモデルを再ロード
          if (newIsMobile !== isMobile) {
            setIsMobile(newIsMobile);
            
            // 新しいモデルのパスを決定
            const newModelPath = newIsMobile 
              ? '/model/alpaca-mobile.glb' 
              : '/model/alpaca-desktop.glb';
            
            // 既に同じモデルをロード中または完了している場合は何もしない
            if (newModelPath === currentModelPathRef.current) {
              console.log('既に同じモデルがロード済みです:', newModelPath);
              return;
            }
            
            console.log(`デバイスタイプが変更されました (${newIsMobile ? 'モバイル' : 'デスクトップ'})。新しいモデルをロード:`, newModelPath);
            
            // 現在のモデルパスを更新
            currentModelPathRef.current = newModelPath;
            
            // 古いモデルを削除（キューブは除く）
            if (currentModelRef.current) {
              scene.remove(currentModelRef.current);
              currentModelRef.current = null;
            }
            
            // ローディング状態に設定
            setLoading(true);
            
            // 新しいモデルをロード
            loader.load(
              newModelPath,
              (gltf) => {
                console.log('モデルの再ロード成功:', newModelPath);
                
                // 新しいモデル
                const model = gltf.scene;
                
                // モデルの参照を更新
                currentModelRef.current = model;
                
                // シャドウの設定
                model.traverse((node) => {
                  if (node instanceof THREE.Mesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                  }
                });
                
                // モデルのサイズ調整
                const box = new THREE.Box3().setFromObject(model);
                const size = box.getSize(new THREE.Vector3());
                const center = box.getCenter(new THREE.Vector3());
                
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 2 / maxDim;
                
                model.scale.multiplyScalar(scale);
                
                model.position.x = -center.x * scale;
                model.position.y = -center.y * scale + 0.5;
                model.position.z = -center.z * scale;
                
                // シーンに追加
                scene.add(model);
                
                // 初期プリセットを適用
                applyLightPreset(preset, lightIntensity);
                
                // ローディング完了
                setLoading(false);
              },
              (progress) => {
                const percent = (progress.loaded / progress.total) * 100;
                console.log(`モデル再ロード進捗 (${newIsMobile ? 'モバイル' : 'デスクトップ'}):`, percent.toFixed(2) + '%');
              },
              (error) => {
                console.error('リサイズ後のモデルの再ロードエラー:', error);
                setError(`モデルの再ロードに失敗しました。${error instanceof Error ? error.message : '不明なエラー'}`);
                setLoading(false);
              }
            );
          }
        };
        
        window.addEventListener('resize', handleResize);
        
        // クリーンアップ
        return () => {
          window.removeEventListener('resize', handleResize);
          if (containerRef.current) {
            containerRef.current.innerHTML = '';
          }
          
          if (interactionTimeoutRef.current !== null) {
            window.clearTimeout(interactionTimeoutRef.current);
            interactionTimeoutRef.current = null;
          }
          
          // メモリリーク防止のためのリソース解放
          renderer.dispose();
          controls.dispose();
        };
      } catch (err) {
        console.error('Three.jsのロードに失敗:', err);
        setError('3Dモデルの表示に必要なライブラリの読み込みに失敗しました。');
        setLoading(false);
      }
    };
    
    loadThreeJS();
  }, []);
  
  // プリセットが変わった時に適用
  useEffect(() => {
    applyLightPreset(preset, lightIntensity);
  }, [preset, lightIntensity]);
  
  // コントロールの表示/非表示を切り替え
  const toggleControls = () => {
    setShowControls(!showControls);
  };
  
  return (
    <>
      <div ref={containerRef} className="w-full h-full"></div>
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black bg-opacity-50 p-4 rounded-lg text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-2"></div>
            <p>モデルを読み込み中...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-red-900 bg-opacity-80 p-6 rounded-lg text-white max-w-md">
            <h3 className="text-xl font-bold mb-2">エラー</h3>
            <p>{error}</p>
          </div>
        </div>
      )}
      
      {!loading && !error && (
        <div 
          className={`absolute top-10 left-0 right-0 text-center text-white transition-opacity duration-1000 ${
            isInteracting ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <p className="text-2xl font-bold mb-8 drop-shadow-lg font-serif">
            まわせいぃ！<br></br>アルパカをまわせいぃ！！
          </p>
        </div>
      )}
      
      {/* ライティングコントロールパネル */}
      {!loading && !error && (
        <div className="absolute bottom-25 left-1/2 transform -translate-x-1/2 max-w-md w-full px-4">
          <div 
            className="relative bg-gray-900 bg-opacity-70 backdrop-blur-md rounded-xl px-4 py-2 text-white shadow-xl border border-gray-700 transition-all duration-300 flex flex-col mb-4"
            style={{ maxHeight: showControls ? '400px' : '50px', overflow: 'hidden' }}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-xl">ライティング設定</h3>
              <button
                onClick={toggleControls}
                className="text-lg hover:bg-cyan-600 p-1 rounded-lg transition-colors w-8 h-8 flex items-center justify-center my-auto"
                aria-label={showControls ? "設定を閉じる" : "設定を開く"}
                title={showControls ? "設定を閉じる" : "設定を開く"}
              >
                {showControls ? '▼' : '▲'}
              </button>
            </div>
            
            <div className={`mt-4 transition-opacity duration-200 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
              {/* プリセット選択 */}
              <div className="mb-5">
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(LIGHT_PRESETS).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => setPreset(key)}
                      className={`p-2 rounded-lg flex flex-col items-center justify-center transition-colors ${
                        preset === key 
                          ? 'bg-cyan-700 text-white' 
                          : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                      }`}
                    >
                      <span className="text-2xl mb-1">{value.emoji}</span>
                      <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">
                        {value.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 現在のプリセット情報 */}
              <div className="mb-3 text-sm">
                <p>🎬 現在のスタイル: {LIGHT_PRESETS[preset as keyof typeof LIGHT_PRESETS].name}</p>
              </div>
              
              {/* 強度スライダー */}
              <div className="px-1">
                <label className="flex justify-between items-center mb-1">
                  <span>ライト強度:</span>
                  <span className="text-sm">{Math.round(lightIntensity * 100)}%</span>
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="2"
                  step="0.1"
                  value={lightIntensity}
                  onChange={(e) => setLightIntensity(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs px-2">
                  <span>弱</span>
                  <span>強</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// クライアントサイドのみのコンポーネント
const ClientOnly = ({ children, onMount }: { children: React.ReactNode, onMount?: () => void }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (onMount) {
      onMount();
    }
  }, [onMount]);

  return isMounted ? <>{children}</> : null;
};

export default function Alpaca() {
  const [loaded, setLoaded] = useState(false);
  
  // 初期デバイスタイプを判定してセット
  const [isMobile, setIsMobile] = useState(false);
  
  // クライアント側での初期化
  const handleClientMount = () => {
    setIsMobile(window.innerWidth <= 768);
  };
  
  useEffect(() => {
    setLoaded(true);
    
    // 画面の高さを設定するスタイルを追加
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    
    // クリーンアップ時に戻す
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.style.height = '';
      document.body.style.height = '';
    };
  }, []);

  return (
    <main className={`h-screen transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} overflow-hidden`}>
      <div className="relative h-screen w-full overflow-hidden">
        {/* 3Dモデル */}
        <ClientOnly onMount={handleClientMount}>
          <AlpacaModel initialIsMobile={isMobile} />
        </ClientOnly>
      </div>
    </main>
  );
} 