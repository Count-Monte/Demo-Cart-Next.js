const bgColors = {
  red: 'bg-red-500 active:bg-red-500',
  emerald: 'bg-emerald-500 active:bg-emerald-500'
};

const colors = {
  red: 'text-red',
  white: 'text-white',
  emerald: 'text-emerald',
};

const textSizes = {
  sm: 'text-sm'
};

const Button = ({
  onClick, 
  children, 
  color='white', 
  bgColor='emerald',
  textTransform='uppercase',
  textSize='sm',
  type='button'
}) => (
  <button
    className={`
      ${bgColors[bgColor]}
      ${colors[color]}
      font-bold
      ${textTransform}
      ${textSizes[textSize]}
      px-6
      py-3
      rounded
      shadow
      hover:shadow-lg
      outline-none
      focus:outline-none
      mr-1
      mb-1
      ease-linear
      transition-all
      duration-150
    `}
    type={type}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;