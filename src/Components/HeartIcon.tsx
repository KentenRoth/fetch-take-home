interface HeartIconProps {
  fill?: string;
}

export const HeartIcon: React.FC<HeartIconProps> = ({ fill }) => {
  return (
    <svg
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21s-6.5-4.5-9.5-8C-.5 9 1 4.5 5 3c2.3-.9 4.9 0 7 2 2.1-2 4.7-2.9 7-2 4 1.5 5.5 6 2.5 10-3 3.5-9.5 8-9.5 8z"
        stroke="#ef703e"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
};
