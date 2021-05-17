const bgColors: string[] = [
  'bg-gray-400',
  'bg-green-400',
  'bg-red-400',
  'bg-blue-400',
  'bg-indigo-400',
  'bg-pink-400',
  'bg-yellow-400',
]

export const getRandomBgColor = (): string => {
  return bgColors[Math.floor(Math.random() * bgColors.length)]
}
