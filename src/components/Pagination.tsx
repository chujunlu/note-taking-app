import React from 'react';
import { Link } from 'react-router-dom'

import { notesPerPage } from '../utils/constant'

export function Pagination({ total }: { total: number } ) {
    const pageNumbers = [];
    const totalPages = Math.ceil(total / notesPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <Link to={`/${number}`} className='page-link' >
                            {number}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
