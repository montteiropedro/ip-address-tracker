interface Props {
  ip: string;
  city: string;
  state: string;
  country: string;
  timezone: string;
  isp: string;
}

export function AddressInfoBar({ ip, city, state, country, timezone, isp }: Props) {
  return (
    <div className="p-6 bg-white flex gap-6 border rounded-lg">
      <div title={ip} className="w-[180px] h-[60px] flex flex-col border-r">
        <span className="text-2xs font-medium text-zinc-400 tracking-widest">IP ADDRESS</span>
        <span className="font-medium line-clamp-2">{ip}</span>
      </div>

      <div title={`${city}, ${state}, ${country}`} className="w-[180px] h-[60px] flex flex-col border-r">
        <span className="text-2xs font-medium text-zinc-400 tracking-widest">LOCATION</span>
        <span className="font-medium line-clamp-2">{`${city}, ${state}, ${country}`}</span>
      </div>

      <div title={`UTC ${timezone}`} className="w-[180px] h-[60px] flex flex-col border-r">
        <span className="text-2xs font-medium text-zinc-400 tracking-widest">TIMEZONE</span>
        <span className="font-medium line-clamp-2">UTC {timezone}</span>
      </div>

      <div title={isp} className="w-[180px] h-[60px] flex flex-col">
        <span className="text-2xs font-medium text-zinc-400 tracking-widest">ISP</span>
        <span className="font-medium line-clamp-2">{isp}</span>
      </div>
    </div>
  );
}
