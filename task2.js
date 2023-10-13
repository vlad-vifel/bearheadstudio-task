function all(promises) {
    return new Promise((resolve, reject) => {
        const result = [];
        let proccesing = promises.length;

        if (!proccesing) { 
            resolve(result); 
            return;
        }
        
        promises.forEach((item, i) => {
            item.then((res) => {
                result[i] = res;
                proccesing--;
                if (!proccesing) resolve(result);
            })
            .catch((rej) => {
                reject(rej);
            });
        });
    });
}

const pr1 = new Promise((res, rej) => setTimeout(() => res(1), 100));
const pr2 = new Promise((res, rej) => setTimeout(() => res(2), 700));
const pr3 = new Promise((res, rej) => setTimeout(() => res(3), 500));
const pr4rejected = new Promise((res, rej) => setTimeout(() => rej('reject'), 300));

      
all([pr1, pr2, pr3]).then(data => console.log(data)).catch(err => console.log(err)); // вывод: [1, 2, 3]
all([pr1, pr2, pr4rejected]).then(data => console.log(data)).catch(err => console.log(err)); // вывод: reject
all([]).then(data => console.log(data)).catch(err => console.log(err));