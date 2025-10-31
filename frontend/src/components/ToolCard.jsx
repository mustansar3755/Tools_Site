import { Link } from "react-router-dom";

const ToolCard = ({ href, icon, name, desc }) => {
  return (
    <Link to={href} className=" border border-gray-500 rounded-md p-6 hover:scale-95 duration-300">
      <div className="main flex items-center gap-2">
        <img
          className=" w-10 h-10 bg-red-500 p-2 rounded-md"
          src={icon}
          alt=""
        />
        <h2 className=" text-2xl font-semibold text-center">{name}</h2>
      </div>
      <p className=" text-sm text-paraTxt text-center mt-2">{desc}</p>
    </Link>
  );
};

export default ToolCard;
