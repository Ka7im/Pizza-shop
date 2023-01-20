import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = () => (
    <ContentLoader
        className='pizza-block'
        speed={2}
        width={280}
        height={466}
        viewBox='0 0 280 466'
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
    >
        <circle cx='140' cy='120' r='120' />
        <rect x='0' y='255' rx='10' ry='10' width='280' height='30' />
        <rect x='0' y='295' rx='10' ry='10' width='280' height='90' />
        <rect x='0' y='412' rx='10' ry='10' width='92' height='30' />
        <rect x='127' y='405' rx='30' ry='30' width='153' height='45' />
    </ContentLoader>
);

export default MyLoader;
