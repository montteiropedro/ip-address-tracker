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
    <div className="p-6 bg-white lg:w-fit w-[min(100%,384px)] flex lg:flex-row lg:items-start lg:gap-6 flex-col items-center gap-4 lg:text-start text-center border rounded-lg shadow-lg">
      <div title={ip} className="w-[180px] lg:h-[60px] h-fit flex flex-col lg:border-r">
        <span className="text-2xs font-medium text-zinc-400 tracking-widest">IP ADDRESS</span>
        <span className="font-medium lg:line-clamp-2 line-clamp-1">{ip}</span>
      </div>

      <div title={`${city}, ${state}, ${country}`} className="w-[180px] lg:h-[60px] h-fit flex flex-col lg:border-r">
        <span className="text-2xs font-medium text-zinc-400 tracking-widest">LOCATION</span>
        <span className="font-medium lg:line-clamp-2 line-clamp-1">{`${city}, ${state}, ${country}`}</span>
      </div>

      <div title={`UTC ${timezone}`} className="w-[180px] lg:h-[60px] h-fit flex flex-col lg:border-r">
        <span className="text-2xs font-medium text-zinc-400 tracking-widest">TIMEZONE</span>
        <span className="font-medium lg:line-clamp-2 line-clamp-1">UTC {timezone}</span>
      </div>

      <div title={isp} className="w-[180px] lg:h-[60px] h-fit flex flex-col">
        <span className="text-2xs font-medium text-zinc-400 tracking-widest">ISP</span>
        <span className="font-medium lg:line-clamp-2 line-clamp-1">{isp}</span>
      </div>
    </div>
  );
}
