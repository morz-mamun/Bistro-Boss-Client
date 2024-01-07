

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className='w-4/12 mx-auto text-center my-8 space-y-4'>
            <p className='text-blue-600'> --- {subHeading} ---</p>
            <h3 className='text-3xl font-bold uppercase border-y-4 py-3'>{heading}</h3>
        </div>
    );
};

export default SectionTitle;