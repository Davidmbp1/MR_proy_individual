// client/src/components/RegionCard.tsx

interface RegionCardProps {
  region: string
  img: string
}

export const RegionCard = ({ region, img }: RegionCardProps) => {
  return (
    <a
      href="/"
      className="
        group
        block
        w-full
        aspect-[4/3]        /* Mantiene una proporción 4:3 */
        relative
        overflow-hidden
        rounded-lg
        transform
        transition
        duration-300
        hover:scale-105
        hover:shadow-lg
      "
    >
      {/* Imagen ocupando todo el contenedor */}
      <img
        src={img}
        alt={region}
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          brightness-75
          transition-all
          duration-500
          group-hover:brightness-50
          group-hover:scale-110
        "
      />

      {/* Contenido superpuesto */}
      <div
        className="
          absolute
          inset-0
          flex
          flex-col
          items-center
          justify-center
          text-center
          text-white
          pointer-events-none
        "
      >
        <h3 className="text-3xl font-bold">{region}</h3>
        <p className="text-lg font-medium">restaurants</p>
      </div>
    </a>
  )
}
