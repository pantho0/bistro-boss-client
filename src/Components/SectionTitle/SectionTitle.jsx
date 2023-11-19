

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto text-center mb-6 mt-10 md:w-4/12">
            <p className="text-yellow-600 italic mb-4">--- {subHeading} ---</p>
            <h3 className="text-3xl border-y-4 py-4 uppercase">{heading}</h3>
        </div>
    );
};

export default SectionTitle;