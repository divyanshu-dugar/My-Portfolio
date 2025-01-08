let fs = require('fs');
const path = require('path');

let problems = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/blogs/blogs-dsa-problems.json'), 'utf-8'));

function getProblems(topic) {
    return new Promise((resolve, reject) => {
        let arrayProblems = problems.filter((problem) => problem.topic === topic); // Fix: Return result from filter
        if (arrayProblems.length) {
            resolve(arrayProblems);
        } else {
            reject(new Error('No problems found for the topic: ' + topic));
        }
    });
}

module.exports = { getProblems };
