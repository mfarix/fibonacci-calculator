import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <div>
            In soe other page!
            <Link to="/">Back to Home</Link>
        </div>
    );
};
