export default function Profile() {
  return (
    <div className="mt-5">
      <div className="flex flex-row items-center justify-center">
        <h1 className="text-4xl font-bold">Lamaglama39</h1>
        <img src="space-lama.png" width={80} height={80} alt="image" className="rounded-full ml-4"/>
      </div>
      <div>
        <p className="text-xl">Job:cloud Engineer</p>
        <p className="text-xl">Location:Tokyo, Japan</p>
        <p className="text-xl">Birthday:1998/07/29</p>
      </div>
      <div className="mt-2">
        <p className="text-xl">観葉植物を愛するインフラエンジニアです。</p>
        <p className="text-xl">最近はチランジアにハマり中です。</p>
      </div>
    </div>
  );
} 
