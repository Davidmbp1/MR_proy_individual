interface RegionCardProps {
  region: string,
  img: string,
}

export const RegionCard = ({ region, img }: RegionCardProps) => {
  return (
    <a href="/" className="flex flex-col items-center justify-center">
      <div className="min-w-[150px] min-h-[200px] object-cover overflow-hidden">
        <img src={img} alt="region" className="-z-10 min-w-[150px] aspect-[1.1/1] hover:scale-110 h-auto object-cover brightness-75 hover:brightness-50 duration-500 transition-all" />
      </div>
      <span className="absolute text-center">
        <h3 className="text-3xl font-bold text-white">{region}</h3>
        <p className="text-lg font-medium text-white">restaurants</p>
      </span>
    </a>
  )
}