const Box = ({name, value} : { name: string, value: string|number}) => {
  return (
    <div className="px-10 py-10 dark:border-gray-100 border-gray-800 dark:text-gray-100 border text-gray-800 text-center rounded-md">
      <p className="text-2xl font-bold">{name}</p>
      <p className="text-xl">{value}</p>
    </div>
  )
}

export { Box };