const Badge = ({ label, className, textSize = "text-xs px-2" }) => {
  return (
    <span
      className={`inline-flex ${textSize} leading-5 font-semibold rounded-full ${className} shadow-md`}
    >
      {label}
    </span>
  );
};
export default Badge;
