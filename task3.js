const inp = document.querySelector('input');

const debounce = (func, time) => {
    let timeout;
    return function() {
        const funcCall = () => func.apply(this, arguments);

        clearTimeout(timeout);

        timeout = setTimeout(funcCall, time);
    }
}

const onChange = (e) => console.log(e.target.value);

onChangeDebounced = debounce(onChange, 200);

inp.addEventListener('input', onChangeDebounced);
