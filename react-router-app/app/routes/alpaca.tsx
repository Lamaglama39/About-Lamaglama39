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
        
        // DOMに追加
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(renderer.domElement);
        
        // ライトを追加
        const ambientLight = new THREE.AmbientLight(0xffffff, 2);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
        
        // オービットコントロールの追加
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.minDistance = 3;
        controls.maxDistance = 10;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1;
        
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
            
            // モデルのサイズ調整
            const box = new THREE.Box3().setFromObject(model);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());
            
            console.log('モデルサイズ:', size);
            
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 2 / maxDim; // 適切なスケールに調整
            
            model.scale.multiplyScalar(scale);
            
            model.position.x = -center.x * scale;
            model.position.y = -center.y * scale;
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
        
        {/* オーバーレイテキスト */}
        <div className="absolute top-20 left-0 right-0 text-center text-white">
          <p className="text-2xl font-bold mb-2 drop-shadow-lg">
            まわせい！アルパカをまわせい！！
          </p>
          <p className="text-sm opacity-80 drop-shadow-md">
            マウスドラッグで回転・スクロールで拡大縮小
          </p>
        </div>
      </div>
    </main>
  );
} 