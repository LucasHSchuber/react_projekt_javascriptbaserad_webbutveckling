
// // typically use the useEffect hook. The useEffect hook is used for side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.
// import { set } from 'mongoose';
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';


// const Calculations = async () => {


//     //calculate credit 1930
//     const sum1930credit = accountings.reduce((total, accounting) => {
//         const credit = accounting.entries
//             .filter(entry => entry.plan.startsWith("1930"))
//             .map(entry => entry.credit)

//         const creditAssetsTotal = credit.reduce((sum, credit) => sum + credit, 0);

//         console.log("credit ASSETS:", creditAssetsTotal);

//         return total + creditAssetsTotal;

//         set1930credit(debitAssetsTotal);

//     }, 0)

//     //calculate debit 1930
//     const sumAssetsDebit = accountings.reduce((total, accounting) => {
//         const debit = accounting.entries
//             .filter(entry => entry.plan.startsWith("1"))
//             .map(entry => entry.debit)

//         const debitAssetsTotal = debit.reduce((sum, debit) => sum + debit, 0);

//         console.log("debit ASSETS:", debitAssetsTotal);

//         return total + debitAssetsTotal;

//         set1930debit(debitAssetsTotal);

//     }, 0)

// };


// export default Calculations;