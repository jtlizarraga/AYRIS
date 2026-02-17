import React from 'react';

interface CardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ title, children, className = '', onClick, style }) => {
    return (
        <div
            className={`card ${className}`}
            onClick={onClick}
            style={{ cursor: onClick ? 'pointer' : 'default', ...style }}
        >
            {title && <h3 className="card-title">{title}</h3>}
            <div className="card-content">{children}</div>
        </div>
    );
};

export default Card;
