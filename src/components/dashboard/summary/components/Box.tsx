import { cn } from "@/lib/utils";
const Box = ({name, value, edge} : { name: string, value: string|number, edge?: "left"|"right"|null }) => {
  return (
    <div className={cn("px-10 py-10 dark:border-gray-100 border-gray-800 dark:text-gray-100 border text-gray-800 text-center", edge === "left" ? "rounded-l-xl" : edge === "right" ? "rounded-r-xl" : "")}>
      <p className="text-2xl font-bold">{name}</p>
      <p className="text-xl">{value}</p>
    </div>
  )
}

export { Box };