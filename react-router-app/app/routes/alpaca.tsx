import { useEffect, useState, useRef } from 'react';
import type { Route } from './+types/alpaca';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "3D Alpaca | Lamaglama39" },
    { name: "description", content: "3Dアルパカモデルビューワー" },
  ];
}

// アルパカの3Dモデルビューワーコンポーネント
const AlpacaModel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const interactionTimeoutRef = useRef<number | null>(null);
  
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
        
        if (!containerRef.current) return;
        
        // シーンの作成
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('#000000');
        
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
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);
        
        // メインの指向性ライト - 少し上から光を当てる
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
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
        
        // スポットライト1 - 青っぽい - 位置と強度を調整
        const spotLight1 = new THREE.SpotLight(0x4477ff, 500.0);
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
        const spotLight2 = new THREE.SpotLight(0xff77aa, 500.0);
        spotLight2.position.set(3, 5, 2);
        spotLight2.angle = Math.PI / 8; // より集中した光に
        spotLight2.penumbra = 0.5; // よりソフトな光の減衰
        spotLight2.castShadow = true;
        spotLight2.shadow.mapSize.width = 1024;
        spotLight2.shadow.mapSize.height = 1024;
        // ターゲットを追加
        scene.add(spotLight2.target);
        scene.add(spotLight2);
        
        // 地面（ステージ）の追加 - 任意で表示
        if (showFloor) {
          const stageGeometry = new THREE.CircleGeometry(5, 32);
          const stageMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x111111, // より暗く
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
        // Meshoptデコーダーを設定
        loader.setMeshoptDecoder(MeshoptDecoder);
        
        const modelPath = '/model/alpaca-mini10.glb';
        
        console.log('モデルの読み込みを開始します:', modelPath);
        
        // ローディングを表示するためのオブジェクト
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x666666, wireframe: true });
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
          
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
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
          className={`absolute top-20 left-0 right-0 text-center text-white transition-opacity duration-1000 ${
            isInteracting ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <p className="text-2xl font-bold mb-2 drop-shadow-lg">
            まわせい！アルパカをまわせい！！
          </p>
          <p className="text-sm opacity-80 drop-shadow-md">
            マウスドラッグで回転・スクロールで拡大縮小
          </p>
        </div>
      )}
    </>
  );
};

// クライアントサイドのみのコンポーネント
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? <>{children}</> : null;
};

export default function Alpaca() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <main className={`min-h-screen transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative h-screen w-full overflow-hidden">
        {/* 3Dモデル */}
        <ClientOnly>
          <AlpacaModel />
        </ClientOnly>
      </div>
    </main>
  );
} 