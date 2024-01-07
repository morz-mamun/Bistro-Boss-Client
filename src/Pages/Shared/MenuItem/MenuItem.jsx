import React from 'react';

const MenuItem = ({menu}) => {
    const {name, recipe, image, price} = menu
    return (
        <div className='flex gap-5'>
            <img style={{
                width: '120px',
                borderRadius: "0 200px 200px 200px"
            }} src={image} alt="" />
            <div >
                <h3 className='text-[#151515] text-xl'>{name}</h3>
                <p className='text-[#737373]'>{recipe}</p>
            </div>
            <p className='text-[#BB8506]'>${price}</p>
        </div>
    );
};

export default MenuItem;