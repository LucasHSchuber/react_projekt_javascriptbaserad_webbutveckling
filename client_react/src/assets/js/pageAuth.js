import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PageAuth = () => {
    const navigate = useNavigate();

    // Page display validation
    useEffect(() => {
        const token_check_auth = sessionStorage.getItem("token");
        if (!token_check_auth) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div>
            {/* Your component content goes here */}
        </div>
    );
};

export default PageAuth;
