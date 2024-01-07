

const Cover = ({img, title, description}) => {
  return (
    <div>
      <div
        className="hero h-[700px]"
        style={{
          backgroundImage:
            `url(${img})`,
            backgroundSize:'cover'
        }}
      >
        <div className="hero-overlay bg-opacity-25"></div>

        <div className="bg-black bg-opacity-50 rounded-lg">
        <div className="hero-content text-center text-neutral-content">
          <div className="w-[800px] p-10">
            <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
            <p className="mb-5">
              {description}
            </p>
            
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Cover;
